"use client"
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import Form from '@components/Form';

const CreatePrompt = () => {
    const {data:session}=useSession();
    const router=useRouter();
    const [submitting,setSubmitting]=useState(false)
    const [post,setPost]=useState({
      prompt:"",
      tag:"",
    })
  const CreatePrompt=async(e)=>{
      e.preventDefault();
      setSubmitting(true);
      try {
        const response=await fetch("/api/prompt/new",{
          method:"POST",
          body:JSON.stringify({
            prompt:post.prompt,
            userId:session?.user.id,
            tag:post.tag
          })
        });
        if(response.ok){
         router.push("/")
        }
      } catch (error) {
        
      }
      finally{
        setSubmitting(false)
      }

  }
    return (
    <div>
      <Form 
        type="Create"
        post={post}
        setPost={setPost}
        handleSubmit={CreatePrompt}
        submitting={submitting}
      
      />
    </div>
  );
}

export default CreatePrompt;
