import nodeMailers from "nodemailer";

import userMode from "../models/userModel";

const transporters = nodeMailers.createTransport({
    host: "smtp.mailtrap.io",
    port: 2525, 
    auth: {
      user: "ffb9a4ce425624",
       pass: "b5aefc45441cce"
    }
  });

export const signM = async(request:any) => {

const user:any | undefined | null = await userMode.findOne({email:request.body.email}); 
//console.log(user,"i'm here see");

const mail = { 
from : "Me",   
to : user.email, 
subject : "Signed in " , 

//// just sending anything /////

 
html : `you are signed in, please contact if it's not you` 
} 
 transporters.sendMail(mail,(err:any,data:any) => {   
    if(err){  
   console.log(err);  
   console.log("error while sending mail"); 
    }  
    console.log("email sent", data);    
}); 

} 
  
