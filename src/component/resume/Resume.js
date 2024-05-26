import React, { useState } from "react";
import Education from "./Education";
import Experience from "./Experience";
import Achievements from "./Achievements";
import Title from "../Title";

const Resume = () => {
  const [educationData, setEducationData] = useState(true);
  const [experienceData, setExperienceData] = useState(false);
  const [achievementData, setAchievementData] = useState(false);
  return (
    <section
      id="resume"
      className="w-full py-20 border-b-[1px] border-b-1px border-b-black"
    >
      <div className="flex justify-center items-center text-center">
        <Title title="7+ YEARS OF EXPERIENCE" desc="My Resume" />
      </div>
      <div>
        <ul className="w-full flex">
          <li
            onClick={() =>
              setEducationData(true) &
              setExperienceData(false) &
              setAchievementData(false)
            }
            className={`${
              educationData
                ? "border-designColor rounded-lg"
                : "border-transparent"
            } resumeLi`}
          >
            Education
          </li>

          <li
            onClick={() =>
              setEducationData(false) &
              setExperienceData(true) &
              setAchievementData(false)
            }
            className={`${
              experienceData
                ? "border-designColor rounded-lg"
                : "border-transparent"
            } resumeLi`}
          >
            Experience
          </li>
          <li
            onClick={() =>
              setEducationData(false) &
              // setSkillData(false) &
              setExperienceData(false) &
              setAchievementData(true)
            }
            className={`${
              achievementData
                ? "border-designColor rounded-lg"
                : "border-transparent"
            } resumeLi`}
          >
            Achievements
          </li>
        </ul>
      </div>
      {educationData && <Education />}
      {achievementData && <Achievements />}
      {experienceData && <Experience />}
    </section>
  );
};

export default Resume;
