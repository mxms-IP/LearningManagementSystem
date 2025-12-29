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

    
    const userData = {
      _id: 'user_37Mv3b4JcdiQi8kXzogwDu04VQR',  
      email: 'oreodcms00@gmail.com',
      name: 'Oreodcms',
      imageUrl: 'https://img.clerk.com/eyJ0eXBlIjoicHJveHkiLCJzcmMiOiJodHRwczovL2ltYWdlcy5jbGVyay5kZXYvb2F1dGhfZ29vZ2xlL2ltZ18zN012M2hZSURwWjdVajFzU3lMcmM4N2NFcW0ifQ?width=160',
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