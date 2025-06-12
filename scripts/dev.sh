#!/bin/bash

# Todo List App - Development Script
# Start local development server

echo "🚀 Starting Todo List App development server..."

# Check if we're in the right directory
if [[ ! -f "index.html" ]]; then
    echo "❌ Error: Please run this script from the project root directory"
    echo "   Expected to find index.html"
    echo "   Current directory: $(pwd)"
    echo ""
    echo "💡 Try: cd /path/to/todo-list-app && ./scripts/dev.sh"
    exit 1
fi

# Check if npx is available
if ! command -v npx &> /dev/null; then
    echo "❌ Error: npx not found. Please install Node.js"
    echo "   Download from: https://nodejs.org/"
    echo ""
    echo "🔄 Alternative: Use Python server instead:"
    echo "   python3 -m http.server 8000"
    exit 1
fi

# Start live server
echo "📂 Serving from root directory"
echo "🌐 Opening browser at http://localhost:3000"
echo "🔄 Live reload enabled - changes will auto-refresh"
echo "✅ Press Ctrl+C to stop the server"
echo ""
echo "🔗 If browser doesn't open automatically, go to:"
echo "   http://localhost:3000"
echo ""

npx live-server --port=3000 --open=/index.html --wait=500