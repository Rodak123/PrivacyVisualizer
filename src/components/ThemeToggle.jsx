import React from "react";
import { ThemeContext } from "../context/ThemeContext";

export const ThemeToggle = () => {
  const { toggleTheme, theme } = React.useContext(ThemeContext);

  const icon = theme == 'dark' ? 'bi-sun-fill' : 'bi-moon-fill';

  return (
    <button title="Change Theme" type="button" className="btn" onClick={toggleTheme}>
      <i className={"bi " + icon}></i>
    </button>
  );
};