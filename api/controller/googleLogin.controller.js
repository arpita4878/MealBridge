
import jwt from 'jsonwebtoken'
import { OAuth2Client } from 'google-auth-library';

import UserSchemaModel from "../model/user.model.js"


//google login
const CLIENT_ID = '906310881176-79sroguj45kjautpb9go7bhmn7gsl784.apps.googleusercontent.com';
const client = new OAuth2Client(CLIENT_ID);

const JWT_SECRET = process.env.JWT_SECRET || 'jwt_secret_key_here';
export const googleLogin = async (req, res) => {
  const { token } = req.body;
  if (!token) return res.status(400).json({ message: 'Token is required' });

  try {
    // Verify token with Google
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: CLIENT_ID,
    });

    const payload = ticket.getPayload();
    let { email, name, picture, sub: googleId } = payload;

    // Normalize name to uppercase (optional, to match your schema)
    name = name.toUpperCase().trim();

    // Check if user exists by email or googleId
    let user = await UserSchemaModel.findOne({ 
      $or: [{ email }, { googleId }] 
    });

    if (!user) {
      // Create new user if doesn't exist
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

    // Generate JWT for frontend authentication
    const jwtToken = jwt.sign(
      { id: user._id, email: user.email, role: user.role },
      JWT_SECRET,
      { expiresIn: '2d' }
    );

    return res.json({
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
  console.error('Google login error:', error);
  if (error.response) {
    console.error('Google API response error:', error.response.data);
  } else if (error.message) {
    console.error('Error message:', error.message);
  }
  return res.status(401).json({ message: 'Invalid Google token' });
}
};