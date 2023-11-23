"use client"
import { useSearchParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import Profile from '@components/Profile';

const UserProfile = ({params}) => {
    const SearchParams=useSearchParams();
    const profileId=SearchParams.get("id");
    const [userPosts,setuserPosts]=useState([]);
    useEffect(()=>{
      const fetchdata=async()=>{
        const response= await fetch(`/api/user/${profileId.toString()}/posts`)
        const data=await response.json();
        console.log(data);
        setuserPosts(data)
      }
      fetchdata();
    },[profileId])
  return (
    <Profile
    name={params.name}
    desc={`Welcome to ${params.name}'s personalized profile page. Explore ${params.name}'s exceptional prompts and be inspired by the power of their imagination`}
    data={userPosts}
  />
  );
}

export default UserProfile;
