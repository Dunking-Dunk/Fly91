import React from "react";

const Error = () => {
  return (
    <>
      <div className="flex  h-screen flex-col -mt-14">
        <div className="flex flex-col -mb-[430px] m-auto ">
          <div className="m-auto z-10  text-3xl items-center  mt-72 font-semibold">
            404 ERROR
          </div>
          <div className="m-auto z-10  text-3xl items-center  mt-5 font-medium">
            Sorry this page is not found
          </div>
        </div>

        <div className="m-auto mt-24 items-center text-[404px] hover:cursor-default opacity-20 font-bold ">
          404
        </div>
        <button className="m-auto -mt-40 p-5 rounded-xl bg-background ">
          {" "}
          Go back to home
        </button>
      </div>
    </>
  );
};

export default Error;
