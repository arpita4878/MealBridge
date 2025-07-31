import "../model/connection.js"

import  VolunteerModel from '../model/Volunteer.model.js'


export const add=async(req,res)=>{
     const volunteer=await VolunteerModel.find();
   const l=volunteer.length;
   const _id=l==0?1:volunteer[l-1]._id+1;

    const volunteerDetails={...req.body,'_id':_id,'info':Date()};
    //console.log(volunteerDetail)
    try{
    await VolunteerModel.create(volunteerDetails);
    res.status(201).json({"status":true});
    }
    catch (err) {
  console.error("Error creating volunteer:", err);
  res.status(500).json({ status: false});
    }
}




  export const fetch=async(req,res)=>{
    var volunteerList=await VolunteerModel.find(req.query)
      if(volunteerList!=0)
        res.status(200).json(volunteerList)
      else
        res.status(404).json({"status":"Not found"})
    
  }
// //get--fetch
// //condition_obj={"_id":"2"}


