# Complete Deployment Checklist & Instructions

## Your GitHub Repo
📍 https://github.com/Git-Naveenk/mse2.git

## STEP 1: Push Code to GitHub

### From Your Local Machine (PowerShell)

```powershell
# Navigate to your project root
cd d:\mse2FSD

# Initialize git (if not already done)
git init

# Add all files
git add .

# Create initial commit
git commit -m "Initial commit: Student Grievance Management System"

# Add remote repository
git remote add origin https://github.com/Git-Naveenk/mse2.git

# Rename branch to main
git branch -M main

# Push code to GitHub
git push -u origin main
```

**You may need to authenticate:**
- Use GitHub Personal Access Token (recommended)
- Or use your GitHub credentials

---

## STEP 2: Deploy Backend to Render

### 2.1 Go to Render.com
- Sign in at https://render.com
- Click "New +" → "Web Service"

### 2.2 Connect GitHub Repository
- Select "Git Repository"
- Search for "mse2"
- Select `Git-Naveenk/mse2`
- Click "Connect"

### 2.3 Configure Service
**Basic Settings:**
- Name: `mse2-backend` (or any name)
- Root Directory: `server` (important!)
- Environment: `Node`
- Region: Choose closest to you
- Build Command: `npm install`
- Start Command: `node server.js`

### 2.4 Add Environment Variables
Click "Advanced" → "Add Environment Variable"

```
MONGODB_URI = mongodb+srv://sk:YHTU3aSHK0XBKU4e@backend.vjgyz21.mongodb.net/mse2
JWT_SECRET = your_super_secret_key_12345_change_this
FRONTEND_URL = https://your-frontend-url.vercel.app
NODE_ENV = production
PORT = 5000
```

### 2.5 Deploy
- Click "Create Web Service"
- Wait for deployment (2-3 minutes)
- Note the URL: `https://mse2-backend.onrender.com` (example)

---

## STEP 3: Update Frontend & Deploy

### 3.1 Update API URL in Frontend

**File to update:** `client/src/services/api.js`

Replace this line:
```javascript
const API_BASE_URL = 'http://localhost:5000/api';
```

With your Render backend URL:
```javascript
const API_BASE_URL = 'https://mse2-backend.onrender.com/api';
```

### 3.2 Push Updated Code to GitHub
```powershell
cd d:\mse2FSD
git add .
git commit -m "Update API URL for production deployment"
git push
```

### 3.3 Deploy Frontend on Render

**Option A: Deploy on Render**
- Go to Render.com
- Click "New +" → "Web Service"
- Connect `Git-Naveenk/mse2` repository
- Set Root Directory: `client`
- Build Command: `npm install && npm run build`
- Start Command: `npm start`
- Add environment variables if needed
- Click "Create Web Service"

**Option B: Deploy on Vercel (Recommended for React)**
1. Go to https://vercel.com
2. Import project from GitHub
3. Select `Git-Naveenk/mse2`
4. Set Root Directory: `client`
5. Deploy

**Option C: Deploy on Netlify**
1. Go to https://app.netlify.com
2. Connect GitHub
3. Select `Git-Naveenk/mse2`
4. Build command: `npm install && npm run build` (from client folder)
5. Publish directory: `client/build`
6. Deploy

---

## STEP 4: Update Backend CORS Settings

**File:** `server/server.js`

Update the CORS configuration with your frontend URL:

```javascript
const cors = require('cors');

app.use(cors({
  origin: [
    'http://localhost:3000',
    'https://your-frontend-domain.com'  // Add your Vercel/Netlify/Render frontend URL
  ],
  credentials: true
}));
```

Then push to GitHub:
```powershell
git add .
git commit -m "Update CORS settings for production"
git push
```

Render will automatically redeploy!

---

## Quick Reference: Your URLs (After Deployment)

| Service | URL | Status |
|---------|-----|--------|
| Backend API | https://mse2-backend.onrender.com | Pending |
| Frontend | https://your-frontend.domain.com | Pending |
| GitHub | https://github.com/Git-Naveenk/mse2.git | ✅ Ready |

---

## Testing After Deployment

### Test Backend API
```
POST https://mse2-backend.onrender.com/api/auth/register
POST https://mse2-backend.onrender.com/api/auth/login
GET https://mse2-backend.onrender.com/api/grievances
```

### Test Frontend
Open your frontend URL in browser and:
1. Register a new account
2. Login
3. Submit a grievance
4. View all grievances
5. Search/Edit/Delete grievances

---

## Troubleshooting

### Backend won't deploy
- Check build logs on Render
- Ensure `server` folder has `package.json` ✓
- Verify start command is `node server.js`
- Check environment variables are set

### Database connection error
- Verify MONGODB_URI is correct ✓
- Check MongoDB Atlas IP whitelist (set to 0.0.0.0/0)
- Test connection locally first

### Frontend shows blank page
- Check browser console for errors
- Verify API_BASE_URL in `api.js`
- Check CORS settings in backend
- Ensure backend is running

### CORS error
- Backend CORS must include frontend URL
- Update `server/server.js` with frontend URL
- Redeploy backend to Render

---

## Next Steps Checklist

- [ ] 1. Push code to GitHub (follow Step 1)
- [ ] 2. Deploy backend to Render (follow Step 2)
- [ ] 3. Update frontend API URL (Step 3.1)
- [ ] 4. Push updated code (Step 3.2)
- [ ] 5. Deploy frontend (Step 3.3)
- [ ] 6. Update CORS in backend (Step 4)
- [ ] 7. Test all APIs
- [ ] 8. Test frontend application
- [ ] 9. Share URLs with others

---

## Helpful Commands

```powershell
# Check git status
git status

# View recent commits
git log --oneline

# View remote URL
git remote -v

# Make changes and push
git add .
git commit -m "Your message"
git push

# Check which branch you're on
git branch
```

---

## Support

If you encounter any issues:
1. Check Render logs: Dashboard → Your Service → Logs
2. Check GitHub Actions: Repo → Actions
3. Check browser console for frontend errors
4. Verify all environment variables are set correctly

Good luck with your deployment! 🚀
