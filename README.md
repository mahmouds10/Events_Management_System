# 🛠 Backend – Event Booking System

This is the **backend** for the Full-Stack Event Booking System. It powers all business logic and data handling, including user authentication, event management, and booking functionality.

---

## 🌟 Features

-   🔐 **Authentication**

    -   Register/Login with role-based access (Admin, User)
    -   JWT-based authentication system

-   🗂️ **Event Management (Admin Only)**

    -   Create, Read, Update, and Delete events

-   🎫 **Booking System**

    -   Users can book events (one ticket per click)
    -   Events update automatically to reflect user bookings

-   📁 **API Design**
    -   RESTful API structure
    -   Role-based middleware to protect routes

---

## ⚙️ Getting Started

These steps will help you run the backend locally.

### 📦 Prerequisites

Ensure you have installed:

-   [Node.js](https://nodejs.org/) (v16 or higher recommended)
-   [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) or local MongoDB server
-   [Postman](https://www.postman.com/) or any API testing tool (optional)

---

## 🚀 Installation & Run

1. **Navigate to the backend directory:**

    ```bash
    cd backend
    ```

2. **Install dependencies:**

    ```
    npm instal
    ```

3. **Set up environment variables:**  
   Contact the admin to get the env variables or `.env` file

4. **Run the server in development mode:**

    ```
     npm run dev
    ```

    This uses nodemon to automatically reload on changes.

5. **Server will be running on:**
    ```
    http://localhost:5000
    ```

---

## 🔌 API Endpoints

A complete Postman Collection is provided to help you test and explore all API endpoints including:

🔐 Authentication (Register/Login)

🗂️ Admin Event Management

🎫 Event Booking

To use it:

1. Import the collection file into Postman.
   You'll find it in the project root or backend/postman/ folder (e.g., EventBookingSystem.postman_collection.json).

2. Set up your environment (optional but recommended):
   Define variables like base_url, token, etc., to easily switch between local and deployed servers.

3. Authenticate using the login route and copy the returned token into the Authorization header (Bearer Token) for protected routes.

---

## 🧠 AI Tools Used
- ChatGPT – Used for architectural decisions, debugging logic, writing route controllers, and documentation.

- GitHub Copilot – Used to assist with boilerplate and route logic generation.

--- 

## 📁 Project Structure


```
backend/
├── index.js               
├── package.json           
├── package-lock.json      
├── README.md             
├── src/                   
    ├── config/            
    ├── db/                
    ├── middlewares/       
    ├── modules/           
    ├── routers/           
    └── utils/             
```