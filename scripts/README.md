# Project Scripts - Todo List App

This directory contains utility scripts for the Todo List App project:

## Available Scripts

- `setup.sh` - Initial project setup and environment check
- `dev.sh` - Start development environment with live server
- `build.sh` - Build optimized version for production
- `deploy.sh` - Deploy to hosting platform (GitHub Pages, Netlify, Vercel, etc.)
- `performance.sh` - Analyze app performance and optimization
- `test.sh` - Run tests and quality checks (future enhancement)

## Usage

### First Time Setup
```bash
./scripts/setup.sh
```
This will:
- Make all scripts executable
- Check for Node.js and Python
- Display setup instructions

### Daily Development
```bash
./scripts/dev.sh
```
This will:
- Start development server on http://localhost:3000
- Open browser automatically
- Enable live reload for file changes

### Production Build
```bash
./scripts/build.sh
```
This will:
- Create optimized production build in `dist/` directory
- Use minified assets if available
- Prepare files for deployment

### Deployment
```bash
./scripts/deploy.sh
```
This will:
- Guide you through deployment to various platforms
- Support GitHub Pages, Netlify, Vercel, Surge, Firebase
- Provide platform-specific instructions

### Performance Analysis
```bash
./scripts/performance.sh
```
This will:
- Analyze file sizes and optimization opportunities
- Provide performance recommendations
- Show estimated load times and metrics

### Make Scripts Executable (if needed)
```bash
chmod +x scripts/*.sh
```

## Development Workflow

1. **First time**: Run `./scripts/setup.sh` for initial setup
2. **Daily dev**: Use `./scripts/dev.sh` for development server
3. **Testing**: Use `tests/automated-tests.html` and `tests/testing-guide.md`
4. **Production build**: Run `./scripts/build.sh` to create optimized version
5. **Performance check**: Run `./scripts/performance.sh` for optimization analysis
6. **Deployment**: Use `./scripts/deploy.sh` for platform-specific deployment

## Requirements

- **Node.js** (recommended) - for live-server with hot reload
- **Python 3** (alternative) - for basic HTTP server
- **Modern browser** - Chrome, Firefox, Safari, or Edge