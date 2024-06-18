import React from "react";
import Navbar from "./component/navbar/Navbar";
import Banner from "./component/banner/Banner";
import Feature from "./component/feature/Feature";
// import Resume from "./component/resume/Resume";
import Skills from "./component/resume/Skills";
import Contact from "./component/contact/Contact";
import Footer from "./component/footer/Footer";
import Experience from "./component/experience/Experience";
import MyProjects from "./component/MyProjects/MyProjects";
import Education from "./component/education/Education";
import Achievement from "./component/achievement/Achievement";

const Home = () => {
  return (
    <div className="w-full h-auto bg-bodyColor text-lightText">
      <Navbar />

      <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 md:px-16">
        <Banner />
        <Feature />
        <Skills />
        <MyProjects />
        {/* <Resume /> */}
        <Experience />
        <Education />
        <Achievement />
        <Contact />
        <Footer />
      </div>
    </div>
  );
};

export default Home;
