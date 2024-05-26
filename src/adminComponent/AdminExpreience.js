import axios from "axios";
import React, { useEffect, useState } from "react";
import { Modal, Form, message } from "antd";

const AdminExpreience = () => {
  const [experienceData, setExperienceData] = useState([]);
  const [showAddEditModal, setShowAddEditModal] = useState(false);
  const [selectedItemForEdit, setSelectedItemForEdit] = useState(null);
  const [formData, setFormData] = useState({
    period: "",
    company: "",
    role: "",
    description: "",
  });

  const fetchExperienceData = async () => {
    try {
      const response = await axios.get(
        "https://portfolio-backend-shweta-kohad.onrender.com/api/portfolio/get-portfolio-data"
      );
      setExperienceData(response.data.experience);
    } catch (error) {
      message.error("Failed to fetch experience data");
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchExperienceData();
  }, []);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFormSubmit = async () => {
    try {
      const response = await axios.post(
        selectedItemForEdit
          ? "https://portfolio-backend-shweta-kohad.onrender.com/api/portfolio/update-experience"
          : "https://portfolio-backend-shweta-kohad.onrender.com/api/portfolio/add-experience",
        selectedItemForEdit
          ? { ...formData, _id: selectedItemForEdit._id }
          : formData,
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
        setFormData({ period: "", company: "", role: "", description: "" });
        fetchExperienceData();
      } else {
        message.error(response.data.message);
      }
    } catch (error) {
      message.error("Failed to save experience: " + error.message);
      console.error("Error saving experience:", error);
    }
  };

  const handleDelete = async (item) => {
    try {
      const response = await axios.post(
        "https://portfolio-backend-shweta-kohad.onrender.com/api/portfolio/delete-experience",
        { _id: item._id },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (response.data.success) {
        message.success(response.data.message);
        fetchExperienceData();
      } else {
        message.error(response.data.message);
      }
    } catch (error) {
      message.error("Failed to delete experience: " + error.message);
      console.error("Error deleting experience:", error);
    }
  };

  return (
    <div>
      <div className="flex justify-end">
        <button
          className="bg-blue-600 px-5 py-2 text-white"
          onClick={() => {
            setSelectedItemForEdit(null);
            setShowAddEditModal(true);
          }}
        >
          Add Experience
        </button>
      </div>
      <div className="grid grid-cols-4 gap-5 mt-5 sm:grid-cols-1">
        {experienceData.map((experience) => (
          <div
            className="shadow border p-5 border-gray-400 flex flex-col"
            key={experience._id}
          >
            <h1 className="text-primary text-xl font-bold mb-4">
              {experience.period}
            </h1>
            <hr />
            <h1 className="mt-3">Company: {experience.company}</h1>
            <h1 className="mt-2 mb-2">Role: {experience.role}</h1>
            <h1 className="mb-2">Description: {experience.description}</h1>
            <div className="flex justify-end gap-5 mt-5">
              <button
                className="bg-red-500 text-white px-5 py-2"
                onClick={() => handleDelete(experience)}
              >
                Delete
              </button>
              <button
                className="bg-blue-600 text-white px-5 py-2"
                onClick={() => {
                  setSelectedItemForEdit(experience);
                  setFormData({
                    period: experience.period,
                    company: experience.company,
                    role: experience.role,
                    description: experience.description,
                  });
                  setShowAddEditModal(true);
                }}
              >
                Edit
              </button>
            </div>
          </div>
        ))}
      </div>

      {(selectedItemForEdit !== null || showAddEditModal) && (
        <Modal
          visible={showAddEditModal}
          title={selectedItemForEdit ? "Edit Experience" : "Add Experience"}
          footer={null}
          onCancel={() => {
            setShowAddEditModal(false);
            setSelectedItemForEdit(null);
          }}
        >
          <Form
            layout="vertical"
            onFinish={handleFormSubmit}
            initialValues={formData}
          >
            <Form.Item name="period" label="Period">
              <input
                name="period"
                placeholder="Period"
                value={formData.period}
                onChange={handleInputChange}
              />
            </Form.Item>
            <Form.Item name="company" label="Company">
              <input
                name="company"
                placeholder="Company"
                value={formData.company}
                onChange={handleInputChange}
              />
            </Form.Item>
            <Form.Item name="role" label="Role">
              <input
                name="role"
                placeholder="Role"
                value={formData.role}
                onChange={handleInputChange}
              />
            </Form.Item>
            <Form.Item name="description" label="Description">
              <input
                name="description"
                placeholder="Description"
                value={formData.description}
                onChange={handleInputChange}
              />
            </Form.Item>
            <div className="flex justify-end">
              <button
                className="border-primary text-primary px-5 py-2"
                onClick={() => {
                  setShowAddEditModal(false);
                  setSelectedItemForEdit(null);
                }}
              >
                Cancel
              </button>
              <button
                className="bg-blue-600 text-white px-5 py-2"
                type="submit"
              >
                {selectedItemForEdit ? "Update" : "Add"}
              </button>
            </div>
          </Form>
        </Modal>
      )}
    </div>
  );
};

export default AdminExpreience;
