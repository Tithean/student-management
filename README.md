# Student Management System

The Student Management System is a web service for managing student records in one central database. It gives users a simple interface to view the student list, search for students, add new records, edit existing information, and remove records that are no longer needed.

The service is designed for staff or administrators, with all student data operations handled by a backend API on a Linux server.

## How the Service Works

The application has four connected parts:

- **Frontend:** The web page where users view and manage student records.
- **Backend:** The application API that receives requests, checks the requested operation, and returns a response.
- **Database:** The PostgreSQL data store that keeps the student records.
- **Linux server:** The machine that runs the backend and database together.

The frontend does not connect directly to the database. Every operation follows the same path:

```text
User action
	|
	v
Frontend in the browser
	|
	| HTTP request over the network
	v
Linux server: backend API
	|
	| Database query
	v
PostgreSQL on the same Linux server
```

### Example: Viewing Students

1. A user opens the student management page.
2. The frontend sends a `GET` request to the backend API on the Linux server.
3. The backend receives the request and asks PostgreSQL for the student records.
4. PostgreSQL returns the data to the backend.
5. The backend sends the data back to the frontend.
6. The frontend displays the student list to the user.

### Example: Adding or Updating a Student

When a user submits the student form, the frontend sends the form data to the backend using a `POST` or `PUT` request. The backend writes the change to PostgreSQL and returns the result. The frontend then refreshes the displayed data so the user can see the saved record.

Deleting a student follows the same process with a `DELETE` request. This keeps the database connection and all data changes under the control of the backend API.

## Deployment Arrangement

The backend API and PostgreSQL database run on the same Linux server. The frontend can run on a user's computer or another web host, as long as it can reach the Linux server over the network.

```text
User's computer                         Linux server
----------------                         ---------------------------
Browser with frontend  -- HTTP/API -->  Node.js backend -- SQL --> PostgreSQL
```

The current frontend API address is:

```text
http://172.20.10.12:8000/students
```

The frontend uses this address to send requests to the backend. The backend uses its server-side database configuration to connect to PostgreSQL locally on the Linux server. The browser never receives the database credentials and never communicates directly with PostgreSQL.

For the service to operate normally:

- The Linux server must be running.
- The backend API must be running on port `8000`.
- PostgreSQL must be running on the same server.
- The frontend computer must be able to reach the Linux server.
- The backend must have valid PostgreSQL connection settings.

## Main Service Features

- View all student records.
- Search for students by name.
- Add a new student through a form.
- Update student information.
- Delete a student record.
- Display the total number of students.
- Show loading and empty states while data is being retrieved.

## API Operations

The frontend communicates with the backend through these student endpoints:

| Method   | Endpoint        | Service operation     |
| -------- | --------------- | --------------------- |
| `GET`    | `/students`     | Retrieve all students |
| `GET`    | `/students/:id` | Retrieve one student  |
| `POST`   | `/students`     | Create a student      |
| `PUT`    | `/students/:id` | Update a student      |
| `DELETE` | `/students/:id` | Delete a student      |

The API health response is available at `/`.

## Project Structure

```text
student management/
├── backend/                    # API and database connection
└── frontend/
	└── student management/     # User-facing web application
```

## Running the Service

On the Linux server, start PostgreSQL and run the backend from the `backend` directory:

```bash
npm install
npm start
```

The backend reads its PostgreSQL connection settings from `backend/.env` and listens on port `8000`.

On the frontend computer, install the frontend dependencies and start the web application:

```bash
cd "frontend/student management"
npm install
npm run dev
```

If the Linux server uses a different IP address, update the API address in `src/config/api.js` so it points to the correct server.

## Service Dependency

The service depends on the following communication chain:

```text
Frontend -> Backend API -> PostgreSQL database
```

If the backend stops, the frontend cannot read or change student records. If PostgreSQL stops, the backend cannot complete database operations. Keeping both services running on the same Linux server provides one central location for the API and student data.
