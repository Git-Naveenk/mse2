# 🚀 Quick Start: From Local to Live Deployment

## Your Repository
📍 https://github.com/Git-Naveenk/mse2

---

## Phase 1: Prepare & Push (5 minutes)

### Step 1: Open PowerShell and Navigate to Project
```powershell
cd d:\mse2FSD
```

### Step 2: Initialize & Commit
```powershell
# Check git status
git status

# Add all files
git add .

# Commit
git commit -m "Initial commit: Student Grievance Management System"

# Add remote (one time only)
git remote add origin https://github.com/Git-Naveenk/mse2.git

# Rename to main
git branch -M main

# Push to GitHub
git push -u origin main
```

✅ **Code is now on GitHub!**

---

## Phase 2: Deploy Backend (10 minutes)

### Step 3: Go to Render.com
1. Sign in at https://render.com
2. Click **"New +"** → **"Web Service"**
3. Click **"Deploy existing repository"**
4. Search for & select **`mse2`**
5. Click **"Connect"**

### Step 4: Configure Backend Service

Fill in these fields:

| Field | Value |
|-------|-------|
| **Name** | `mse2-backend` |
| **Root Directory** | `server` |
| **Environment** | Node |
| **Build Command** | `npm install` |
| **Start Command** | `node server.js` |

### Step 5: Add Environment Variables

Click **"Advanced"** and add these:

```
MONGODB_URI = mongodb+srv://sk:YHTU3aSHK0XBKU4e@backend.vjgyz21.mongodb.net/mse2
JWT_SECRET = use_a_strong_secret_key_here_12345
NODE_ENV = production
FRONTEND_URL = (leave blank for now, update later)
PORT = 5000
```

### Step 6: Deploy
Click **"Create Web Service"** and wait 2-3 minutes.

✅ **Backend deployed!** Copy your backend URL (e.g., `https://mse2-backend.onrender.com`)

---

## Phase 3: Deploy Frontend (10 minutes)

### Step 7: Update Frontend API URL

**Using VS Code:**
1. Open `client/src/services/api.js`
2. Change this line (around line 3):
```javascript
const API_BASE_URL = 'http://localhost:5000/api';
```

To this:
```javascript
const API_BASE_URL = 'https://mse2-backend.onrender.com/api';
```
*(Replace with YOUR actual Render backend URL)*

### Step 8: Push Changes to GitHub
```powershell
cd d:\mse2FSD
git add .
git commit -m "Update API URL for production backend"
git push
```

### Step 9: Deploy Frontend on Vercel (Easiest)

1. Go to https://vercel.com
2. Click **"Add New..."** → **"Project"**
3. Click **"Import Git Repository"**
4. Search for & select **`mse2`**
5. Click **"Import"**

### Step 10: Configure Vercel

In the Project Settings:
- **Root Directory:** `client`
- Keep other defaults
- Click **"Deploy"**

Wait for deployment... ✅ **Frontend deployed!**

You'll get a URL like: `https://mse2.vercel.app`

---

## Phase 4: Final Configuration (2 minutes)

### Step 11: Update Backend CORS (Important!)

1. Open `server/server.js` in VS Code
2. Find this line (around line 15):
```javascript
process.env.FRONTEND_URL || ''
```

Update your `server/.env` file to include:
```
FRONTEND_URL=https://mse2.vercel.app
```

### Step 12: Push Final Changes
```powershell
cd d:\mse2FSD
git add .
git commit -m "Update CORS for frontend URL"
git push
```

Render will automatically redeploy! ✅

---

## 🎉 You're Live!

### Your URLs:
| Service | URL |
|---------|-----|
| **Frontend** | https://mse2.vercel.app |
| **Backend API** | https://mse2-backend.onrender.com |
| **GitHub** | https://github.com/Git-Naveenk/mse2 |

---

## ✅ Test Your Application

1. Open https://mse2.vercel.app in browser
2. Click **Register**
3. Create a test account
4. Login
5. Submit a grievance
6. View, edit, delete, search
7. Logout

🎊 **Success!** Your app is live!

---

## If Something Goes Wrong

### Backend shows error
- Check Render Dashboard → Logs
- Verify MongoDB connection string
- Ensure JWT_SECRET is set

### Frontend is blank
- Check browser DevTools (F12)
- Verify API URL is correct
- Check CORS errors in console

### CORS Error
- Update `FRONTEND_URL` in backend `.env`
- Wait for Render to redeploy
- Refresh browser

---

## Share Your App!

Give users this link:
```
https://mse2.vercel.app
```

They can register, login, and manage grievances! 🎉

---

## Useful Commands

```powershell
# Check status
git status

# See changes
git diff

# View your commits
git log --oneline -5

# Undo last commit (if not pushed)
git reset HEAD~1
```

---

## Next Steps (Optional)

- [ ] Add custom domain
- [ ] Set up monitoring/alerts
- [ ] Add email notifications
- [ ] Create admin dashboard
- [ ] Add analytics

---

**Congratulations! Your Student Grievance Management System is live!** 🚀
