# 🍽️ Savora – Recipe Book

Savora is a full-stack recipe management web application that allows users to create, view, update, delete, search, and organize their favorite recipes through a simple and user-friendly interface.

## ✨ Features

- **Add Recipes:** Create new recipes with a title, category, ingredients, instructions, cooking time, and image.
- **View Recipes:** Browse saved recipes and view their details.
- **Update Recipes:** Edit existing recipe information whenever needed.
- **Delete Recipes:** Remove recipes that are no longer needed.
- **Search Recipes:** Find recipes using the search feature.
- **Filter by Category:** Organize and find recipes based on their category.
- **Quick Statistics:** View recipe-related statistics on the dashboard.
- **Responsive Interface:** Enjoy a clean interface designed for convenient use.

## 🛠️ Technologies Used

### Frontend
- React.js
- Vite
- HTML5
- CSS3
- JavaScript

### Backend
- Node.js
- Express.js
- MongoDB
- Mongoose

### Development Tools
- Visual Studio Code
- Git
- GitHub
- npm

## 📁 Project Structure

```text
RecipeBook/
├── backend/
│   ├── models/
│   │   └── Recipe.js
│   ├── server.js
│   ├── package.json
│   └── package-lock.json
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── assets/
│   │   ├── App.jsx
│   │   ├── App.css
│   │   ├── index.css
│   │   └── main.jsx
│   ├── index.html
│   ├── package.json
│   └── package-lock.json
├── .gitignore
└── README.md
```

## ⚙️ Prerequisites

Before running the project, make sure you have installed:

- Node.js
- npm
- MongoDB connection (local MongoDB or MongoDB Atlas)

## 🚀 Installation and Setup

### 1. Clone the Repository

```bash
git clone https://github.com/AgnaMariya/Savora-Recipe-Book.git
cd Savora-Recipe-Book
```

### 2. Set Up the Backend

Open a terminal and run:

```bash
cd backend
npm install
```

Create a `.env` file inside the `backend` folder and configure the environment variables:

```env
MONGO_URI=your_mongodb_connection_string
PORT=5000
```

Replace the example MongoDB URI with your own valid connection string.

Start the backend server:

```bash
npm start
```

If your `package.json` does not define a `start` script, use the appropriate script listed in that file, such as `node server.js`.

### 3. Set Up the Frontend

Open a **second terminal** from the project root and run:

```bash
cd frontend
npm install
npm run dev
```

Open the local URL displayed in the terminal, usually:

```text
http://localhost:5173
```

Your frontend may use another port if the default port is already occupied.

## 🧩 How It Works

1. The user interacts with the React frontend.
2. The frontend sends requests to the Express backend.
3. The backend processes recipe operations.
4. Mongoose communicates with MongoDB to store and retrieve recipe data.
5. The updated recipe information is displayed in the frontend.

## 🔐 Environment Variables

The backend uses environment variables to configure its database connection and server port.

Keep real database credentials and passwords private. Do not publish real secrets in a public GitHub repository.

## 🔮 Future Enhancements

- User registration and authentication
- Favorite recipes and personal collections
- Recipe ratings and reviews
- Ingredient-based recipe search
- Recipe image uploads
- Meal planning and shopping lists
- Online deployment

## 👩‍💻 Author

**Agna Mariya Joseph**

GitHub: [AgnaMariya](https://github.com/AgnaMariya)

## 📄 License

This project was developed for educational purposes. A formal open-source license can be added if needed.
