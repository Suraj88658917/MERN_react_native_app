# MERN React Native App 🚀

This is a **MERN + React Native** full-stack app with authentication (Login/Register), Agent management, and file upload.  
It uses **MongoDB** as the database, **Express.js** as backend, and **React Native (Expo)** for frontend.

---

## 📂 Project Structure
mern_react_native_project/
├── backend/ # Express + MongoDB backend
│ ├── models/ # Mongoose models
│ ├── routes/ # Auth, Agents, Upload routes
│ ├── server.js # Main backend entry
│ └── .env # Environment variables
├── screens/ # React Native Screens (Login, Register, Dashboard, Agents, Upload)
├── App.js # Main React Native app
├── package.json
└── README.md

yaml
Copy code

---

## ⚙️ Backend Setup (Express + MongoDB)

1. Go into backend folder:
   ```bash
   cd backend
Install dependencies:

bash
Copy code
npm install
Create a .env file in backend folder:

env
Copy code
PORT=8000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
Example MongoDB connection string (replace <username> and <password>):

ini
Copy code
MONGO_URI=mongodb+srv://<username>:<password>@cluster0.mongodb.net/mydb?retryWrites=true&w=majority
Start backend server:

bash
Copy code
npm start
Server will run on http://localhost:8000.

📱 Frontend Setup (React Native)
Go to project root:

bash
Copy code
cd ..
Install dependencies:

bash
Copy code
npm install
Run the app with Expo:

bash
Copy code
npx expo start
App will open in Expo Go (Android/iOS) or emulator.

🔑 Features
User Authentication (Register/Login with JWT)

Secure MongoDB connection with Mongoose

Dashboard with bottom navigation

Manage Agents (Add/List)

File Upload Support

🛠 Tech Stack
Frontend: React Native (Expo), AsyncStorage, Axios

Backend: Node.js, Express.js, MongoDB, Mongoose, JWT, Bcrypt

Database: MongoDB Atlas

📌 Notes
Make sure MongoDB cluster is running and accessible.

Replace API_URL in React Native screens with your backend server IP:

js
Copy code
const API_URL = "http://192.168.xx.xx:8000"; // Your local machine IP
Use ngrok if you want to expose backend for mobile devices.

🚀 Deployment
Backend: Can be deployed on Render, Railway, or Heroku.

Database: MongoDB Atlas.

Frontend: Run via Expo Go or build APK/IPA.
