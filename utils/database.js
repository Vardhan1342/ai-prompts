import mongoose from "mongoose";

let isConnected=false;

export const connectToDB=async()=>{
    mongoose.set("strictQuery",true);

    if(isConnected){
        console.log("mongoose is already connected")
        return;
    }
     mongoose.connect('mongodb://127.0.0.1:27017/MyAIPrompts').then(()=>console.log("connected to data DB")).catch((err)=>{
        console.log(err)
     })

}