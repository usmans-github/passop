import React from 'react'

const Footer = () => {
  return (
    <div className='bg-slate-800 text-white flex flex-col justify-center items-center  w-full'>
         <div ><h1 className="text-4xl font-bold ">
          <span className="text-green-500">&lt;</span>
          <span>Pass</span>  
          <span className="text-green-500">OP/&gt;</span>
        </h1></div>
        
        <div className='flex justify-center items-center'> Created with  &nbsp; <img className='w-6' src="icons/heart.png" alt="Love" /> &nbsp; by &nbsp; <a href=""> M Usman </a></div>
       
    </div>
  )
}

export default Footer
