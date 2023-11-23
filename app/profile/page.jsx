"use client"

import React, { useEffect, useState } from 'react';
import Profile from '@components/Profile';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
const ProfilePage = () => {
  const [data,setData]=useState([]);
  const {data:session}=useSession();
  const router=useRouter()
  useEffect(()=>{
    const fetchdata=async()=>{
    const res=await fetch(`/api/user/${session?.user.id}/posts`);
    const data=await res.json();
    setData(data)
    }
    if(session?.user.id) fetchdata();
  },[]) 

  const handleEdit=async(post)=>{
    router.push(`/updatePrompt?id=${post._id}`)
  }
  const handleDelete=async(post)=>{
    const hasConfirm=confirm("Are you sure you want to delete the prompt?");
    if(hasConfirm){
      try {
        await fetch(`/api/prompt/${post._id.toString()}`,{method:"DELETE"});
        const filterPosts=data.filter((p)=> p._id !== post._id)
        setData(filterPosts)
      } catch (error) {
        console.log(error)
      }
    }
  }
  return (
    <div>
       <Profile 
         name="my"
         desc="description"
         data={data}
         handleEdit={handleEdit}
         handleDelete={handleDelete}
       />
    </div>
  );
}

export default ProfilePage;
