import mongoose from "mongoose";

let isConnected=false;

export const connectToDB=async()=>{
    mongoose.set("strictQuery",true);

    if(isConnected){
        console.log("mongoose is already connected")
        return;
    }
     mongoose.connect(process.env.MOGODB_URL,{
        dbName:"MyAIPrompts"
     }).then(()=>console.log("connected to data DB")).catch((err)=>{
        console.log(err)
     })

}