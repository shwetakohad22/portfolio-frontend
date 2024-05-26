import { Tabs } from "antd";
import React, { useEffect } from "react";
import AdminIntro from "./adminComponent/AdminIntro";
import AdminAbout from "./adminComponent/AdminAbout";
import AdminContact from "./adminComponent/AdminContact";
import AdminProject from "./adminComponent/AdminProject";
import AdminExpreience from "./adminComponent/AdminExpreience";
import AdminEducation from "./adminComponent/AdminEducation";
import SkillsAdmin from "./adminComponent/SkillsAdmin";
import { useNavigate } from "react-router-dom";

const Admin = () => {
  const navigate = useNavigate();
  useEffect(() => {
    if (!localStorage.getItem("token")) {
      navigate("/admin-login");
    }
  }, []);
  const tabItems = [
    {
      key: "1",
      label: "Intro",
      children: <AdminIntro />,
    },
    {
      key: "2",
      label: "About",
      children: <AdminAbout />,
    },
    {
      key: "3",
      label: "Contact",
      children: <AdminContact />,
    },
    {
      key: "4",
      label: "Experience",
      children: <AdminExpreience />,
    },
    {
      key: "5",
      label: "Projects",
      children: <AdminProject />,
    },
    {
      key: "6",
      label: "Education",
      children: <AdminEducation />,
    },
    {
      key: "7",
      label: "Skills",
      children: <SkillsAdmin />,
    },
  ];

  return (
    <div className="mt-5 p-5">
      <Tabs defaultActiveKey="1" items={tabItems} tabPosition="left" />
    </div>
  );
};

export default Admin;
