import { clerkClient } from "@clerk/express";
import Stripe from "stripe";
import Course from "../models/Course.js";
import { Purchase } from "../models/Purchase.js";
import User from "../models/User.js";
import { CourseProgress } from "../models/CourseProgress.js";

export const syncUserToDatabase = async (req, res) => {
  try {
    const userId = req.auth.userId;
    
    if (!userId) {
      return res.json({ success: false, message: "Not authenticated" });
    }

    // Check if user already exists
    let user = await User.findById(userId);
    
    if (user) {
      return res.json({ 
        success: true, 
        message: "User already synced",
        user 
      });
    }

    // Get user data from Clerk and create in MongoDB
    const clerkUser = await clerkClient.users.getUser(userId);

    const userData = {
      _id: clerkUser.id,
      email: clerkUser.emailAddresses[0].emailAddress,
      name: `${clerkUser.firstName || ''} ${clerkUser.lastName || ''}`.trim() || 'User',
      imageUrl: clerkUser.imageUrl,
    };

    user = await User.create(userData);

    res.json({ 
      success: true, 
      message: "User synced successfully",
      user 
    });

  } catch (error) {
    console.error("Sync error:", error);
    res.json({ success: false, message: error.message });
  }
};

export const updateUserData = async (req, res) => {
  try {
    const userId = req.auth.userId;
    
    if (!userId) {
      return res.json({ success: false, message: "Not authenticated" });
    }

    // Get latest data from Clerk
    const clerkUser = await clerkClient.users.getUser(userId);

    const userData = {
      email: clerkUser.emailAddresses[0].emailAddress,
      name: `${clerkUser.firstName || ''} ${clerkUser.lastName || ''}`.trim() || 'User',
      imageUrl: clerkUser.imageUrl,
    };

    const user = await User.findByIdAndUpdate(userId, userData, { new: true });

    res.json({ 
      success: true, 
      message: "User updated successfully",
      user 
    });

  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};


// Get User Data
export const getUserData = async (req, res) => {
  try {
    const userId = req.auth.userId;
    const user = await User.findById(userId);

    if (!user) {
      return res.json({ success: false, message: "User Not Found" });
    }

    res.json({ success: true, user });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

// Users Enrolled Courses With Lecture Links
export const userEnrolledCourses = async (req, res) => {
  try {
    const userId = req.auth.userId;
    const userData = await User.findById(userId).populate("enrolledCourses");

    res.json({ success: true, enrolledCourses: userData.enrolledCourses });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

// Purchase Course
export const purchaseCourse = async (req, res) => {
  try {
    const { courseId } = req.body;
    const { origin } = req.headers;
    const userId = req.auth.userId;
    const userData = await User.findById(userId);
    const courseData = await Course.findById(courseId);

    if (!userData || !courseData) {
      return res.json({ success: false, message: "Data Not Found" });
    }

    const purchaseData = {
      courseId: courseData._id,
      userId,
      amount: (
        courseData.coursePrice -
        (courseData.discount * courseData.coursePrice) / 100
      ).toFixed(2),
    };

    const newPurchase = await Purchase.create(purchaseData);

    // Stripe Gateway Initialize
    const stripeInstance = new Stripe(process.env.STRIPE_SECRET_KEY);

    const currency = process.env.CURRENCY.toLowerCase();

    // Creating line items for Stripe
    const line_items = [
      {
        price_data: {
          currency,
          product_data: {
            name: courseData.courseTitle,
          },
          unit_amount: Math.floor(newPurchase.amount) * 100,
        },
        quantity: 1,
      },
    ];

    const session = await stripeInstance.checkout.sessions.create({
      success_url: `${origin}/payment-success?session_id={CHECKOUT_SESSION_ID}&purchase_id=${newPurchase._id.toString()}`, 
      cancel_url: `${origin}/course-list`,
      line_items: line_items,
      mode: "payment",
      metadata: {
        purchaseId: newPurchase._id.toString(),
      },
    });
    
    res.json({ 
      success: true, 
      session_url: session.url,
      purchaseId: newPurchase._id.toString()
    });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

export const completePurchase = async (req, res) => {
  try {
    const { purchaseId, sessionId } = req.body;
    const userId = req.auth.userId;

    if (!purchaseId) {
      return res.json({ success: false, message: "Purchase ID required" });
    }

    // Get purchase data
    const purchaseData = await Purchase.findById(purchaseId);
    
    if (!purchaseData) {
      return res.json({ success: false, message: "Purchase not found" });
    }

    // Verify this is the user's purchase
    if (purchaseData.userId !== userId) {
      return res.json({ success: false, message: "Unauthorized" });
    }

    // If already completed, return success
    if (purchaseData.status === "completed") {
      return res.json({ 
        success: true, 
        message: "Purchase already completed" 
      });
    }

    // Get user and course data
    const userData = await User.findById(purchaseData.userId);
    const courseData = await Course.findById(purchaseData.courseId.toString());

    if (!userData || !courseData) {
      return res.json({ success: false, message: "User or Course not found" });
    }

    // Enroll student in course
    if (!courseData.enrolledStudents.includes(userData._id)) {
      courseData.enrolledStudents.push(userData._id);
      await courseData.save();
    }

    // Add course to user's enrolled courses
    if (!userData.enrolledCourses.includes(courseData._id)) {
      userData.enrolledCourses.push(courseData._id);
      await userData.save();
    }

    // Mark purchase as completed
    purchaseData.status = "completed";
    await purchaseData.save();

    res.json({ 
      success: true, 
      message: "Purchase completed successfully",
      course: courseData
    });

  } catch (error) {
    console.error("Complete purchase error:", error);
    res.json({ success: false, message: error.message });
  }
};




export const checkPurchaseStatus = async (req, res) => {
  try {
    const { purchaseId } = req.body;
    const userId = req.auth.userId;

    const purchase = await Purchase.findById(purchaseId);
    
    if (!purchase) {
      return res.json({ success: false, message: "Purchase not found" });
    }

    if (purchase.userId !== userId) {
      return res.json({ success: false, message: "Unauthorized" });
    }

    res.json({ 
      success: true, 
      status: purchase.status,
      purchase 
    });

  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

// Update User Course Progress
export const updateUserCourseProgress = async (req, res) => {
  try {
    const userId = req.auth.userId;
    const { courseId, lectureId } = req.body;
    const progressData = await CourseProgress.findOne({ userId, courseId });

    if (progressData) {
      if (progressData.lectureCompleted.includes(lectureId)) {
        res.json({ success: true, message: "Lecture Already Completed" });
      }

      progressData.lectureCompleted.push(lectureId);
      await progressData.save();
    } else {
      await CourseProgress.create({
        userId,
        courseId,
        lectureCompleted: [lectureId],
      });
    }

    res.json({ success: true, message: "Progress Updated" });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

// Get User Course Progress
export const getUserCourseProgress = async (req, res) => {
  try {
    const userId = req.auth.userId;
    const { courseId } = req.body;
    const progressData = await CourseProgress.findOne({ userId, courseId });

    res.json({ success: true, progressData });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

// Add User Ratings to Course
export const addUserRating = async (req, res) => {
  const userId = req.auth.userId;
  const { courseId, rating } = req.body;

  if (!courseId || !userId || !rating || rating < 1 || rating > 5) {
    return res.json({ success: false, message: "Invalid Details" });
  }

  try {
    const course = await Course.findById(courseId);

    if (!course) {
      return res.json({ success: false, message: "Course not found" });
    }

    const user = await User.findById(userId);

    if (!user || !user.enrolledCourses.includes(courseId)) {
      return res.json({
        success: false,
        message: "User has not purchased this course.",
      });
    }

    const existingRatingIndex = course.courseRatings.findIndex(
      (r) => r.userId === userId
    );

    if (existingRatingIndex > -1) {
      course.courseRatings[existingRatingIndex].rating = rating;
    } else {
      course.courseRatings.push({ userId, rating });
    }

    await course.save();

    return res.json({ success: true, message: "Rating added" });
  } catch (error) {
    return res.json({ success: false, message: error.message });
  }

};

export const becomeEducator = async (req, res) => {
  try {
    const userId = req.auth.userId;

    if (!userId) {
      return res.json({ success: false, message: "Not authenticated" });
    }

    // Update user's role in Clerk
    await clerkClient.users.updateUser(userId, {
      publicMetadata: {
        role: "educator"
      }
    });

    res.json({ 
      success: true, 
      message: "You are now an educator!" 
    });

  } catch (error) {
    console.error("Become educator error:", error);
    res.json({ success: false, message: error.message });
  }
};












