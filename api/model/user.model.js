import mongoose from "mongoose";
import mongooseUniqueValidator from "mongoose-unique-validator";

const UserSchema=mongoose.Schema({
    _id:Number,
    name:{
        type:String,
        required:[true,"name is required"],
        uppercase:true,
        trim:true
    },
    email:{
        type: String,
        required: [true,"Email is required"],
        unique: true,
        lowercase: true,
        trim: true
    },
    mobile: {
        type: String,
        required: [true,"Mobile is required"],
        maxlength: 10,
        minlength:10,
        trim: true
  },
  address: {
        type: String,
        required: [true,"Address is required"],
        trim: true
  },
  city: {
        type: String,
        required: [true,"City is required"],
        trim: true
  },
   gender:{
    type:String,
    required:[true,'gender is required'],
   },
  password: {
    type: String,
    required: [true,"Password is required"], 
    trim: true
  },
  status:Number,
  info:String,
  role:String
});

//apply the uniqueValidator plugin to  userSchema
UserSchema.plugin(mongooseUniqueValidator)

//compile schema to model
const UserSchemaModel=mongoose.model('User_collection',UserSchema)

export default UserSchemaModel;





