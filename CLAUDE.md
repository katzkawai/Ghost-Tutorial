# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a Ghost CMS installation (v5.126.1) - a professional publishing platform built with Node.js. The codebase follows a modular architecture with clear separation between server, frontend, and services layers.

## Common Development Commands

### Running Ghost
```bash
# Start Ghost in development mode with auto-reload
yarn dev

# Run Ghost without file watching
node index.js
```

### Testing
```bash
# Run unit tests with coverage
yarn test:unit

# Run integration tests
yarn test:integration

# Run end-to-end tests
yarn test:e2e

# Run all tests and linting
yarn test:all

# Run a single test file
yarn test:single path/to/test.js

# Run browser tests (requires playwright setup)
yarn test:browser:setup  # First time only
yarn test:browser
```

### Building and Linting
```bash
# Build all assets (CSS + JS minification)
yarn build:assets

# Build TypeScript files
yarn build:tsc

# Lint all code
yarn lint

# Lint specific areas
yarn lint:server
yarn lint:frontend
yarn lint:shared
yarn lint:test
yarn lint:types
```

## Architecture Overview

### Directory Structure
- `core/` - Main Ghost application code
  - `server/` - Backend API, models, services
  - `frontend/` - Theme rendering, helpers, routing
  - `shared/` - Shared utilities and configuration
- `content/` - User content and configuration
  - `themes/` - Installed themes
  - `data/` - SQLite database (development)
  - `images/`, `files/` - Uploaded media
- `versions/` - Ghost version installations

### Key Components

#### Server Layer (`core/server/`)
- **API Endpoints** (`api/endpoints/`): RESTful resources with standard CRUD operations
- **Models** (`models/`): Bookshelf.js ORM models for database entities
- **Services** (`services/`): Business logic organized by domain
- **Adapters** (`adapters/`): Pluggable components for storage, cache, scheduling

#### Frontend Layer (`core/frontend/`)
- **Theme Engine** (`services/theme-engine/`): Handles theme loading and switching
- **Routing** (`services/routing/`): Dynamic routing system with multiple router types
- **Helpers** (`helpers/`): Handlebars template helpers for rendering
- **Rendering** (`services/rendering/`): Template rendering pipeline

#### Database
- Uses Bookshelf.js (built on Knex.js) for ORM
- SQLite in development, MySQL/PostgreSQL in production
- Migrations managed by knex-migrator
- Schema defined in `core/server/data/schema/`

#### Services Architecture
Services are organized by domain:
- **Core**: Auth, permissions, mail, settings
- **Content**: Posts, pages, themes, custom settings
- **Members**: Subscriptions, tiers, email service
- **Analytics**: Stats, email analytics, attribution

### Boot Process
1. Load configuration from `config.*.json`
2. Initialize database and run migrations
3. Load models and core services
4. Initialize frontend services and themes
5. Mount API and frontend routes
6. Start background jobs and services

### API Structure
- Public API endpoints: `*-public.js` files (no auth required)
- Admin API endpoints: Standard resource files (requires auth)
- Authentication: Session-based for admin, API keys for integrations
- All endpoints follow pipeline pattern with permissions and validation

### Testing Approach
- **Unit tests**: Test individual functions and classes in isolation
- **Integration tests**: Test API endpoints and service interactions
- **E2E tests**: Test full user workflows
- **Browser tests**: Playwright tests for UI functionality

### Development Configuration
- Main config file: `config.development.json`
- Environment: Development mode on `http://localhost:2368`
- Database: SQLite file at `content/data/ghost-local.db`
- Logging: File and stdout logging enabled

### TypeScript Support
- TypeScript files use `.ts` extension
- Type definitions in `@types/` directories
- Build with `yarn build:tsc`
- Type checking integrated into linting

### Important Services
- **Email Service**: Bulk email sending via Mailgun
- **Job Manager**: Background job processing
- **URL Service**: URL generation and routing
- **Settings Cache**: Cached access to blog settings
- **Theme Service**: Theme validation and activation