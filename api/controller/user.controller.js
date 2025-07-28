import "../model/connection.js"
import url from  'url'
import jwt from 'jsonwebtoken'
import rs from 'randomstring'
import { OAuth2Client } from 'google-auth-library';

import UserSchemaModel from "../model/user.model.js"
import emailVerification from "./email.controller.js"


export const register=async(req,res)=>{
     const users=await UserSchemaModel.find();
   const l=users.length;
   const _id=l==0?1:users[l-1]._id+1;


    const userDetails={...req.body,'_id':_id,'role':'user','status':1,'info':Date()};
    //console.log(userDetail)
    try{
    await UserSchemaModel.create(userDetails);
    emailVerification(userDetails.email,userDetails.password)
    res.status(201).json({"status":true});
    }
    catch (err) {
  console.error("Error creating user:", err);
  res.status(500).json({ status: false});
    }
}


const CLIENT_ID = '906310881176-79sroguj45kjautpb9go7bhmn7gsl784.apps.googleusercontent.com';
const client = new OAuth2Client(CLIENT_ID);

const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret_key_here';
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
      { expiresIn: '7d' }
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

export const checkEmail = async (req, res) => {
  try {
    const { email } = req.query;

    if (!email) {
      return res.status(400).json({ exists: false, message: "Email is required" });
    }

    const user = await UserSchemaModel.findOne({ email });

    if (user) {
      return res.status(200).json({ exists: true });
    } else {
      return res.status(200).json({ exists: false });
    }
  } catch (err) {
    console.error("Error checking email:", err);
    return res.status(500).json({ exists: false, message: "Internal server error" });
  }
};


 export const login=async(req,res)=>{
    var condition_obj={...req.body,"status":1};
   // console.log(condition_obj)
    var userList=await UserSchemaModel.find(condition_obj);
    if(userList.length!=0)
    {
      const payload=userList[0].email; 
      const key=rs.generate(50);
      const token = jwt.sign(payload,key); 
      res.status(200).json({"token":token,"userDetails":userList[0]});
    }
    else
      res.status(500).json({"token":"error"});  
  };

  //in postman  post req-------in body------key-
  //email:test123@gmail.com
  //send




  export const fetch=async(req,res)=>{
    var userList=await UserSchemaModel.find(req.query)
      if(userList!=0)
        res.status(200).json(userList)
      else
        res.status(404).json({"status":"Not found"})
    
  }
//get--fetch
//condition_obj={"_id":"2"}




  export const deleteUser=async(req,res)=>{
    var obj=req.body;
   // console.log(obj);
    
    if(obj!=undefined)
    {
     
      let userDetail=await UserSchemaModel.findOne(obj)
      if(userDetail)
      {
        let user=await UserSchemaModel.deleteOne(obj)
        if(user)
          res.status(200).json({"status":"ok"})
        else
          res.status(500).json({"status":"server error"})
      }
      else
      {
        res.status(404).json({"status":"Request source not found"})
      }
    }
    else
    {
      res.status(500).json({"status":"Enter valid details"})
    }

  }



  export const update=async(req,res)=>{
    var obj=req.body;
   // console.log(obj);
    
    if(obj!=undefined)
    {
     
      let userDetail=await UserSchemaModel.findOne(req.body.condition_obj)
      if(userDetail)
      {
        let user=await UserSchemaModel.updateOne((req.body.condition_obj),{$set:req.body.content_obj})
      

        if(user)
          res.status(200).json({"status":"ok"})
        else
          res.status(500).json({"status":"Server error"})
      }
      else
        res.status(404).json({"status":"Requested resource not found"})
    }
    else
      res.status(500).json({"status":"Enter valid details"})
   }














