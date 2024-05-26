import axios from "axios";
import React, { useEffect, useState } from "react";
import { Modal, Form, message, Input, Button, DatePicker } from "antd";
import moment from "moment";

const AdminProject = () => {
  const [projectData, setProjectData] = useState([]);
  const [showAddEditModal, setShowAddEditModal] = useState(false);
  const [selectedItemForEdit, setSelectedItemForEdit] = useState(null);
  const [form] = Form.useForm();

  const fetchProjectData = async () => {
    try {
      const response = await axios.get(
        "https://portfolio-backend-shweta-kohad.onrender.com/api/portfolio/get-portfolio-data"
      );
      setProjectData(response.data.project);
    } catch (error) {
      message.error("Failed to fetch project data");
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchProjectData();
  }, []);

  const handleFormSubmit = async (values) => {
    const formattedValues = {
      ...values,
      startDate: values.startDate.format("YYYY-MM-DD"),
      endDate: values.endDate.format("YYYY-MM-DD"),
    };

    try {
      const response = await axios.post(
        selectedItemForEdit
          ? "https://portfolio-backend-shweta-kohad.onrender.com/api/portfolio/update-project"
          : "https://portfolio-backend-shweta-kohad.onrender.com/api/portfolio/add-project",
        selectedItemForEdit
          ? { ...formattedValues, _id: selectedItemForEdit._id }
          : formattedValues,
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
        fetchProjectData();
      } else {
        message.error(response.data.message);
      }
    } catch (error) {
      message.error("Failed to save project: " + error.message);
      console.error("Error saving project:", error);
    }
  };

  const handleDelete = async (item) => {
    try {
      const response = await axios.post(
        "https://portfolio-backend-shweta-kohad.onrender.com/api/portfolio/delete-project",
        { _id: item._id },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (response.data.success) {
        message.success(response.data.message);
        fetchProjectData();
      } else {
        message.error(response.data.message);
      }
    } catch (error) {
      message.error("Failed to delete project: " + error.message);
      console.error("Error deleting project:", error);
    }
  };

  const openModal = (project = null) => {
    setSelectedItemForEdit(project);
    if (project) {
      form.setFieldsValue({
        title: project.title,
        technologiesUsed: project.technologiesUsed.join(", "),
        startDate: moment(project.startDate),
        endDate: moment(project.endDate),
        githubLink: project.githubLink,
        liveLink: project.liveLink,
        description: project.description,
        image: project.image,
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
          Add Project
        </Button>
      </div>
      <div className="grid grid-cols-4 gap-5 mt-5 sm:grid-cols-1">
        {projectData.map((project) => (
          <div
            className="shadow border p-5 border-gray-400 flex flex-col"
            key={project._id}
          >
            <h1 className="text-primary text-xl font-bold mb-4">
              {project.title}
            </h1>
            <hr />
            <h1 className="mt-3">
              Technologies Used: {project.technologiesUsed.join(", ")}
            </h1>
            <h1 className="mt-2 mb-2">Description: {project.description}</h1>
            <h1 className="mb-2">
              Start Date: {moment(project.startDate).format("YYYY-MM-DD")}
            </h1>
            <h1 className="mb-2">
              End Date: {moment(project.endDate).format("YYYY-MM-DD")}
            </h1>
            <h1 className="mb-2">GitHub Link: {project.githubLink}</h1>
            <h1 className="mb-2">Live Link: {project.liveLink}</h1>
            <h1 className="mb-2">
              Image:
              <img
                src={project.image}
                alt={project.title}
                className="project-image"
              />
            </h1>
            <div className="flex justify-end gap-5 mt-5">
              <Button type="danger" onClick={() => handleDelete(project)}>
                Delete
              </Button>
              <Button type="primary" onClick={() => openModal(project)}>
                Edit
              </Button>
            </div>
          </div>
        ))}
      </div>

      {showAddEditModal && (
        <Modal
          visible={showAddEditModal}
          title={selectedItemForEdit ? "Edit Project" : "Add Project"}
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
              <Input name="title" placeholder="Title" />
            </Form.Item>
            <Form.Item
              name="technologiesUsed"
              label="Technologies Used"
              rules={[
                {
                  required: true,
                  message: "Please enter the technologies used",
                },
              ]}
            >
              <Input name="technologiesUsed" placeholder="Technologies Used" />
            </Form.Item>
            <Form.Item
              name="startDate"
              label="Start Date"
              rules={[
                { required: true, message: "Please enter the start date" },
              ]}
            >
              <DatePicker name="startDate" format="YYYY-MM-DD" />
            </Form.Item>
            <Form.Item
              name="endDate"
              label="End Date"
              rules={[{ required: true, message: "Please enter the end date" }]}
            >
              <DatePicker name="endDate" format="YYYY-MM-DD" />
            </Form.Item>
            <Form.Item
              name="githubLink"
              label="GitHub Link"
              rules={[
                { required: true, message: "Please enter the GitHub link" },
              ]}
            >
              <Input name="githubLink" placeholder="GitHub Link" />
            </Form.Item>
            <Form.Item
              name="liveLink"
              label="Live Link"
              rules={[
                { required: true, message: "Please enter the live link" },
              ]}
            >
              <Input name="liveLink" placeholder="Live Link" />
            </Form.Item>
            <Form.Item
              name="description"
              label="Description"
              rules={[
                { required: true, message: "Please enter the description" },
              ]}
            >
              <Input name="description" placeholder="Description" />
            </Form.Item>
            <Form.Item
              name="image"
              label="Image"
              rules={[
                { required: true, message: "Please enter the image URL" },
              ]}
            >
              <Input name="image" placeholder="Image URL" />
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

export default AdminProject;
