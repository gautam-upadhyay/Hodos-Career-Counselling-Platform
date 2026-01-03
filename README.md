# HODOS Full-Stack Application

A complete full-stack web application built for HODOS, an early-stage education startup focused on helping students discover career clarity through assessments, guidance, and mentorship.

**This project demonstrates a reliable full-stack foundation suitable for student-focused career guidance platforms like HODOS.**

## 🎯 Project Overview

This application provides a secure, user-friendly platform for students to manage their career development journey. It includes user authentication, personalized dashboards, career action item tracking, and real-time weather data integration for location-based insights.

### Key Features

- **User Authentication**: Secure signup and login with JWT tokens and bcrypt password hashing
- **Protected Dashboard**: Personalized user dashboard with career action items management
- **Tasks CRUD API**: Full Create, Read, Update, Delete functionality for career tasks
- **API Integration**: Real-time weather data fetching with comprehensive error handling
- **Dark Mode**: Toggle between light and dark themes for better user experience
- **Responsive Design**: Mobile-friendly UI built with Tailwind CSS

## 🛠️ Tech Stack

### Frontend
- **React.js** with **Vite** - Fast, modern development environment
- **TypeScript** - Type-safe code for better reliability
- **Tailwind CSS** - Utility-first CSS framework for modern UI
- **React Router** - Client-side routing
- **Axios** - HTTP client for API requests
- **Context API** - State management for authentication

### Backend
- **Node.js** with **Express.js** - Server framework
- **MongoDB** with **Mongoose** - Database and ODM
- **JWT (jsonwebtoken)** - Secure authentication tokens
- **bcryptjs** - Password hashing for security
- **dotenv** - Environment variable management
- **cors** - Cross-origin resource sharing

## 📁 Project Structure

```
hodos-fullstack/
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Navbar.tsx
│   │   │   └── ProtectedRoute.tsx
│   │   ├── context/
│   │   │   └── AuthContext.tsx
│   │   ├── pages/
│   │   │   ├── Signup.tsx
│   │   │   ├── Login.tsx
│   │   │   ├── Dashboard.tsx
│   │   │   └── ApiExplorer.tsx
│   │   ├── App.tsx
│   │   ├── main.tsx
│   │   └── index.css
│   ├── index.html
│   ├── package.json
│   ├── vite.config.ts
│   ├── tailwind.config.js
│   └── tsconfig.json
│
├── backend/
│   ├── controllers/
│   │   ├── authController.js
│   │   └── taskController.js
│   ├── models/
│   │   ├── User.js
│   │   └── Task.js
│   ├── routes/
│   │   ├── auth.js
│   │   └── tasks.js
│   ├── middleware/
│   │   └── auth.js
│   ├── server.js
│   ├── package.json
│   └── .env.example
│
├── README.md
└── Bug_Diagnosis_Report.md
```

## 🚀 Setup Instructions

### Prerequisites

- **Node.js** (v16 or higher)
- **MongoDB** (local installation or MongoDB Atlas account)
- **npm** or **yarn** package manager

### Backend Setup

1. Navigate to the backend directory:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file based on `.env.example`:
```bash
cp .env.example .env
```

4. Configure your environment variables in `.env`:
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/hodos
JWT_SECRET=your_secure_secret_key_here
NODE_ENV=development
```

5. Ensure MongoDB is running (if using local MongoDB):
```bash
# For macOS with Homebrew
brew services start mongodb-community

# For Windows (in MongoDB installation directory)
mongod

# For Linux
sudo systemctl start mongod
```

6. Start the backend server:
```bash
npm run dev
```

The backend will run on `http://localhost:5000`

### Frontend Setup

1. Navigate to the frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

The frontend will run on `http://localhost:3000`

### Access the Application

Open your browser and navigate to `http://localhost:3000`

## 📚 API Endpoints

### Authentication Routes

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/api/auth/signup` | Register new user | No |
| POST | `/api/auth/login` | Login user | No |
| GET | `/api/auth/me` | Get current user | Yes |

**Signup Request:**
```json
{
  "username": "johndoe",
  "email": "john@example.com",
  "password": "password123"
}
```

**Login Request:**
```json
{
  "email": "john@example.com",
  "password": "password123"
}
```

**Response:**
```json
{
  "message": "Login successful",
  "token": "jwt_token_here",
  "user": {
    "id": "user_id",
    "username": "johndoe",
    "email": "john@example.com"
  }
}
```

### Tasks Routes (All Protected)

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/tasks` | Create a new task |
| GET | `/api/tasks` | Get all user tasks |
| PUT | `/api/tasks/:id` | Update a task |
| DELETE | `/api/tasks/:id` | Delete a task |

**Create Task Request:**
```json
{
  "title": "Build Resume",
  "description": "Create a strong resume for software roles"
}
```

**Task Response:**
```json
{
  "message": "Task created successfully",
  "task": {
    "_id": "task_id",
    "title": "Build Resume",
    "description": "Create a strong resume for software roles",
    "userId": "user_id",
    "createdAt": "2025-01-03T10:00:00.000Z"
  }
}
```

## 🔐 Authentication Flow

1. **User Registration**:
   - User submits signup form with username, email, and password
   - Backend validates input and checks for existing users
   - Password is hashed using bcrypt with salt rounds
   - User document is created in MongoDB
   - JWT token is generated and returned

