import crypto from 'crypto';

export function generateHash(data: string): string {
  const hash = crypto.createHash('sha256');
  hash.update(data);

  return hash.digest('hex');
}

export function compareHash(data: string, hash: string): boolean {
  const generatedHash = generateHash(data);

  return generatedHash === hash;
}
