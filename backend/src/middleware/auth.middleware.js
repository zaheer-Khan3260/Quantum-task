import jwt from "jsonwebtoken"
import { ApiError } from "../utils/ApiError.js"
import { asyncHandler } from "../utils/asyncHandler.js"
import { ApiResponse } from "../utils/ApiResponse.js"


export const varifyJwt = asyncHandler(async (req, res, next) => {
   try {
    const token =  req.cookies?.accessToken || req.header("Authorization")?.replace("Bearer ", "")
   //  console.log("token in middleware",token);
    if(!token) return res.status(400).json(
      new ApiResponse(
         400,
         "Unauthorized request"
      )
    )
 
    const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    const user = (decodedToken)
    req.user = user;
 
    next()
   } catch (error) {
    throw new ApiError(401, error?.message || "Invalid access token")
   }

})