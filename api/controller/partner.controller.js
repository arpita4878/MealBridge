import "../model/connection.js"


import  PartnerModel from '../model/Partner.model.js'


export const add=async(req,res)=>{
     const partner=await PartnerModel.find();
   const l=partner.length;
   const _id=l==0?1:partner[l-1]._id+1;

    const partnerDetails={...req.body,'_id':_id,'info':Date()};
    //console.log(partnerDetail)
    try{
    await PartnerModel.create(partnerDetails);
    res.status(201).json({"status":true});
    }
    catch (err) {
  console.error("Error creating partner:", err);
  res.status(500).json({ status: false});
    }
}




  export const fetch=async(req,res)=>{
    var partnerList=await PartnerModel.find(req.query)
      if(partnerList!=0)
        res.status(200).json(partnerList)
      else
        res.status(404).json({"status":"Not found"})
    
  }
// //get--fetch
// //condition_obj={"_id":"2"}



