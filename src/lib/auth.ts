import crypto from 'crypto';

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
