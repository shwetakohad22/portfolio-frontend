import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Title from "../Title";
import axios from "axios";

const Skills = () => {
  const [skillChunks, setSkillChunks] = useState([]);

  const chunkArray = (arr, size) => {
    const result = [];
    for (let i = 0; i < arr.length; i += size) {
      result.push(arr.slice(i, i + size));
    }
    return result;
  };

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await axios.get(
          "https://portfolio-backend-shweta-kohad.onrender.com/api/portfolio/get-portfolio-data"
        );
        const fetchedSkills = response.data.skills || [];
        const chunks = chunkArray(fetchedSkills, 2);
        setSkillChunks(chunks);
      } catch (error) {
        console.error("Error fetching skills:", error);
      }
    };
    getData();
  }, []);

  return (
    <section id="skills" className="w-full py-20 border-b-[1px] border-b-black">
      <div className="flex justify-center items-center text-center">
        <Title
          title="VISIT MY PORTFOLIO AND KEEP YOUR FEEDBACK"
          desc="Professional Skills"
        />
      </div>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, transition: 0.5 }}
        className="py-5 font-titleFont"
      >
        {skillChunks.map((chunk, index) => (
          <div
            className="flex flex-col md:flex-row md:justify-between gap-8 mb-8"
            key={index}
          >
            {chunk.map((skill) => (
              <div className="w-full md:w-1/2" key={skill.name}>
                <div className="mt-1 w-full flex flex-col gap-6">
                  <div className="overflow-x-hidden">
                    <p className="text-sm uppercase font-medium">
                      {skill.name}
                    </p>
                    <span className="w-full h-2 bg-opacity-100 bg-gray-300 inline-flex rounded-md mt-2">
                      <motion.span
                        initial={{ x: "-100%", opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ duration: 0.5, delay: 0.5 }}
                        style={{ width: `${skill.percentage}%` }}
                        className="h-full bg-gradient-to-r from-blue-600 via-pink-500 to-red-500 rounded-md relative"
                      >
                        <span className="absolute -top-7 right-1">
                          {skill.percentage}%
                        </span>
                      </motion.span>
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ))}
      </motion.div>
    </section>
  );
};

export default Skills;
