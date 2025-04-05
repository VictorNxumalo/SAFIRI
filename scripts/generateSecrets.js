const crypto = require('crypto');

// Generate new JWT secret
const jwtSecret = crypto.randomBytes(32).toString('hex');

console.log('\n=== New Credentials ===\n');
console.log('JWT_SECRET=' + jwtSecret);
console.log('\nCopy these values to your .env file\n');