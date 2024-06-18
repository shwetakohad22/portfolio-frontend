import React from "react";
// import { HiArrowRight } from "react-icons/hi";

const Card = ({ title, desc }) => {
  return (
    <div className="w-full px-12 h-80 py-10 rounded-lg shadow-shadowOne flex items-center bg-gradient-to-r from-bodyColor to-[#202327] group hover:bg-gradient-to-b hover:from-black hover:to-[#1e2024] transition-colors duration-100 group">
      <div className="h-72 overflow-y-hidden">
        <div className="flex h-full flex-col gap-10 translate-y-16 group-hover:translate-y-0 transition-transform duration-500">
          <div className="w-10 h-9 flex flex-col justify-between">
            <span className="text-2xl text-designColor">{title}</span>
          </div>
          <div className="flex flex-col gap-8">
            <p className=" base text-gray-300 text-justify">{desc}</p>
            {/* <p className="base">{desc}</p> */}
            {/* <span className="text-2xl text-designColor">
              <HiArrowRight />
            </span> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
