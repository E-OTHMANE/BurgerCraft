# BurgerCreativity

BurgerCreativity is a dynamic and interactive burger customization platform that empowers users to create personalized burger experiences.

![BurgerCreativity App](docs/app-screenshot.png)

## 🍔 Features

- **Interactive Builder**: Design your own burger with our intuitive drag-and-drop interface
- **Ingredient Variety**: Choose from a wide selection of buns, patties, cheeses, veggies, and sauces
- **Visual Preview**: See your creation come to life in real-time as you build
- **Save Your Creations**: Name and save your custom burger recipes

## 🚀 Tech Stack

- **Frontend**: React, TypeScript, Shadcn UI
- **State Management**: React Context API, React Query
- **Styling**: Tailwind CSS
- **Backend**: Express.js
- **Database**: PostgreSQL with Drizzle ORM
- **Package Manager**: npm

## 📋 Prerequisites

Before you begin, ensure you have the following installed:
- Node.js (v16.x or later)
- npm (v8.x or later)
- PostgreSQL (v14.x or later)

## 🛠️ Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/burgercreativity.git
   cd burgercreativity
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables:
   ```bash
   cp .env.example .env
   ```
   Then edit `.env` with your database credentials and other configurations.

4. Set up the database:
   ```bash
   npm run db:push
   ```

5. Start the development server:
   ```bash
   npm run dev
   ```

6. Open your browser and navigate to `http://localhost:5000`

## 📊 Database Schema

The application uses the following main data models:

- **Ingredients**: Categorized by type (bun, patty, cheese, veggie, sauce)
- **Burgers**: Customized burger creations with selected ingredients

## 💻 API Endpoints

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/api/ingredients` | GET | Fetch all available ingredients |
| `/api/ingredients/type/:type` | GET | Fetch ingredients by type |
| `/api/burgers` | GET | Fetch all saved burgers |
| `/api/burgers` | POST | Save a new burger creation |
| `/api/burgers/:id` | GET | Fetch a specific burger by ID |

## 🧪 Testing

Run the test suite with:

```bash
npm test
```

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the project
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📞 Contact

Project Link: [https://github.com/yourusername/burgercreativity](https://github.com/yourusername/burgercreativity)

---

Made with ❤️ by the BurgerCreativity Team