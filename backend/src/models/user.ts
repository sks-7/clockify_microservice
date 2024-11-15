import mongoose from "mongoose";


interface IUser extends Document {
    _id: string;
    name: string;
    password: string;
    createdAt: Date;
    updatedAt: Date;
  }


const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: [true, "Please Enter Name"],
        unique:true
        
    },
    password: {
        type: String,
        required: [true, "Please Enter Password"]
    }


})


const User = mongoose.model("user",userSchema);


export default User;