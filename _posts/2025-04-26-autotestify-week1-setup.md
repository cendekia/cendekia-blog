---
layout: weekly-update
title: "AutoTestify Week 1: Project Setup Complete"
description: "First development update for AutoTestify QA App covering the successful initialization of Next.js frontend and NestJS backend with Docker setup"
date: 2025-04-26 16:33:00 +0800
author: Cendekia
categories: [development, project-update]
tags: [nextjs, nestjs, typescript, docker, postgresql]
project: autotestify-qa-app
post_type: weekly-update
week_number: 1
current_progress: 8
previous_progress: 0
accomplishments:
  - "Initialized Next.js frontend with TypeScript and Tailwind CSS"
  - "Set up NestJS backend project with TypeScript configuration"
  - "Configured Docker environment for PostgreSQL database"
challenges:
  - title: "TypeScript Configuration"
    description: "Needed to ensure consistent TypeScript configuration between frontend and backend"
    solution: "Created separate tsconfig files with shared settings to maintain consistency"
  - title: "Docker Compose File Location"
    description: "Had to determine the optimal location for docker-compose.yml since frontend and backend are separate repositories"
    solution: "Placed docker-compose.yml in the backend directory since the database is primarily used by the backend, allowing each repository to be self-contained and independently deployable"
  - title: "Port Configuration Management"
    description: "Needed a flexible way to configure ports across environments without hardcoding values"
    solution: "Implemented environment variables for port configuration in both projects with sensible defaults (3000 for frontend, 3001 for backend) and updated package.json scripts accordingly"
  - title: "Docker Environment Variables"
    description: "Had to manage environment variables securely between development and Docker environments"
    solution: "Created comprehensive .env template files with documentation and added them to .gitignore"
next_week:
  - "Implement database schema and entity models using TypeORM"
  - "Create initial user authentication module with JWT support"
  - "Begin setting up Slack OAuth integration"
---

## Project Setup and Configuration Progress

The first week of AutoTestify development has been focused on establishing the foundational architecture for our QA checklist application. We've successfully completed all the initial setup tasks that will serve as the backbone for further development.

### Next.js Frontend Setup

First, I set up the Next.js frontend project using the latest version with TypeScript support. The process included:

- Creating a new Next.js project with the official CLI
- Setting up TypeScript configuration
- Installing and configuring Tailwind CSS for styling
- Establishing the basic project structure with proper environment variable management

The frontend is now ready for component development and integration with the backend API.

### NestJS Backend Configuration

For the backend, I've initialized a NestJS application which will provide a robust framework for our API. This setup included:

- Creating a new NestJS project with TypeScript
- Configuring the project structure following NestJS best practices
- Setting up the initial app module and main entry point
- Preparing the environment variable configuration

### PostgreSQL with Docker

To ensure consistent database access across development environments, I've implemented a Docker setup for PostgreSQL:

- Created a docker-compose.yml configuration for PostgreSQL in the backend repository
- Set up initial database schema creation scripts
- Configured environment variables for secure database connections
- Tested the database connection from the NestJS application

I made sure to place the Docker Compose file within the backend repository since the frontend and backend are separate codebases. This approach follows microservices best practices by keeping each repository self-contained and independently deployable.

## Project Structure

### Backend (NestJS)

The backend is organized with a clean, modular structure following NestJS conventions:

```
backend/
├── src/                  # Main application code
│   ├── main.ts           # Application entry point
│   └── app.module.ts     # Root application module
├── test/                 # Test files
├── dist/                 # Compiled output
├── docker-compose.yml    # PostgreSQL Docker configuration
├── env.template          # Environment variables template
└── tsconfig.json         # TypeScript configuration
```

Key configuration files include the `docker-compose.yml` for PostgreSQL setup, environment templates for local development, and TypeScript configuration files that establish consistent coding standards.

### Frontend (Next.js)

The frontend follows Next.js project structure with TypeScript and Tailwind CSS:

```
frontend/
├── src/                  # Application source code
├── public/               # Static assets
├── .next/                # Next.js build output
├── env.local.template    # Environment variables template
├── next.config.ts        # Next.js configuration
├── tailwind.config.js    # Tailwind CSS configuration
└── tsconfig.json         # TypeScript configuration
```

This structure provides a clear separation of concerns with properly configured TypeScript, Tailwind CSS, and environment variable templates for consistent development across environments.

## Port Configuration

Both the frontend and backend applications now use environment variables for port configuration:

- Frontend (Next.js): Configured to use PORT environment variable with a default of 3000
- Backend (NestJS): Set up to use PORT with a fallback to 3001
- Updated package.json scripts to respect these environment variables

This approach provides flexibility for different deployment environments while maintaining sensible defaults for development.

## Next Steps

With the foundational architecture in place, the next phase will focus on implementing the core database schema using TypeORM and beginning work on the authentication system. We'll also start laying the groundwork for the Slack integration that will be a key feature of AutoTestify.

The project is off to a strong start, and we're on track to meet our first milestone by the target date of May 3rd, 2025. 