import { asyncHandler } from "../utils/asyncHandler.js"
import { ApiError } from "../utils/ApiError.js"
import { ApiResponse } from "../utils/ApiResponse.js"
import { User } from "../models/user.models.js"



const generateAccessAndRefereshTokens = async(userId) =>{
    try {
        const user = await User.findById(userId)
        const accessToken = user.generateAccessToken()
        const refreshToken = user.generateRefreshToken()

        user.refreshToken = refreshToken
        await user.save({ validateBeforeSave: false })

        return {accessToken, refreshToken}


    } catch (error) {
        throw new ApiError(500, "Something went wrong while generating referesh and access token")
    }
}


const registerUser = asyncHandler( async (req, res) => {

    const {name, email, dob, password} = req.body;
    if (!name || !email || !dob || !password) {
        throw new ApiError(400, "All fields are required");
    }

    if (name.trim() === "" || email.trim() === "" || dob.trim() === "" || password.trim() === "") {
        throw new ApiError(400, "All fields must not be empty");
    }

    const existedUser = await User.findOne({email});
    if (existedUser) {
        throw new ApiError(409, "User with this email already exists");
    }

    const newUser = new User({
        name,
        email,
        password,
        dob,
    });

    try {
        await newUser.save();
    } catch (error) {
        throw new ApiError(500, "Failed to register user", error);
    }

    const createdUser = await User.findById(newUser._id).select("-password -refreshToken");
    if (!createdUser) {
        throw new ApiError(500, "Failed to find the newly created user");
    }

    res.status(201).json(new ApiResponse(201, createdUser, "User registered successfully"));
}
)


const loginUser = asyncHandler (async (req,res) => {
    const {email, password} = req.body
    if (!email) {
        throw new ApiError(400, "Email is required");
    }

    // Find the user by email
    const user = await User.findOne({ email });

    if(!user) throw new ApiError(404, "User does not exist. Please enter a correct email.");
   
    const correctPassword = await user.isPasswordCorrect(password);
    if(!correctPassword) throw new ApiError(401, "Password is incorrect. Please enter the correct password.")
    
    const {accessToken, refreshToken} = await generateAccessAndRefereshTokens(user._id);
    
    const loggedInUser = await User.findById(user._id).select("-password -refreshToken")
    const option = {
        httpOnly: true,
        secure: true,
        sameSite: 'None'
    }

    return res.status(200)
    .cookie("accessToken", accessToken, option)
    .cookie("refreshToken", refreshToken, option)
    .json(
        new ApiResponse (
            200,
            {
                user: loggedInUser, accessToken, refreshToken
            },
            "User logged in Successfully"
        )
    )
    
})

const isAuthorized = asyncHandler(async (req, res) => {
    const user = req.user;

    if(!user) {
        return res.status(400).json(
        new ApiResponse(
        400, 
        "Unauthorized request"
        )
    )
}

    return res.status(200).json(
        new ApiResponse(
            200,
            "Authorized User"
        )
    )
})


export {
    registerUser,
    loginUser,
    isAuthorized
}
