import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import SeeAllLectures from "./AllLectures";

const AddLectureForm = ({ handleLogout }) => {
  const [formData, setFormData] = useState({
    lectureName: "",
    description: "",
    date: "",
    instructorId: "",
    duration: "",
  });

  const [instructors, setInstructors] = useState([]);
  const [updateFormData, setUpdateFormData] = useState(null); // State for storing data to update
  const navigate = useNavigate();

  useEffect(() => {
    const fetchInstructors = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          throw new Error("No token found");
        }

        const response = await axios.get("http://localhost:8000/api/users", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setInstructors(response.data);
      } catch (error) {
        console.error("Failed to fetch instructors:", error.message);
      }
    };

    fetchInstructors();
  }, []);

  // Function to handle form submission for adding or updating lecture
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("No token found");
      }

      // Determine if it's an add or update operation based on updateFormData state
      const apiUrl = updateFormData
        ? `http://localhost:8000/api/lectures/${updateFormData.id}` // Update URL
        : "http://localhost:8000/api/lectures"; // Add URL

      const response = await axios({
        method: updateFormData ? "PUT" : "POST",
        url: apiUrl,
        data: updateFormData ? updateFormData : formData,
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      console.log(
        `Lecture ${updateFormData ? "updated" : "added"} successfully:`,
        response.data
      );

      // Navigate to lectures list or perform any other action after successful submission
      navigate("/lectures");

      // Reset form data after submission
      setFormData({
        lectureName: "",
        description: "",
        date: "",
        instructorId: "",
        duration: "",
      });
      setUpdateFormData(null); // Reset update form data
    } catch (error) {
      console.error(
        `Failed to ${updateFormData ? "update" : "add"} lecture:`,
        error.message
      );
    }
  };

  // Function to handle updating form data for edit
  const handleEdit = (lecture) => {
    setUpdateFormData({
      id: lecture._id,
      lectureName: lecture.lectureName,
      description: lecture.description,
      date: lecture.date, // Ensure this is in "yyyy-MM-dd" format for proper handling
      instructorId: lecture.instructorId,
      duration: lecture.duration,
    });
  };

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    if (updateFormData) {
      // Update mode: update the updateFormData state
      setUpdateFormData({ ...updateFormData, [id]: value });
    } else {
      // Add mode: update the formData state
      setFormData({ ...formData, [id]: value });
    }
  };

  console.log("formData:", formData);
  console.log("updateFormData:", updateFormData);

  return (
    <>
      <div className="max-w-lg mx-auto bg-white p-6 rounded-lg shadow-md">
        <div className="flex justify-end mb-4">
          <button
            onClick={handleLogout}
            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Logout
          </button>
        </div>
        <h2 className="text-lg font-semibold mb-4">
          {updateFormData ? "Update Lecture" : "Add Lecture"}
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="lectureName"
            >
              Lecture Name
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="lectureName"
              type="text"
              placeholder="Enter lecture name"
              value={
                updateFormData
                  ? updateFormData.lectureName
                  : formData.lectureName
              }
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="description"
            >
              Description
            </label>
            <textarea
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="description"
              placeholder="Enter description"
              value={
                updateFormData
                  ? updateFormData.description
                  : formData.description
              }
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="date"
            >
              Date
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="date"
              type="date"
              value={updateFormData ? updateFormData.date : formData.date}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="duration"
            >
              Duration
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="duration"
              type="number"
              value={
                updateFormData ? updateFormData.duration : formData.duration
              }
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="instructorId"
            >
              Instructor
            </label>
            <select
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="instructorId"
              value={
                updateFormData
                  ? updateFormData.instructorId
                  : formData.instructorId
              }
              onChange={handleInputChange}
              required
            >
              <option value="">Select an instructor</option>
              {instructors.map((instructor) => (
                <option key={instructor._id} value={instructor._id}>
                  {instructor.name}
                </option>
              ))}
            </select>
          </div>
          <div className="flex justify-end">
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              {updateFormData ? "Update Lecture" : "Add Lecture"}
            </button>
          </div>
        </form>
      </div>
      <div>
        <SeeAllLectures onEdit={handleEdit} />
      </div>
    </>
  );
};

export default AddLectureForm;
