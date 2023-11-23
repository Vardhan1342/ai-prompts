import React from 'react';
import Promptcard from './Promptcard';
const Profile = ({name,data,desc,handleEdit,handleDelete}) => {
 console.log(data)
  return (
    <section className='w-full'>
        <h1 className=' text-5xl font-bold text-left blue_gradient'>{name} Profile</h1>
        <p className='text-sm mt-5'>{desc}</p>
        <div className='mt-10 prompt_layout'>
        {data.map((post)=>(
         <Promptcard 
         key={post._id}
         post={post}
         handleEdit={()=>{handleEdit && handleEdit(post)}}
         handleDelete={()=>{handleDelete && handleDelete(post)}}
         />
        ))} 
      </div>
        
    </section>
  );
}

export default Profile;
