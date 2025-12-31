// seedCourses.js - Place this in your server folder and run: node seedCourses.js

import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

// Course Schema
const courseSchema = new mongoose.Schema({
  courseTitle: { type: String, required: true },
  courseDescription: { type: String, required: true },
  coursePrice: { type: Number, required: true },
  discount: { type: Number, default: 0 },
  courseThumbnail: { type: String, required: true },
  isPublished: { type: Boolean, default: true }, // ADD THIS LINE
  courseContent: [
    {
      chapterId: String,
      chapterTitle: String,
      chapterOrder: Number,
      chapterContent: [
        {
          lectureId: String,
          lectureTitle: String,
          lectureDuration: Number,
          lectureUrl: String,
          lectureOrder: Number,
          isPreviewFree: { type: Boolean, default: false },
        },
      ],
    },
  ],
  enrolledStudents: [{ type: String }],
  educator: {
    _id: { type: String, required: true },
    name: { type: String, required: true },
    email: { type: String, required: true },
  },
  courseRatings: [
    {
      userId: String,
      rating: { type: Number, min: 1, max: 5 },
    },
  ],
  createdAt: { type: Date, default: Date.now },
});

const Course = mongoose.model("Course", courseSchema);

// Sample courses data
const sampleCourses = [
  {
    courseTitle: "Complete Web Development Bootcamp 2024",
    courseDescription: `<p>Master web development from scratch with HTML, CSS, JavaScript, React, Node.js, and MongoDB. Build 10+ real-world projects including e-commerce sites, social media apps, and REST APIs.</p>
    <p><strong>What you'll learn:</strong></p>
    <ul>
      <li>HTML5, CSS3, and responsive design</li>
      <li>JavaScript ES6+ and DOM manipulation</li>
      <li>React.js with hooks and context</li>
      <li>Node.js and Express backend</li>
      <li>MongoDB database design</li>
      <li>RESTful API development</li>
      <li>Authentication and security</li>
      <li>Deployment to production</li>
    </ul>`,
    coursePrice: 89.99,
    discount: 25,
    courseThumbnail: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800",
    isPublished: true, // ADD THIS
    courseContent: [
      {
        chapterId: "ch1",
        chapterTitle: "Introduction to Web Development",
        chapterOrder: 1,
        chapterContent: [
          {
            lectureId: "lec1",
            lectureTitle: "Welcome to the Course",
            lectureDuration: 10,
            lectureUrl: "hdI2bqOjy3c", // Real intro video
            lectureOrder: 1,
            isPreviewFree: true,
          },
          {
            lectureId: "lec2",
            lectureTitle: "Setting Up Your Development Environment",
            lectureDuration: 20,
            lectureUrl: "https://www.youtube.com/watch?v=PkZNo7MFNFg", // Real setup video
            lectureOrder: 2,
            isPreviewFree: true,
          },
        ],
      },
      {
        chapterId: "ch2",
        chapterTitle: "HTML & CSS Fundamentals",
        chapterOrder: 2,
        chapterContent: [
          {
            lectureId: "lec3",
            lectureTitle: "HTML Basics",
            lectureDuration: 30,
            lectureUrl: "hdI2bqOjy3c",
            lectureOrder: 1,
            isPreviewFree: false,
          },
          {
            lectureId: "lec4",
            lectureTitle: "CSS Styling & Layout",
            lectureDuration: 35,
            lectureUrl: "hdI2bqOjy3c",
            lectureOrder: 2,
            isPreviewFree: false,
          },
        ],
      },
    ],
    enrolledStudents: [],
    courseRatings: [
      { userId: "demo1", rating: 5 },
      { userId: "demo2", rating: 4 },
      { userId: "demo3", rating: 5 },
    ],
  },
  {
    courseTitle: "Python for Data Science & Machine Learning",
    courseDescription: `<p>Learn Python programming and apply it to data analysis, visualization, and machine learning. Master pandas, NumPy, Matplotlib, and scikit-learn.</p>
    <p><strong>Course includes:</strong></p>
    <ul>
      <li>Python fundamentals and OOP</li>
      <li>Data manipulation with pandas</li>
      <li>Data visualization techniques</li>
      <li>Statistical analysis</li>
      <li>Machine learning algorithms</li>
      <li>Real-world projects</li>
    </ul>`,
    coursePrice: 79.99,
    discount: 30,
    courseThumbnail: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=800",
    courseContent: [
      {
        chapterId: "ch1",
        chapterTitle: "Python Basics",
        chapterOrder: 1,
        chapterContent: [
          {
            lectureId: "lec1",
            lectureTitle: "Introduction to Python",
            lectureDuration: 15,
            lectureUrl: "hdI2bqOjy3c",
            lectureOrder: 1,
            isPreviewFree: true,
          },
        ],
      },
    ],
    enrolledStudents: [],
    courseRatings: [
      { userId: "demo1", rating: 5 },
      { userId: "demo2", rating: 5 },
    ],
  },
  {
    courseTitle: "Digital Marketing Masterclass 2024",
    courseDescription: `<p>Complete digital marketing course covering SEO, social media marketing, Google Ads, email marketing, and content strategy.</p>
    <p><strong>You will master:</strong></p>
    <ul>
      <li>SEO optimization techniques</li>
      <li>Social media advertising</li>
      <li>Google Ads campaigns</li>
      <li>Email marketing automation</li>
      <li>Content marketing strategy</li>
      <li>Analytics and conversion optimization</li>
    </ul>`,
    coursePrice: 69.99,
    discount: 20,
    courseThumbnail: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800",
    courseContent: [
      {
        chapterId: "ch1",
        chapterTitle: "Digital Marketing Fundamentals",
        chapterOrder: 1,
        chapterContent: [
          {
            lectureId: "lec1",
            lectureTitle: "What is Digital Marketing?",
            lectureDuration: 12,
            lectureUrl: "hdI2bqOjy3c",
            lectureOrder: 1,
            isPreviewFree: true,
          },
        ],
      },
    ],
    enrolledStudents: [],
    courseRatings: [{ userId: "demo1", rating: 4 }],
  },
  {
    courseTitle: "Graphic Design with Adobe Creative Suite",
    courseDescription: `<p>Master Photoshop, Illustrator, and InDesign. Learn logo design, branding, photo editing, and print design from industry professionals.</p>
    <p><strong>Skills you'll gain:</strong></p>
    <ul>
      <li>Adobe Photoshop mastery</li>
      <li>Vector design in Illustrator</li>
      <li>Layout design in InDesign</li>
      <li>Logo and brand identity</li>
      <li>Photo manipulation</li>
      <li>Print and digital design</li>
    </ul>`,
    coursePrice: 94.99,
    discount: 15,
    courseThumbnail: "https://images.unsplash.com/photo-1626785774625-ddcddc3445e9?w=800",
    courseContent: [
      {
        chapterId: "ch1",
        chapterTitle: "Getting Started with Adobe",
        chapterOrder: 1,
        chapterContent: [
          {
            lectureId: "lec1",
            lectureTitle: "Adobe Creative Cloud Setup",
            lectureDuration: 8,
            lectureUrl: "hdI2bqOjy3c",
            lectureOrder: 1,
            isPreviewFree: true,
          },
        ],
      },
    ],
    enrolledStudents: [],
    courseRatings: [
      { userId: "demo1", rating: 5 },
      { userId: "demo2", rating: 4 },
    ],
  },
  {
    courseTitle: "Mobile App Development with React Native",
    courseDescription: `<p>Build iOS and Android apps with React Native. Learn navigation, state management, API integration, and publish to app stores.</p>
    <p><strong>What's included:</strong></p>
    <ul>
      <li>React Native fundamentals</li>
      <li>Component architecture</li>
      <li>Navigation patterns</li>
      <li>Redux state management</li>
      <li>Firebase integration</li>
      <li>App store deployment</li>
    </ul>`,
    coursePrice: 84.99,
    discount: 35,
    courseThumbnail: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=800",
    courseContent: [
      {
        chapterId: "ch1",
        chapterTitle: "React Native Basics",
        chapterOrder: 1,
        chapterContent: [
          {
            lectureId: "lec1",
            lectureTitle: "Introduction to React Native",
            lectureDuration: 18,
            lectureUrl: "hdI2bqOjy3c",
            lectureOrder: 1,
            isPreviewFree: true,
          },
        ],
      },
    ],
    enrolledStudents: [],
    courseRatings: [{ userId: "demo1", rating: 5 }],
  },
  {
    courseTitle: "Financial Analysis & Investment Banking",
    courseDescription: `<p>Master financial modeling, valuation, investment analysis, and Excel for finance. Perfect for aspiring analysts and investors.</p>
    <p><strong>Learn to:</strong></p>
    <ul>
      <li>Build financial models</li>
      <li>Company valuation techniques</li>
      <li>Financial statement analysis</li>
      <li>Investment strategies</li>
      <li>Excel for finance</li>
      <li>Portfolio management</li>
    </ul>`,
    coursePrice: 99.99,
    discount: 10,
    courseThumbnail: "https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?w=800",
    courseContent: [
      {
        chapterId: "ch1",
        chapterTitle: "Financial Fundamentals",
        chapterOrder: 1,
        chapterContent: [
          {
            lectureId: "lec1",
            lectureTitle: "Understanding Financial Statements",
            lectureDuration: 25,
            lectureUrl: "hdI2bqOjy3c",
            lectureOrder: 1,
            isPreviewFree: true,
          },
        ],
      },
    ],
    enrolledStudents: [],
    courseRatings: [
      { userId: "demo1", rating: 5 },
      { userId: "demo2", rating: 5 },
      { userId: "demo3", rating: 4 },
    ],
  },
];

