import {Schema, model, Types, Model} from "mongoose";
import bcrypt from "bcrypt"
import dayjs from "dayjs";

export interface IUserCredentials {
   name: string,
   email: string,
   password: string,
}

export interface IUserDocument extends IUserCredentials {
   _id: Types.ObjectId,
   status: string,
   role: string,
   createdAt: string,
   lastLogin: string,
}

export interface IUserMethods {
   comparePasswords(plaintextPassword: string): Promise<boolean>,
   updateLastLogin(email: string): Promise<boolean>
}

export type UserModel = Model<IUserDocument, {}, IUserMethods>

const userSchema = new Schema<IUserDocument>({
   name: {
      type: String,
      required: true,
      unique: true
   },
   email: {
      type: String,
      required: true,
      unique: true
   },
   password: {
      type: String,
      required: true
   },
   status: {
      type: String,
      default: "active"
   },
   role: {
      type: String,
      default: "user",
   },
   createdAt: {
      type: String,
      default: dayjs().format("DD-MM-YYYY HH:mm:ss"),
      immutable: true
    },
    lastLogin: {
      type: String,
      default: dayjs().format("DD-MM-YYYY HH:mm:ss"),
    },
})

userSchema.pre("save", async function(next){
   if(!this.isModified("password")) return next()
   const salt = await bcrypt.genSalt(12);
   const hashedPassword = await bcrypt.hash(this.password, salt)
   this.password = hashedPassword
   return next()
})

userSchema.methods.comparePasswords = async function(plaintextPassword: string): Promise<boolean> {
   return await bcrypt.compare(plaintextPassword, this.password).catch(e => false)
}

userSchema.methods.updateLastLogin = async function(email: string): Promise<boolean> {
   await User.findByIdAndUpdate(this._id, {lastLogin: dayjs().format("DD-MM-YYYY HH:mm:ss")})
   return true
}


const User = model<IUserDocument, UserModel>("User", userSchema)
export default User;