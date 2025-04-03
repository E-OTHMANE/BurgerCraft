# BurgerFy - Custom Burger Builder App

BurgerFy is a responsive web application that allows users to create and customize their own burgers by selecting different ingredients from various categories.

## Features

- Interactive burger builder with real-time preview
- Multiple ingredient categories (buns, patties, cheeses, veggies, sauces)
- Visual representation of your burger as you build it
- Ability to name and save your custom burger creation
- Responsive design for mobile, tablet, and desktop

## How to Run the Application

### Prerequisites

- [Node.js](https://nodejs.org/) (v14 or higher)
- npm or yarn package manager
- PostgreSQL database

### Setup Instructions

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd burgerfy
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up the database**
   - Make sure PostgreSQL is running
   - The application uses environment variables for database connection:
     - `DATABASE_URL`: PostgreSQL connection URL
     - `PGHOST`: Database host
     - `PGPORT`: Database port
     - `PGUSER`: Database username
     - `PGPASSWORD`: Database password
     - `PGDATABASE`: Database name

4. **Start the application**
   ```bash
   npm run dev
   ```
   This command starts both the backend Express server and the frontend Vite development server.

5. **Access the application**
   - Open your browser and navigate to: `http://localhost:5000`
   - The application will automatically create default ingredients in the database if none exist

### Project Structure

- **Frontend**: React with TypeScript, styled with Tailwind CSS and shadcn UI components
  - Located in the `client` directory
  - Uses React Context API for state management
  - TanStack Query for data fetching

- **Backend**: Express.js API server
  - Located in the `server` directory
  - Provides API endpoints for ingredients and saved burgers
  - Uses Drizzle ORM for database interactions

- **Database**: PostgreSQL
  - Schema and models defined in `shared/schema.ts`
  - Migrations handled by Drizzle ORM

## Usage Flow

1. **Welcome Page**
   - Click the "Welcome to BurgerFy" button to start building your burger

2. **Builder Page**
   - Select ingredients from the categories panel on the left
   - See your burger being built in real-time in the center preview
   - Click "Finish My Burger" when you're ready to proceed

3. **Final Page**
   - Name your burger creation
   - Save your burger to the database
   - Option to start over and create a new burger

## Troubleshooting

- If you encounter database connectivity issues, check that your PostgreSQL server is running and that the connection details in your environment variables are correct.

- If the application doesn't start, check the console logs for detailed error messages.

- For development issues, consider checking the React browser extension for component debugging.