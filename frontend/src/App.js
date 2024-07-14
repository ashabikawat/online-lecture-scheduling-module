import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useNavigate,
} from "react-router-dom";
import LandingPage from "./components/LandingPage";
import LecturesList from "./components/LecturesList";
import AddLectureForm from "./components/AddLectureForm";
import SeeAllLectures from "./components/AllLectures";

const App = () => {
  const [isLoggedIn, setLoggedIn] = useState(false);
  const [userRole, setUserRole] = useState(null); // 'admin' or 'instructor'
  const [userId, setUserId] = useState(null);
  const navigate = useNavigate();

  const handleLogin = (role, id) => {
    console.log(`Logged in as ${role} with ID ${id}`); // Debug log
    setUserRole(role);
    setUserId(id);
    setLoggedIn(true);
  };

  const handleLogout = () => {
    setUserRole(null);
    setUserId(null);
    setLoggedIn(false);
  };

  useEffect(() => {
    if (isLoggedIn) {
      if (userRole === "admin") {
        navigate("/add-lecture", { replace: true }); // Navigate to add-lecture
      } else if (userRole === "instructor") {
        navigate("/lectures", { replace: true }); // Navigate to lectures
      }
    }
  }, [isLoggedIn, userRole, navigate]);

  return (
    <div className="App">
      {!isLoggedIn ? (
        <LandingPage onLogin={handleLogin} />
      ) : (
        <Routes>
          {userRole === "instructor" && (
            <Route
              path="/lectures"
              element={<LecturesList instructorId={userId} />}
            />
          )}
          {userRole === "admin" && (
            <Route
              path="/add-lecture"
              element={<AddLectureForm handleLogout={handleLogout} />}
            />
          )}
          <Route
            path="/"
            element={
              <Navigate
                to={userRole === "admin" ? "/add-lecture" : "/lectures"}
                replace
              />
            }
          />
          <Route path="/all-lectures" element={<SeeAllLectures />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      )}
    </div>
  );
};

const AppWithRouter = () => (
  <Router>
    <App />
  </Router>
);

export default AppWithRouter;
