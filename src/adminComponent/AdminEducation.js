import axios from "axios";
import React, { useEffect, useState } from "react";
import { Modal, Form, message, Input, Button } from "antd";

const AdminEducation = () => {
  const [educationData, setEducationData] = useState([]);
  const [showAddEditModal, setShowAddEditModal] = useState(false);
  const [selectedItemForEdit, setSelectedItemForEdit] = useState(null);
  const [form] = Form.useForm();

  const fetchEducationData = async () => {
    try {
      const response = await axios.get(
        "https://portfolio-backend-shweta-kohad.onrender.com/api/portfolio/get-portfolio-data"
      );
      setEducationData(response.data.education);
    } catch (error) {
      message.error("Failed to fetch education data");
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchEducationData();
  }, []);

  const handleFormSubmit = async (values) => {
    try {
      const response = await axios.post(
        selectedItemForEdit
          ? "https://portfolio-backend-shweta-kohad.onrender.com/api/portfolio/update-education"
          : "https://portfolio-backend-shweta-kohad.onrender.com/api/portfolio/add-education",
        selectedItemForEdit
          ? { ...values, _id: selectedItemForEdit._id }
          : values,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.data.success) {
        message.success(response.data.message);
        setShowAddEditModal(false);
        setSelectedItemForEdit(null);
        form.resetFields();
        fetchEducationData();
      } else {
        message.error(response.data.message);
      }
    } catch (error) {
      message.error("Failed to save education: " + error.message);
      console.error("Error saving education:", error);
    }
  };

  const handleDelete = async (item) => {
    try {
      const response = await axios.post(
        "https://portfolio-backend-shweta-kohad.onrender.com/api/portfolio/delete-education",
        { _id: item._id },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (response.data.success) {
        message.success(response.data.message);
        fetchEducationData();
      } else {
        message.error(response.data.message);
      }
    } catch (error) {
      message.error("Failed to delete education: " + error.message);
      console.error("Error deleting education:", error);
    }
  };

  const openModal = (education = null) => {
    setSelectedItemForEdit(education);
    if (education) {
      form.setFieldsValue({
        title: education.title,
        subtitle: education.subtitle,
        result: education.result,
        period: education.period,
        desc: education.desc,
      });
    } else {
      form.resetFields();
    }
    setShowAddEditModal(true);
  };

  return (
    <div>
      <div className="flex justify-end">
        <Button type="primary" onClick={() => openModal()}>
          Add Education
        </Button>
      </div>
      <div className="grid grid-cols-4 gap-5 mt-5 sm:grid-cols-1">
        {educationData.map((education) => (
          <div
            className="shadow border p-5 border-gray-400 flex flex-col"
            key={education._id}
          >
            <h1 className="text-primary text-xl font-bold mb-4">
              {education.title}
            </h1>
            <hr />
            <h1 className="mb-2 mt-4">Period: {education.period}</h1>
            <h1 className="mb-2">Subtitle: {education.subtitle}</h1>
            <h1 className="mb-2">Result: {education.result}</h1>
            <h1 className="mb-2">Description: {education.desc}</h1>

            <div className="flex justify-end gap-5 mt-5">
              <Button type="danger" onClick={() => handleDelete(education)}>
                Delete
              </Button>
              <Button type="primary" onClick={() => openModal(education)}>
                Edit
              </Button>
            </div>
          </div>
        ))}
      </div>

      {showAddEditModal && (
        <Modal
          visible={showAddEditModal}
          title={selectedItemForEdit ? "Edit Education" : "Add Education"}
          footer={null}
          onCancel={() => {
            setShowAddEditModal(false);
            setSelectedItemForEdit(null);
          }}
        >
          <Form form={form} layout="vertical" onFinish={handleFormSubmit}>
            <Form.Item
              name="title"
              label="Title"
              rules={[{ required: true, message: "Please enter the title" }]}
            >
              <Input placeholder="Title" />
            </Form.Item>
            <Form.Item
              name="subtitle"
              label="Subtitle"
              rules={[{ required: true, message: "Please enter the subtitle" }]}
            >
              <Input placeholder="Subtitle" />
            </Form.Item>
            <Form.Item
              name="result"
              label="Result"
              rules={[{ required: true, message: "Please enter the result" }]}
            >
              <Input placeholder="Result" />
            </Form.Item>
            <Form.Item
              name="period"
              label="Period"
              rules={[{ required: true, message: "Please enter the period" }]}
            >
              <Input placeholder="Period (e.g., 2015-2019)" />
            </Form.Item>
            <Form.Item
              name="desc"
              label="Description"
              rules={[
                { required: true, message: "Please enter the description" },
              ]}
            >
              <Input placeholder="Description" />
            </Form.Item>
            <div className="flex justify-end">
              <Button
                className="mr-2"
                onClick={() => {
                  setShowAddEditModal(false);
                  setSelectedItemForEdit(null);
                }}
              >
                Cancel
              </Button>
              <Button type="primary" htmlType="submit">
                {selectedItemForEdit ? "Update" : "Add"}
              </Button>
            </div>
          </Form>
        </Modal>
      )}
    </div>
  );
};

export default AdminEducation;
