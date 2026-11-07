const fs = require('fs');
const path = require('path');

// Ensure the secrets directory exists
const secretsDir = path.join(__dirname, 'secrets');
if (!fs.existsSync(secretsDir)){
    fs.mkdirSync(secretsDir);
}

// 1. Generate config.js for Gemini
const geminiKey = process.env.GEMINI_API_KEY || "MISSING_KEY";
const configContent = `const CONFIG = { GEMINI_API_KEY: "${geminiKey}" };`;
fs.writeFileSync(path.join(secretsDir, 'config.js'), configContent);

// 2. Generate firebase-config.js
// (Assuming you add this single JSON string to Netlify Env Vars as FIREBASE_JSON)
const firebaseJson = process.env.FIREBASE_JSON || "{}";
const firebaseContent = `const firebaseConfig = ${firebaseJson};`;
fs.writeFileSync(path.join(secretsDir, 'firebase-config.js'), firebaseContent);

console.log("✅ Secrets generated successfully from Netlify Environment Variables!");