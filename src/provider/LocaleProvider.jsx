import React from "react";
import { DEFAULT_LOCALE, LocaleContext } from "../context/LocaleContext";
import { XMLParser } from "fast-xml-parser";

export const LocaleProvider = ({ children }) => {
  const [languages, setLanguages] = React.useState([DEFAULT_LOCALE]);

  const [locale, setLocale] = React.useState(() => {
    const savedLocale = localStorage.getItem('locale');
    return savedLocale || languages[0];
  });

  const changeLocale = (index) => {
    if (index < 0 || index >= languages.length) {
      console.error('Unknown language index: ', index);
      return;
    }

    setLocale(() => {
      const newLocale = languages[index];
      localStorage.setItem('locale', newLocale);
      return newLocale;
    });
  };

  const fetchXML = async (file, locale) => {
    const url = `/data/${locale}/${file}`;
    try {
      const response = await fetch(url);
      const xml = (await response.text()).trim();

      const parser = new XMLParser();
      const json = parser.parse(xml);

      if (Object.keys(json)[0] === '!doctype') return null; // workaround for bad server setup 

      return json;
    } catch (error) {
      console.error(`Error fetching locale XML: ${file} of ${locale} at ${url}`, error);
      return null;
    }
  };

  const fetchLocaleXML = async (file) => {
    let xml = await fetchXML(file, locale);
    if (xml === null && languages.length > 0 && locale !== languages[0]) {
      xml = await fetchXML(file, languages[0]);
    }
    return xml;
  };

  React.useEffect(() => {
    const loadLanguages = async () => {
      try {
        const response = await fetch('/data/languages.json');
        const { languages } = await response.json();

        setLanguages(languages);
        if (!languages.includes(locale))
          setLocale(languages[0]);
      } catch (error) {
        console.error('Error fetching languages:', error);
      }
    };

    loadLanguages();
  }, []);

  return (
    <LocaleContext.Provider value={{ locale, languages, changeLocale, fetchLocaleXML }}>
      {children}
    </LocaleContext.Provider>
  );
};