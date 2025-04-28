---
layout: weekly-update
title: "AutoTestify Week 2: Database Schema and TypeORM Integration"
description: "Second development update for AutoTestify QA App covering the creation of TypeORM entity models and database integration setup"
date: 2025-04-28
author: Cendekia
categories: [development, project-update]
tags: [nestjs, typescript, typeorm, postgresql, database-design]
project: autotestify-qa-app
post_type: weekly-update
week_number: 2
current_progress: 16
previous_progress: 8
accomplishments:
  - "Created comprehensive TypeORM entity models for all core system components"
  - "Structured entity relationships with proper one-to-many and many-to-one mappings"
  - "Set up TypeORM integration with NestJS and the PostgreSQL database"
  - "Configured database migration infrastructure for version control"
challenges:
  - title: "Entity Relationship Design"
    description: "Needed to carefully plan relationships between entities to ensure proper data integrity and query efficiency"
    solution: "Created a comprehensive entity relationship diagram before implementation and validated the design against anticipated query patterns"
  - title: "TypeORM Configuration"
    description: "Had to ensure TypeORM was properly integrated with NestJS and PostgreSQL with the correct configuration options"
    solution: "Created a dedicated database.config.ts file with environment-specific connection options and validated with test connections"
  - title: "Migration Strategy"
    description: "Needed a consistent approach for managing database schema changes during development"
    solution: "Set up TypeORM CLI configuration with migration scripts in package.json and created an initial migration file"
next_week:
  - "Implement user authentication module with JWT support"
  - "Begin Slack OAuth integration setup"
  - "Start development of the user management module with CRUD operations"
---

## Week 2: Database Schema and TypeORM Integration

The second week of AutoTestify development focused on establishing the database foundation for our application by implementing TypeORM entity models and setting up the database integration. This work represents a significant step forward in our project timeline as we've completed the core data model that will support all application features.

### Entity Model Implementation

I created a comprehensive set of TypeORM entity models that define the data structure for our application:

#### User Entity

The User entity serves as the foundation for authentication and user management:

```typescript
@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  email: string;

  @Column({ nullable: true, select: false })
  password: string;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column({ default: false })
  isAdmin: boolean;

  @Column({ nullable: true })
  slackId: string;

  // Additional fields and relationships...
}
```

The User entity includes fields for basic profile information, authentication, and Slack integration. It also defines relationships to projects, test cases, test results, and system logs.

#### Project Entity

The Project entity represents QA projects with fields for external integrations:

```typescript
@Entity('projects')
export class Project {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({ type: 'text', nullable: true })
  description: string;

  @Column({ nullable: true })
  trelloIntegrationId: string;

  @Column({ nullable: true })
  slackChannelId: string;

  // Additional fields and relationships...
}
```

This entity includes fields for Trello and Slack integration, allowing for seamless connection with external tools that teams already use.

#### Sprint Entity

The Sprint entity represents development sprints within projects:

```typescript
@Entity('sprints')
export class Sprint {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({ type: 'date' })
  startDate: Date;

  @Column({ type: 'date' })
  endDate: Date;

  @Column({ default: 'planning' })
  status: string; // planning, active, completed

  // Additional fields and relationships...
}
```

This entity tracks sprint timeframes and statuses, with relationships to projects and test cases.

#### TestCase Entity

The TestCase entity is central to our application's functionality:

```typescript
@Entity('test_cases')
export class TestCase {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column({ type: 'text' })
  description: string;

  @Column({ type: 'text' })
  steps: string;

  @Column({ type: 'text' })
  expectedResult: string;

  @Column({ nullable: true })
  priority: string; // high, medium, low

  @Column({ default: 'manual' })
  type: string; // manual, automated, exploratory

  // Additional fields and relationships...
}
```

This comprehensive entity includes fields for all aspects of test case management, including test steps, expected results, priorities, and metadata.

#### TestResult Entity

The TestResult entity tracks test executions and outcomes:

```typescript
@Entity('test_results')
export class TestResult {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  status: string; // passed, failed, blocked, skipped

  @Column({ type: 'text', nullable: true })
  notes: string;

  @Column({ type: 'jsonb', nullable: true })
  screenshots: string[];

  // Additional fields and relationships...
}
```

This entity captures test execution results with support for attaching screenshots, notes, and failure reasons.

#### Log Entity

The Log entity provides system-wide activity tracking:

```typescript
@Entity('logs')
export class Log {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  action: string; // created, updated, deleted, executed

  @Column()
  entityType: string; // user, project, sprint, testCase, testResult

  @Column()
  entityId: string;

  // Additional fields and relationships...
}
```

This entity enables comprehensive activity logging across the application for audit and reporting purposes.

### TypeORM Integration Setup

After completing the entity models, I set up TypeORM integration with our NestJS application:

1. Installed the necessary dependencies:
   - @nestjs/typeorm
   - typeorm
   - pg (PostgreSQL driver)

2. Created a dedicated database configuration file with connection options:

```typescript
// database.config.ts
export const databaseConfig = {
  type: 'postgres',
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT) || 5432,
  username: process.env.DB_USERNAME || 'postgres',
  password: process.env.DB_PASSWORD || 'postgres',
  database: process.env.DB_DATABASE || 'autotestify',
  entities: [__dirname + '/**/*.entity{.ts,.js}'],
  synchronize: process.env.NODE_ENV !== 'production',
  migrations: [__dirname + '/migrations/**/*{.ts,.js}'],
};
```

3. Updated the app module to include TypeORM:

```typescript
@Module({
  imports: [
    TypeOrmModule.forRoot(databaseConfig),
    TypeOrmModule.forFeature([
      User, Project, Sprint, TestCase, TestResult, Log
    ]),
    // Other modules...
  ],
  // Controllers and providers...
})
export class AppModule {}
```

4. Set up migration infrastructure for database version control:
   - Created TypeORM CLI configuration
   - Added migration scripts to package.json
   - Generated an initial migration file

### Next Steps

With the database foundation in place, we're now ready to move to the next phase of development. Week 3 will focus on implementing the authentication module with JWT support and beginning the Slack OAuth integration. We'll also start development of the user management module with CRUD operations.

The project is progressing according to plan, and we've successfully completed another important milestone on the path to our first feature-complete release.