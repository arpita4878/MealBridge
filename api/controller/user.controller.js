// controllers/user.controller.js
import '../model/connection.js'
import UserSchemaModel from '../model/user.model.js';

// Check if email exists
export const checkEmail = async (req, res) => {
  try {
    const { email } = req.query;

    if (!email) {
      return res.status(400).json({ exists: false, message: "Email is required" });
    }

    const user = await UserSchemaModel.findOne({ email });

    return res.status(200).json({ exists: !!user });
  } catch (err) {
    console.error("Error checking email:", err);
    return res.status(500).json({ exists: false, message: "Internal server error" });
  }
};

// Fetch users
export const fetch = async (req, res) => {
  try {
    const users = await UserSchemaModel.find(req.query);
    if (users.length > 0) {
      return res.status(200).json(users);
    } else {
      return res.status(404).json({ status: "No users found" });
    }
  } catch (err) {
    console.error("Fetch error:", err);
    return res.status(500).json({ status: "Internal server error" });
  }
};

// Delete user
export const deleteUser = async (req, res) => {
  try {
    const query = req.body;

    if (!query) {
      return res.status(400).json({ status: "Enter valid details" });
    }

    const user = await UserSchemaModel.findOne(query);

    if (!user) {
      return res.status(404).json({ status: "User not found" });
    }

    await UserSchemaModel.deleteOne(query);
    return res.status(200).json({ status: "ok" });
  } catch (err) {
    console.error("Delete user error:", err);
    return res.status(500).json({ status: "Server error" });
  }
};

// Update user
export const update = async (req, res) => {
  try {
    const { condition_obj, content_obj } = req.body;

    if (!condition_obj || !content_obj) {
      return res.status(400).json({ status: "Enter valid details" });
    }

    const user = await UserSchemaModel.findOne(condition_obj);

    if (!user) {
      return res.status(404).json({ status: "User not found" });
    }

    await UserSchemaModel.updateOne(condition_obj, { $set: content_obj });
    return res.status(200).json({ status: "ok" });
  } catch (err) {
    console.error("Update user error:", err);
    return res.status(500).json({ status: "Server error" });
  }
};
