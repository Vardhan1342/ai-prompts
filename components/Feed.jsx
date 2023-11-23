"use client"
import React, { useEffect, useState } from 'react';
import Promptcard from './Promptcard';

const PromptcardList=({data,handleTagClick})=>{
  return (
<div className='mt-16 prompt_layout'>

    {data.map((post)=>(
      <Promptcard 
       key={post._id}
       post={post}
       handleTagClick={handleTagClick}
       />
        ))} 
      </div>
      )
}


const Feed = () => {
 const [searchText,setSearchText]=useState("");
 const [data,setData]=useState([]);
 const [searchTimeout, setSearchTimeout] = useState(null);
 const [searchedResults, setSearchedResults] = useState([]);
 
 
 const handleSearchChange=(e)=>{
        clearTimeout(searchTimeout);
        setSearchText(e.target.value);

        // debounce method
        setSearchTimeout(
          setTimeout(() => {
            const searchResult = filterPrompts(e.target.value);
            setSearchedResults(searchResult);
          }, 500)
        );
 }
 const filterPrompts = (searchtext) => {
  const regex = new RegExp(searchtext, "i"); // 'i' flag for case-insensitive search
  return data.filter(
    (item) =>
      regex.test(item.creator.username) ||
      regex.test(item.tag) ||
      regex.test(item.prompt)
  );
};


const handleTagClick = (tagName) => {
  setSearchText(tagName);

  const searchResult = filterPrompts(tagName);
  setSearchedResults(searchResult);
};
  useEffect(()=>{
    const fetchdata=async()=>{
    const res=await fetch("/api/prompt");
    const data=await res.json();
    setData(data)
    }
    fetchdata();
  console.log("effected")
  },[])

  return (
    <div className='feed'>
      
      <form className='relative w-full flex-center'>
      <input 
      className='search_input peer w-full'
      value={searchText}
      onChange={handleSearchChange}
      type="text"
      placeholder='Search with username or tag'

      />
      </form>
        {searchText ? (
        <PromptcardList
          data={searchedResults}
          handleTagClick={handleTagClick}
        />
      ) : (
        <PromptcardList data={data} handleTagClick={handleTagClick} />
      )}
    </div>
  );
}

export default Feed;
