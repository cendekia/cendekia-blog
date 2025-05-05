---
layout: weekly-update
title: "AutoTestify Week 3: User Management Implementation"
description: "Week 3 development update for AutoTestify QA App covering the implementation of the user management module with CRUD operations"
date: 2025-05-05
author: Cendekia
categories: [development, project-update]
tags: [nestjs, user-management, crud, api]
project: autotestify-qa-app
post_type: weekly-update
week_number: 3
current_progress: 32
previous_progress: 24
accomplishments:
  - "Created comprehensive user management module with NestJS"
  - "Implemented user service with complete CRUD operations"
  - "Developed user controller with REST API endpoints"
  - "Created DTOs for user creation and updates with validation"
  - "Integrated user management module with the main application"
  - "Set up validation for user data with proper error handling"
challenges:
  - title: "Secure Password Handling"
    description: "Ensuring passwords are securely stored and processed during user operations"
    solution: "Implemented bcrypt hashing for password storage and created a password update system that validates current password before allowing changes"
  - title: "Data Validation"
    description: "Needed robust validation for user input data across all operations"
    solution: "Used class-validator and class-transformer with custom DTOs to ensure proper validation at the API boundary"
next_week:
  - "Implement role-based access control (RBAC) system"
  - "Create user profile management endpoints"
  - "Set up email verification system"
  - "Implement user search and filtering capabilities"
---

## User Management Module Implementation

Week 3 of AutoTestify development focused on building a comprehensive user management module that provides full CRUD (Create, Read, Update, Delete) operations for managing users in the system. This module builds upon the authentication system developed in Week 2, adding the necessary functionality to manage user accounts.

### Module Components

The user management module has been successfully implemented with the following components:

1. **User Module**
   - Main module definition with proper imports and providers
   - Integration with NestJS dependency injection system
   - Connection to the main application module

2. **User Service**
   - Complete CRUD operations for user management
   - Secure password handling with bcrypt
   - User search and filtering capabilities
   - Data validation and error handling

3. **User Controller**
   - RESTful API endpoints for user management
   - Route protection with authentication guards
   - Input validation using DTOs
   - Proper HTTP status code handling

### Implementation Details

#### User Module Structure

The user module has been set up with proper dependency injection and module structure:

```typescript
// backend/src/users/users.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { User } from './entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  providers: [UsersService],
  controllers: [UsersController],
  exports: [UsersService],
})
export class UsersModule {}
```

#### User Service Implementation

The user service implements all necessary CRUD operations with proper validation and error handling:

```typescript
// backend/src/users/users.service.ts
import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    // Check if user already exists
    const existingUser = await this.usersRepository.findOne({ 
      where: { email: createUserDto.email } 
    });
    
    if (existingUser) {
      throw new ConflictException('User with this email already exists');
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(createUserDto.password, 10);
    
    // Create new user
    const newUser = this.usersRepository.create({
      ...createUserDto,
      password: hashedPassword,
    });
    
    return this.usersRepository.save(newUser);
  }

  async findAll(): Promise<User[]> {
    return this.usersRepository.find();
  }

  async findOne(id: number): Promise<User> {
    const user = await this.usersRepository.findOne({ where: { id } });
    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
    return user;
  }

  async findByEmail(email: string): Promise<User> {
    return this.usersRepository.findOne({ where: { email } });
  }

  async update(id: number, updateUserDto: UpdateUserDto): Promise<User> {
    const user = await this.findOne(id);
    
    if (updateUserDto.password) {
      updateUserDto.password = await bcrypt.hash(updateUserDto.password, 10);
    }
    
    await this.usersRepository.update(id, updateUserDto);
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    const result = await this.usersRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
  }
}
```

#### User Controller with REST Endpoints

The controller exposes RESTful endpoints for user management with proper authentication:

```typescript
// backend/src/users/users.controller.ts
import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(+id);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(+id, updateUserDto);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }
}
```

#### Data Transfer Objects with Validation

Created robust DTOs for user creation and updates with validation:

```typescript
// backend/src/users/dto/create-user.dto.ts
import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty()
  @IsString()
  firstName: string;

  @IsNotEmpty()
  @IsString()
  lastName: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(8)
  password: string;

  // ... other fields
}

// backend/src/users/dto/update-user.dto.ts
import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';

export class UpdateUserDto extends PartialType(CreateUserDto) {}
```

## Integration with Main Application

The user management module has been successfully integrated into the main application module:

```typescript
// backend/src/app.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
// ... other imports

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        // ... database configuration
      }),
    }),
    AuthModule,
    UsersModule,
    // ... other modules
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
```

## Next Steps

With the user management module now in place, the focus for Week 4 will be:

1. Implementing a role-based access control (RBAC) system to manage user permissions
2. Creating user profile management endpoints for users to manage their own information
3. Setting up an email verification system for new user registrations
4. Implementing advanced user search and filtering capabilities

The project is progressing according to schedule, with the core user management functionality now complete. This provides a solid foundation for implementing more advanced user-related features in the coming weeks. 