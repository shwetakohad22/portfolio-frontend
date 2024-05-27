import React, { useEffect, useState } from "react";
import { useTypewriter, Cursor } from "react-simple-typewriter";
import { FaLinkedinIn, FaGithub, FaFacebookF } from "react-icons/fa";
import bannerImg from "../../assets/banner.png";
import axios from "axios";

const Banner = () => {
  const [data, setData] = useState({
    intro: {
      welcomeMessage: "",
      name: "",
      description: "",
      bannerImage: "",
      roles: [],
    },
  });

  const getPortfolioData = async () => {
    try {
      const response = await axios.get(
        "https://portfolio-backend-shweta-kohad.onrender.com/api/portfolio/get-portfolio-data"
      );
      setData(response.data);
    } catch (error) {
      console.error("Error fetching portfolio data:", error);
    }
  };

  useEffect(() => {
    getPortfolioData();
  }, []);

  const [text] = useTypewriter({
    words:
      data.intro.roles && data.intro.roles.length > 0
        ? data.intro.roles
        : [
            "Full stack developer",
            "Frontend developer",
            "Backend Developer",
            "MERN stack developer",
          ],
    loop: true,
    typeSpeed: 20,
    deleteSpeed: 10,
    delaySpeed: 2000,
  });

  if (!data.intro) {
    return null;
  }

  return (
    <section
      id="home"
      className="w-full pb-20 flex flex-col-reverse lg:flex-row items-center border-b-[1px] font-titleFont border-b-black"
    >
      <div className="w-full lg:w-1/2 flex flex-col gap-10 lg:gap-20 px-4 lg:px-0 mt-10 lg:mt-0">
        <div className="flex flex-col gap-5 text-center lg:text-left mt-10 lg:mt-0">
          <h4 className="text-lg font-normal">Welcome To My World</h4>
          <h1 className="text-4xl lg:text-6xl font-bold text-white">
            {data.intro.welcomeMessage}{" "}
            <span className="text-designColor capitalize">
              {data.intro.name}
            </span>
          </h1>
          <h2 className="text-2xl lg:text-4xl font-bold text-white">
            a <span>{text}</span>
            <Cursor
              cursorBlinking="false"
              cursorStyle="|"
              cursorColor="#ff014f"
            />
          </h2>
          <p className="text-sm lg:text-base font-bodyFont leading-6 tracking-wide">
            {data.intro.description}
          </p>
        </div>
        <div className="flex flex-col lg:flex-row justify-between gap-10 lg:gap-0">
          <div className="flex flex-col items-center lg:items-start">
            <h2 className="text-base uppercase font-titleFont mb-4">
              Find me on
            </h2>
            <div className="flex gap-4">
              <span className="bannerIcon">
                <FaLinkedinIn />
              </span>
              <span className="bannerIcon">
                <FaGithub />
              </span>
              <span className="bannerIcon">
                <FaFacebookF />
              </span>
            </div>
          </div>
          <div className="flex flex-col items-center lg:items-start">
            <h2 className="text-base uppercase font-titleFont mb-4">
              Find me on
            </h2>
            <div className="flex gap-4">
              <span className="resumeIcon">Get my resume</span>
              {/* <span className="bannerIcon">
                <FaGithub />
              </span>
              <span className="bannerIcon">
                <FaFacebookF />
              </span> */}
            </div>
          </div>
        </div>
      </div>
      <div className="w-full lg:w-1/2 flex justify-center items-center relative mt-5 lg:mt-0">
        <img
          className="w-[300px] h-[400px] md:w-[350px] md:h-[450px] lg:w-[500px] lg:h-[680px] z-10"
          src={bannerImg}
          alt="Banner"
        />
        <div className="absolute bottom-0 w-[300px] h-[300px] md:w-[350px] md:h-[350px] lg:w-[500px] lg:h-[500px] bg-gradient-to-r from-[#1e2024] to-[#202327] shadow-shadowOne flex justify-center items-center"></div>
      </div>
    </section>
  );
};

export default Banner;
