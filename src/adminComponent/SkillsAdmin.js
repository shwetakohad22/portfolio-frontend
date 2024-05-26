import axios from "axios";
import React, { useEffect, useState } from "react";
import { Modal, Form, message, Input, Button } from "antd";

const SkillsAdmin = () => {
  const [skillsData, setSkillsData] = useState([]);
  const [showAddEditModal, setShowAddEditModal] = useState(false);
  const [selectedItemForEdit, setSelectedItemForEdit] = useState(null);
  const [form] = Form.useForm();

  const fetchSkillsData = async () => {
    try {
      const response = await axios.get(
        "https://portfolio-backend-shweta-kohad.onrender.com/api/portfolio/get-portfolio-data"
      );
      setSkillsData(response.data.skills); // Ensure the backend sends the correct data structure
    } catch (error) {
      message.error("Failed to fetch skills data");
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchSkillsData();
  }, []);

  const handleFormSubmit = async (values) => {
    try {
      const response = await axios.post(
        selectedItemForEdit
          ? "https://portfolio-backend-shweta-kohad.onrender.com/api/portfolio/update-skill"
          : "https://portfolio-backend-shweta-kohad.onrender.com/api/portfolio/add-skills",
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
        fetchSkillsData();
      } else {
        message.error(response.data.message);
      }
    } catch (error) {
      message.error("Failed to save skill: " + error.message);
      console.error("Error saving skill:", error);
    }
  };

  const handleDelete = async (item) => {
    try {
      const response = await axios.post(
        "https://portfolio-backend-shweta-kohad.onrender.com/api/portfolio/delete-skill",
        { _id: item._id },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (response.data.success) {
        message.success(response.data.message);
        fetchSkillsData();
      } else {
        message.error(response.data.message);
      }
    } catch (error) {
      message.error("Failed to delete skill: " + error.message);
      console.error("Error deleting skill:", error);
    }
  };

  const openModal = (skill = null) => {
    setSelectedItemForEdit(skill);
    if (skill) {
      form.setFieldsValue({
        name: skill.name,
        percentage: skill.percentage,
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
          Add Skill
        </Button>
      </div>
      <div className="grid grid-cols-4 gap-5 mt-5 sm:grid-cols-1">
        {skillsData.map((skill) => (
          <div
            className="shadow border p-5 border-gray-400 flex flex-col"
            key={skill._id}
          >
            <h1 className="text-primary text-xl font-bold mb-4">
              {skill.name}
            </h1>
            <hr />
            <h1 className="mb-2 mt-4">Percentage: {skill.percentage}%</h1>

            <div className="flex justify-end gap-5 mt-5">
              <Button type="danger" onClick={() => handleDelete(skill)}>
                Delete
              </Button>
              <Button type="primary" onClick={() => openModal(skill)}>
                Edit
              </Button>
            </div>
          </div>
        ))}
      </div>

      {showAddEditModal && (
        <Modal
          visible={showAddEditModal}
          title={selectedItemForEdit ? "Edit Skill" : "Add Skill"}
          footer={null}
          onCancel={() => {
            setShowAddEditModal(false);
            setSelectedItemForEdit(null);
          }}
        >
          <Form form={form} layout="vertical" onFinish={handleFormSubmit}>
            <Form.Item
              name="name"
              label="Name"
              rules={[
                { required: true, message: "Please enter the skill name" },
              ]}
            >
              <Input placeholder="Skill Name" />
            </Form.Item>
            <Form.Item
              name="percentage"
              label="Percentage"
              rules={[
                { required: true, message: "Please enter the percentage" },
              ]}
            >
              <Input type="number" placeholder="Percentage" />
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

export default SkillsAdmin;
