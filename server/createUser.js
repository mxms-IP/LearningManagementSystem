import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
dotenv.config({ path: resolve(__dirname, '.env') });

import User from './models/User.js';

const createUser = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');

    // Replace these with YOUR actual details
    const userData = {
      _id: 'user_37LF1nvNixwJAH8qsa28x52kqww',  // Get from window.Clerk.user.id
      email: 'oreodcms00@gmail.com',
      name: 'Oreo',
      imageUrl: 'https://via.placeholder.com/150',
      enrolledCourses: []
    };

    await User.create(userData);
    console.log('✅ User created successfully!');
    
    process.exit(0);
  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
};

createUser();