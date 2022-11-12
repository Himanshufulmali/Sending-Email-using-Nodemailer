import userModel from "../models/userModel";

import bcrypt from "bcryptjs";

import jwt from "jsonwebtoken";
import { regM } from "../emails/regEmail";
import { signM } from "../emails/signinEmail";

import { forgotM } from "../emails/forgotEmail";

 

export const signup = async(request:any,reply:any) => {

const userObj = {
    name : request.body.name,
    email : request.body.email,
    password: bcrypt.hashSync(request.body.password,8)
}

const createdUser = await userModel.create(userObj);
 
const response = {
    name : createdUser.name, 
    email : createdUser.email,
    createdAt : createdUser.createdAt
}

reply.send(response); 

regM(request);

}

 
export const signin= async(request:any,reply:any) => {

    const user :any | undefined | null = await userModel.findOne({email : request.body.email});
 
    if(user === null){
        reply.code(400).send("user is not registered")
}

const validPass = bcrypt.compareSync(request.body.password,user.password);   

if(!validPass){

    reply.code(400).send("password is not valid");
}

const token = jwt.sign({
    id : user.email
},process.env.secret as string,{
 expiresIn : 600
});

signM(request);

reply.send({
    name : user.name,
    email : user.email,
    createdAt : user.createdAt,
    accessToken : token
})
 
}


export const findAllUsers = async(request:any,reply:any) => {
try{
 const user = await userModel.find(request.body);
 
 reply.code(200).send(user);
}catch{
    reply.code(400).send("error happened")
}

}


export const updatePass = async(request:any,reply:any) => {

  const user : any |undefined|null = await userModel.findOne({email:request.body.email});

  user.name = request.body.name != undefined ? request.body.name : user.name
  user.email = request.body.email != undefined ? request.body.email : user.email
  user.password = request.body.password != undefined ? request.body.password : user.password

  const response = await user.save();

 forgotM(request);

 reply.code(201).send(response);
}  