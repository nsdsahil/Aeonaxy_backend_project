# E-Learning Platform Backend API

This project aims to develop a robust backend API for an e-learning platform. The API will facilitate user registration, user profile management, course management, and user enrollment functionalities. It will also implement filtering and pagination to enhance user experience.

## Project Overview

The backend API is developed using Node.js and utilizes MongoDB for data storage. It integrates with neon.tech for database storage and resend.com for handling email communications.
    ## Tech Stack

- **Node.js**: Backend JavaScript runtime environment.
- **Express.js**: Web application framework for Node.js used for building APIs.
- **MongoDB**: NoSQL database used for storing user information, course details, and enrollment data.
- **node mailer**: Used for handling email communications, such as user registration confirmation and course enrollment notifications, with a free tier plan.
- **JWT (JSON Web Tokens)**: Secure authentication mechanism used for authenticating users accessing protected endpoints.
- **Bcrypt**:For creating a strong hashed possword that makes server more secure.

## Features

- **User APIs**:
    - **User Registration**: `POST /api/user/register`
        - Request body should include user details like name, email, and password.
        - Validates email uniqueness and password strength.
        - Returns user data upon successful registration.
    - **User Profile**: 
        - `GET /api/user/:id`: Fetches the user's profile data.
        - `PUT /api/user/profile`: Updates the user's profile information.

- **Course APIs**:
    - **Get Courses**: `GET /api/courses`
        - Supports filtering by category, level, popularity, etc.
        - Implements pagination for efficient handling of large datasets.
    - **CRUD Operations for Superadmin**:
        - `POST /api/courses`: Creates a new course.
        - `GET /api/courses/:id`: Retrieves a specific course.
        - `PUT /api/courses/:id`: Updates an existing course.
        - `DELETE /api/courses/:id`: Deletes a course.

- **User Enrollment APIs**:
    - **Course Enrollment**: 
        - `POST /api/courses/:id/enroll`: Allows users to enroll in courses.
        - Validates enrollment to prevent multiple enrollments in the same course.
    - **View Enrolled Courses**: 
        - `GET /api/courses/enrolled`: Retrieves the courses the user is enrolled in.

- **Filters and Pagination**:
    - Supports various filtering options for the courses API.
    - Implements pagination to limit the number of results returned per request.

- **Database and Email Integration**:
    - Utilizes the free tier of neon.tech database for storing user information, course details, and enrollment data.
    - Integrates with resend.com's free tier for handling email communications, such as user registration confirmation, password reset requests, and course enrollment notifications.

- **Security and Authentication**:
    - Implements secure authentication mechanisms using JWT (JSON Web Tokens) to authenticate users for accessing protected endpoints.
    - Ensures sensitive data, such as passwords, is securely hashed before storage in the database.

- **Error Handling and Logging**:
    - Implements robust error handling mechanisms to provide meaningful error messages to clients.
    - Utilizes logging to track API requests, responses, and any potential errors or exceptions for debugging purposes.

## Installation

1. Clone the repository:
    ```
    git clone 
    ```

2. Install dependencies:
    ```
    cd e-learning-backend
    npm install
    ```

3. Set up environment variables:
    - Create a `.env` file in the root directory.
    - Define environment variables for MongoDB connection URI, JWT secret key, and other configurations.

4. Start the server:
    ```
    npm start
    ```

## API Documentation

API documentation detailing available endpoints, request parameters, and response formats can be found in the `docs` directory.



