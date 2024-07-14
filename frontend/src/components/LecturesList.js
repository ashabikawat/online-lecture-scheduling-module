import React, { useEffect, useState } from "react";
import axios from "axios";
import moment from "moment";
import { useNavigate } from "react-router-dom";

const LecturesList = ({ instructorId }) => {
  const [lectures, setLectures] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchLectures = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          throw new Error("No token found");
        }

        const response = await axios.get(
          `http://localhost:8000/api/lectures/instructor/${instructorId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setLectures(response.data);
      } catch (error) {
        console.error("Failed to fetch lectures:", error.message);
      }
    };

    fetchLectures();
  }, [instructorId]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Lectures</h1>
        <button
          onClick={handleLogout}
          className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
        >
          Logout
        </button>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {lectures.map((lecture) => (
          <div
            key={lecture._id}
            className="bg-white shadow-lg rounded-lg overflow-hidden border border-gray-200 hover:shadow-2xl transition duration-300"
          >
            <div className="p-6">
              <h2 className="text-xl font-semibold mb-2">
                {lecture.lectureName}
              </h2>
              <p className="text-gray-700 mb-2">{lecture.description}</p>
              <p className="text-gray-500">
                Date: {moment(lecture.date).format("MMMM Do, YYYY")}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LecturesList;
