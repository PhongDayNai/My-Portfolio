const fs = require('fs');
const path = require('path');

// Helper to recursively copy directories
const copyDirRecursive = (src, dest) => {
  if (!fs.existsSync(src)) return;
  if (!fs.existsSync(dest)) {
    fs.mkdirSync(dest, { recursive: true });
  }
  const entries = fs.readdirSync(src, { withFileTypes: true });
  for (const entry of entries) {
    const srcPath = path.join(src, entry.name);
    const destPath = path.join(dest, entry.name);
    if (entry.isDirectory()) {
      copyDirRecursive(srcPath, destPath);
    } else {
      if (!fs.existsSync(destPath)) {
        try {
          fs.copyFileSync(srcPath, destPath);
          console.log(`[Bootstrap] Restored default asset: ${entry.name}`);
        } catch (err) {
          console.error(`[Bootstrap] Failed to restore default asset ${entry.name}:`, err);
        }
      }
    }
  }
};

const bootstrap = () => {
  try {
    const cwd = process.cwd();
    
    // 1. Restore default images
    const defaultImagesDir = path.join(cwd, "public/images-default");
    const activeImagesDir = path.join(cwd, "public/images");
    console.log(`[Bootstrap] CWD: ${cwd}`);
    console.log(`[Bootstrap] Default images path: ${defaultImagesDir} (Exists: ${fs.existsSync(defaultImagesDir)})`);
    console.log(`[Bootstrap] Active images path: ${activeImagesDir} (Exists: ${fs.existsSync(activeImagesDir)})`);
    
    if (fs.existsSync(defaultImagesDir)) {
      copyDirRecursive(defaultImagesDir, activeImagesDir);
      console.log(`[Bootstrap] Finished checking/restoring default images.`);
    }

    // 2. Restore default portfolio data file if missing in persistent storage
    const dataPath = process.env.PORTFOLIO_DATA_PATH || path.join(cwd, "src/data/portfolio.json");
    const defaultDataPath = path.join(cwd, "src/data/portfolio-default.json");
    console.log(`[Bootstrap] Target portfolio data path: ${dataPath} (Exists: ${fs.existsSync(dataPath)})`);
    console.log(`[Bootstrap] Default portfolio data path: ${defaultDataPath} (Exists: ${fs.existsSync(defaultDataPath)})`);

    if (!fs.existsSync(dataPath)) {
      console.log(`[Bootstrap] Portfolio data file not found. Restoring from default...`);
      fs.mkdirSync(path.dirname(dataPath), { recursive: true });
      if (fs.existsSync(defaultDataPath)) {
        fs.copyFileSync(defaultDataPath, dataPath);
        console.log(`[Bootstrap] Successfully restored default portfolio data to ${dataPath}`);
      } else {
        console.warn(`[Bootstrap] Warning: Default portfolio data not found at ${defaultDataPath}`);
      }
    }
  } catch (error) {
    console.error("[Bootstrap] Error during bootstrap:", error);
  }
};

// Run bootstrap
bootstrap();

// Start Next.js standalone server
require('./server.js');
