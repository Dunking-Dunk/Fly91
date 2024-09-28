import React from "react";

const Sidebar = () => {
  return (
    <>
      <div className="flex flex-col items-center w-[15%] gap-[10px] h-[calc(100vh-7.5rem)] m-[1.5rem] fixed top-[4rem] bg-white rounded-lg">
        <img src="logo.svg" alt="logo" className="my-10 w-20" />

        <div className="flex flex-row items-center w-full px-4 h-[64px]">
          <img src="avatar.png" alt="avatar" />
          <div className="flex flex-col justify-center px-4 text-[#515151]">
            <h2 className="text-sm">admin</h2>
            <h1 className="text-md">Thiru</h1>
          </div>
        </div>

        <div className="my-[15px] text-[#6C6C6C] self-start pl-4">
          <div className="flex items-center">
            <span className="h-6 border-l-2 border-[#6C6C6C] mr-2"></span>
            <h2>Dashboard</h2>
          </div>
        </div>

        <div className="flex-grow"></div>

        <img src="logout.png" alt="logout" className="my-[20px]" />
      </div>
    </>
  );
};

export default Sidebar;
