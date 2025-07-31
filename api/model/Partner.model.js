import mongoose from "mongoose";

const PartnerSchema = new mongoose.Schema({
  _id:Number,
  organization:{
    type:String,
     required: [true, "Organization name is required"],
    uppercase:true,
  },
  contactName: {
    type: String,
    required: [true, "Contact name is required"],
    lowercase: true,
    trim: true
  },
   email: {
    type: String,
    required: [true, "email is required"],
    trim: true
  },
  message: {
    type: String, 
    required: [true, "message is required"],
    trim: true
  },
  location: {
    type: String,
    required: [true, "Pickup location is required"],
    trim: true
  },
  contact: {
    type: String,
    required: [true, "Contact number is required"],
    trim: true,
  },
 
  info: {
    type: String,
    default: ""
  },
 
});



// Export the model
const PartnerModel = mongoose.model("Partner", PartnerSchema);
export default PartnerModel;
