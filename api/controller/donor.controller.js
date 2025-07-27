import "../model/connection.js"
import url from  'url'
import jwt from 'jsonwebtoken'
import rs from 'randomstring'

import  DonorModel from '../model/donor.model.js'


export const add=async(req,res)=>{
     const foods=await DonorModel.find();
   const l=foods.length;
   const _id=l==0?1:foods[l-1]._id+1;

    const foodDetails={...req.body,'_id':_id,'status':0,'info':Date()};
    //console.log(foodDetail)
    try{
    await DonorModel.create(foodDetails);
    res.status(201).json({"status":true});
    }
    catch (err) {
  console.error("Error creating food:", err);
  res.status(500).json({ status: false});
    }
}



//  export const login=async(req,res)=>{
//     var condition_obj={...req.body,"status":1};
//    // console.log(condition_obj)
//     var foodList=await DonorModel.find(condition_obj);
//     if(foodList.length!=0)
//     {
//       const payload=foodList[0].email; 
//       const key=rs.generate(50);
//       const token = jwt.sign(payload,key); 
//       res.status(200).json({"token":token,"foodDetails":foodList[0]});
//     }
//     else
//       res.status(500).json({"token":"error"});  
//   };

//   //in postman  post req-------in body------key-
//   //email:test123@gmail.com
//   //send




  export const fetch=async(req,res)=>{
    var foodList=await DonorModel.find(req.query)
      if(foodList!=0)
        res.status(200).json(foodList)
      else
        res.status(404).json({"status":"Not found"})
    
  }
// //get--fetch
// //condition_obj={"_id":"2"}




//   export const deletefood=async(req,res)=>{
//     var obj=req.body;
//    // console.log(obj);
    
//     if(obj!=undefined)
//     {
     
//       let foodDetail=await DonorModel.findOne(obj)
//       if(foodDetail)
//       {
//         let food=await DonorModel.deleteOne(obj)
//         if(food)
//           res.status(200).json({"status":"ok"})
//         else
//           res.status(500).json({"status":"server error"})
//       }
//       else
//       {
//         res.status(404).json({"status":"Request source not found"})
//       }
//     }
//     else
//     {
//       res.status(500).json({"status":"Enter valid details"})
//     }

//   }



  export const update=async(req,res)=>{
    var obj=req.body;
   console.log(obj);
    
    if(obj!=undefined)
    {
     
      let foodDetail=await DonorModel.findOne(req.body.condition_obj)
      if(foodDetail)
      {
        let food=await DonorModel.updateOne((req.body.condition_obj),{$set:req.body.content_obj})
      

        if(food)
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














