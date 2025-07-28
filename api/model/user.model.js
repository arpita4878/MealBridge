import mongoose from "mongoose";
import mongooseUniqueValidator from "mongoose-unique-validator";

const UserSchema = new mongoose.Schema({
_id:Number,
  name: {
    type: String,
    required: [true, "Name is required"],
    uppercase: true,
    trim: true,
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: true,
    lowercase: true,
    trim: true,
  },
  mobile: {
    type: String,
    maxlength: 10,
    minlength: 10,
    trim: true,
    required: function () {
      // Only required if not a Google user
      return !this.isGoogleUser;
    },
  },
  address: {
    type: String,
    trim: true,
    required: function () {
      return !this.isGoogleUser;
    },
  },
  city: {
    type: String,
    trim: true,
    required: function () {
      return !this.isGoogleUser;
    },
  },
  gender: {
    type: String,
    required: function () {
      return !this.isGoogleUser;
    },
  },
  password: {
    type: String,
    trim: true,
    required: function () {
      return !this.isGoogleUser;
    },
  },
  status: Number,
  info: String,
  role: {
    type: String,
    default: "user",
  },

  isGoogleUser: {
    type: Boolean,
    default: false,
  },

  googleId: {
    type: String,
    unique: true,
    sparse: true, // allows multiple docs without googleId
  },

  avatar: String, // For Google profile picture URL
});

UserSchema.plugin(mongooseUniqueValidator);

const UserSchemaModel = mongoose.model("User_collection", UserSchema);

export default UserSchemaModel;
