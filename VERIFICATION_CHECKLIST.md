# Pre-Deployment Verification Checklist

## Code Quality Checks

### Backend (server/)
- [x] All dependencies in `package.json`
- [x] `.env` file created with MongoDB connection
- [x] `.env.production` template created
- [x] `.gitignore` configured properly
- [x] Environment variables used correctly
- [x] Error handling implemented
- [x] CORS properly configured
- [x] Database connection tested locally
- [x] All routes working locally
- [x] No sensitive data hardcoded

### Frontend (client/)
- [x] All dependencies in `package.json`
- [x] API service layer configured
- [x] Protected routes implemented
- [x] Error handling in components
- [x] Token management (localStorage)
- [x] Responsive design
- [x] Environment variables for API URL
- [x] No sensitive data in code
- [x] Console errors checked

### Root Directory
- [x] Root `package.json` created for easy npm install
- [x] Root `.gitignore` created
- [x] `DEPLOY_INSTRUCTIONS.md` created
- [x] `RENDER_DEPLOYMENT.md` created
- [x] `README.md` with documentation
- [x] `SETUP_GUIDE.md` for local setup

---

## Local Testing Checklist

### Backend Testing
```powershell
cd server
npm install
# Create .env with MONGODB_URI
npm run dev
```

**Test these endpoints:**
- [ ] POST `/api/auth/register` - Register new student
- [ ] POST `/api/auth/login` - Login student
- [ ] POST `/api/grievances` - Submit grievance (with JWT)
- [ ] GET `/api/grievances` - Get all grievances (with JWT)
- [ ] GET `/api/grievances/:id` - Get specific grievance (with JWT)
- [ ] PUT `/api/grievances/:id` - Update grievance (with JWT)
- [ ] DELETE `/api/grievances/:id` - Delete grievance (with JWT)
- [ ] GET `/api/grievances/search/query?title=test` - Search grievances (with JWT)

**Using Postman or cURL:**
```bash
# Register
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"name":"Test User","email":"test@example.com","password":"password123","confirmPassword":"password123"}'

# Login
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"password123"}'

# Get token from login response and use in next request
# Submit Grievance (replace TOKEN)
curl -X POST http://localhost:5000/api/grievances \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer TOKEN" \
  -d '{"title":"Test","description":"Test grievance","category":"Academic"}'
```

### Frontend Testing
```powershell
cd client
npm install
npm start
# Opens http://localhost:3000
```

**Test these flows:**
- [ ] Navigate to `/register` - Register form loads
- [ ] Register new account - Success message
- [ ] Navigate to `/login` - Login form loads
- [ ] Login with credentials - Redirects to dashboard
- [ ] Dashboard loads - Shows grievance list (empty initially)
- [ ] Click "Submit New Grievance" - Form appears
- [ ] Fill and submit form - Grievance appears in list
- [ ] Click "Edit" on grievance - Form pre-fills data
- [ ] Update and save - Grievance updates
- [ ] Search by title - Results filter correctly
- [ ] Click "Delete" - Grievance removed
- [ ] Click "Logout" - Redirects to login
- [ ] Try accessing /dashboard without login - Redirects to login

---

## Pre-Deployment Final Checks

### Security
- [ ] No hardcoded passwords/secrets
- [ ] JWT_SECRET is strong
- [ ] Sensitive variables in `.env` (not committed)
- [ ] CORS configured properly
- [ ] Password hashing with bcrypt
- [ ] Authorization checks on protected routes

### Code Quality
- [ ] No console.log() left in production code
- [ ] No commented-out code
- [ ] No TODO comments left
- [ ] Proper error handling everywhere
- [ ] No unhandled promise rejections

### Configuration Files
- [ ] `.env` with production values created
- [ ] `.gitignore` prevents sensitive files
- [ ] `package.json` has correct start script
- [ ] Build commands configured
- [ ] Environment variables documented

### Git Repository
- [ ] Repo created at https://github.com/Git-Naveenk/mse2
- [ ] All files added (except .env)
- [ ] Initial commit made
- [ ] All changes committed

---

## Deployment Steps

### 1. Push to GitHub
```powershell
cd d:\mse2FSD
git add .
git commit -m "Ready for deployment"
git push origin main
```

### 2. Deploy Backend on Render
- [ ] Create account at render.com
- [ ] Create Web Service
- [ ] Connect to `Git-Naveenk/mse2` repo
- [ ] Set root directory to `server`
- [ ] Add environment variables
- [ ] Deploy and note the URL (e.g., `https://mse2-backend.onrender.com`)

### 3. Update Frontend with Backend URL
```javascript
// In client/src/services/api.js
const API_BASE_URL = 'https://mse2-backend.onrender.com/api';
```

### 4. Push Frontend Changes
```powershell
git add .
git commit -m "Update API URL for production"
git push
```

### 5. Deploy Frontend
- [ ] Choose platform (Vercel, Netlify, or Render)
- [ ] Connect GitHub repo
- [ ] Set root directory to `client`
- [ ] Deploy

### 6. Update Backend CORS
```javascript
// In server/server.js
FRONTEND_URL=https://your-frontend-url.com
```

---

## Post-Deployment Testing

### Verify Backend
```
Health Check: https://backend-url/
API Test: https://backend-url/api/auth/login
```

### Verify Frontend
```
Home: https://frontend-url/
Register: https://frontend-url/register
Login: https://frontend-url/login
Dashboard: https://frontend-url/dashboard
```

### End-to-End Testing
- [ ] Register account on production
- [ ] Login with credentials
- [ ] Submit grievance
- [ ] View grievances
- [ ] Edit grievance
- [ ] Delete grievance
- [ ] Search grievance
- [ ] Logout

---

## Monitoring After Deployment

### Backend (Render)
- [ ] Check service health
- [ ] Monitor error logs
- [ ] Check uptime
- [ ] Monitor cold starts

### Frontend
- [ ] Check page load performance
- [ ] Monitor JavaScript errors
- [ ] Check API response times
- [ ] Test on mobile devices

---

## Troubleshooting Common Issues

### If Backend won't deploy:
1. Check build logs on Render
2. Ensure `package.json` in server folder
3. Verify all npm packages install correctly
4. Check `node_modules` not included in git

### If Frontend shows blank:
1. Check browser console for JS errors
2. Verify API URL is correct
3. Check CORS settings on backend
4. Test API endpoints directly

### If CORS error:
1. Backend CORS must include frontend URL
2. Update `FRONTEND_URL` in backend .env
3. Restart backend service on Render

### If database connection fails:
1. Verify MongoDB URI is correct
2. Check MongoDB Atlas IP whitelist
3. Test connection string locally

---

## Final Checklist Before Going Live

- [ ] All tests pass locally
- [ ] Code pushed to GitHub
- [ ] Backend deployed and working
- [ ] Frontend deployed and working
- [ ] API endpoints tested
- [ ] CORS configured correctly
- [ ] Database connection working
- [ ] User registration working
- [ ] User login working
- [ ] Grievance CRUD operations working
- [ ] Search functionality working
- [ ] Logout working
- [ ] Protected routes working
- [ ] Error messages displaying correctly
- [ ] Mobile responsiveness checked
- [ ] Performance is acceptable

---

## Success! 🎉

Your Student Grievance Management System is now live and ready for users!

Share these URLs:
- Frontend: `https://your-frontend-url.com`
- Backend API: `https://your-backend-url.onrender.com/api`
- GitHub: `https://github.com/Git-Naveenk/mse2`
