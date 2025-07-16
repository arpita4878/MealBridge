import "../model/connection.js"
import url from  'url'
import jwt from 'jsonwebtoken'
import rs from 'randomstring'

import UserSchemaModel from "../model/user.model.js"

import generatePassword from "./password.controller.js"
import emailVerification from "./email.controller.js"


export const register=async(req,res)=>{
     const users=await UserSchemaModel.find();
   const l=users.length;
   const _id=l==0?1:users[l-1]._id+1;

   const password = generatePassword();

    const userDetails={...req.body,'_id':_id,'password':password,'role':'user','status':0,'info':Date()};
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














