# MVP Backend

This is the backend for the Mentor Volunteer Program (MVP), providing the API for connecting mentors and mentees.

## Technologies Used

- Node.js
- Express
- PostgreSQL
- pg-promise
- bcrypt (for password hashing)
- dotenv (for environment variables)

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- PostgreSQL (v12 or higher)

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/mvp-backend.git
   cd mvp-backend
   ```

2. Install the dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the root directory and add your environment variables:
   ```
   SECRET=your_jwt_secret
   DATABASE_URL=your_database_url
   ```

### Database Setup

1. Create the database:
   ```bash
   psql -U postgres -f db/schema.sql
   ```

2. Seed the database (if applicable):
   ```bash
   npm run db:seed
   ```

### Running the Application

To start the server, run:
```bash
npm start
```

The server will run on `http://localhost:5000`.

## API Endpoints

- `GET /users` - Retrieve all users
- `POST /users` - Create a new user
- `GET /users/:id` - Retrieve a user by ID
- `GET /users/:id/mentees` - Retrieve mentees connected to a mentor
- `GET /users/:id/connection-details` - Retrieve connection details for a user

## Features

- User authentication and authorization
- CRUD operations for users
- Connection management between mentors and mentees
- Error handling and validation
