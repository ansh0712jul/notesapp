import ApiError from "../utils/apiError.js";
import ApiResponse from "../utils/apiResponse.js";
import asyncHandler from "../utils/asyncHandler.js";
import User from "../models/user.model.js";
import jwt from  "jsonwebtoken";



// helper function to generate access and refresh token 

export const generateAccessAndRefreshToken = async (userId) =>{
    try {
        const user = await User.findById(userId)

        if(!user){
            throw new ApiError(400 , "user not found");
        }

        const accessToken = user.generateAccessToken();
        const refreshToken = user.generateRefreshToken();

        user.refreshToken = refreshToken;
        await user.save({validateBeforeSave : false});

        return { accessToken , refreshToken } ;
        
    } catch (error) {
        throw new ApiError(400 , error?.message || "something went wrong while generating access and refresh tokens ");
    }
}


// endpoint to register user
export const registerUser = asyncHandler( async(req , res ) =>{

    const { username , email , password } = req.body;

    if(
        [username , email , password].some((value) => value?.trim() === "")
    ){
        throw new ApiError(400 , "all fields are required");
    }

    const existingUser = await User.findOne({
        $or : [{ email } , { username }]
    })

    if(existingUser){
        throw new ApiError(400 , "user already exists");
    }

    const user = await User.create({
        username,
        email,
        password
    })
    await user.save();

    const loggedInUser = await User.findOne(user._id).select("-passwprd -refreshToken");

    if(!loggedInUser){
        throw new ApiError(400 , "user not found");
    }

    return res
    .status(201)
        .json(
            new ApiResponse(201 , 
                {
                    loggedInUser
                },
                "user registerd succesfully"
            )
        )

})


// endpoint to login user

export const loginUser = asyncHandler( async(req , res ) =>{

    const { username , email , password } = req.body;

    if(!username && !email){
        throw new ApiError(400 , "username or email is required");
    }

    const user = await User.findOne({
        $or : [{ email } , { username }]
    })

    if(!user){
        throw new ApiError(400 , "user not found");
    }
    
    const isValidPassword = await user.isPasswordCorrect(password);

    if(!isValidPassword){
        throw new ApiError(400 , "invalid password");
    }

    const { accessToken , refreshToken } = await generateAccessAndRefreshToken(user._id);

    const loggedInUser = await User.findById(user._id).select("-password -refreshToken");

    const options = {
        httpsOnly : true,
        secure : true,
    }

    return res 
    .status(200)
    .cookie("refreshToken" , refreshToken , options)
    .cookie("accessToken" , accessToken , options)
    .json(
        new ApiResponse(
            200,
            {
                user : loggedInUser , accessToken , refreshToken
            },
            "user logged in successfully"
        )
    )
})

// endpoint to logout user

export const logoutUser = asyncHandler( async(req , res ) =>{
    if(!req.user){
        throw new ApiError(400 , "user is not Authenticated");
    }

    await User.findByIdAndUpdate(
        req.user._id,
        {
            $set : {
                refreshToken : undefined
            }
        },
        {new : true} //  returns the updated document, rather than the original one. If set to false, it will return the original document.
    )


    const options = {
        httpsOnly : true,
        secure : true,
    }

    return res
    .status(200)
    .cookie("refreshToken" , "" , options)
    .cookie("accessToken" , "" , options)
    .json(
        new ApiResponse(
            200,
            {},
            "user logged out successfully"
        )
    )

})
// endpoint to referesh access token 

export const refreshAccessToken = asyncHandler( async(req , res) =>{
    const IncomingRefreshToken = req.cookies?.refreshToken || req.headers["authorization"]?.split(" ")[1] || req.body.refreshToken;

    if(!IncomingRefreshToken){
        throw new ApiError(400 , "refresh token is required");
    }

    try {
        const decodedToken = jwt.verify(IncomingRefreshToken, process.env.REFRESH_TOKEN_SECRET);
    
        const user = await User.findById(decodedToken._id).select("-password -refreshToken");
    
        if(!user){
            throw new ApiError(400 , "Invalid Refresh token ");
        }
    
        const { accessToken , refreshToken } = await generateAccessAndRefreshToken(user._id);
    
        const options = {
            httpsOnly : true,
            secure : true,
        }
    
        return res
        .status(200)
        .cookie("refreshToken" , refreshToken , options)
        .cookie("accessToken" , accessToken , options)
        .json(
            new ApiResponse(
                200,
                {
                    accessToken , refreshToken
                },
                "access token refreshed successfully"
            )
        )
    } catch (error) {
        throw new ApiError(400 , error?.message || "something went wrong while refreshing access token ");
    }


})