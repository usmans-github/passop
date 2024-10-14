import React from "react";

const Navbar = () => {
  return (
    <nav className=" px-4  bg-slate-800 text-white w-full">
      <div className=" flex  justify-between md:justify-around items-center">
        <div className="logo font-bold text-white text-2xl">
          <span className="text-green-500">&lt;</span>
          <span>Pass</span>
          <span className="text-green-700">OP/ &gt;</span>
        </div>
        <a href="https://github.com/usmans-github/passop" target="_blank">
          <button className="text-white bg-green-700 my-3 mx-2 rounded-full flex  justify-between items-center ring-white ring-1">
            <img
              className="invert  w-8 p-1"
              src="/icons/github.svg"
              alt="github logo"
            />
            <span className="font-bold px-2">GitHub</span>
          </button>
        </a>
      </div>
    </nav>
  );
};

export default Navbar;
