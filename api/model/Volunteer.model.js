import mongoose from "mongoose";


const volunteerSchema = new mongoose.Schema({
  _id:Number,
  name:{
    type:String,
    uppercase:true,
    required: [true, "name is required"]
  },
  email: {
    type: String,
    required: [true, "email is required"],
    lowercase: true,
    trim: true
  },
  message: {
    type: String,
    required: [true, "message is required"],
    trim: true
  },
  info: {
    type: String,
    default: ""
  },
 
});


// Export the model
const VolunteerModel = mongoose.model("Volunteer", volunteerSchema);
export default VolunteerModel;
