import crypto from 'crypto';
import fs from 'fs';
import path from 'path';

/**
 * Hashes a plain password using PBKDF2 with SHA-512.
 * Returns a string formatted as pbkdf2_sha512:<iterations>:<salt>:<hash>
 */
export function hashPassword(password: string): string {
  const salt = crypto.randomBytes(16).toString('hex');
  const iterations = 1000;
  const hash = crypto.pbkdf2Sync(password, salt, iterations, 64, 'sha512').toString('hex');
  return `pbkdf2_sha512:${iterations}:${salt}:${hash}`;
}

/**
 * Verifies if the plain password matches the stored PBKDF2 hash using timingSafeEqual.
 */
export function verifyPassword(password: string, storedHash: string): boolean {
  try {
    const parts = storedHash.split(':');
    if (parts.length !== 4) return false;
    
    const [algorithm, iterationsStr, salt, hash] = parts;
    if (algorithm !== 'pbkdf2_sha512') return false;
    
    const iterations = parseInt(iterationsStr, 10);
    const verifyHash = crypto.pbkdf2Sync(password, salt, iterations, 64, 'sha512').toString('hex');
    
    // Use timingSafeEqual to protect against timing attacks
    const bufferA = Buffer.from(hash, 'hex');
    const bufferB = Buffer.from(verifyHash, 'hex');
    
    if (bufferA.length !== bufferB.length) {
      return false;
    }
    
    return crypto.timingSafeEqual(bufferA, bufferB);
  } catch (error) {
    return false;
  }
}

/**
 * Gets the path to the persistent admin config file
 */
export function getAdminConfigPath(): string {
  const dataPath = process.env.PORTFOLIO_DATA_PATH || path.join(process.cwd(), "src/data/portfolio.json");
  const dataDir = path.dirname(dataPath);
  return path.join(dataDir, "admin-config.json");
}

/**
 * Reads the admin password hash from persistent file or env fallback
 */
export function getAdminPasswordHash(): string {
  try {
    const configPath = getAdminConfigPath();
    if (fs.existsSync(configPath)) {
      const content = fs.readFileSync(configPath, 'utf8');
      const data = JSON.parse(content);
      if (data && data.passwordHash) {
        return data.passwordHash;
      }
    }
  } catch (error) {
    console.error("Failed to read admin password hash from file:", error);
  }
  
  // Fallback to process.env (or default credentials in local)
  return process.env.ADMIN_PASSWORD_HASH || "";
}

/**
 * Saves the admin password hash to persistent storage file and memory
 */
export function saveAdminPasswordHash(newHash: string): boolean {
  try {
    const configPath = getAdminConfigPath();
    
    // Ensure directory exists
    fs.mkdirSync(path.dirname(configPath), { recursive: true });
    
    // Save to JSON file
    fs.writeFileSync(configPath, JSON.stringify({ passwordHash: newHash }, null, 2), 'utf8');
    
    // Sync with memory env variable
    process.env.ADMIN_PASSWORD_HASH = newHash;
    return true;
  } catch (error) {
    console.error("Failed to save admin password hash to file:", error);
    return false;
  }
}
