# Work Finder - MERN Stack Job Posting Platform
Visit : https://appjob-o3ho.onrender.com/

Work Finder is a full-stack job posting web application where users can register, post jobs, and explore available work opportunities. This project is built using the MERN stack with secure user authentication, media uploads, and a clean user interface.

## Features

- User registration and login with secure authentication (JWT, bcrypt, cookies)
- Create, read, update, and delete (CRUD) job posts
- Upload images and videos with Multer
- Form to submit photo links and job data
- Responsive frontend built with React.js
- RESTful APIs using Express.js
- MongoDB database integration using Mongoose
- Clean UI with proper error handling and validations

## Tech Stack

**Frontend:**
- React.js
- Axios
- React Router DOM
- Tailwind CSS (or any CSS framework used)

**Backend:**
- Node.js
- Express.js
- Mongoose
- Multer (for file uploads)
- bcrypt (for password hashing)
- jsonwebtoken (JWT)
- cookie-parser

Database:
- MongoDB (using Mongoose)
- [Planned for production] MongoDB Atlas

Media Storage:
- Currently: Local storage with Multer
- Planned: Cloud storage (Cloudinary or Firebase)


## Installation & Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-username/work-finder.git
   cd work-finder


# Install client dependencies
cd client
npm install

# Install server dependencies
cd ../server
npm install


MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret



# In one terminal
cd client
npm start

# In another terminal
cd server
nodemon index.js
