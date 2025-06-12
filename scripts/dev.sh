#!/bin/bash

# Todo List App - Development Script
# Start local development server

echo "🚀 Starting Todo List App development server..."

# Check if we're in the right directory
if [[ ! -f "src/index.html" ]]; then
    echo "❌ Error: Please run this script from the project root directory"
    echo "   Expected to find src/index.html"
    exit 1
fi

# Check if npx is available
if ! command -v npx &> /dev/null; then
    echo "❌ Error: npx not found. Please install Node.js"
    exit 1
fi

# Start live server
echo "📂 Serving from src/ directory"
echo "🌐 Server will open in your default browser"
echo "✅ Press Ctrl+C to stop the server"
echo ""

cd src && npx live-server --port=3000 --open=/index.html