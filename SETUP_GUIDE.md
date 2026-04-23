# Student Grievance Management System - Setup Guide

## Quick Start Guide

### Step 1: Set Up MongoDB

#### Option A: Local MongoDB
```bash
# Install MongoDB Community Edition
# Windows: Download from https://www.mongodb.com/try/download/community
# macOS: brew install mongodb-community
# Linux: Follow official MongoDB guide

# Start MongoDB service
# Windows: mongod
# macOS: brew services start mongodb-community
# Linux: sudo systemctl start mongod
```

#### Option B: MongoDB Atlas (Cloud)
1. Create account at https://www.mongodb.com/cloud/atlas
2. Create a cluster
3. Get connection string and use it in `.env` file

### Step 2: Backend Setup

```bash
# Navigate to server directory
cd server

# Install dependencies
npm install

# Create .env file from template
copy .env.example .env

# Edit .env with your MongoDB URI and JWT secret
# Example:
# MONGODB_URI=mongodb://localhost:27017/student_grievance
# JWT_SECRET=your_secret_key_12345
# PORT=5000

# Start MongoDB (if using local)
# Then start the server
npm run dev
```

**Backend will run on:** `http://localhost:5000`

### Step 3: Frontend Setup

```bash
# In a new terminal, navigate to client directory
cd client

# Install dependencies
npm install

# Start the React development server
npm start
```

**Frontend will run on:** `http://localhost:3000`

## Project Completion Checklist

### MongoDB Schema ✓
- [x] Student Model (Name, Email, Password)
- [x] Grievance Model (Title, Description, Category, Status, Date)

### Backend APIs ✓
- [x] Authentication
  - [x] POST /api/auth/register
  - [x] POST /api/auth/login
- [x] Grievance Management
  - [x] POST /api/grievances (Submit)
  - [x] GET /api/grievances (View all)
  - [x] GET /api/grievances/:id (View by ID)
  - [x] PUT /api/grievances/:id (Update)
  - [x] DELETE /api/grievances/:id (Delete)
  - [x] GET /api/grievances/search/query?title=xyz (Search)

### Backend Features ✓
- [x] Bcrypt for password hashing
- [x] JWT for authentication
- [x] Error handling
  - [x] Invalid login
  - [x] Duplicate email
  - [x] Unauthorized access

### Frontend Components ✓
- [x] Registration Form
- [x] Login Form
- [x] Dashboard

### Frontend Features ✓
- [x] Submit grievance form
- [x] Display all grievances
- [x] Search grievances
- [x] Update/Delete grievance
- [x] Logout functionality
- [x] Protected dashboard route
- [x] Error handling and validation

## Running the Application

### Terminal 1 - Backend
```bash
cd server
npm run dev
```

### Terminal 2 - Frontend
```bash
cd client
npm start
```

### Test Workflow
1. Go to `http://localhost:3000`
2. Register a new account
3. Login with your credentials
4. Submit a grievance
5. View all grievances
6. Edit/Delete grievances
7. Search for grievances
8. Logout

## Troubleshooting

### MongoDB Connection Error
- Ensure MongoDB is running
- Check MONGODB_URI in .env file
- Verify connection string format

### Port Already in Use
```bash
# Kill process on port 5000 (Backend)
lsof -ti:5000 | xargs kill -9  # macOS/Linux
netstat -ano | findstr :5000   # Windows (find PID then: taskkill /PID <PID> /F)

# Kill process on port 3000 (Frontend)
lsof -ti:3000 | xargs kill -9  # macOS/Linux
netstat -ano | findstr :3000   # Windows
```

### CORS Error
- Ensure backend is running on port 5000
- Check API_BASE_URL in `client/src/services/api.js`

### Token Issues
- Clear localStorage: Open DevTools > Application > LocalStorage > Clear All
- Login again

## Additional Notes

- All passwords are automatically hashed using bcrypt
- JWT tokens expire in 7 days
- Students can only manage their own grievances
- Categories: Academic, Hostel, Transport, Other
- Status: Pending, Resolved

## What's Included

✓ Full MERN stack implementation
✓ Authentication & Authorization
✓ CRUD operations for grievances
✓ Search functionality
✓ Error handling
✓ Password hashing
✓ JWT tokens
✓ Protected routes
✓ Responsive UI
✓ CSS styling
✓ API documentation
✓ MongoDB models
✓ Error messages
