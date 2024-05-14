import express from "express"
import { isAuthenticated } from "../middlewares/aeth.js";
import { buySubsciption, cancelSubscription, getRazorPayKey, paymentVerification } from "../controllers/paymentController.js";



const router = express.Router();
// Buy a Subscription

router.route("/subscribe").get(isAuthenticated,buySubsciption)


// verify payment and save refernce in db
router.route("/paymentverification").post(isAuthenticated,paymentVerification)

// get razorpay key
router.route("/razorpaykey").get(getRazorPayKey)


// cancel subscription 
router.route("/subscribe/cancel").delete(isAuthenticated,cancelSubscription)





export default router;