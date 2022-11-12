import mongoose from "mongoose";

const User = new mongoose.Schema({
    name : {
     type : String,
     required : true,
     minLength : 2
    } ,
    email : {
     type : String,
     required : true,
     unique: true,
     minLength : 4
     
    },
    password :{
     type : String,
     required : true,
     minLength : 8

    },
    createdAt : {
     type : Date,
     immutable : true,
     default : () => {
        return Date.now()
     }
    } 
});

export default mongoose.model("Chhayya",User);