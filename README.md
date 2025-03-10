# Food-e: College Mess Management System

## Overview
Food-e is a comprehensive fullstack application designed to streamline and enhance college mess management. This platform bridges the gap between students and mess administrators by providing an intuitive interface for complaint management, menu viewing, feedback submission, and other mess-related activities.

## Features

### For Students
- **Complaint Management**: Submit and track mess-related complaints
- **Menu Display**: View daily and weekly meal plans
- **Feedback System**: Provide structured meal reviews and suggestions
- **Sick Meal Requests**: Request special meals when unwell with automated notifications to mess managers via Twilio
- **Rating System**: Rate meals to help improve food quality
- **Feast Information**: View upcoming and past feast events

### For Administrators
- **Dashboard**: Comprehensive view of all student activities
- **Complaint Resolution**: Track and resolve student complaints
- **Menu Management**: Upload and update mess menus via Excel files
- **Special Event Creation**: Create and announce feast events
- **Feedback Analysis**: View and analyze student feedback with pagination

## Tech Stack

### Frontend
- **Framework**: React.js with Vite for fast development
- **Styling**: Tailwind CSS for responsive design
- **State Management**: React Context API

### Backend
- **Server**: Express.js
- **Database**: MongoDB with Mongoose ODM
- **Validation**: Joi for data validation and schema definition
- **Cloud Storage**: Cloudinary for storing images and Excel files
- **Messaging**: Twilio API integration for sick meal notifications
- **Error Handling**: Custom error handling middleware

## Project Structure

```
food-e/
├── frontend/
│   ├── node_modules/
│   ├── public/
│   ├── src/
│   │   ├── admin/
│   │   │   ├── components/
│   │   │   ├── layouts/
│   │   │   ├── pages/
│   │   ├── context/
│   │   ├── user/
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   ├── index.css
│   │   ├── menuData.json
│   ├── eslint.config.js
│   ├── index.html
│   ├── package.json
│   ├── package-lock.json
│   ├── postcss.config.js
│   ├── tailwind.config.js
│   ├── vite.config.js
├── backend/
│   ├── node_modules/
│   ├── cloudinary/
│   │   ├── index.js
│   │   ├── uploadMiddleware.js
│   ├── controller/
│   │   ├── admin.js
│   │   ├── user.js
│   ├── models/
│   │   ├── day.js
│   │   ├── feast.js
│   │   ├── items.js
│   │   ├── meal.js
│   │   ├── menu.js
│   │   ├── review.js
│   ├── routes/
│   │   ├── admin.js
│   │   ├── user.js
│   ├── seed/
│   │   ├── daynumber.js
│   │   ├── formatdate.js
│   │   ├── index.js
│   │   ├── seedmenu.json
│   ├── utils/
│   │   ├── expressError.js
│   │   ├── catchAsync.js
│   │   ├── date.js
│   │   ├── parseExcel.js
│   │   ├── validateDateFormat.js
│   ├── index.js
│   ├── joiSchema.js
│   ├── middleware.js
│   ├── package.json
```

## Installation and Setup

### Prerequisites
- Node.js (v14 or later)
- MongoDB
- Cloudinary account
- Twilio account

### Frontend Setup
1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/food-e.git
   ```

2. Navigate to the frontend directory:
   ```bash
   cd food-e/frontend
   ```

3. Install dependencies:
   ```bash
   npm install
   ```

4. Start the development server:
   ```bash
   npm run dev
   ```

### Backend Setup
1. Navigate to the project root directory:
   ```bash
   cd food-e
   ```

2. Install backend dependencies:
   ```bash
   cd backend
   npm install
   ```

3. Create a `.env` file parallel to the backend directory with the following variables:
   ```
   BACKEND_PORT=your_port_number
   MONGODB_URI=your_mongodb_connection_string
   CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
   CLOUDINARY_KEY=your_cloudinary_key
   CLOUDINARY_SECRET=your_cloudinary_secret
   TWILIO_ACCOUNT_SID=your_twilio_account_sid
   TWILIO_AUTH_TOKEN=your_twilio_auth_token
   ADMIN_NUMBER=admin_phone_number
   MANAGER_NUMBER=manager_phone_number
   ```

4. Start the server from the project root directory:
   ```bash
   node backend/index.js
   ```

5. (Optional) Seed the database with initial data:
   ```bash
   node backend/seed/index.js
   ```

## API Endpoints

### Admin Routes
```javascript
// admin.js routes
router.post("/menu", upload, wrapForError(AdminMethods.createMenu))
router.post("/feast", wrapForError(AdminMethods.createFeast))
router.get("/review", wrapForError(AdminMethods.getReview))
```

- `POST /api/admin/menu`: Upload menu data (with Cloudinary file upload)
- `POST /api/admin/feast`: Create a new feast event
- `GET /api/admin/review`: View all student feedback with pagination

### User Routes
```javascript
// user.js routes
router.get("/menu", wrapForError(UserMethods.getMenu))
router.post("/sick", middleware.validateSickMeal, wrapForError(UserMethods.sick))
router.put("/rating/:id", wrapForError(UserMethods.updateRating))
router.put("/feast/rating/:id", wrapForError(UserMethods.updateFeastRating))
router.get("/feast", wrapForError(UserMethods.getFeast))
router.post("/review", upload, wrapForError(UserMethods.addReview))
```

- `GET /api/user/menu`: Retrieve current mess menu
- `POST /api/user/sick`: Request a sick meal (with validation middleware)
- `PUT /api/user/rating/:id`: Update rating for a specific meal
- `PUT /api/user/feast/rating/:id`: Update rating for a specific feast
- `GET /api/user/feast`: Retrieve feast information
- `POST /api/user/review`: Submit feedback with image upload capability

## Running the Application

To run the complete application, you'll need to start both the frontend and backend servers:

1. Start the backend server from the project root:
   ```bash
   node backend/index.js
   ```

2. In a separate terminal, start the frontend development server:
   ```bash
   cd frontend
   npm run dev
   ```

3. Access the application in your browser at the URL provided by the Vite development server (typically http://localhost:5173)

## Key Implementation Details

### Database Models
- **Day**: Represents a day in the menu schedule
- **Feast**: Special meal events information
- **Items**: Individual food items served
- **Meal**: Represents breakfast, lunch, dinner, or snacks
- **Menu**: Weekly or monthly menu structure
- **Review**: User feedback and ratings

### Utility Functions
- **expressError.js**: Custom error handling class
- **catchAsync.js**: Async/await error wrapper
- **date.js**: Date manipulation utilities
- **parseExcel.js**: Excel file parsing for menu uploads
- **validateDateFormat.js**: Validates date formats in requests

### Cloudinary Integration
- **index.js**: Configuration for Cloudinary connection
- **uploadMiddleware.js**: Middleware for handling file uploads

### Twilio Integration
- SMS notifications for sick meal requests sent to food manager
- Contact numbers for administrators and managers configured in environment variables

### Seed Data
- **daynumber.js**: Helper for day number calculations
- **formatdate.js**: Date formatting utilities for seed data
- **index.js**: Main seeding script
- **seedmenu.json**: Initial menu data for database seeding

## Future Enhancements
- **AI-powered meal rating predictions**
- **Automated complaint resolution tracking**
- **Mobile application for Android and iOS**
- **Integration with payment systems for mess fee management**
- **Analytics dashboard for mess administrators**

## Contributors
- Harsh Sinha
- Kartikeya Dimri


