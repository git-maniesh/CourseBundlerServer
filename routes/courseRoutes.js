import express from "express"
import { addLectures, createCourse, deleteCourse, deleteLecture, getAllCourses, getCourseLectures } from "../controllers/courseController.js";
import singleUpload from "../middlewares/multer.js";
import { authorizeAdmin, isAuthenticated,authorizeSubscriber } from "../middlewares/aeth.js";

const router = express.Router();



// Get all courses without lectures
router.route("/courses").get(getAllCourses)
// create course only admin
router.route("/createcourse").post(isAuthenticated, authorizeAdmin, singleUpload, createCourse)


// add lectures , delete courses and get course detai
router.route("/course/:id")
    .get(isAuthenticated,authorizeSubscriber, getCourseLectures)
    .post(isAuthenticated, authorizeAdmin, singleUpload, addLectures)
    .delete(isAuthenticated, authorizeAdmin, deleteCourse)

// Delete Lecture 
router.route("/deletelecture")
    .delete(isAuthenticated, authorizeAdmin, deleteLecture)

export default router;
