import React from "react";
import "./Button.css";

function Button({ value, onClick }) {
  return (
    <button value={value} onClick={onClick}>
      {value}
    </button>
  );
}

export default Button;
