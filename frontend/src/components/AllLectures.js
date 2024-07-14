import React, { useState, useEffect } from "react";
import axios from "axios";

const SeeAllLectures = ({ onEdit }) => {
  const [lectures, setLectures] = useState([]);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchAllLectures = async () => {
      try {
        const response = await axios.get("http://localhost:8000/api/lectures");
        setLectures(response.data);
      } catch (error) {
        console.error("Error fetching lectures:", error);
      }
    };

    const fetchAllUsers = async () => {
      try {
        const response = await axios.get("http://localhost:8000/api/users");
        setUsers(response.data);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchAllLectures();
    fetchAllUsers();
  }, []);

  const findInstructorName = (instructorId) => {
    const user = users.find((user) => user._id === instructorId);
    return user ? user.name : "Unknown";
  };

  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const handleDelete = async (lectureId) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("No token found");
      }

      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      await axios.delete(
        `http://localhost:8000/api/lectures/${lectureId}`,
        config
      );

      // Remove the deleted lecture from state
      setLectures(lectures.filter((lecture) => lecture._id !== lectureId));
      console.log(`Deleted lecture with ID: ${lectureId}`);
    } catch (error) {
      console.error(`Error deleting lecture with ID ${lectureId}:`, error);
    }
  };

  return (
    <div className="max-w-4xl mx-auto mt-8">
      <h2 className="text-2xl font-semibold mb-4">List of All Lectures</h2>
      {lectures.length === 0 ? (
        <p>No lectures found.</p>
      ) : (
        <div className="space-y-4">
          {lectures.map((lecture) => (
            <div
              key={lecture._id}
              className="bg-white shadow-md rounded-lg p-4 flex items-center justify-between"
            >
              <div>
                <p className="text-lg font-semibold">{lecture.lectureName}</p>
                <p className="text-gray-600">{lecture.description}</p>
                <p className="text-gray-500">
                  Instructor: {findInstructorName(lecture.instructorId)}
                </p>
                <p className="text-gray-500">
                  Date: {formatDate(lecture.date)}
                </p>
                <p className="text-gray-500">
                  Duration: {lecture.duration} mins
                </p>
              </div>
              <div>
                <button
                  className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 mr-2 rounded"
                  onClick={() => onEdit(lecture)}
                >
                  Update
                </button>
                <button
                  className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded"
                  onClick={() => handleDelete(lecture._id)}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SeeAllLectures;
