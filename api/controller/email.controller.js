import nodemailer from 'nodemailer';


 async function emailVerification(email,password){

try{

    var transporter=nodemailer.createTransport({
    service:'gmail',
    auth:{
        user:'sethaku192@gmail.com',
        pass:'wiaukfpbwdtqgfbe'
    }
})
var mailOption={
    from:'sethaku192@gmail.com',
    to:email,
    subject:'Verification Email Meal Bridge',
    html:"<h1>Welcome to Meal Bridge</h1><p>You have succesfully resgister to our site, your login  credential are attached  below:</p><h2>useremail:"+email+"</h2><h2>password:"+password+"</h2><h1>Click on the link below to verify your account</h1><a href='http://localhost:5173/verify/"+email+"'>Click here to verify....</a>"
}
const  info=await transporter.sendMail(mailOption)
    console.log('email sent'+info.response)
}  
  
catch(error)
{
    console.log("Error",error)
}
 //  console.log(useremail)
}

export default emailVerification

   