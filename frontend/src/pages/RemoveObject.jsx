import React from 'react'
import {  Scissors, Sparkles } from 'lucide-react'
import  { useState } from 'react'

const RemoveObject = () => {

  const blogCategories = ['General','Technology','Business','Health','Lifestyle','Education','Travel','Food'];

  const [object,setObject] = useState('');
  const [input,setInput] = useState("");

  const onSumbitHandler = async (e) =>{
    e.preventDefault();
  }

  return (
    <div className='h-full overflow-y-scroll p-6 flex items-start flex-wrap gap-4 text-slate-700'>

      {/*Left Column*/}
      <form onSubmit={onSumbitHandler} className='w-full max-w-lg p-4 bg-white rounded-lg border border-gray-200' action="">
        <div className='flex items-center gap-3'>
          <Sparkles className='w-6 text-[#$4A7AFF] ' />
          <h1 className='text-xl font-semibold'>Object Removal</h1>
        </div>
        <p className='mt-6 text-sm font-medium'>Upload Image</p>

        <input type="file" accept='image/*' className='w-full p-2 px-3 mt-2 outline-none text-sm rounded-ms text-gray-600 border border-gray-300' required onChange={(e) => setInput(e.target.files[0])} />

        <p className='mt-6 text-sm font-medium'>Describe object name to remove</p>

        <textarea  className='w-full p-2 px-3 mt-2 outline-none text-sm rounded-ms border border-gray-300' placeholder='e.g., watch or spoon, Only single object name' required onChange={(e) => setObject(e.target.value)} value={object} rows={4}/>

        <button className='w-full flex justify-center items-center gap-2 bg-gradient-to-r from-[#417DF6] to-[#8E37EB] text-white px-4 py-2 mt-6 text-sm rounded-lg cursor-ppointer '>
          <Scissors className='w-5' />
          Remove Object
        </button>
      </form>

      {/*Right Column*/}
      <div className='w-full max-w-lg p-4 bg-white rounded-lg flex flex-col border border-gray-200 min-h-96 '>
          <div className='flex items-center gap-3'>
            <Scissors className='w-5 h-5 text-[#4A7AFF]' />
            <h1 className='text-xl font-semibold'>Processed Image</h1>
          </div>
          <div className='flex-1 flex justify-center items-center'>
            <div className='text-sm flex flex-col items-center gap-5 text-gray-400'>
              <Scissors className='w-8.5 h-8.5 ' />
              <p>Upload a image and click "Remove Object" to get started</p>
            </div>
          </div>
      </div>
    </div>
  )
}

export default RemoveObject