---
layout: technical-challenge
title: "Technical Challenge: Secure Authentication System"
description: "Implementing a secure JWT-based authentication system with refresh tokens"
date: 2023-02-12
author: Cendekia
categories: [projects, technical]
tags: [javascript, node.js, authentication, security, jwt]
image: /assets/images/posts/technical-challenge-auth.jpg
project: sample-project
post_type: technical-challenge
difficulty: medium
challenge_description: "Creating a secure authentication system that balances security and user experience"
topics: [Authentication, JWT, Security, Node.js, Express]
code_language: javascript
---

## The Challenge

Authentication is a critical part of most web applications, but implementing it securely can be challenging. In the Sample Project, I needed to create an authentication system that:

1. Provides robust security against common attacks
2. Offers a good user experience with persistent sessions
3. Prevents token theft and mitigates the impact if it occurs
4. Maintains statelessness for scalability

## Understanding JWT Authentication

JSON Web Tokens (JWT) are a popular choice for authentication in modern web applications. They allow for stateless authentication, which is great for scalability. However, there are several security considerations that need to be addressed:

### 1. Token Storage

Where and how to store tokens is an ongoing debate:

- **Local Storage**: Convenient but vulnerable to XSS attacks
- **HTTP-only Cookies**: More secure against XSS but vulnerable to CSRF
- **Memory/State**: Secure but lost on page refresh

### 2. Token Lifetime

- Short-lived tokens improve security but worsen user experience
- Long-lived tokens improve user experience but increase the impact of token theft

### 3. Token Refresh Strategy

We need a way to maintain the user's session without requiring frequent logins, while still keeping security high.

## The Solution Approach

After researching various approaches, I decided to implement a "refresh token rotation" strategy:

1. Use short-lived access tokens (15 minutes) for API access
2. Use longer-lived refresh tokens (7 days) to get new access tokens
3. Store access tokens in memory (Redux state)
4. Store refresh tokens in HTTP-only cookies
5. Implement CSRF protection for endpoints that accept the refresh token
6. Rotate refresh tokens on each use (invalidate previous tokens)

## Implementation Details

### 1. Token Generation

First, I created utilities to generate both access and refresh tokens:

```javascript
const jwt = require('jsonwebtoken');
const crypto = require('crypto');

// Generate access token (short-lived)
const generateAccessToken = (userId) => {
  return jwt.sign(
    { userId },
    process.env.JWT_ACCESS_SECRET,
    { expiresIn: '15m' }
  );
};

// Generate refresh token (longer-lived)
const generateRefreshToken = (userId) => {
  // Create a random token ID to allow for revocation
  const jti = crypto.randomBytes(16).toString('hex');
  
  return {
    token: jwt.sign(
      { userId, jti },
      process.env.JWT_REFRESH_SECRET,
      { expiresIn: '7d' }
    ),
    jti
  };
};

module.exports = { generateAccessToken, generateRefreshToken };
```

### 2. Token Storage and Management

I created a schema for storing refresh tokens, allowing for token rotation and revocation:

```javascript
const mongoose = require('mongoose');

const RefreshTokenSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  token: {
    type: String,
    required: true
  },
  jti: {
    type: String,
    required: true
  },
  used: {
    type: Boolean,
    default: false
  },
  createdAt: {
    type: Date,
    default: Date.now,
    expires: '7d' // Automatically delete after 7 days
  }
});

module.exports = mongoose.model('RefreshToken', RefreshTokenSchema);
```

### 3. Login Endpoint

The login endpoint validates credentials and issues both tokens:

```javascript
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    
    // Find user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }
    
    // Verify password
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }
    
    // Generate tokens
    const accessToken = generateAccessToken(user._id);
    const { token: refreshToken, jti } = generateRefreshToken(user._id);
    
    // Store refresh token in database
    await RefreshToken.create({
      userId: user._id,
      token: refreshToken,
      jti
    });
    
    // Set refresh token as HTTP-only cookie
    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
    });
    
    // Return access token and user info
    res.json({
      accessToken,
      user: {
        id: user._id,
        email: user.email,
        username: user.username
      }
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});
```

### 4. Token Refresh Endpoint

This is where the token rotation happens:

```javascript
router.post('/refresh-token', async (req, res) => {
  try {
    // Get refresh token from cookie
    const refreshToken = req.cookies.refreshToken;
    if (!refreshToken) {
      return res.status(401).json({ message: 'Refresh token required' });
    }
    
    // Verify token
    const payload = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET);
    
    // Find token in database
    const storedToken = await RefreshToken.findOne({
      jti: payload.jti,
      used: false
    });
    
    // If token not found or already used, it may be a reuse attempt
    if (!storedToken) {
      // Potential token reuse! Invalidate all user's tokens
      await RefreshToken.updateMany(
        { userId: payload.userId },
        { used: true }
      );
      
      return res.status(401).json({
        message: 'Invalid refresh token',
        tokenReused: true
      });
    }
    
    // Mark current token as used
    storedToken.used = true;
    await storedToken.save();
    
    // Issue new tokens
    const accessToken = generateAccessToken(payload.userId);
    const { token: newRefreshToken, jti } = generateRefreshToken(payload.userId);
    
    // Store new refresh token
    await RefreshToken.create({
      userId: payload.userId,
      token: newRefreshToken,
      jti
    });
    
    // Set new refresh token as cookie
    res.cookie('refreshToken', newRefreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
    });
    
    // Return new access token
    res.json({ accessToken });
  } catch (error) {
    if (error instanceof jwt.TokenExpiredError) {
      res.status(401).json({ message: 'Refresh token expired' });
    } else {
      res.status(401).json({ message: 'Invalid refresh token' });
    }
  }
});
```

## Security Benefits

This approach provides several security benefits:

1. **Short-lived access tokens**: Limits the damage if a token is stolen
2. **HTTP-only cookies**: Protects refresh tokens from JavaScript-based attacks
3. **Token rotation**: Each refresh token can only be used once, preventing replay attacks
4. **Automatic reuse detection**: If a refresh token is used more than once, all tokens for that user are invalidated, forcing a re-login

## Trade-offs and Considerations

While this solution is robust, there are trade-offs to consider:

1. **Complexity**: The implementation is more complex than a simple JWT approach
2. **Database load**: We need to store refresh tokens, making it not purely stateless
3. **CSRF protection**: Still need CSRF protection for the refresh endpoint

## Conclusion

Building a secure authentication system requires balancing security and user experience. This JWT-based approach with token rotation provides a strong security model while maintaining a good user experience. The key insight is that by having two types of tokens with different lifespans and storage mechanisms, we can get the best of both worlds.

For the Sample Project, this authentication system provides a solid foundation that will support all the features we plan to build, while keeping security as a top priority. 