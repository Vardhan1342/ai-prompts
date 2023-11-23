import Link from 'next/link';
import React from 'react';

const Form = ({type, post, setPost ,handleSubmit,submitting
        }) => {
  return (<>
    <div className='w-full max-w-full flex-start flex-col'>
      <h1 className='head_text text-left blue_gradient'>{type} Post</h1>
      <p className='desc text-left'>{type} and share amazing prompts woth the world, and let your imagination run wild with any AI-powered platform</p>
      <form 
      onSubmit={handleSubmit} 
      className='w-full flex flex-col glassmorphism max-w-2xl space-y-4'

      >
        <label className='text-gray-700 font-semibold font-satoshi'>Your AI Prompt</label>
        <textarea 
        className="form_textarea"
        placeholder='Write your prompt here...'
        required
        value={post.prompt}
        onChange={(e)=>setPost({...post,prompt:e.target.value})}

        />
        <label className='font-satoshi font-semibold text-base text-gray-700'>Tag <span className='font-normal tracking-wide'>(#product,#webdevelopment,#idea)</span></label>
   <input 
        className="form_input"
        placeholder='#tag'
        required
        value={post.tag}
        onChange={(e)=>setPost({...post,tag:e.target.value})}

        />
        <div className='flex-end mx-3 gap-4 '>
          <Link href="/" className='text-gray-500 text-sm mt-4 hover:text-gray-700'>
          Cancel
          </Link>
          <button type='submit' disabled={submitting}
          className='px-5 py-1.5 mt-4 text-sm text-white bg-primary-orange rounded-full'
          >
            {submitting ? `${type}...` : type }
          </button>
        </div>
      </form>
      </div>
      </>
  );
}

export default Form;