2. **User Login**:
   - User submits login form with email and password
   - Backend finds user by email
   - Password is compared with hashed password using bcrypt
   - JWT token is generated and returned if credentials are valid

3. **Protected Routes**:
   - Client stores JWT token in localStorage
   - Token is sent in Authorization header for protected requests
   - Backend middleware verifies token before processing requests
   - Invalid or expired tokens return 401 Unauthorized

4. **Dashboard Access**:
   - User must be authenticated to access dashboard
   - ProtectedRoute component checks authentication status
   - Unauthenticated users are redirected to login page

## 🌐 API Integration Feature

The application includes a Weather API Explorer that demonstrates robust API integration with comprehensive error handling:

### Features
- Real-time weather data from Open-Meteo API
- Support for major cities worldwide
- Displays temperature, wind speed, and weather conditions
- Dark mode compatible UI

### Error Handling
- **Input Validation**: Checks for empty or invalid city names
- **Network Errors**: Detects connection issues and timeouts
- **Request Timeout**: 10-second timeout for API requests
- **Rate Limiting**: Handles 429 Too Many Requests errors
- **Server Errors**: Graceful handling of 5xx errors
- **Loading States**: Visual feedback during API calls

### Supported Cities
Hyderabad, Mumbai, Delhi, Bangalore, Chennai, Kolkata, Pune, London, New York, Tokyo

## 🎨 UI/UX Features

### Design Philosophy
- **Student-Friendly**: Clean, intuitive interface designed for students
- **Accessibility**: High contrast ratios and readable fonts
- **Minimal Animations**: Focus on functionality and clarity
- **Responsive**: Works seamlessly on desktop, tablet, and mobile

### Dark Mode
- System-wide dark mode toggle
- Persisted preference in localStorage
- Smooth transition between themes
- Optimized color palette for readability

## 🧪 Testing the Application

### Manual Testing Flow

1. **Signup Flow**:
   - Navigate to signup page
   - Fill in username, email, and password
   - Verify successful registration and redirect to dashboard

2. **Login Flow**:
   - Navigate to login page
   - Enter credentials
   - Verify successful login and redirect to dashboard

3. **Dashboard**:
   - Verify welcome message displays: "Welcome, {username} 👋"
   - Verify subtitle: "Here's your personalized dashboard"
   - Create a new career action item
   - Edit an existing task
   - Delete a task

4. **API Explorer**:
   - Navigate to API Explorer
   - Enter a supported city name
   - Verify weather data is displayed
   - Test error scenarios:
     - Empty input
     - Invalid city name
     - Network disconnection (disable internet)

5. **Dark Mode**:
   - Toggle dark mode switch
   - Verify all pages adapt to dark theme
   - Refresh page to verify persistence

## 📊 Database Schema

### User Model
```javascript
{
  username: String (unique, required, min 3 chars),
  email: String (unique, required, valid email),
  password: String (hashed, required, min 6 chars),
  createdAt: Date (auto-generated)
}
```

### Task Model
```javascript
{
  title: String (required),
  description: String (required),
  userId: ObjectId (ref: User, required),
  createdAt: Date (auto-generated)
}
```

## 🔒 Security Features

- **Password Hashing**: All passwords hashed with bcrypt (10 salt rounds)
- **JWT Authentication**: Secure token-based authentication
- **Token Expiration**: Tokens expire after 7 days
- **Protected Routes**: Middleware validates tokens on protected endpoints
- **Input Validation**: Server-side validation for all user inputs
- **CORS Configuration**: Controlled cross-origin access
- **Environment Variables**: Sensitive data stored in .env files

## 🌟 Why This Project Fits HODOS

This application is specifically designed for education and career guidance platforms like HODOS:

1. **Student-Centric Design**: Clean, intuitive UI that students find approachable
2. **Career Action Tracking**: Task management system perfect for career goals
3. **Scalable Architecture**: Built to handle growth from MVP to full platform
4. **Secure & Reliable**: Enterprise-grade authentication and error handling
5. **Modern Tech Stack**: Uses current best practices and popular frameworks
6. **Easy to Extend**: Modular structure ready for assessments, mentorship, etc.

### Future Enhancement Opportunities

- **Career Assessments**: Add personality and skill assessment modules
- **Mentorship Matching**: Connect students with career mentors
- **Progress Tracking**: Visualize career development journey
- **Resource Library**: Curated career resources and guides
- **Real-time Chat**: Communication between students and mentors
- **Analytics Dashboard**: Track user engagement and progress

## 🐛 Bug Diagnosis

See the detailed [Bug Diagnosis Report](./Bug_Diagnosis_Report.md) for comprehensive documentation of API integration challenges, solutions, and reliability improvements.

## 📝 Development Notes

### Code Quality
- TypeScript for type safety
- Consistent naming conventions
- Modular component architecture
- Reusable utility functions
- Comprehensive error handling

### Performance Optimizations
- Vite for fast development builds
- Lazy loading for routes (can be added)
- Optimized bundle sizes
- Efficient database queries
- Request timeout handling

## 🤝 Contributing

This is a screening task project, but contributions and suggestions are welcome for demonstration purposes.

## 📄 License

This project is created as part of a Full Stack Developer screening task for HODOS.

## 📧 Contact

For questions about this implementation, please reach out to the project maintainer.

---

**Built with ❤️ for HODOS - Empowering Students Through Career Clarity**

