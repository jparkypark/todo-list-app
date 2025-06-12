#!/bin/bash

# Todo List App - Setup Script
# Initial setup for new users

echo "🔧 Setting up Todo List App for local development..."
echo ""

# Check if we're in the right directory
if [[ ! -f "src/index.html" ]]; then
    echo "❌ Error: Please run this script from the project root directory"
    echo "   Expected to find src/index.html"
    exit 1
fi

# Make scripts executable
echo "🔑 Making scripts executable..."
chmod +x scripts/*.sh
echo "✅ Scripts are now executable"
echo ""

# Check Node.js installation
if command -v node &> /dev/null; then
    NODE_VERSION=$(node --version)
    echo "✅ Node.js detected: $NODE_VERSION"
else
    echo "⚠️  Node.js not found - required for optimal development experience"
    echo "   Download from: https://nodejs.org/"
    echo ""
fi

# Check Python installation
if command -v python3 &> /dev/null; then
    PYTHON_VERSION=$(python3 --version)
    echo "✅ Python detected: $PYTHON_VERSION"
else
    echo "⚠️  Python 3 not found - alternative server option"
fi

echo ""
echo "🎉 Setup complete! You can now:"
echo ""
echo "📋 View documentation:"
echo "   • README.md - Getting started guide"
echo "   • docs/prd.md - Product requirements"
echo "   • docs/tasks.md - Development tasks"
echo ""
echo "🚀 Start development server:"
echo "   ./scripts/dev.sh"
echo ""
echo "🧪 Test the application:"
echo "   http://localhost:3000 (after running dev script)"
echo ""
echo "✨ Happy coding!"