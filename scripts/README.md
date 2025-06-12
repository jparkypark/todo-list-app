# Project Scripts - Todo List App

This directory contains utility scripts for the Todo List App project:

## Available Scripts

- `setup.sh` - Initial project setup and environment configuration
- `dev.sh` - Start development environment with live server
- `test.sh` - Run tests and quality checks
- `build.sh` - Build optimized version for production
- `deploy.sh` - Deploy to hosting platform

## Usage

Make scripts executable:
```bash
chmod +x scripts/*.sh
```

Run development server:
```bash
./scripts/dev.sh
```

## Development Workflow

1. Run `./scripts/setup.sh` for initial setup
2. Use `./scripts/dev.sh` for daily development
3. Run `./scripts/test.sh` before committing
4. Use `./scripts/build.sh` to prepare for deployment
5. Deploy with `./scripts/deploy.sh`