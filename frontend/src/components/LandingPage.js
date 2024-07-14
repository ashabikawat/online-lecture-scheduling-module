import React from "react";
import Form from "./Form";

const LandingPage = ({ onLogin }) => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-1/2 p-4">
        <img
          src="https://images.unsplash.com/photo-1588873281272-14886ba1f737?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8ODB8fG9ubGluZSUyMGxlY3R1cmUlMjBzY2hkdWxpbmclMjBtb2RlfGVufDB8fDB8fHww"
          alt="Placeholder"
          className="w-full rounded-lg shadow-lg"
        />
      </div>
      <Form onLogin={onLogin} />
    </div>
  );
};

export default LandingPage;
