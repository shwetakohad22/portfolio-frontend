import React, { useEffect, useState } from "react";
import Card from "./Card";
import Title from "../Title";
import axios from "axios";

const Feature = () => {
  const [features, setFeatures] = useState([]);

  const fetchData = async () => {
    try {
      const response = await axios.get(
        "https://portfolio-backend-shweta-kohad.onrender.com/api/portfolio/get-portfolio-data"
      );
      const aboutFeatures = response.data.about || [];
      setFeatures(aboutFeatures);
    } catch (error) {
      console.error("Error fetching features:", error);
      setFeatures([]);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <section
      id="features"
      className="w-full py-20 border-b-[1px] border-b-black"
    >
      <Title title="Features" desc="What I do" />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-20">
        {features.map((feature, index) => (
          <Card key={feature._id} title={feature.title} desc={feature.desc} />
        ))}
      </div>
    </section>
  );
};

export default Feature;
