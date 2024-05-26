import axios from "axios";
import React, { useEffect, useState } from "react";
import { Modal, Form, message, Input, Button } from "antd";

const AdminAbout = () => {
  const [aboutData, setAboutData] = useState([]);
  const [showAddEditModal, setShowAddEditModal] = useState(false);
  const [selectedItemForEdit, setSelectedItemForEdit] = useState(null);
  const [form] = Form.useForm();

  const fetchAboutData = async () => {
    try {
      const response = await axios.get(
        "https://portfolio-backend-shweta-kohad.onrender.com/api/portfolio/get-portfolio-data"
      );
      setAboutData(response.data.about);
    } catch (error) {
      message.error("Failed to fetch about data");
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchAboutData();
  }, []);

  const handleFormSubmit = async (values) => {
    try {
      const response = await axios.post(
        selectedItemForEdit
          ? "https://portfolio-backend-shweta-kohad.onrender.com/api/portfolio/update-about"
          : "https://portfolio-backend-shweta-kohad.onrender.com/api/portfolio/add-about",
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
        fetchAboutData();
      } else {
        message.error(response.data.message);
      }
    } catch (error) {
      message.error("Failed to save about: " + error.message);
      console.error("Error saving about:", error);
    }
  };

  const handleDelete = async (item) => {
    try {
      const response = await axios.post(
        "https://portfolio-backend-shweta-kohad.onrender.com/api/portfolio/delete-about",
        { _id: item._id },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (response.data.success) {
        message.success(response.data.message);
        fetchAboutData();
      } else {
        message.error(response.data.message);
      }
    } catch (error) {
      message.error("Failed to delete about: " + error.message);
      console.error("Error deleting about:", error);
    }
  };

  const openModal = (about = null) => {
    setSelectedItemForEdit(about);
    if (about) {
      form.setFieldsValue({
        title: about.title,
        desc: about.desc,
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
          Add About
        </Button>
      </div>
      <div className="grid grid-cols-4 gap-5 mt-5 sm:grid-cols-1">
        {aboutData.map((about) => (
          <div
            className="shadow border p-5 border-gray-400 flex flex-col"
            key={about._id}
          >
            <h1 className="text-primary text-xl font-bold mb-4">
              {about.title}
            </h1>
            <hr />
            <h1 className="mb-2 mt-4">Description: {about.desc}</h1>

            <div className="flex justify-end gap-5 mt-5">
              <Button type="danger" onClick={() => handleDelete(about)}>
                Delete
              </Button>
              <Button type="primary" onClick={() => openModal(about)}>
                Edit
              </Button>
            </div>
          </div>
        ))}
      </div>

      {showAddEditModal && (
        <Modal
          visible={showAddEditModal}
          title={selectedItemForEdit ? "Edit About" : "Add About"}
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

export default AdminAbout;
