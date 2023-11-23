import { connectToDB } from "@utils/database"
import Prompt from "@models/prompt";
import  User from "@models/user"

export const GET = async (request,{params}) => {
    try {
        await connectToDB()
       
        const prompt = await Prompt.findById({_id:params.id}).populate("creator")
        console.log(prompt)
        if(!prompt){
            new Response("prompt not found",{status:404})
        }
        return new Response(JSON.stringify(prompt), { status: 200 })
    } catch (error) {console.log(error);
        return new Response("Failed to fetch all prompts", { status: 500 })
    }
}


export const PATCH=async(request,{params})=>{
    const {prompt,tag}=await request.json();
    try {
        await connectToDB();
        const exsistPrompt=await Prompt.findById(params.id);
        if(!exsistPrompt){
            new Response("prompt not found",{status:404})

        }
        exsistPrompt.prompt=prompt;
        exsistPrompt.tag=tag;
        await exsistPrompt.save()
        return new Response(JSON.stringify(exsistPrompt), { status: 200 })

    } catch (error) {
        return new Response("Failed to fetch all prompts", { status: 500 })
        
    }
}


export const DELETE=async(request,{params})=>{
    try {
        await connectToDB()
        const exsistPrompt=await Prompt.findByIdAndRemove(params.id);
        return new Response("prompt deleted", { status: 200 })
    
    } catch (error) {
        return new Response("Failed to fetch prompt", { status: 500 })
        
    }
 
}