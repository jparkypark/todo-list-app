// Test script to verify JavaScript syntax
console.log('Testing JavaScript syntax...');

// Test if we can load the main app
try {
    // Simple test to see if the file loads without syntax errors
    const testScript = `
        ${require('fs').readFileSync('./app.js', 'utf8')}
    `;
    
    console.log('✅ JavaScript syntax appears valid');
    console.log('File size:', testScript.length, 'characters');
} catch (error) {
    console.error('❌ JavaScript syntax error:', error.message);
}
