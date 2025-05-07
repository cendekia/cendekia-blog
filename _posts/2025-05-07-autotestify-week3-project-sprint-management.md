---
layout: weekly-update
title: "AutoTestify Week 3: Project and Sprint Management Implementation"
description: "Week 3 development update for AutoTestify QA App covering the implementation of project and sprint management module with CRUD operations"
date: 2025-05-07
author: Cendekia
categories: [development, project-update]
tags: [nestjs, project-management, sprint-management, crud, api]
project: autotestify-qa-app
post_type: weekly-update
week_number: 3
current_progress: 35
previous_progress: 32
accomplishments:
  - "Created DTOs for project and sprint operations"
  - "Implemented ProjectsService with methods for project and sprint management" 
  - "Developed ProjectsController with REST endpoints for projects and sprints"
  - "Set up the ProjectsModule to tie everything together"
  - "Integrated the new ProjectsModule with the main application"
  - "Implemented validation for project and sprint data"
challenges:
  - title: "Sprint-Project Relationship"
    description: "Ensuring proper relationship between sprints and projects while maintaining data integrity"
    solution: "Implemented cascade operations and foreign key constraints with TypeORM relations to ensure sprints are always associated with valid projects"
  - title: "Data Validation"
    description: "Needed robust validation for project and sprint input data"
    solution: "Used class-validator with custom DTOs to ensure proper validation at the API boundary"
next_week:
  - "Implement test case management module"
  - "Create test suite relationship structure"
  - "Develop test result tracking system"
  - "Set up test history and versioning"
---

## Project and Sprint Management Module Implementation

Week 3 of AutoTestify development continued with building the project and sprint management module that provides full CRUD (Create, Read, Update, Delete) operations. This module is essential for organizing test cases and managing the QA workflow within the application.

### Module Components

The project and sprint management module has been successfully implemented with the following components:

1. **Project Module**
   - Main module definition with proper imports and providers
   - Integration with NestJS dependency injection system
   - Connection to the main application module

2. **Project Service**
   - Complete CRUD operations for project management
   - Sprint management within projects
   - Data validation and error handling
   - Relationship management between entities

3. **Project Controller**
   - RESTful API endpoints for project and sprint management
   - Route protection with authentication guards
   - Input validation using DTOs
   - Proper HTTP status code handling

### Implementation Details

#### Data Transfer Objects

Created comprehensive DTOs for project and sprint operations:

```typescript
// backend/src/projects/dto/create-project.dto.ts
import { IsNotEmpty, IsString, IsOptional, IsDate, IsArray } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateProjectDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsDate()
  @Type(() => Date)
  @IsOptional()
  startDate?: Date;

  @IsDate()
  @Type(() => Date)
  @IsOptional()
  endDate?: Date;

  @IsArray()
  @IsOptional()
  memberIds?: number[];
}

// backend/src/projects/dto/update-project.dto.ts
import { PartialType } from '@nestjs/mapped-types';
import { CreateProjectDto } from './create-project.dto';

export class UpdateProjectDto extends PartialType(CreateProjectDto) {}

// backend/src/projects/dto/create-sprint.dto.ts
import { IsNotEmpty, IsString, IsOptional, IsDate, IsNumber } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateSprintDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsDate()
  @Type(() => Date)
  @IsOptional()
  startDate?: Date;

  @IsDate()
  @Type(() => Date)
  @IsOptional()
  endDate?: Date;

  @IsNumber()
  @IsNotEmpty()
  projectId: number;
}

// backend/src/projects/dto/update-sprint.dto.ts
import { PartialType } from '@nestjs/mapped-types';
import { CreateSprintDto } from './create-sprint.dto';

export class UpdateSprintDto extends PartialType(CreateSprintDto) {}
```

#### Projects Service Implementation

The projects service implements all necessary CRUD operations for both projects and sprints:

