import mongoose from "mongoose";
// import validator from "validator";
import bcrypt from "bcrypt"
import validatee from "validator"
import jwt from "jsonwebtoken"
import crypto from "crypto"



const schema = new mongoose.Schema({

    // Name
    name: {
        type: String,
        required: [true, "Please Enter Your Name"],

    },
    email: {
        type: String,
        required: [true, "Please Enter Your EMail"],
        unique: true,
        validate: validatee.isEmail,
    },
    password: {
        type: String,
        required: [true, "Please Enter Your password"],
        minLength: [6, "Password must be atleast 6 Characters"],
        select: false,
    },
    role: {
        type: String,
        enum: ["admin", "user"],
        default: "user",
    },
    subscription: {
        id: String,
        status: String,
    },
    avatar: {
        public_id: {
            type: String,
            required: true,
        },
        url: {
            type: String,
            required: true,
        },
    },
    playlist: [
        {
            course: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Course",
            },
            poster: String,
        },
    ],
    createdAt: {
        type: Date,
        default: Date.now,
    },
    resetPasswordToken: String,
    resetPasswordExpire: String,

})

schema.pre("save", async function (next) {
    if (!this.isModified("password")) return next();
    this.password = await bcrypt.hash(this.password, 10)
    next()

})





schema.methods.getJWTToken =   function () {
    return  jwt.sign({ _id: this._id }, process.env.JWT_SECRET, {
        expiresIn: "15d",

    })
}
schema.methods.comparePassword = async function (password) {
    // console.log(this.password)
    return await bcrypt.compare(password,this.password)
};
schema.methods.getResetToken = function(){

    const resetToken = crypto.randomBytes(20).toString("hex");
   this.resetPasswordToken =  crypto.createHash("sha256").update(resetToken).digest("hex");
   this.resetPasswordExpire = Date.now() + 15 * 60 * 1000;


    return resetToken;
}



export const User = mongoose.model("User", schema)

// mongo4u

// MONGO_URI = mongodb+srv://maniesh:@courebundler.qpiovi7.mongodb.net/?retryWrites=true&w=majority&appName=CoureBundler