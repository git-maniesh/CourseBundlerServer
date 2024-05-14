import mongoose from "mongoose"

const schema = new mongoose.Schema({

    razorpay_signature:{
        type:String,
        requrired:true,
    },
    razorpay_payment_id:{
        type:String,
        requrired:true,
    },
    razorpay_subscription_id:{
        type:String,
        requrired:true,
    },
    createdAt:{
        type:Date,
        default:Date.now,
    },

})

export const Payment = mongoose.model("Payment",schema)
