

# ReadmeMaker

Welcome to **ReadmeMaker** – a platform to create, publish, and explore custom README files! Built with **React** on the frontend, **Node.js** and **Express** on the backend, and **MongoDB** for data storage, this application allows users to create READMEs using a drag-and-drop interface, search and use templates, like and unlike READMEs, and follow other users.

## Table of Contents

- [About](#about)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
- [Screenshots](#screenshots)
- [API Documentation](#api-documentation)
- [Contributing](#contributing)
- [License](#license)

## About

**ReadmeMaker** is a platform designed to simplify the process of creating, sharing, and discovering README files. Whether you're starting a new project or updating an existing one, this tool allows you to quickly draft READMEs using drag-and-drop components, explore a variety of templates, and interact with a community of users by following others, liking their content, and more.

## Features

### User Features

- **Create READMEs**: Design your README files using a drag-and-drop interface with various components and templates.
- **Publish and Share**: READMEs can be published to the platform and shared with other users.
- **Explore Templates**: Search for templates and customize them for personal use.
- **Like/Unlike READMEs**: Interact with other READMEs by liking or unliking them.
- **Follow Users**: Follow other users and view their published READMEs.
- **Followers List**: Check who follows you and view a list of users you're following.

### Admin Features

- **User Management**: Admins can manage user accounts, moderate content, and ensure community guidelines are followed.
- **Template and Component Library**: Manage the library of available templates and components for users to choose from.

## Tech Stack

### Frontend

- **React**: The primary framework for building the user interface.
- **Chakra UI**: Used for pre-built React components and responsive styling.
- **Axios**: For making HTTP requests to the backend.

### Backend

- **Node.js**: Runtime environment for server-side development.
- **Express**: Web application framework for handling routing and middleware.
- **MongoDB**: NoSQL database for storing user data, READMEs, templates, and interactions.

## Getting Started

### Prerequisites

Make sure you have the following installed:

- **Node.js** (v14 or above)
- **MongoDB** (local or cloud instance)
- **npm** or **yarn** for package management

### Installation

1. **Clone the repository:**

   ```bash
   https://github.com/razzivofficial/ReadMeMaker.git
   cd readmemaker
   ```

2. **Install frontend dependencies:**

   ```bash
   cd client
   npm install
   ```

3. **Install backend dependencies:**

   ```bash
   cd ../server
   npm install
   ```

4. **Set up environment variables:**

   Create a `.env` file in the `server` directory and add the following:

   ```env
   MONGODB_URI=<your_mongodb_uri>
   PORT=5000
   JWT_SECRET=<your_jwt_secret>
   ```

5. **Run the application:**

   - In the **server** directory, start the backend server:

     ```bash
     npm start
     ```

   - In the **client** directory, start the React application:

     ```bash
     npm start
     ```

6. **Access the application:**

   Navigate to `http://localhost:3000` in your browser to start using ReadmeMaker.

## Screenshots



## API Documentation

For a detailed overview of the API endpoints, please visit the [API Documentation](https://readmemaker.com/documentation). This documentation covers routes for user management, README creation, templates, following, and like/unlike functionality.

## Contributing

We welcome contributions! To contribute to ReadmeMaker:

1. Fork the repository.
2. Create a new branch for your feature or bugfix.
3. Commit your changes and open a pull request.
4. Describe your changes in the pull request, and one of the maintainers will review it.

## License

This project is licensed under the GPL License – see the [LICENSE](LICENSE) file for details.

--- 



<div align="center">

[![Collaborators](https://contrib.rocks/image?repo=razzivofficial/ReadMeMaker)](https://github.com/razzivofficial/ReadMeMaker/graphs/contributors)

## Thanks to all Collaborators 💪

Thanks a lot for spending your time helping us grow. Thanks a lot! Keep rocking 🍻
