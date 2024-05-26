import React, { useEffect, useState } from "react";
import axios from "axios";
import Title from "../Title";

const Experience = () => {
  const [selectedItemIndex, setSelectedItemIndex] = useState(0);
  const [experienceData, setExperienceData] = useState([]);

  useEffect(() => {
    const fetchExperienceData = async () => {
      try {
        const response = await axios.get(
          "https://portfolio-backend-shweta-kohad.onrender.com/api/portfolio/get-portfolio-data"
        );

        if (response.data.experience) {
          setExperienceData(response.data.experience);
        }
      } catch (error) {
        // message.error("Failed to fetch experience data");
      }
    };

    fetchExperienceData();
  }, []);

  if (experienceData.length === 0) {
    return <div>Loading...</div>;
  }

  return (
    <section
      id="experience"
      className="w-full py-20 border-b-[1px] border-b-black"
    >
      <div className="flex justify-center items-center text-center mb-10">
        <Title
          title="VISIT MY PORTFOLIO AND KEEP YOUR FEEDBACK"
          desc="Experience"
        />
      </div>

      <div className="w-full flex flex-col items-center">
        {/* Periods List for Mobile */}
        <div className="w-full flex justify-center mb-10 md:hidden">
          <div className="w-full flex overflow-x-auto scrollbar-thin scrollbar-thumb-rounded-full scrollbar-thumb-gray-600">
            {experienceData.map((experience, index) => (
              <div
                key={index}
                className={`p-3 cursor-pointer flex-shrink-0 ${
                  selectedItemIndex === index ? "text-red-500" : "text-gray-400"
                }`}
                onClick={() => {
                  setSelectedItemIndex(index);
                }}
              >
                <h1 className="text-xl">{experience.period}</h1>
              </div>
            ))}
          </div>
        </div>

        <div className="max-w-6xl w-full flex flex-wrap md:flex-nowrap justify-between gap-8">
          {/* Periods List for Desktop */}
          <div className="hidden md:flex w-full md:w-[35%] flex-col justify-between bg-gradient-to-r from-[#1e2024] to-[#23272b] p-6 shadow-shadowOne h-auto">
            <div className="flex flex-col gap-5">
              {experienceData.map((experience, index) => (
                <div
                  key={index}
                  className={`p-3 cursor-pointer ${
                    selectedItemIndex === index
                      ? "text-red-500"
                      : "text-gray-400"
                  }`}
                  onClick={() => {
                    setSelectedItemIndex(index);
                  }}
                >
                  <h1 className="text-xl">{experience.period}</h1>
                </div>
              ))}
            </div>
          </div>

          {/* Experience Details */}
          <div className="w-full md:w-[60%] flex flex-col justify-between bg-gradient-to-r from-[#1e2024] to-[#23272b] p-8 rounded-lg shadow-shadowOne h-auto mt-8 md:mt-0">
            <div>
              <h1 className="text-3xl font-medium tracking-wide text-white">
                {experienceData[selectedItemIndex].role}
              </h1>
              <h1 className="text-3xl font-medium tracking-wide text-white">
                {experienceData[selectedItemIndex].title}
              </h1>
              <p className="text-xl text-gray-400 mt-4">
                {experienceData[selectedItemIndex].company}
              </p>
              <p className="text-base text-gray-400 mt-6">
                {experienceData[selectedItemIndex].description}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Experience;
