---
layout: weekly-update
title: "Week 2 Update: Core Functionality Implementation"
description: "Progress report on implementing the core authentication and CRUD operations"
date: 2023-01-29
author: Cendekia
categories: [projects, weekly-update]
tags: [javascript, node.js, authentication, api]
image: /assets/images/posts/sample-weekly-update.jpg
project: sample-project
post_type: weekly-update
week_number: 2
current_progress: 35
previous_progress: 20
accomplishments:
  - Implemented user authentication system with JWT
  - Created user registration and login endpoints
  - Set up password hashing and validation
  - Designed and implemented database models
  - Added basic CRUD operations for main entities
challenges:
  - title: "JWT Implementation Complexity"
    description: "Handling token refresh and secure storage proved more complex than anticipated."
    solution: "Implemented a rotating refresh token strategy with secure HTTP-only cookies for better security."
  - title: "Database Schema Design"
    description: "Designing relationships between entities in MongoDB required careful consideration."
    solution: "Used embedded documents for one-to-few relationships and references for one-to-many relationships."
next_week:
  - Begin implementing frontend components
  - Connect authentication flow with backend
  - Set up Redux store and reducers
  - Create form validation utilities
---

## Weekly Summary

Week 2 has been focused on building the core backend functionality of the Sample Project. This involved setting up the authentication system, designing the database schema, and implementing the basic CRUD operations that will power the application.

### Authentication System

The authentication system was a key focus this week. I implemented a JWT-based authentication flow with the following features:

- Secure password hashing using bcrypt
- JWT tokens for authentication with short expiry
- Refresh tokens for maintaining sessions
- HTTP-only cookies for secure token storage

Here's a simplified version of the authentication middleware I created:

```javascript
const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
  const token = req.cookies.token || req.headers.authorization?.split(' ')[1];
  
  if (!token) {
    return res.status(401).json({ message: 'Authentication required' });
  }
  
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Invalid or expired token' });
  }
};

module.exports = authMiddleware;
```

### Database Models

I also designed and implemented the database models for the application. Here's the user model as an example:

```javascript
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    minlength: 3
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true
  },
  password: {
    type: String,
    required: true,
    minlength: 6
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Hash password before saving
UserSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  
  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error);
  }
});

// Method to compare passwords
UserSchema.methods.comparePassword = async function(candidatePassword) {
  return bcrypt.compare(candidatePassword, this.password);
};

module.exports = mongoose.model('User', UserSchema);
```

## What I Learned

This week provided valuable learning experiences:

1. **Security Considerations**: Implementing proper authentication requires thinking about various attack vectors and security concerns. Using HTTP-only cookies for storing tokens is more secure than localStorage.

2. **MongoDB Schema Design**: While MongoDB is schemaless, having a well-defined schema using Mongoose helps maintain data integrity and allows for validation.

3. **Error Handling**: Creating a centralized error handling system early on saves time and creates consistency across the API.

## Looking Ahead

For Week 3, I'll shift focus to the frontend development, creating the UI components and connecting them to the backend API. I'm particularly excited about implementing the authentication flow and seeing the application start to take shape as a full-stack solution. 