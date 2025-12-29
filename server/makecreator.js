import { Clerk } from '@clerk/clerk-sdk-node';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
dotenv.config({ path: resolve(__dirname, '.env') });

const clerk = Clerk({ secretKey: process.env.CLERK_SECRET_KEY });

async function makeEducator() {
  try {
    const userId = 'user_37Mv3b4JcdiQi8kXzogwDu04VQR';
    await clerk.users.updateUserMetadata(userId, {
      publicMetadata: {
        role: 'educator'
      }
    });

    console.log('✅ Successfully set educator role for user:', userId);
  } catch (error) {
    console.error('❌ Error:', error);
  }
}

makeEducator();