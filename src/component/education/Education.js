import React, { useEffect, useState } from "react";
import axios from "axios";
import Title from "../Title";

const Education = () => {
  const [selectedItemIndex, setSelectedItemIndex] = useState(0);
  const [educationData, setEducationData] = useState([]);

  useEffect(() => {
    const fetchEducationData = async () => {
      try {
        const response = await axios.get(
          "https://portfolio-backend-shweta-kohad.onrender.com/api/portfolio/get-portfolio-data"
        );

        if (response.data.education) {
          setEducationData(response.data.education.reverse());
        }
      } catch (error) {
        console.error("Failed to fetch education data", error);
      }
    };

    fetchEducationData();
  }, []);

  if (educationData.length === 0) {
    return <div>Loading...</div>;
  }

  return (
    <section
      id="education"
      className="w-full py-20 border-b-[1px] border-b-black"
    >
      <div className="flex justify-center items-center text-center mb-10">
        <Title
          title="VISIT MY PORTFOLIO AND KEEP YOUR FEEDBACK"
          desc="Education"
        />
      </div>

      <div className="w-full flex flex-col items-center">
        {/* Periods List for Mobile */}
        <div className="w-full flex justify-center mb-10 md:hidden">
          <div className="w-full flex overflow-x-auto scrollbar-thin scrollbar-thumb-rounded-full scrollbar-thumb-gray-600">
            {educationData.map((education, index) => (
              <div
                key={index}
                className={`p-3 cursor-pointer flex-shrink-0 min-w-[120px] ${
                  selectedItemIndex === index ? "text-red-500" : "text-gray-400"
                }`}
                onClick={() => setSelectedItemIndex(index)}
              >
                <h1 className="text-xl">{education.period}</h1>
              </div>
            ))}
          </div>
        </div>

        <div className="max-w-6xl w-full flex flex-wrap md:flex-nowrap justify-between gap-8">
          {/* Periods List for Desktop */}
          <div className="hidden md:flex w-full md:w-[35%] flex-col justify-between bg-gradient-to-r from-[#1e2024] to-[#23272b] p-6 shadow-shadowOne h-auto">
            <div className="flex flex-col gap-5">
              {educationData.map((education, index) => (
                <div
                  key={index}
                  className={`p-3 cursor-pointer ${
                    selectedItemIndex === index
                      ? "text-red-500"
                      : "text-gray-400"
                  }`}
                  onClick={() => setSelectedItemIndex(index)}
                >
                  <h1 className="text-xl">{education.period}</h1>
                </div>
              ))}
            </div>
          </div>

          {/* Education Details */}
          <div className="w-full md:w-[60%] flex flex-col justify-between bg-gradient-to-r from-[#1e2024] to-[#23272b] p-8 rounded-lg shadow-shadowOne h-auto mt-8 md:mt-0">
            <div>
              <h1 className="text-3xl font-medium tracking-wide text-white">
                {educationData[selectedItemIndex].title}
              </h1>
              <p className="text-xl text-gray-400 mt-4">
                {educationData[selectedItemIndex].subtitle}
              </p>
              <p className="text-xl text-gray-400 mt-4">
                Result: {educationData[selectedItemIndex].result}
              </p>
              <p className="text-base text-gray-400 mt-6">
                {educationData[selectedItemIndex].desc}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Education;
