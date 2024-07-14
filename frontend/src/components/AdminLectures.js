import React, { useEffect, useState } from "react";

const AdminLectures = () => {
  const [lectures, setLectures] = useState([]);
  const [editingLecture, setEditingLecture] = useState(null);
  const [editFormData, setEditFormData] = useState({
    title: "",
    description: "",
  });

  useEffect(() => {
    fetchLectures();
  }, []);

  const fetchLectures = async () => {
    try {
      const response = await fetch("http://localhost:8000/api/lectures", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      const data = await response.json();
      setLectures(data);
    } catch (error) {
      console.error("Error fetching lectures:", error.message);
    }
  };

  const handleDelete = async (lectureId) => {
    try {
      const response = await fetch(
        `http://localhost:8000/api/lectures/${lectureId}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (response.ok) {
        setLectures(lectures.filter((lecture) => lecture._id !== lectureId));
      } else {
        console.error("Failed to delete lecture");
      }
    } catch (error) {
      console.error("Error deleting lecture:", error.message);
    }
  };

  const handleEdit = (lecture) => {
    setEditingLecture(lecture);
    setEditFormData({
      title: lecture.title,
      description: lecture.description,
    });
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditFormData({
      ...editFormData,
      [name]: value,
    });
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        `http://localhost:8000/api/lectures/${editingLecture._id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify(editFormData),
        }
      );
      if (response.ok) {
        const updatedLecture = await response.json();
        setLectures(
          lectures.map((lecture) =>
            lecture._id === updatedLecture._id ? updatedLecture : lecture
          )
        );
        setEditingLecture(null);
      } else {
        console.error("Failed to update lecture");
      }
    } catch (error) {
      console.error("Error updating lecture:", error.message);
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">All Lectures</h1>
      {lectures.length === 0 ? (
        <p>No lectures available</p>
      ) : (
        <ul className="space-y-4">
          {lectures.map((lecture) => (
            <li key={lecture._id} className="p-4 bg-white shadow-md rounded">
              <h2 className="text-xl font-bold">{lecture.title}</h2>
              <p>{lecture.description}</p>
              <button
                className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mr-2"
                onClick={() => handleDelete(lecture._id)}
              >
                Delete
              </button>
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                onClick={() => handleEdit(lecture)}
              >
                Edit
              </button>
            </li>
          ))}
        </ul>
      )}
      {editingLecture && (
        <form onSubmit={handleEditSubmit} className="mt-4">
          <h2 className="text-xl font-bold mb-4">Edit Lecture</h2>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="title"
            >
              Title
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="title"
              name="title"
              type="text"
              value={editFormData.title}
              onChange={handleEditChange}
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
              name="description"
              value={editFormData.description}
              onChange={handleEditChange}
            />
          </div>
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
          >
            Save
          </button>
          <button
            className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline ml-2"
            type="button"
            onClick={() => setEditingLecture(null)}
          >
            Cancel
          </button>
        </form>
      )}
    </div>
  );
};

export default AdminLectures;
