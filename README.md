# SkillBridge - Learning Management System

A full-stack Learning Management System (LMS) built with the MERN stack, featuring course management, payment processing, and real-time progress tracking.

[![Live Demo](https://img.shields.io/badge/demo-live-brightgreen)](https://skill-bridge-lms-frontend.vercel.app)


<img src="screenshots/homepage.png" alt="Homepage">



## 🚀 Features

### For Students
- **Course Discovery**: Browse and search courses with advanced filtering
- **Secure Payments**: Integrated Stripe payment processing
- **Progress Tracking**: Track course completion and lecture progress
- **Video Player**: Built-in YouTube video player with chapter navigation
- **Responsive Design**: Fully responsive across all devices
- **User Authentication**: Secure authentication via Clerk

### For Educators
- **Course Creation**: Rich text editor for course descriptions
- **Content Management**: Add chapters and lectures with video URLs
- **Student Analytics**: Track enrollments and earnings
- **Course Editing**: Update course content and pricing
- **Dashboard**: Overview of courses and student engagement

## 🛠️ Tech Stack

### Frontend
- **React 18** - UI library
- **React Router v6** - Client-side routing
- **Tailwind CSS** - Utility-first CSS framework
- **Axios** - HTTP client
- **Quill** - Rich text editor
- **React YouTube** - Video player integration
- **React Toastify** - Toast notifications

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - NoSQL database
- **Mongoose** - ODM for MongoDB

### Services & APIs
- **Clerk** - Authentication and user management
- **Stripe** - Payment processing
- **Cloudinary** - Image/video storage
- **MongoDB Atlas** - Cloud database

### Deployment
- **Vercel** - Frontend and backend hosting
- **GitHub** - Version control

## 📦 Installation

### Prerequisites
- Node.js (v16 or higher)
- MongoDB Atlas account
- Clerk account
- Stripe account
- Cloudinary account

### Clone Repository
```bash
git clone https://github.com/yourusername/skillbridge-lms.git
cd skillbridge-lms
```

### Backend Setup
```bash
cd server
npm install

# Create .env file
cat > .env << EOF
MONGODB_URI=your_mongodb_connection_string
CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
CLERK_SECRET_KEY=your_clerk_secret_key
STRIPE_SECRET_KEY=your_stripe_secret_key
CLOUDINARY_NAME=your_cloudinary_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
CURRENCY=USD
PORT=5000
EOF

# Start server
npm start
```

### Frontend Setup
```bash
cd client
npm install

# Create .env file
cat > .env << EOF
VITE_BACKEND_URL=http://localhost:5000
VITE_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
VITE_CURRENCY=$
EOF

# Start development server
npm run dev
```

## 🌐 Deployment

### Backend (Vercel)
1. Push code to GitHub
2. Import project to Vercel
3. Set Root Directory to `server`
4. Add environment variables
5. Deploy

### Frontend (Vercel)
1. Import same repository
2. Set Root Directory to `client`
3. Set Framework Preset to `Vite`
4. Add environment variables
5. Deploy


## 🔐 Environment Variables

### Backend
```
MONGODB_URI=            # MongoDB connection string
CLERK_PUBLISHABLE_KEY=  # Clerk public key
CLERK_SECRET_KEY=       # Clerk secret key
STRIPE_SECRET_KEY=      # Stripe secret key
CLOUDINARY_NAME=        # Cloudinary cloud name
CLOUDINARY_API_KEY=     # Cloudinary API key
CLOUDINARY_API_SECRET=  # Cloudinary API secret
CURRENCY=USD            # Default currency
PORT=5000              # Server port
```

### Frontend
```
VITE_BACKEND_URL=              # Backend API URL
VITE_CLERK_PUBLISHABLE_KEY=    # Clerk public key
VITE_CURRENCY=$                # Currency symbol
```

## 🎨 Key Features Implementation

### Payment Flow
1. User selects course and clicks "Enroll Now"
2. Stripe checkout session created
3. User completes payment
4. Webhook verifies payment
5. User enrolled in course
6. Redirect to course player

### Course Progress Tracking
- Lecture completion marked via API
- Progress percentage calculated in real-time
- Completed courses tracked separately
- Resume from last watched lecture

### Authentication Flow
- Clerk handles all authentication
- JWT tokens for API authorization
- Protected routes on frontend and backend
- User data synced between Clerk and MongoDB

## 📱 Responsive Design

- Mobile-first approach
- Breakpoints: sm (640px), md (768px), lg (1024px), xl (1280px)
- Touch-friendly interface
- Optimized images and lazy loading

## 🧪 Testing

```bash
# Backend tests
cd server
npm test

# Frontend tests
cd client
npm test
```

## 📈 Performance Optimizations

- Image optimization via Cloudinary
- Lazy loading for course cards
- Debounced search functionality
- Efficient MongoDB queries with indexes
- Code splitting in React

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request



## 👨‍💻 Developer

**Your Name**
- Email: mxmsdcms203@gmail.com

## 🙏 Acknowledgments

- [React Documentation](https://react.dev)
- [MongoDB Documentation](https://docs.mongodb.com)
- [Stripe API](https://stripe.com/docs)
- [Clerk Documentation](https://clerk.com/docs)
- [Tailwind CSS](https://tailwindcss.com)


---

⭐ If you found this project helpful, please consider giving it a star!