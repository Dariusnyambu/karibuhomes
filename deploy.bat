@echo off
echo ========================================
echo   KARIBU DIASPORA HOMES DEPLOYMENT
echo ========================================
echo.
echo Step 1: Make sure you've created a GitHub repository
echo        named 'karibu-diaspora-homes'
echo.
echo Step 2: Update the remote URL below with your GitHub username
echo.
echo Press any key to continue with deployment...
pause >nul

echo.
echo Setting up GitHub remote...
git remote add origin https://github.com/YOUR_USERNAME/karibu-diaspora-homes.git

echo.
echo Pushing to GitHub...
git branch -M main
git push -u origin main

echo.
echo Building the project...
npm run build

echo.
echo Deploying to GitHub Pages...
npm run deploy

echo.
echo ========================================
echo   DEPLOYMENT COMPLETE!
echo ========================================
echo.
echo Your site will be available at:
echo https://YOUR_USERNAME.github.io/karibu-diaspora-homes
echo.
echo Note: It may take a few minutes for GitHub Pages to update.
echo.
pause