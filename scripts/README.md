# Project Scripts - Todo List App

This directory contains utility scripts for the Todo List App project:

## Available Scripts

- `setup.sh` - Initial project setup and environment check
- `dev.sh` - Start development environment with live server
- `test.sh` - Run tests and quality checks (future)
- `build.sh` - Build optimized version for production (future)
- `deploy.sh` - Deploy to hosting platform (future)

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

### Make Scripts Executable (if needed)
```bash
chmod +x scripts/*.sh
```

## Development Workflow

1. **First time**: Run `./scripts/setup.sh` for initial setup
2. **Daily dev**: Use `./scripts/dev.sh` for development server
3. **Testing**: Manual testing via browser (automated tests coming in Phase 4)
4. **Deployment**: Manual deployment to hosting platform (scripts coming in Phase 4)

## Requirements

- **Node.js** (recommended) - for live-server with hot reload
- **Python 3** (alternative) - for basic HTTP server
- **Modern browser** - Chrome, Firefox, Safari, or Edge