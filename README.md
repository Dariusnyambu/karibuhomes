# Karibu Diaspora Homes 🏡

Luxury Airbnb-style website for Karibu Diaspora Homes, Thika, Kenya.

## 🚀 Getting Started

### Step 1 — Install dependencies
Open this folder in VS Code, then open the terminal (`Ctrl+J`) and run:

```bash
npm install
```

Wait 1-2 minutes for packages to download.

### Step 2 — Start the dev server

```bash
npm start
```

Your browser will automatically open at **http://localhost:3000** 🎉

### Step 3 — Deploy to GitHub Pages

#### Option A: Automated Deployment (Recommended)

1. **Create a GitHub repository** named `karibu-diaspora-homes`
2. **Update the remote URL** in `package.json`:
   ```json
   "homepage": "https://YOUR_USERNAME.github.io/karibu-diaspora-homes"
   ```
3. **Run the deployment script**:
   ```bash
   deploy.bat
   ```
   Or manually:
   ```bash
   git remote add origin https://github.com/YOUR_USERNAME/karibu-diaspora-homes.git
   git branch -M main
   git push -u origin main
   npm run deploy
   ```

#### Option B: Manual Deployment

```bash
# Build the project
npm run build

# The build folder is ready to be deployed
# Upload the contents of the build folder to your web server
```

Your live site will be available at: **https://YOUR_USERNAME.github.io/karibu-diaspora-homes**

---

## 📁 Project Structure

```
karibu-homes/
├── public/
│   └── index.html          ← HTML shell
├── src/
│   ├── index.js            ← React entry point
│   ├── index.css           ← Global styles
│   ├── App.js              ← Root component
│   └── KaribuDiasporaHomes.jsx  ← Main website component
├── package.json
└── README.md
```

## ✏️ How to Edit Content

All content is in `src/KaribuDiasporaHomes.jsx`:

- **Properties** → Edit the `PROPERTIES` array (price, beds, amenities, images)
- **Gallery** → Edit the `GALLERY` array (swap image URLs for your own photos)
- **Testimonials** → Edit the `TESTIMONIALS` array
- **WhatsApp numbers** → Search for `wa.me/` and update the numbers
- **Email** → Search for `karibudiasporahomes@gmail.com`

## 📞 Contact
WhatsApp Kenya: +254 723 329 598
WhatsApp UK: +44 7424 172 630
