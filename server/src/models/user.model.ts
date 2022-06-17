import {Schema, model} from "mongoose";
import bcrypt from "bcrypt"
import dayjs from "dayjs";



export interface IUserCredentials {
   name: string,
   email: string,
   password: string,
}

export type UpdateUserOrUsers = IUserCredentials[]

export interface IUserDocument extends IUserCredentials {
   status: string,
   isAdmin: boolean,
   createdAt: string,
   lastLogin: string,
}

const userSchema = new Schema({
   name: {
      type: String,
      required: true
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
   isAdmin: {
      type: Boolean,
      default: false,
   },
   createdAt: {
      type: String,
      default: dayjs().format("DD-MM-YYYY HH:mm"),
      immutable: true
    },
    lastLogin: {
      type: String,
      default: () => dayjs().format("DD-MM-YYYY HH:mm:ss"),
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

const UserModel = model<IUserDocument>("user", userSchema)
export default UserModel;