import React, { useState, useEffect } from "react";
import axios from "axios";
import Title from "../Title";
import Slider from "react-slick";
import quoteImg from "../../assets/quote.png";
import { BsGithub } from "react-icons/bs";
import { FaGlobe } from "react-icons/fa";
import { HiArrowRight, HiArrowLeft } from "react-icons/hi";
import moment from "moment";

function SampleNextArrow(props) {
  const { onClick } = props;
  return (
    <div
      className="w-14 h-12 bg-[#0c1821] hover:bg-black duration-300 rounded-md text-2xl text-gray-400 flex justify-center items-center absolute top-0 right-0 shadow-shadowOne cursor-pointer z-10"
      onClick={onClick}
    >
      <HiArrowRight />
    </div>
  );
}

function SamplePrevArrow(props) {
  const { onClick } = props;
  return (
    <div
      className="w-14 h-12 bg-[#0c1821] hover:bg-black duration-300 rounded-md text-2xl text-gray-400 flex justify-center items-center absolute top-0 right-20 shadow-shadowOne cursor-pointer z-10"
      onClick={onClick}
    >
      <HiArrowLeft />
    </div>
  );
}

const MyProjects = () => {
  const [dotActive, setDotActive] = useState(0);
  const [projectData, setProjectData] = useState([]);

  useEffect(() => {
    const fetchProjectData = async () => {
      try {
        const response = await axios.get(
          "https://portfolio-backend-shweta-kohad.onrender.com/api/portfolio/get-portfolio-data"
        );
        if (response.data.project) {
          setProjectData(response.data.project.reverse());
        }
      } catch (error) {
        console.error("Failed to fetch project data", error);
      }
    };

    fetchProjectData();
  }, []);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
    beforeChange: (prev, next) => {
      setDotActive(next);
    },
    appendDots: (dots) => (
      <div style={{ borderRadius: "10px", padding: "10px" }}>
        <ul
          style={{
            display: "flex",
            gap: "15px",
            justifyContent: "center",
            marginTop: "20px",
          }}
        >
          {dots}
        </ul>
      </div>
    ),
    customPaging: (i) => (
      <div
        style={
          i === dotActive
            ? {
                width: "12px",
                color: "blue",
                height: "12px",
                background: "#ff014f",
                borderRadius: "50%",
                cursor: "pointer",
              }
            : {
                width: "12px",
                color: "blue",
                height: "12px",
                background: "gray",
                borderRadius: "50%",
                cursor: "pointer",
              }
        }
      ></div>
    ),
  };

  return (
    <section
      id="projects"
      className="w-full py-20 border-b-[1px] border-b-black"
    >
      <div className="flex justify-center items-center text-center">
        <Title
          title="VISIT MY PORTFOLIO AND KEEP YOUR FEEDBACK"
          desc="My Projects"
        />
      </div>
      <div className="max-w-6xl mx-auto">
        <Slider {...settings}>
          {projectData.map((project) => (
            <div key={project._id} className="w-full">
              <div className="w-full h-auto flex flex-col md:flex-row justify-between">
                <div className="w-full md:w-[35%] h-full bg-gradient-to-r from-[#1e2024] to-[#23272b] p-8 shadow-shadowOne flex flex-col justify-center mb-8 md:mb-0">
                  <img
                    className="h-72 rounded-lg mx-auto"
                    src={project.image}
                    alt={project.title}
                  />
                  <div className="mt-5 flex items-center justify-between">
                    <h3 className="text-base uppercase text-designColor font-normal">
                      {project.title}
                    </h3>
                  </div>
                  <p className="mt-2 text-base tracking-wide text-gray-500 ">
                    Completed at -{" "}
                    {moment(project.endDate).format("YYYY-MM-DD")}
                  </p>
                  <p className="text-base tracking-wide text-gray-500 ">
                    Started at -{" "}
                    {moment(project.startDate).format("YYYY-MM-DD")}
                  </p>
                  <div className="mt-3 flex gap-2 justify-end">
                    <a
                      href={project.githubLink} target="_blank"
                      className="text-2xl w-10 h-10 rounded-full bg-black inline-flex justify-center items-center text-gray-400 hover:text-designColor duration-300 cursor-pointer"
                    >
                      <BsGithub />
                    </a>
                    <a
                      href={project.liveLink} target="_blank"
                      className="text-2xl w-10 h-10 rounded-full bg-black inline-flex justify-center items-center text-gray-400 hover:text-designColor duration-300 cursor-pointer"
                    >
                      <FaGlobe />
                    </a>
                  </div>
                </div>
                <div className="w-full md:w-[60%] h-full flex flex-col justify-between">
                  <img
                    className="w-[15%] hidden md:block"
                    src={quoteImg}
                    alt="quote"
                  />
                  <div className="w-full h-full py-5 bg-gradient-to-r from-[#1e2024] to-[#23272b] rounded-lg shadow-shadowOne p-8 flex flex-col justify-center gap-8">
                    <div className="py-6 border-b-2 border-b-gray-900">
                      <h3 className="text-2xl font-medium tracking-wide">
                        {project.title}
                      </h3>
                      <p className="mt-3 text-gray-400">
                        Technology Used :{" "}
                        <span className="text-base text-gray-400 mt-3">
                          {project.technologiesUsed}
                        </span>
                      </p>
                    </div>
                    <p className="text-base font-titleFont text-gray-400 font-medium tracking-wide leading-6 text-justify">
                      {project.description}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </section>
  );
};

export default MyProjects;
