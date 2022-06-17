import {Schema, model, Types} from "mongoose";
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
   isAdmin: boolean,
   createdAt: string,
   lastLogin: string,
   comparePassword: (plaintextPassword: string) => Promise<boolean>
}

export type UpdateUserOrUsers = IUserDocument[]

const userSchema = new Schema({
   name: {
      type: String,
      required: [true, 'Name must be uqniue and cannot be blank'],
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
   isAdmin: {
      type: Boolean,
      default: false,
   },
   createdAt: {
      type: String,
      default: dayjs().format("DD-MM-YYYY HH:mm:ss"),
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

const UserModel = model<IUserDocument>("User", userSchema)
export default UserModel;