```typescript
// backend/src/projects/projects.service.ts
import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Project } from './entities/project.entity';
import { Sprint } from './entities/sprint.entity';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { CreateSprintDto } from './dto/create-sprint.dto';
import { UpdateSprintDto } from './dto/update-sprint.dto';

@Injectable()
export class ProjectsService {
  constructor(
    @InjectRepository(Project)
    private projectsRepository: Repository<Project>,
    @InjectRepository(Sprint)
    private sprintsRepository: Repository<Sprint>,
  ) {}

  // Project management methods
  async createProject(createProjectDto: CreateProjectDto): Promise<Project> {
    const existingProject = await this.projectsRepository.findOne({ 
      where: { name: createProjectDto.name } 
    });
    
    if (existingProject) {
      throw new ConflictException('Project with this name already exists');
    }
    
    const newProject = this.projectsRepository.create(createProjectDto);
    return this.projectsRepository.save(newProject);
  }

  async findAllProjects(): Promise<Project[]> {
    return this.projectsRepository.find({
      relations: ['sprints'],
    });
  }

  async findProjectById(id: number): Promise<Project> {
    const project = await this.projectsRepository.findOne({ 
      where: { id },
      relations: ['sprints'],
    });
    
    if (!project) {
      throw new NotFoundException(`Project with ID ${id} not found`);
    }
    
    return project;
  }

  async updateProject(id: number, updateProjectDto: UpdateProjectDto): Promise<Project> {
    const project = await this.findProjectById(id);
    await this.projectsRepository.update(id, updateProjectDto);
    return this.findProjectById(id);
  }

  async removeProject(id: number): Promise<void> {
    const result = await this.projectsRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Project with ID ${id} not found`);
    }
  }

  // Sprint management methods
  async createSprint(createSprintDto: CreateSprintDto): Promise<Sprint> {
    // Verify that the project exists
    const project = await this.projectsRepository.findOne({ 
      where: { id: createSprintDto.projectId } 
    });
    
    if (!project) {
      throw new NotFoundException(`Project with ID ${createSprintDto.projectId} not found`);
    }
    
    const newSprint = this.sprintsRepository.create(createSprintDto);
    return this.sprintsRepository.save(newSprint);
  }

  async findAllSprintsByProject(projectId: number): Promise<Sprint[]> {
    const project = await this.findProjectById(projectId);
    return this.sprintsRepository.find({
      where: { projectId },
    });
  }

  async findSprintById(id: number): Promise<Sprint> {
    const sprint = await this.sprintsRepository.findOne({ 
      where: { id },
      relations: ['project'],
    });
    
    if (!sprint) {
      throw new NotFoundException(`Sprint with ID ${id} not found`);
    }
    
    return sprint;
  }

  async updateSprint(id: number, updateSprintDto: UpdateSprintDto): Promise<Sprint> {
    const sprint = await this.findSprintById(id);
    
    // If project ID is changing, verify the new project exists
    if (updateSprintDto.projectId && updateSprintDto.projectId !== sprint.projectId) {
      const project = await this.projectsRepository.findOne({ 
        where: { id: updateSprintDto.projectId } 
      });
      
      if (!project) {
        throw new NotFoundException(`Project with ID ${updateSprintDto.projectId} not found`);
      }
    }
    
    await this.sprintsRepository.update(id, updateSprintDto);
    return this.findSprintById(id);
  }

  async removeSprint(id: number): Promise<void> {
    const result = await this.sprintsRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Sprint with ID ${id} not found`);
    }
  }
}
```

#### Projects Controller Implementation

The controller exposes RESTful endpoints for project and sprint management:

```typescript
// backend/src/projects/projects.controller.ts
import { 
  Controller, 
  Get, 
  Post, 
  Body, 
  Patch, 
  Param, 
  Delete, 
  UseGuards,
  NotFoundException
} from '@nestjs/common';
import { ProjectsService } from './projects.service';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { CreateSprintDto } from './dto/create-sprint.dto';
import { UpdateSprintDto } from './dto/update-sprint.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Controller('projects')
@UseGuards(JwtAuthGuard)
export class ProjectsController {
  constructor(private readonly projectsService: ProjectsService) {}

  // Project endpoints
  @Post()
  createProject(@Body() createProjectDto: CreateProjectDto) {
    return this.projectsService.createProject(createProjectDto);
  }

  @Get()
  findAllProjects() {
    return this.projectsService.findAllProjects();
  }

  @Get(':id')
  findProjectById(@Param('id') id: string) {
    return this.projectsService.findProjectById(+id);
  }

  @Patch(':id')
  updateProject(@Param('id') id: string, @Body() updateProjectDto: UpdateProjectDto) {
    return this.projectsService.updateProject(+id, updateProjectDto);
  }

  @Delete(':id')
  removeProject(@Param('id') id: string) {
    return this.projectsService.removeProject(+id);
  }

  // Sprint endpoints
  @Post('sprint')
  createSprint(@Body() createSprintDto: CreateSprintDto) {
    return this.projectsService.createSprint(createSprintDto);
  }

  @Get(':projectId/sprints')
  findAllSprintsByProject(@Param('projectId') projectId: string) {
    return this.projectsService.findAllSprintsByProject(+projectId);
  }

  @Get('sprint/:id')
  findSprintById(@Param('id') id: string) {
    return this.projectsService.findSprintById(+id);
  }

  @Patch('sprint/:id')
  updateSprint(@Param('id') id: string, @Body() updateSprintDto: UpdateSprintDto) {
    return this.projectsService.updateSprint(+id, updateSprintDto);
  }

  @Delete('sprint/:id')
  removeSprint(@Param('id') id: string) {
    return this.projectsService.removeSprint(+id);
  }
}
```

#### Projects Module Configuration

The module configuration ties everything together:

```typescript
// backend/src/projects/projects.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProjectsService } from './projects.service';
import { ProjectsController } from './projects.controller';
import { Project } from './entities/project.entity';
import { Sprint } from './entities/sprint.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Project, Sprint])],
  providers: [ProjectsService],
  controllers: [ProjectsController],
  exports: [ProjectsService],
})
export class ProjectsModule {}
```

#### Main App Module Integration

The projects module has been integrated into the main application:

```typescript
// backend/src/app.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { ProjectsModule } from './projects/projects.module';
// Other imports...

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get('DB_HOST'),
        port: configService.get('DB_PORT'),
        username: configService.get('DB_USERNAME'),
        password: configService.get('DB_PASSWORD'),
        database: configService.get('DB_DATABASE'),
        entities: [__dirname + '/**/*.entity{.ts,.js}'],
        synchronize: configService.get('NODE_ENV') !== 'production',
      }),
    }),
    AuthModule,
    UsersModule,
    ProjectsModule,
    // Other modules...
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
```

## Next Steps

With the project and sprint management module now implemented, we have a solid foundation for organizing test cases within the AutoTestify application. This completes a significant portion of our Week 3 development goals and brings us closer to having a functional backend for the application.

For Week 4, we will focus on:

1. Implementing the test case management module
2. Creating test suite relationship structures
3. Developing test result tracking system
4. Setting up test history and versioning

These features will build upon the project and sprint management module we've just completed, allowing us to organize test cases within projects and sprints and track their execution over time. 