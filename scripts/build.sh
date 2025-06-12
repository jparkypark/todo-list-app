#!/bin/bash

# Todo List App - Build Script  
# Creates optimized production build

echo "🏗️  Todo List App - Production Build"
echo "===================================="
echo ""

# Check if we're in the right directory
if [[ ! -f "index.html" ]]; then
    echo "❌ Error: Please run this script from the project root directory"
    exit 1
fi

BUILD_DIR="dist"
echo "📦 Creating production build in '$BUILD_DIR' directory..."

# Clean previous build
if [[ -d "$BUILD_DIR" ]]; then
    rm -rf "$BUILD_DIR"
    echo "🧹 Cleaned previous build"
fi

mkdir "$BUILD_DIR"

# Copy and optimize HTML
echo "📄 Processing HTML..."
cp index.html "$BUILD_DIR/"

# Use minified CSS if available, otherwise copy original
echo "🎨 Processing CSS..."
if [[ -f "styles.min.css" ]]; then
    cp styles.min.css "$BUILD_DIR/styles.css"
    echo "✅ Using minified CSS"
else
    cp styles.css "$BUILD_DIR/"
    echo "⚠️  Using original CSS (consider minifying)"
fi

# Use minified JS if available, otherwise copy original  
echo "⚡ Processing JavaScript..."
if [[ -f "app.min.js" ]]; then
    cp app.min.js "$BUILD_DIR/app.js"
    echo "✅ Using minified JavaScript"
else
    cp app.js "$BUILD_DIR/"
    echo "⚠️  Using original JavaScript (consider minifying)"
fi

# Copy assets if they exist
if [[ -d "assets" ]]; then
    cp -r assets "$BUILD_DIR/"
    echo "📁 Copied assets directory"
fi

# Add cache busting to HTML if needed
# This would require more complex processing, so keeping simple for now

echo ""
echo "📊 Build Summary:"
echo "----------------"

# Calculate sizes
HTML_SIZE=$(wc -c < "$BUILD_DIR/index.html")
CSS_SIZE=$(wc -c < "$BUILD_DIR/styles.css")  
JS_SIZE=$(wc -c < "$BUILD_DIR/app.js")
TOTAL_SIZE=$((HTML_SIZE + CSS_SIZE + JS_SIZE))

echo "HTML: $((HTML_SIZE / 1024))KB"
echo "CSS:  $((CSS_SIZE / 1024))KB"
echo "JS:   $((JS_SIZE / 1024))KB"
echo "Total: $((TOTAL_SIZE / 1024))KB"

echo ""
echo "📋 Build Contents:"
ls -la "$BUILD_DIR"

echo ""
echo "✅ Production build complete!"
echo ""
echo "🚀 Ready to deploy:"
echo "   • Upload contents of '$BUILD_DIR' to your web server"
echo "   • Or use './scripts/deploy.sh' for platform-specific deployment"
echo ""
echo "🌐 Performance Benefits:"
echo "   • Optimized file sizes"
echo "   • Fast loading times"
echo "   • Production-ready structure"