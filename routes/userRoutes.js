import express from "express"
import { addToPlaylist, changePassword, 
    deleteMyProfile, 
    deleteUser, 
    forgetPassword, 
    getAllUsers, 
    getMyProfile, 
    login, 
    logout, 
    register, 
    removeFromPlaylist, 
    resetPassword, 
    updateProfile, 
    updateProfilePicture, 
    updateUserRole} from "../controllers/userController.js";
import { authorizeAdmin, isAuthenticated } from "../middlewares/aeth.js";
import singleUpload from "../middlewares/multer.js";

const router = express.Router();





// to register 

router.route("/register").post( singleUpload , register)


// to login
router.route("/login").post(login)


// LOGOUT
router.route("/logout").get(logout)


// Get my Profile

router.route("/me").get(isAuthenticated, getMyProfile)

// DELETE my Profile
router.route("/me").delete(isAuthenticated,deleteMyProfile)


// Change Password
router.route("/changepassword").put(isAuthenticated, changePassword)

// updatePROFILE 
router.route("/updateprofile").put(isAuthenticated, updateProfile)

// updateProfilePicture
router.route("/updateprofilepicture").put(isAuthenticated,singleUpload, updateProfilePicture)



// forgetPassword
router.route("/forgetpassword").post(isAuthenticated, forgetPassword)

// ResetPassword
router.route("/resetpassword/:token").put(isAuthenticated, resetPassword)


// Add to PLAYLIST
router.route("/addtoplaylist").post(isAuthenticated, addToPlaylist)


// REMove from playlist
router.route("/removefromplaylist").delete(isAuthenticated, removeFromPlaylist)


// Admin routes

router.route("/admin/users").get(isAuthenticated,authorizeAdmin,getAllUsers)

router.route("/admin/user/:id")
.put(isAuthenticated,authorizeAdmin,updateUserRole)
.delete(isAuthenticated,authorizeAdmin,deleteUser)



export default router;
