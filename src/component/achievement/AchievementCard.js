import React from "react";
import { FaGlobe } from "react-icons/fa";
// import { FaGithub, FaLinkedinIn } from "react-icons/fa";

const AchievementCard = ({ title, des, src, img }) => {
  return (
    <div className="w-full px-12 h-auto py-10 rounded-lg shadow-shadowOne flex flex-col bg-gradient-to-r from-bodyColor to-[#202327] group hover:bg-gradient-to-b hover:from-gray-900 hover:gray-900 transition-colors duration-1000">
      <div className="w-full h-[80%] overflow-hidden rounded-lg">
        <img
          className="w-full h-60 object-cover group-hover:scale-110 duration-300 cursor-pointer"
          src={src}
          alt="img"
        />
      </div>
      <div className="w-full mt-5 flex flex-col gap-6">
        <div className="flex items-center justify-between">
          <h3 className="text-base uppercase text-designColor font-normal">
            {title}
          </h3>
          <div className="flex gap-2">
            <a
              href={img}
              target="_blank"
              className="text-lg w-10 h-10 rounded-full bg-black inline-flex justify-center items-center text-gray-400 hover:text-designColor duration-300 cursor-pointer"
            >
              <FaGlobe />
            </a>
          </div>
        </div>
        <div>
          <p className="text-sm tracking-wide mt-3 hover:text-gray-100 duration-300 text-justify">
            {des}
          </p>
        </div>
      </div>
    </div>
  );
};

export default AchievementCard;
