import React from 'react'

const Navbar = () => {
  return (
    <nav className=' px-4  bg-slate-800 text-white w-full'>
      <div className=" flex justify-between items-center py-3">

      <div className='logo font-bold text-white text-2xl'>
      <span className='text-green-500'>&lt;</span>
       <span>Pass</span>
        <span className='text-green-700'>OP/ &gt;</span>
        
        </div>

       <div>Github</div>
      </div>
    </nav>
  )
}

export default Navbar
