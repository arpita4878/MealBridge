// controllers/auth.controller.js
import '../model/connection.js'
import jwt from 'jsonwebtoken';
import rs from 'randomstring';
import { OAuth2Client } from 'google-auth-library';
import UserSchemaModel from '../model/user.model.js';
import emailVerification from './email.controller.js';

// Constants
const CLIENT_ID = '906310881176-79sroguj45kjautpb9go7bhmn7gsl784.apps.googleusercontent.com';
const JWT_SECRET = process.env.JWT_SECRET || 'jwt_secret_key_here';
const client = new OAuth2Client(CLIENT_ID);

// Register
export const register = async (req, res) => {
  try {
    const users = await UserSchemaModel.find();
    const _id = users.length === 0 ? 1 : users[users.length - 1]._id + 1;

    const userDetails = {
      ...req.body,
      _id,
      role: 'user',
      status: 1,
      info: new Date(),
    };

    await UserSchemaModel.create(userDetails);
    emailVerification(userDetails.email, userDetails.password);

    res.status(201).json({ status: true });
  } catch (err) {
    console.error("Error creating user:", err);
    res.status(500).json({ status: false });
  }
};

// Google Login
export const googleLogin = async (req, res) => {
  const { token } = req.body;
  if (!token) return res.status(400).json({ message: 'Token is required' });

  try {
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: CLIENT_ID,
    });

    const payload = ticket.getPayload();
    let { email, name, picture, sub: googleId } = payload;

    name = name.toUpperCase().trim();

    let user = await UserSchemaModel.findOne({ $or: [{ email }, { googleId }] });

    if (!user) {
      user = new UserSchemaModel({
        name,
        email,
        avatar: picture,
        role: 'user',
        isGoogleUser: true,
        googleId,
        status: 1,
        info: new Date(),
      });

      await user.save();
    }

    const jwtToken = jwt.sign(
      { id: user._id, email: user.email, role: user.role },
      JWT_SECRET,
      { expiresIn: '7d' }
    );

    return res.status(200).json({
      token: jwtToken,
      userDetails: {
        _id: user._id,
        email: user.email,
        name: user.name,
        avatar: user.avatar,
        role: user.role,
      }
    });
  } catch (error) {
    console.error('Google login error:', error.message);
    return res.status(401).json({ message: 'Invalid Google token' });
  }
};

// Login
export const login = async (req, res) => {
  try {
    const condition = { ...req.body, status: 1 };
    const user = await UserSchemaModel.findOne(condition);

    if (user) {
      const key = rs.generate(50);
      const token = jwt.sign(user.email, key);

      return res.status(200).json({ token, userDetails: user });
    }

    return res.status(401).json({ token: null, message: "Invalid credentials" });
  } catch (err) {
    console.error("Login error:", err);
    return res.status(500).json({ token: null, message: "Internal server error" });
  }
};
