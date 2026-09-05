# Student Management System

## Project Purpose
This project is a student management web application. It provides a web interface for viewing, adding, updating, and deleting student records.

The application is connected to a PostgreSQL database and an Express.js web server running on a Linux machine. The backend server is responsible for receiving requests from the frontend and reading or changing data in PostgreSQL.

The Linux web server and PostgreSQL database must be running for the application to work. If the server or database is stopped, the frontend cannot load student data or save changes.

## Technology Stack
- **Frontend:** React, Vite, Tailwind CSS, Axios
- **Backend:** Node.js, Express.js
- **Database:** PostgreSQL

## Project Structure
student management/
├── backend/                    * Express API and PostgreSQL connection
└── frontend/
	└── student management/     * React web application

## How the Application Works
1. PostgreSQL runs on the Linux machine and stores the student records.
2. The Express backend connects to PostgreSQL and exposes the student API.
3. The React frontend sends requests to the backend at: <http://127.0.0.1:8000/students>
4. The backend performs the requested database operation and returns the result to the frontend.

## Requirements
- Node.js and npm
- PostgreSQL installed and running on the Linux server
- The student database and table created in PostgreSQL
- Network access between the computer running the frontend and the Linux server

## Important Limitation
This is a server-dependent application. The frontend does not connect directly to PostgreSQL. It depends on the Express backend, and the backend depends on PostgreSQL. Therefore, the following services must be available at the same time:

React frontend -> Express backend -> PostgreSQL database

If the Linux server is shut down, the backend is not running, or PostgreSQL is unavailable, student data operations will fail.

## API Endpoints
| Method   | Endpoint        | Description      |
| -------- | --------------- | ---------------- |
| `GET`    | `/students`     | Get all students |
| `GET`    | `/students/:id` | Get one student  |
| `POST`   | `/students`     | Add a student    |
| `PUT`    | `/students/:id` | Update a student |
| `DELETE` | `/students/:id` | Delete a student |
