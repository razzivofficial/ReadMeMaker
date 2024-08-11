import { Buffer } from 'buffer'; // Import Buffer from the buffer package

export function encodeEmail(email) {
  return Buffer.from(email).toString('base64'); // Base64 encoding using Buffer
}

export function decodeEmail(encodedEmail) {
  return Buffer.from(encodedEmail, 'base64').toString('utf-8'); // Base64 decoding using Buffer
}
