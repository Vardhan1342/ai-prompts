"use client"
import { useSession } from 'next-auth/react';
import { useRouter, useSearchParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import Form from '@components/Form';

const EditPrompt = () => {
  const SearchParams=useSearchParams()
    const promptId=SearchParams.get("id")
    const router=useRouter();
    const [submitting,setSubmitting]=useState(false)
    const [post,setPost]=useState({
      prompt:"",
      tag:"",
    })

useEffect(()=>{
  const getPrompt=async()=>{
    const prompt=await fetch(`/api/prompt/${promptId}`);
    const data=await prompt.json()
    console.log(data);
    setPost({
      prompt:data.prompt,
      tag:data.tag
    })
  }
  if(promptId) getPrompt()
},[promptId])

  const UpdatePrompt=async(e)=>{
      e.preventDefault();
      setSubmitting(true);
      if(!promptId){return alert("prompt id not found")}
      try {
        const response=await fetch(`/api/prompt/${promptId}`,{
          method:"PATCH",
          body:JSON.stringify({
            prompt:post.prompt,
            tag:post.tag
          })
        });
        if(response.ok){
         router.push("/")
        }
      } catch (error) {
        console.log(error);
      }
      finally{
        setSubmitting(false)
      }

  }
    return (
    <div>
      <Form 
        type="Edit"
        post={post}
        setPost={setPost}
        handleSubmit={UpdatePrompt}
        submitting={submitting}
      
      />
    </div>
  );
}

export default EditPrompt;
