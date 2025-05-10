import React from "react";
import { LocaleContext } from "../context/LocaleContext";

export const LanguageSelect = () => {
  const { locale, changeLocale, languages } = React.useContext(LocaleContext);

  return (
    <div className="btn-group">
      <button type="button" className="btn dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
        {locale}
      </button>
      <ul className="dropdown-menu">
        {languages.map((l, index) => {
          const isDisabled = l == locale;
          return (
            <li key={index}>
              <button
                disabled={isDisabled}
                className={"dropdown-item " + (isDisabled ? "disabled" : "")}
                onClick={() => {
                  if (isDisabled) return;
                  changeLocale(index);
                }}
              >
                {l}
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
};