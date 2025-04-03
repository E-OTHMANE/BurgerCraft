import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import { Express } from "express";
import session from "express-session";
import { scrypt, randomBytes, timingSafeEqual } from "crypto";
import { promisify } from "util";
import { storage } from "./storage";
import { User } from "@shared/schema";
import { insertUserSchema } from "@shared/schema";
import { ZodError } from "zod";
import { fromZodError } from "zod-validation-error";
import { log } from "./vite";
import connectPg from "connect-pg-simple";
import pg from 'pg';
import createMemoryStore from "memorystore";

const MemoryStore = createMemoryStore(session);
const PostgresSessionStore = connectPg(session);

// Create a new connection pool for the session store
const sessionPool = new pg.Pool({
  connectionString: process.env.DATABASE_URL,
  max: 5
});

// Define user type for passport
declare global {
  namespace Express {
    // Define a User interface for passport that doesn't conflict with the schema User type
    interface User {
      id: number;
      email: string;
      fullName: string;
      password: string;
      age: number | null;
      createdAt: Date;
    }
  }
}

const scryptAsync = promisify(scrypt);

// Hash password using scrypt
async function hashPassword(password: string) {
  const salt = randomBytes(16).toString("hex");
  const buf = (await scryptAsync(password, salt, 64)) as Buffer;
  return `${buf.toString("hex")}.${salt}`;
}

// Compare supplied password with stored hashed password
async function comparePasswords(supplied: string, stored: string) {
  const [hashed, salt] = stored.split(".");
  const hashedBuf = Buffer.from(hashed, "hex");
  const suppliedBuf = (await scryptAsync(supplied, salt, 64)) as Buffer;
  return timingSafeEqual(hashedBuf, suppliedBuf);
}

export function setupAuth(app: Express) {
  // Generate a random secret if one isn't set
  const sessionSecret = process.env.SESSION_SECRET || randomBytes(32).toString("hex");
  
  // Configure session
  const isProd = app.get("env") === "production";
  const useDatabase = process.env.USE_DATABASE === "true";
  
  // Configure session store
  const sessionStore = useDatabase
    ? new PostgresSessionStore({
        pool: sessionPool,
        tableName: "session",
        createTableIfMissing: true,
      })
    : new MemoryStore({
        checkPeriod: 86400000, // prune expired entries every 24h
      });

  const sessionSettings: session.SessionOptions = {
    secret: sessionSecret,
    resave: false,
    saveUninitialized: false,
    store: sessionStore,
    cookie: { 
      secure: isProd,
      maxAge: 1000 * 60 * 60 * 24 * 7, // 1 week
    },
  };

  // Trust the first proxy if in production
  if (isProd) {
    app.set("trust proxy", 1);
  }
  
  // Set up sessions and passport
  app.use(session(sessionSettings));
  app.use(passport.initialize());
  app.use(passport.session());

  // Configure local strategy for username/password auth
  passport.use(
    new LocalStrategy(async (username, password, done) => {
      try {
        // Get user by email (using username field for email)
        const user = await storage.getUserByEmail(username);
        
        // Check if user exists and password matches
        if (!user || !(await comparePasswords(password, user.password))) {
          return done(null, false);
        }
        
        return done(null, user);
      } catch (error) {
        return done(error);
      }
    }),
  );

  // Serialize user to the session
  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  // Deserialize user from the session
  passport.deserializeUser(async (id: number, done) => {
    try {
      const user = await storage.getUser(id);
      if (!user) {
        return done(new Error("User not found"));
      }
      done(null, user);
    } catch (error) {
      done(error);
    }
  });

  // Register API routes
  
  // User registration
  app.post("/api/register", async (req, res, next) => {
    try {
      // We need to extract username and add it to the data for validation
      const { username, ...otherData } = req.body;
      
      // Validate request body against schema
      const validatedData = insertUserSchema.parse({
        ...otherData,
        // If email isn't provided but username is, use username as email
        email: otherData.email || username
      });
      
      // Check if user already exists
      const existingUser = await storage.getUserByEmail(validatedData.email);
      if (existingUser) {
        return res.status(400).json({ error: "Email already in use" });
      }

      // Hash password and create user
      const hashedPassword = await hashPassword(validatedData.password);
      const user = await storage.createUser({
        ...validatedData,
        password: hashedPassword,
      });

      // Remove password from response
      const { password, ...userWithoutPassword } = user;

      // Log user in automatically after registration
      req.login(user, (err) => {
        if (err) return next(err);
        res.status(201).json(userWithoutPassword);
      });
    } catch (error) {
      if (error instanceof ZodError) {
        const validationError = fromZodError(error);
        return res.status(400).json({ error: validationError.message });
      }
      log(`Registration error: ${(error as Error).message}`, "auth");
      res.status(500).json({ error: "Failed to register user" });
    }
  });

  // User login
  app.post("/api/login", (req, res, next) => {
    passport.authenticate("local", (err: Error | null, user: User | false, info: any) => {
      if (err) return next(err);
      if (!user) {
        return res.status(401).json({ error: "Invalid credentials" });
      }
      
      req.login(user, (err: Error | null) => {
        if (err) return next(err);
        
        // Remove password from response
        const { password, ...userWithoutPassword } = user;
        res.status(200).json(userWithoutPassword);
      });
    })(req, res, next);
  });

  // User logout
  app.post("/api/logout", (req, res, next) => {
    req.logout((err) => {
      if (err) return next(err);
      res.sendStatus(200);
    });
  });

  // Get current user info
  app.get("/api/user", (req, res) => {
    if (!req.isAuthenticated()) {
      return res.status(401).json({ error: "Not authenticated" });
    }
    
    // Remove password from response
    const { password, ...userWithoutPassword } = req.user as User;
    res.json(userWithoutPassword);
  });

  // Middleware to check if user is authenticated
  const isAuthenticated = (req: any, res: any, next: any) => {
    if (req.isAuthenticated()) {
      return next();
    }
    res.status(401).json({ error: "Unauthorized" });
  };

  // Get authenticated user's burgers
  app.get("/api/my/burgers", isAuthenticated, async (req, res) => {
    try {
      const user = req.user as User;
      const burgers = await storage.getBurgersByUserId(user.id);
      res.json(burgers);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch user's burgers" });
    }
  });
}