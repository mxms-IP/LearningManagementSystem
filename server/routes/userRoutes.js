import express from "express";
import {
  addUserRating,
  getUserCourseProgress,
  getUserData,
  purchaseCourse,
  updateUserCourseProgress,
  userEnrolledCourses,
  syncUserToDatabase,      
  updateUserData,           
  completePurchase,        
  checkPurchaseStatus,
} from "../controllers/userController.js";

const userRouter = express.Router();

userRouter.get("/data", getUserData);
userRouter.get("/enrolled-courses", userEnrolledCourses);
userRouter.post("/purchase", purchaseCourse);


userRouter.post("/update-course-progress", updateUserCourseProgress);
userRouter.post("/get-course-progress", getUserCourseProgress);
userRouter.post("/add-rating", addUserRating);

userRouter.post("/sync", syncUserToDatabase);
userRouter.post("/update", updateUserData);
userRouter.post("/complete-purchase", completePurchase);
userRouter.post("/check-purchase-status", checkPurchaseStatus);

import { becomeEducator } from "../controllers/userController.js";
userRouter.post("/become-educator", becomeEducator);

export default userRouter;
