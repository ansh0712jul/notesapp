import mongoose from "mongoose"
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"


const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, "username is required"],
        trim:true,
        lowercase: true
    },
    email: {
        type: String,
        required: [true, "email is required"],
        trim : true
    },
    password: {
        type: String,
        required: [true, "password is required"],

    },
    refreshToken :{
        type : String
    }
},{
    timestamps: true
})


//hashed the password before saving 
userSchema.pre("save", async function(next){
    if(!this.isModified("password")) return next();

    this.password = await bcrypt.hash(this.password,10);
})

// custom method to check is password correct
userSchema.methods.isPasswordCorrect = async function(password){
    return await bcrypt.compare(password, this.password);
}

// custom method method to generate Access token
userSchema.methods.generateAccessToken = function(){
    return jwt.sign(
        {
            _id: this._id,
            username: this.username,
        },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn: process.env.ACCESS_TOKEN_EXPIRES
        }
    )
}

// custom method to generate refresh token
userSchema.methods.generateRefreshToken = function(){
    return jwt.sign(
        {
            _id: this._id,
            username: this.username,
        },
        process.env.REFRESH_TOKEN_SECRET,
        {
            expiresIn: process.env.REFRESH_TOKEN_EXPIRES
        }
    )
}

// creating the user model

const User = mongoose.model("User",userSchema);
export default User ;