import React from "react";

const Button = ({ onClick, children }) => {
  return (
    <button
      style={{ background: "#1AB5BC" }}
      onClick={onClick}
      className="bg-primary cursor-pointer py-2 px-6 font-semibold rounded-lg text-secondary"
    >
      {children}
    </button>
  );
};

export default Button;