// Seed function
async function seedCourses() {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("✅ Connected to MongoDB");

    // Get your user ID from Clerk (replace with your actual info)
    const educatorId = "user_37Y8mJxinxctWqxN28MEgW3LUte"; // Get from Clerk or MongoDB users collection
    const educatorName = "Test user";
    const educatorEmail = "test+clerk_test@example.com";

    // Add educator info to each course
    const coursesWithEducator = sampleCourses.map((course) => ({
      ...course,
      isPublished: true,
      educator: {
        _id: educatorId,
        name: educatorName,
        email: educatorEmail,
      },
    }));

    // Clear existing courses (optional - comment out if you want to keep existing)
    // await Course.deleteMany({});
    // console.log("🗑️  Cleared existing courses");

    // Insert courses
    const insertedCourses = await Course.insertMany(coursesWithEducator);
    console.log(`✅ Successfully added ${insertedCourses.length} courses!`);

    insertedCourses.forEach((course, index) => {
      console.log(`${index + 1}. ${course.courseTitle} - $${course.coursePrice}`);
    });

    mongoose.connection.close();
    console.log("\n✅ Database connection closed");
  } catch (error) {
    console.error("❌ Error seeding courses:", error);s
    process.exit(1);
  }
}

// Run the seed function
seedCourses();