import React, { useEffect, useState } from "react";
import { Form, Input, message } from "antd";
import axios from "axios";

function AdminContact() {
  const [contactData, setContactData] = useState({});
  const [form] = Form.useForm();

  const onFinish = async (values) => {
    try {
      const response = await axios.post(
        "https://portfolio-backend-shweta-kohad.onrender.com/api/portfolio/update-contact",
        {
          ...values,
          _id: contactData._id,
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

  useEffect(() => {
    const fetchContactData = async () => {
      try {
        const response = await axios.get(
          "https://portfolio-backend-shweta-kohad.onrender.com/api/portfolio/get-portfolio-data"
        );

        if (response.data.contact) {
          setContactData(response.data.contact);
          form.setFieldsValue(response.data.contact);
        }
      } catch (error) {
        message.error("Failed to fetch contact data");
      }
    };
    fetchContactData();
  }, [form]);

  return (
    <div>
      <Form form={form} onFinish={onFinish} layout="vertical">
        <Form.Item name="name" label="Name">
          <Input placeholder="Name" />
        </Form.Item>
        <Form.Item name="description" label="Description">
          <Input.TextArea placeholder="Description" />
        </Form.Item>
        <Form.Item name="phone" label="Phone">
          <Input placeholder="Phone" />
        </Form.Item>
        <Form.Item name="email" label="Email">
          <Input placeholder="Email" />
        </Form.Item>
        <Form.Item name="address" label="Address">
          <Input placeholder="Address" />
        </Form.Item>
        <div className="flex justify-end w-full">
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

export default AdminContact;
