import mongoose, {Schema} from "mongoose"
import jwt from "jsonwebtoken" // generate refresh and access token
import bcrypt from "bcrypt"  // to encrypt the password


const userSchema = new Schema(
    {
        
        email: {
            type: String,
            require: true,
            unique: true,
            lowercase: true,
            trim: true
        },
        
        name: {
            type: String,
            require: true,
            trim: true,
            index: true
        },
        password : {
            type: String,
            required: [true, 'Password is required']
        },

        dob :{
            type: String,
            require: [true, 'Date of Birth is Required']
        },
        refreshToken: {
            type: String
        },
         
    },
    {
        timestamps: true
    }
)

userSchema.pre("save", async function (next) {
     if(!this.isModified("password")) return next(); 

    this.password = await bcrypt.hash(this.password, 10);
    next()
}
)

userSchema.methods.isPasswordCorrect = async function (password) {
    return await bcrypt.compare(password, this.password)
}

userSchema.methods.generateAccessToken = function() {
    return jwt.sign(
        {
            _id: this._id,
            email: this.email,
            fullname: this.fullname,
            dob: this.dob
        },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn: process.env.ACCESS_TOKEN_EXPIRY
        }
    )
}

userSchema.methods.generateRefreshToken = function(){
    return jwt.sign(
        {
            _id: this._id, 
             
        },
        process.env.REFRESH_TOKEN_SECRET,
        {
            expiresIn: process.env.REFRESH_TOKEN_EXPIRY
        }
    )
}
export const User = mongoose.model("User", userSchema);
