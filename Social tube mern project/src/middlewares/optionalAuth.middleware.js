import User from "../models/user.model.js";
import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import jwt from "jsonwebtoken"


const optionalAuth = asyncHandler( async (req, res, next) => {
  try {

    const token = req.cookies?.accessToken || req.header("Authorization")?.replace("Bearer " , "")

    if (!token) return next()

    const decoded = jwt.verify(token,process.env.ACCESS_TOKEN_SECRET)

    const user = await User.findById(decoded?._id).select("-password -refreshToken")

     console.log("\n\n User : \n\n" , user);

     if(!user){
            throw new ApiError(401 , "Invalid Access Token")
        }

    req.user = user

    next()
  } catch {
    next()
  }
}
)
export default optionalAuth