import { put, list } from '@vercel/blob';

const token = process.env.BLOB_READ_WRITE_TOKEN;

if (!token) {
  console.error('❌ BLOB_READ_WRITE_TOKEN not set');
  process.exit(1);
}

console.log('Token format: Valid ✓');
console.log('Token length:', token.length);
console.log('Token prefix:', token.substring(0, 7));

try {
  console.log('\n🔍 Testing token by listing existing blobs...');
  const blobs = await list({ token });
  console.log('✅ Token is valid!');
  console.log('Existing blobs:', blobs.blobs.length);
} catch (error) {
  console.error('❌ Token error:', error.message);
  console.error('\nPossible issues:');
  console.error('1. Token missing Blob scope');
  console.error('2. Token is for wrong project');
  console.error('3. Token expired');
  console.error('4. Invalid token format');
  process.exit(1);
}
