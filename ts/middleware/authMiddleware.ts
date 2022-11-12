import userM from "../models/userModel"

export const signupValidation = async(request:any,reply:any,done:any) => {

    try{

        if(!request.body.name){
            return reply.code(400).send("failed, name is not provided");
        }

        if(!request.body.email){
            return reply.code(400).send("failed, email is not provided");
        }

        const userEmail = await userM.findOne({email :request.body.email});

        if(userEmail !== null){
             reply.code(400).send("Email is already in use");
        } 

        if(!isValidEmail(request.body.email)){
            return reply.code(400).send("failed, email is not valid");
        }


        if(!request.body.password){
            return reply.code(400).send("password is not provided");
        } 

        done();
        
    }catch{
        reply.code(500).send("error happened in authValidation");
    }
    
}



const isValidEmail = (email :any) => {
    return String(email).toLowerCase().match(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
} 





export const signinValidation = async(request:any,reply:any,done:any) => {
try{
if(!request.body.email){
    return reply.code(400).send("email is not provided");
}
  
if(!request.body.password){
    return reply.code(400).send("password is not provided");
}
done();

}catch{
    console.log("error happened in signinValidation");
    
}

}
