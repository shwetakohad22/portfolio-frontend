import axios from "axios";
import React, { useEffect, useState } from "react";
import { Modal, Form, message, Input, Button } from "antd";

const AdminAchievement = () => {
  const [achievementData, setAchievementData] = useState([]);
  const [showAddEditModal, setShowAddEditModal] = useState(false);
  const [selectedItemForEdit, setSelectedItemForEdit] = useState(null);
  const [form] = Form.useForm();

  const fetchAchievementData = async () => {
    try {
      const response = await axios.get(
        "https://portfolio-backend-shweta-kohad.onrender.com/api/portfolio/get-portfolio-data"
      );
      setAchievementData(response.data.achievement);
    } catch (error) {
      message.error("Failed to fetch achievement data");
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchAchievementData();
  }, []);

  const handleFormSubmit = async (values) => {
    try {
      const response = await axios.post(
        selectedItemForEdit
          ? "https://portfolio-backend-shweta-kohad.onrender.com/api/portfolio/update-achievement"
          : "https://portfolio-backend-shweta-kohad.onrender.com/api/portfolio/add-achievement",
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
        fetchAchievementData();
      } else {
        message.error(response.data.message);
      }
    } catch (error) {
      message.error("Failed to save achievement: " + error.message);
      console.error("Error saving achievement:", error);
    }
  };

  const handleDelete = async (item) => {
    try {
      const response = await axios.post(
        "https://portfolio-backend-shweta-kohad.onrender.com/api/portfolio/delete-achievement",
        { _id: item._id },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (response.data.success) {
        message.success(response.data.message);
        fetchAchievementData();
      } else {
        message.error(response.data.message);
      }
    } catch (error) {
      message.error("Failed to delete achievement: " + error.message);
      console.error("Error deleting achievement:", error);
    }
  };

  const openModal = (achievement = null) => {
    setSelectedItemForEdit(achievement);
    if (achievement) {
      form.setFieldsValue({
        title: achievement.title,
        imageUrl: achievement.imageUrl,
        img: achievement.img,
        desc: achievement.desc,
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
          Add Achievement
        </Button>
      </div>
      <div className="grid grid-cols-4 gap-5 mt-5 sm:grid-cols-1">
        {achievementData.map((achievement) => (
          <div
            className="shadow border p-5 border-gray-400 flex flex-col"
            key={achievement._id}
          >
            <h1 className="text-primary text-xl font-bold mb-4">
              {achievement.title}
            </h1>
            <img
              className="mb-4"
              src={achievement.imageUrl}
              alt={achievement.title}
              style={{ width: "100%", height: "auto" }}
            />

            <h1 className="mb-2">Description: {achievement.desc}</h1>

            <div className="flex justify-end gap-5 mt-5">
              <Button type="danger" onClick={() => handleDelete(achievement)}>
                Delete
              </Button>
              <Button type="primary" onClick={() => openModal(achievement)}>
                Edit
              </Button>
            </div>
          </div>
        ))}
      </div>

      <Modal
        open={showAddEditModal} // Updated prop from 'visible' to 'open'
        title={selectedItemForEdit ? "Edit Achievement" : "Add Achievement"}
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
            name="imageUrl"
            label="Image URL"
            rules={[{ required: true, message: "Please enter the image URL" }]}
          >
            <Input placeholder="Image URL" />
          </Form.Item>
          <Form.Item
            name="img"
            label="Image"
            rules={[{ required: true, message: "Please enter the image" }]}
          >
            <Input placeholder="Image" />
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
    </div>
  );
};

export default AdminAchievement;
