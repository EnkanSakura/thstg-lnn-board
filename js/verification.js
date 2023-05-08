// Use `browserify verification.js -o _verification.js` to generate available version

// Load the tweetnacl library
const nacl = require('tweetnacl');

// Define form-convert functions
function uint8Array_to_base64(uint8Array) {
    return btoa(String.fromCharCode(...uint8Array));
}
function base64_to_uint8Array(base64) {
    return new Uint8Array([...atob(base64)].map(c => c.charCodeAt(0)));
}
function utf8_to_uint8Array(utf8) {
    return new TextEncoder().encode(utf8);
}
function uint8Array_to_utf8(uint8Array) {
    return new TextDecoder().decode(uint8Array.buffer);
}

// Encrypt a message and return a signed message with its public key
function encrypt(message) {
    // Generate a new Ed25519 key pair
    const keyPair = nacl.sign.keyPair();
    // Convert the message to a Uint8Array
    message = utf8_to_uint8Array(message)
    // Signs the message using the secret key and returns a signed message
    return [uint8Array_to_base64(nacl.sign(message, keyPair.secretKey)),
        uint8Array_to_base64(keyPair.publicKey)]
}
// Verify and decrypt a signed message and return the original message
function decrypt(signedMessage, publicKey) {
    // Convert the signed message to a Uint8Array
    signedMessage = base64_to_uint8Array(signedMessage)
    // Convert the public key to a Uint8Array
    publicKey = base64_to_uint8Array(publicKey)
    // Verify and decrypt it and return
    // If not verified, return null
    return uint8Array_to_utf8(nacl.sign.open(signedMessage, publicKey))
}

// Test
var message = "Hello World!"
console.log('Message:', message);

var encrypted = encrypt(message)
console.log('Signed Message:', encrypted[0]);
console.log('Public key:', encrypted[1]);

var decrypted = decrypt(encrypted[0], encrypted[1])
console.log('Returned Message:', decrypted);