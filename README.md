# Full-Stack-MERN-APP (Backend)

This repository contains the backend REST API for the Tic-Tasker application, a project and task management tool built with the MERN stack.

## The Backend is responsible for:

- User authentication

- Project management

- Task management

- Secure data persistence

## Author

Jackson Jacque

## Live Links

- Frontend: Add later
- Backend: Add later

---

## Planning & Architecture

### Planning Goals

- RESTful API design
- Secure authentication with JWT
- Ownership-based authorization
- Clear separation of concerns
- Scalable MongoDB data models
- Production-ready middleware structure

### Execution Strategy

- Express.js for routing
- MongoDB + Mongoose for persistence
- JWT for authentication
- Middleware for route protection

---

## Architecture Overview

- Users can sign up and log in

- Authentication uses JSON Web Tokens (JWT)

- Protected routes require a valid token

- Projects belong to users

- Tasks belong to projects

- Only project owners can modify their projects and tasks

---

## Server Folder Structure

```
server/
  src/
    config/
      db.js

    middleware/
      authMiddleware.js

    models/
      User.js
      Projects.js
      Tasks.js

    routes/
      authRoutes.js
      projectRoutes.js
      taskRoutes.js

  server.js
  .env
  .gitignore
  package.json
  README.md

```

---

## Environment Variables

This project uses environment variables to store sensitive configuration values such as database credentials and JWT secrets.

These values are not committed to GitHub and must be provided by each developer or deployment environment.

### Required Variables

Create a .env file inside the server/ directory:

```env
PORT=3000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
```

### Variable Descriptions

- PORT — Port the Express server runs on
  (Defaults to 3001 if not provided)

- MONGO_URI — MongoDB Atlas connection string
  (Each developer or deployment should use their own database)

- JWT_SECRET — Secret key used to sign and verify JSON Web Tokens (Can be any secure random string)

* The .env file is excluded from version control via .gitignore to prevent
  sensitive information from being committed.

### Server Dependencies

1. express - Web framework
2. mongoose - MongoDB ODM
3. dotenv - Environment variables
4. cors - Cross-origin requests
5. bcrypt - Password hashing
6. jsonwebtoken - JWT authentication

### Development Dependency

1. nodemon - Auto-restart server

### API EndPoints

- Auth

1. POST /api/auth/signup — Create user
2. POST /api/auth/login — Login user

- Projects (Protected)

1. POST /api/projects — Create project
2. GET /api/projects — List my projects
3. GET /api/projects/:projectId — Get one project (owner)
4. PUT /api/projects/:projectId — Update project (owner)
5. DELETE /api/projects/:projectId — Delete project (owner)

- Tasks(Protected, Nested)

1. POST /api/projects/:projectId/tasks — Create task (owner)
2. GET /api/projects/:projectId/tasks — List tasks (owner)
3. PUT /api/projects/:projectId/tasks/:taskId — Update task (owner)
4. DELETE /api/projects/:projectId/tasks/:taskId — Delete task (owner)

---

## How to Run the Server Locally

### Prerequisites

- Node.js installed
- MongoDB Atlas connection string

### Setup

1. Navigate into the server folder:

   ```bash
   cd server
   ```

2. Install dependencies:
   npm install

3. CCreate a .env file in the server/ folder (see Environment Variables section above).
   PORT=3000
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret

4. Start the development server:
   npm run dev

### Server Status

If successful, you should see:

```
Server running on port http://localhost:3000
MongoDB connected successfully

```

The API will be available at:

```
http://localhost:3000

```

## Technologies Used

- Node.js

- Express.js

- MongoDB

- Mongoose

- JSON Web Tokens (JWT)

- bcrypt

- dotenv

- cors
