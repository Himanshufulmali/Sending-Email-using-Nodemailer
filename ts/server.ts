import fastify from "fastify";
import mongoose from "mongoose";
import userModel from "./models/userModel";

import dotenv from "dotenv";
dotenv.config();

const app = fastify({logger : true}); 

mongoose.connect(process.env.mongo as string);
const db = mongoose.connection;
db.on("error",() => {
    console.log("error happened during connection to mongo");
}); 
db.once("open", () => {
    console.log("connected to mongo");
    collDrop();
    
})


const collDrop = async() => {
 await userModel.collection.drop();
 console.log("collection is empty");
    
}


import route from "./routes/authRoute";
route(app);



const start = async(err?:any) => {
    if(err) {
        console.log("error happened while connecting");
        console.log(app.log.error);
        
    } 
    await app.listen(process.env.PORT as string);
    console.log("connected to server",app.server.address());
    app.log.info(`server connected on ${process.env.PORT}`);
    
}
start();