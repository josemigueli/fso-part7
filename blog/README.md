# Blog List Application

This repository contains the full-stack **Blog List** application developed as part of the **Full Stack Open** course offered by the University of Helsinki. The application consists of three main components:

1. **Blog List Frontend**: A React-based frontend for managing blogs, users, and authentication.
2. **Blog List Backend**: A Node.js and Express backend that provides a RESTful API for the frontend.
3. **Blog List End-to-End Tests**: Cypress-based end-to-end tests for the application.

The project is organized into three folders: `blog-client`, `blog-server`, and `blog-tests`.

## Table of Contents

- [Blog List Frontend](#blog-list-frontend)

  - [Features](#features)
  - [Technologies Used](#technologies-used)
  - [Installation](#installation)
  - [Scripts](#scripts)
  - [Dependencies](#dependencies)
  - [Components](#components)
  - [Contexts](#contexts)
  - [Hooks](#hooks)
  - [Gallery](#gallery)

- [Blog List Backend](#blog-list-backend)

  - [Features](#features-1)
  - [Technologies Used](#technologies-used-1)
  - [Installation](#installation-1)
  - [API Endpoints](#api-endpoints)
  - [Testing](#testing-1)

- [Blog List End-to-End Tests](#blog-list-end-to-end-tests)

  - [Features](#features-2)
  - [Technologies Used](#technologies-used-2)
  - [Installation](#installation-2)
  - [Test Scenarios](#test-scenarios)

## Blog List Frontend

This is a frontend application for managing and viewing blogs. It is built using React, React Router, and Tailwind CSS for styling. The application allows users to view a list of blogs, create new blogs, like blogs, delete blogs, and add comments to blogs. It also includes user authentication and context management for user and notification states.

### Features

- **Blog Management**: Users can create, view, like, and delete blogs.
- **Commenting**: Users can add comments to blogs.
- **User Authentication**: Users must log in to perform actions like creating blogs or adding comments.
- **Responsive Design**: The application is designed to be responsive and works well on different screen sizes.
- **Notification System**: Users receive notifications for various actions like creating a blog, liking a blog, or adding a comment.

### Technologies Used

- **React**: A JavaScript library for building user interfaces.
- **React Router**: For handling routing within the application.
- **Tailwind CSS**: A utility-first CSS framework for styling.
- **React Query**: For managing server state and data fetching.
- **Axios**: For making HTTP requests to the backend.
- **Vite**: A fast build tool for modern web projects.
- **Vitest**: A testing framework for the application.

### Installation

To get started with the project, follow these steps:

1. **Clone the repository**:

   ```bash
   git clone https://github.com/josemigueli/fso-part7.git
   cd fso-part7/blog/blog-client
   git checkout react-query-context
   ```

2. **Install dependencies**:

   ```bash
   npm install
   ```

3. **Run the development server**:

   ```bash
   npm run dev
   ```

4. **Build the project for production**:

   ```bash
   npm run build
   ```

5. **Run tests**:
   ```bash
   npm run test
   ```

### Scripts

- `dev`: Starts the development server.
- `build`: Builds the project for production.
- `lint`: Runs ESLint to check for code quality issues.
- `preview`: Previews the production build locally.
- `test`: Runs the test suite using Vitest.

### Dependencies

- `@tailwindcss/vite`: Integrates Tailwind CSS with Vite.
- `@tanstack/react-query`: For managing server state and data fetching.
- `axios`: For making HTTP requests.
- `prop-types`: For type-checking props in React components.
- `react`: The core React library.
- `react-dom`: Provides DOM-specific methods for React.
- `react-icons`: Provides a collection of icons for React.
- `react-router-dom`: For handling routing in the application.
- `tailwindcss`: A utility-first CSS framework.

### Components

- **App**: The main component that handles routing and renders other components.
- **BlogsList**: Displays a list of blogs and allows users to create new blogs.
- **BlogView**: Displays detailed information about a single blog, including comments.
- **CreateNewBlog**: A form for creating new blogs.
- **Users**: Displays a list of users and the number of blogs they have created.
- **UsersView**: Displays detailed information about a single user, including their blogs.

### Contexts

- **UserContext**: Manages the authenticated user's state.
- **NotificationContext**: Manages notifications displayed to the user.

### Hooks

- **useField**: A custom hook for managing form fields.
- **useBlogQuery**: A custom hook for managing blog-related queries and mutations.
- **useAddCommentQuery**: A custom hook for managing comment-related queries and mutations.

### Gallery

#### Login

![Login view](blog-client/public/login.png)

#### Home

![Home view](blog-client/public/home.png)

#### New Blog

![New blog](blog-client/public/new-blog.png)

#### Blog

![Blog view](blog-client/public/blog.png)

#### Users

![Users view](blog-client/public/users.png)

#### User

![User view](blog-client/public/user-view.png)

## Blog List Backend

This is the backend part of the Blog List application. It is built using **Node.js**, **Express**, and **MongoDB**, and it provides a RESTful API for managing blogs, users, comments, and authentication.

### Features

- **User Authentication**: Users can log in and receive a JSON Web Token (JWT) for authenticated requests.
- **Blog Management**: Users can create, read, update, and delete blogs.
- **Commenting**: Users can add comments to blogs.
- **User Management**: Users can be created and retrieved, and their associated blogs can be viewed.
- **Testing**: Includes a testing endpoint to reset the database for testing purposes.

### Technologies Used

- **Node.js**: A JavaScript runtime for building server-side applications.
- **Express**: A web framework for Node.js.
- **MongoDB**: A NoSQL database for storing application data.
- **Mongoose**: An ODM (Object Data Modeling) library for MongoDB.
- **JSON Web Tokens (JWT)**: For user authentication and authorization.
- **Bcrypt**: For hashing user passwords.
- **CORS**: Middleware for enabling Cross-Origin Resource Sharing.
- **Dotenv**: For managing environment variables.

### Installation

1. **Clone the repository**:

   ```bash
   git clone https://github.com/josemigueli/fso-part7.git
   cd fso-part7/blog/blog-server
   ```

2. **Install dependencies**:

   ```bash
   npm install
   ```

3. **Set up environment variables**:
   Create a `.env` file in the root directory and add the following variables:

   ```
   MONGODB_URI=your-mongodb-uri
   TEST_MONGODB_URI=your-mongodb-uri-for-tests
   PORT=your-port
   SECRET=your-secret-key

   ```

4. **Start the development server**:

   ```bash
   npm run dev
   ```

5. **Access the API**:
   The API will be running at `http://localhost:3001`.

### API Endpoints

#### Authentication

- **POST /api/login**: Authenticates a user and returns a JWT.

#### Users

- **GET /api/users**: Retrieves a list of all users with their associated blogs.
- **POST /api/users**: Creates a new user.

#### Blogs

- **GET /api/blogs**: Retrieves a list of all blogs.
- **POST /api/blogs**: Creates a new blog (requires JWT).
- **PUT /api/blogs/:id**: Updates a blog (requires JWT).
- **DELETE /api/blogs/:id**: Deletes a blog (requires JWT).

#### Comments

- **GET /api/comments**: Retrieves a list of all comments.
- **POST /api/comments**: Adds a comment to a blog.

#### Testing

- **POST /api/testing/reset**: Resets the database by deleting all blogs and users (for testing purposes).

### Testing

The project includes a testing endpoint to reset the database, which is useful for integration testing. To reset the database, send a POST request to `/api/testing/reset`.

To put the backend in test mode you need to run

```bash
npm run start:test
```

Make sure you've added the MongoDB URI for tests.

## Blog List End-to-End Tests

This repository contains end-to-end (E2E) tests for the **Blog List** application, written using **Cypress**.

### Features

- **Login Tests**: Tests for successful and failed login attempts.
- **Blog Management Tests**: Tests for creating, liking, and deleting blogs.
- **User-Specific Tests**: Ensures that only the creator of a blog can delete it.
- **Sorting Tests**: Verifies that blogs are ordered by the number of likes.

### Technologies Used

- **Cypress**: A JavaScript-based end-to-end testing framework.
- **Node.js**: The runtime environment for running the tests.
- **Express**: The backend server used for the application.

### Installation

1. **Clone the repository**:

   ```bash
   git clone https://github.com/josemigueli/fso-part7.git
   cd fso-part7/blog/blog-tests
   ```

2. **Install dependencies**:

   ```bash
   npm install
   ```

3. **Start the frontend and backend servers**:
   Ensure that both the frontend and backend servers are running. The frontend should be running at `http://localhost:5173`, and the backend at `http://localhost:3001`.

4. **Run the tests**:
   ```bash
   npm run cypress:open
   ```

### Test Scenarios

#### Login Tests

- **Login form is shown**: Verifies that the login form is displayed correctly.
- **Login with correct credentials**: Tests successful login and verifies that the user menu is displayed.
- **Login with wrong credentials**: Tests failed login and verifies that an error message is displayed.

#### Blog Management Tests

- **A blog can be created**: Tests the creation of a new blog and verifies that it appears in the list.
- **User can like a blog**: Tests the like functionality and verifies that the like count is updated.
- **User who created a blog can delete it**: Tests the deletion of a blog and verifies that it is removed from the list.

#### User-Specific Tests

- **Only the creator can see the delete button of a blog**: Ensures that the delete button is only visible to the creator of the blog.

#### Sorting Tests

- **Blogs are ordered by likes**: Verifies that blogs are sorted by the number of likes in descending order.

## License

This project is licensed under the MIT License.
