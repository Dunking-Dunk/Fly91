import React from "react";
import { useNavigate } from "react-router-dom";
import ProfileIcon from "../../../public/profile_icon.png";
import logo from "../../../public/logo.svg";
import logout_icon from "../../../public/logout.png";

const Sidebar = () => {
  const navigate = useNavigate();
  return (
    <div className="h-full w-full pl-4 pr-2 py-4">
      <div className="flex flex-col items-center gap-[10px] w-full h-full bg-white rounded-lg">
        <img src={logo} alt="logo" className="my-10 w-20" />
        <div className="flex p-2 justify-between bg-gray-100 rounded-2xl w-[80%]">
          <img
            src={ProfileIcon}
            alt="profile-icon"
            className="object-contain ml-1"
          />
          <div className="flex flex-col justify-center px-4 text-[#515151] mr-1 items-end ">
            <h2 className="text-xs">admin</h2>
            <h1 className="text-md">Thirumurugan</h1>
          </div>
        </div>
        <div className="w-full px-8 mt-[20%] ">
          <div className="border-l-2  pl-3 border-[#6C6C6C] text-[#6C6C6C]">
            Dashboard
          </div>
        </div>

        <div className="flex-grow"></div>
        <button onClick={() => navigate("/login")}>
          <img src={logout_icon} alt="logout" className="my-[20px]" />{" "}
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
