# Student Grievance Management System (MERN Stack)

A comprehensive web-based system built with MongoDB, Express.js, React, and Node.js to help students submit, track, and manage grievances.

## Project Structure

```
student-grievance-system/
├── server/                 # Backend (Node.js + Express + MongoDB)
│   ├── config/            # Database configuration
│   ├── models/            # MongoDB models (Student, Grievance)
│   ├── routes/            # API routes (auth, grievances)
│   ├── middleware/        # Authentication middleware
│   ├── server.js          # Main server file
│   ├── package.json       # Backend dependencies
│   └── .env.example       # Environment variables template
│
└── client/                # Frontend (React)
    ├── src/
    │   ├── components/    # React components
    │   ├── pages/         # Page components
    │   ├── services/      # API service layer
    │   ├── App.js         # Main App component
    │   └── index.js       # React entry point
    ├── public/            # Static files
    └── package.json       # Frontend dependencies
```

## Features

### Backend APIs

#### Authentication
- `POST /api/auth/register` - Register new student
- `POST /api/auth/login` - Login student

#### Grievances (Protected Routes)
- `POST /api/grievances` - Submit grievance
- `GET /api/grievances` - View all grievances
- `GET /api/grievances/:id` - View grievance by ID
- `PUT /api/grievances/:id` - Update grievance
- `DELETE /api/grievances/:id` - Delete grievance
- `GET /api/grievances/search/query?title=xyz` - Search grievances

### Frontend Features

#### Components
- **Registration Form** - New student registration
- **Login Form** - Student authentication
- **Dashboard** - Main interface with grievance management
- **Grievance Form** - Submit and edit grievances
- **Grievance List** - Display all grievances with filters

#### Dashboard Features
- Submit new grievance
- View all grievances
- Search grievances by title
- Edit grievance details
- Delete grievance
- Update grievance status
- Logout functionality

## Security Features

- Password hashing with bcrypt
- JWT-based authentication
- Protected routes (only logged-in users can access)
- Authorization checks (students can only manage their own grievances)
- Error handling for invalid login, duplicate email, unauthorized access

## Getting Started

### Prerequisites
- Node.js (v14+)
- MongoDB (Local or Atlas)
- npm or yarn

### Backend Setup

1. Navigate to server directory:
```bash
cd server
```

2. Install dependencies:
```bash
npm install
```

3. Create `.env` file (copy from `.env.example`):
```
MONGODB_URI=mongodb://localhost:27017/student_grievance
JWT_SECRET=your_jwt_secret_key_here
PORT=5000
NODE_ENV=development
```

4. Start MongoDB service

5. Run backend:
```bash
npm start
# or for development with hot reload
npm run dev
```

Backend will run on `http://localhost:5000`

### Frontend Setup

1. Navigate to client directory:
```bash
cd client
```

2. Install dependencies:
```bash
npm install
```

3. Start development server:
```bash
npm start
```

Frontend will run on `http://localhost:3000`

## API Endpoints Reference

### Authentication
```
POST /api/auth/register
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123",
  "confirmPassword": "password123"
}

POST /api/auth/login
{
  "email": "john@example.com",
  "password": "password123"
}
```

### Grievances
```
POST /api/grievances (Protected)
{
  "title": "Lab equipment issue",
  "description": "The microscope in lab 2 is not working",
  "category": "Academic"
}

GET /api/grievances (Protected)
- Returns all grievances for logged-in student

GET /api/grievances/:id (Protected)
- Returns specific grievance details

PUT /api/grievances/:id (Protected)
{
  "title": "Updated title",
  "description": "Updated description",
  "category": "Hostel",
  "status": "Resolved"
}

DELETE /api/grievances/:id (Protected)
- Deletes specific grievance

GET /api/grievances/search/query?title=keyword (Protected)
- Returns grievances matching the title keyword
```

## Database Schema

### Student Model
```javascript
{
  name: String,
  email: String (Unique),
  password: String (Hashed),
  createdAt: Date
}
```

### Grievance Model
```javascript
{
  title: String,
  description: String,
  category: String (Academic/Hostel/Transport/Other),
  status: String (Pending/Resolved),
  studentId: ObjectId (Reference to Student),
  createdAt: Date,
  updatedAt: Date
}
```

## Technologies Used

### Backend
- **Express.js** - Web framework
- **MongoDB** - NoSQL database
- **Mongoose** - ODM (Object Data Modeling)
- **bcrypt** - Password hashing
- **jsonwebtoken** - JWT authentication
- **CORS** - Cross-origin resource sharing
- **dotenv** - Environment variables

### Frontend
- **React** - UI library
- **React Router** - Client-side routing
- **Axios** - HTTP client
- **CSS3** - Styling

## Error Handling

The system handles the following errors:

1. **Invalid Login** - Incorrect email or password
2. **Duplicate Email** - Email already registered
3. **Unauthorized Access** - Attempting to access/modify others' grievances
4. **Missing Fields** - Required fields not provided
5. **Invalid Data** - Invalid email format, password mismatch, etc.
6. **Not Found** - Grievance or student not found

## Contributing

Feel free to fork this project and submit pull requests for any improvements.

## License

This project is open source and available for educational purposes.
