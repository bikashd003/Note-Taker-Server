# Note Taker Backend

This repository contains the backend code for the Note Taker application.

## Description

This backend server provides RESTful APIs for managing notes in the Note Taker application. It is built with NestJS, a progressive Node.js framework, and uses MongoDB for data storage.

## Technologies Used

- **NestJS**: Progressive Node.js framework for building efficient, reliable, and scalable server-side applications.
- **MongoDB**: NoSQL database for storing notes data.
- **bcrypt**: Library for hashing passwords for user authentication.
- **jsonwebtoken**: Library for generating and verifying JSON Web Tokens (JWT) for user authentication and authorization.


## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/bikashd003/Note-Taker-Server.git
2. Navigate to the project directory:
    ```bash
    cd server
3. Install dependencies:
   ```bash
   npm install
4. Setup the .env file
   ```bash
   PORT=8000
   DB_URI=<add mongo atlas link>
   SECRET_KEY=<your secret key>
5. Run the development server:
    ```bash
    npm run start:dev
6. The server will start running at http://localhost:8000

