import React from "react";
import { ThemeContext } from "../context/ThemeContext";
import { validateTextsXML } from "../utils/validateXML.js";
import { useLocalizedTexts } from "../hooks/useLocalizedTexts.js";

export const ThemeToggle = () => {
  const { toggleTheme, theme } = React.useContext(ThemeContext);
  const textsData = useLocalizedTexts({
    file: 'texts.xml',
    validator: validateTextsXML,
    parser: (xmlJson) => xmlJson.texts
  });

  console.log(textsData?.changeTheme);

  const icon = theme == 'dark' ? 'bi-sun-fill' : 'bi-moon-fill';

  return (
    <button title={textsData?.changeTheme} type="button" className="btn" onClick={toggleTheme}>
      <i className={"bi " + icon}></i>
    </button>
  );
};