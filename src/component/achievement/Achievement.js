import React, { useEffect, useState } from "react";
import axios from "axios";
import Title from "../Title";
import AchievementCard from "./AchievementCard";

const Achievement = () => {
  const [achievements, setAchievements] = useState([]);

  const fetchAchievementData = async () => {
    try {
      const response = await axios.get(
        "https://portfolio-backend-shweta-kohad.onrender.com/api/portfolio/get-portfolio-data"
      );
      // console.log(response.data.achievement);
      setAchievements(response.data.achievement);
    } catch (error) {
      console.error("Error fetching achievement data:", error);
    }
  };

  useEffect(() => {
    fetchAchievementData();
  }, []);

  return (
    <section
      id="achievement"
      className="w-full py-20 border-b-[1px] border-b-1px border-b-black"
    >
      <div className="flex justify-center items-center text-center">
        <Title
          title="VISIT MY PORTFOLIO AND KEEP YOUR FEEDBACK"
          desc="My Achievements"
        />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 xl:gap-14">
        {achievements.map((achievement) => (
          <AchievementCard
            key={achievement._id}
            title={achievement.title}
            des={achievement.desc}
            img={achievement.img}
            src={achievement.imageUrl}
          />
        ))}
      </div>
    </section>
  );
};

export default Achievement;
