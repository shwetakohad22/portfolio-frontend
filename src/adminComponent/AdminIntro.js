import React, { useEffect, useState } from "react";
import { Form, Input, message } from "antd";
import axios from "axios";

function AdminIntro() {
  const [introData, setIntroData] = useState({});
  const [form] = Form.useForm();

  const onFinish = async (values) => {
    try {
      const response = await axios.post(
        "https://portfolio-backend-shweta-kohad.onrender.com/api/portfolio/update-intro",
        {
          ...values,
          _id: introData._id,
        }
      );
      if (response.data.success) {
        message.success(response.data.message);
      } else {
        message.error(response.data.message);
      }
    } catch (error) {
      message.error(error.message);
    }
  };

  const fetchIntroData = async () => {
    try {
      const response = await axios.get(
        "https://portfolio-backend-shweta-kohad.onrender.com/api/portfolio/get-portfolio-data"
      );
      console.log(response.data.intro);
      if (response.data.intro) {
        setIntroData(response.data.intro);
        form.setFieldsValue(response.data.intro);
      }
    } catch (error) {
      message.error("Failed to fetch intro data");
    }
  };

  useEffect(() => {
    fetchIntroData();
  }, [form]);

  return (
    <div>
      <Form form={form} onFinish={onFinish} layout="vertical">
        <Form.Item name="welcomeMessage" label="Welcome Text">
          <Input placeholder="Welcome Text" />
        </Form.Item>
        <Form.Item name="name" label="Name">
          <Input placeholder="Name" />
        </Form.Item>
        <Form.Item name="description" label="Description">
          <Input placeholder="Description" />
        </Form.Item>
        <div className="flex justify-end w-full" label="Welcome Text">
          <button
            className="px-10 py-3 mr-20 bg-gradient-to-r from-[#1e2024] to-[#23272b] text-white"
            type="submit"
          >
            SAVE
          </button>
        </div>
      </Form>
    </div>
  );
}

export default AdminIntro;
