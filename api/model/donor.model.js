import mongoose from "mongoose";
import mongooseUniqueValidator from "mongoose-unique-validator";


const donorSchema = new mongoose.Schema({
  _id:Number,
  donorName:{
    type:String,
    uppercase:true,
  },
  foodItem: {
    type: String,
    required: [true, "Food item name is required"],
    lowercase: true,
    trim: true
  },
  quantity: {
    type: String,
    required: [true, "Quantity is required"],
    trim: true
  },
  expiry: {
    type: String, 
    required: [true, "Expiry date and time is required"],
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
  status: {
    type: Number,
    default: 0 // 0 = pending, 1 = picked 
  },
  info: {
    type: String,
    default: ""
  },
  claimedBy: {
  type: String,
  default: null,
  trim: true
},
claimedContact: {
  type: String,
  default: null,
  trim: true
},
});

// Apply the unique validator plugin if needed
donorSchema.plugin(mongooseUniqueValidator);

// Export the model
const DonorModel = mongoose.model("FoodDonation", donorSchema);
export default DonorModel;
