# Deploying Backend to Render

## Step-by-Step Guide

### Step 1: Prepare Your Code

1. **Initialize Git Repository** (if not already done)
```bash
cd server
git init
git add .
git commit -m "Initial commit"
```

2. **Ensure package.json has correct start script**
```json
{
  "scripts": {
    "start": "node server.js",
    "dev": "nodemon server.js"
  }
}
```

3. **Update .env for production**
- Keep MONGODB_URI with your MongoDB Atlas connection
- Add a strong JWT_SECRET
- Set NODE_ENV=production

### Step 2: Push Code to GitHub

1. **Create a GitHub repository**
   - Go to github.com and create new repository
   - Name it something like `student-grievance-backend`

2. **Push your code**
```bash
git remote add origin https://github.com/YOUR_USERNAME/student-grievance-backend.git
git branch -M main
git push -u origin main
```

### Step 3: Create Render Account & Deploy

1. **Sign Up on Render**
   - Go to https://render.com
   - Sign up using GitHub account (recommended)

2. **Create New Web Service**
   - Click "New +" button
   - Select "Web Service"
   - Connect your GitHub repository

3. **Configure Service**
   - **Name**: `student-grievance-api` (or any name)
   - **Environment**: `Node`
   - **Build Command**: `npm install`
   - **Start Command**: `node server.js`
   - **Instance Type**: Free (or paid if needed)

4. **Add Environment Variables**
   - Click on "Environment" tab
   - Add these variables:
   ```
   MONGODB_URI=mongodb+srv://sk:YHTU3aSHK0XBKU4e@backend.vjgyz21.mongodb.net/mse2
   JWT_SECRET=your_strong_secret_key_here
   PORT=5000
   NODE_ENV=production
   ```

5. **Deploy**
   - Click "Create Web Service"
   - Render will automatically deploy when you push to GitHub

### Step 4: Update Frontend API URL

After deployment, update your React frontend to use the Render URL:

**File**: `client/src/services/api.js`

```javascript
const API_BASE_URL = 'https://your-service-name.onrender.com/api';
// Replace 'your-service-name' with your actual Render service name
```

### Step 5: Update CORS Settings (Important!)

**File**: `server/server.js`

```javascript
const cors = require('cors');

app.use(cors({
  origin: [
    'http://localhost:3000',
    'https://your-frontend-url.com'  // Add your frontend URL
  ],
  credentials: true
}));
```

## Important Notes

### Free Tier on Render
- Web service spins down after 15 minutes of inactivity (cold start)
- First request may take 30+ seconds
- For production, consider paid tier

### Common Issues & Solutions

**1. Deployment Failed**
- Check build logs on Render dashboard
- Ensure all dependencies are in package.json
- Verify .gitignore doesn't exclude important files

**2. Database Connection Error**
- Verify MONGODB_URI in environment variables
- Check MongoDB Atlas IP whitelist (allow all IPs: 0.0.0.0/0)
- Ensure database user has correct credentials

**3. CORS Error**
- Update CORS origin in server.js with your frontend URL
- Ensure frontend URL is in allowed origins list

**4. Port Error**
- Don't hardcode port in code
- Use: `const PORT = process.env.PORT || 5000`

## Monitoring & Logs

- Check deployment logs on Render dashboard
- View real-time logs under "Logs" tab
- Monitor service health and uptime

## Auto-Deploy on GitHub Push

Render automatically deploys when you push to main branch:
```bash
git add .
git commit -m "Update message"
git push origin main
# Deployment starts automatically
```

## Your Deployed API URL

After successful deployment, your API will be available at:
```
https://your-service-name.onrender.com/api/
```

### Example API Calls
```
Register: https://your-service-name.onrender.com/api/auth/register
Login: https://your-service-name.onrender.com/api/auth/login
Grievances: https://your-service-name.onrender.com/api/grievances
```

## Next Steps

1. Get your Render service URL
2. Update frontend API_BASE_URL
3. Test all API endpoints
4. Deploy frontend (Vercel, Netlify, or Render)
5. Monitor performance and logs

## Quick Checklist

- [ ] Code pushed to GitHub
- [ ] Render account created
- [ ] Web service created
- [ ] Environment variables added
- [ ] Deployment successful
- [ ] API URL noted
- [ ] Frontend URL updated
- [ ] CORS configured
- [ ] All APIs tested
- [ ] Frontend deployed
