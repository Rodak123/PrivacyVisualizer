import React from "react";
import { ThemeToggle } from "../components/ThemeToggle";
import { Link } from "../components/Link";
import { Category } from "../components/Category";
import { LanguageSelect } from "../components/LanguageSelect";
import { LocaleContext } from "../context/LocaleContext";
import { Loading } from "../components/Loading";
import { validateTextsXML } from '../utils/validateXML.js'

export const HomePage = () => {
  const { fetchLocaleXML, locale } = React.useContext(LocaleContext);
  const [textsData, setTextsData] = React.useState(null);
  const [lastLocale, setLastLocale] = React.useState(null);

  React.useEffect(() => {
    const loadTextsData = async () => {
      const json = await fetchLocaleXML('texts.xml');
      if (json === null) {
        console.error(`Error fetching or parsing XML of texts, retrying`);
        setTimeout(loadTextsData, 200);
        return;
      }

      if (!validateTextsXML(json)) {
        console.error(`Wrong XML format of texts`);
        return;
      }

      setLastLocale(locale);
      setTextsData(json.texts);
    };

    if (textsData === null || locale !== lastLocale) loadTextsData();
  }, [locale, fetchLocaleXML, textsData, lastLocale]);

  if (textsData === null)
    return <Loading />;

  return (
    <>
      <header id="header" className="d-flex px-2 mt-1 align-items-center justify-content-between">
        <h1 className="fs-3 mb-0">{textsData.title}</h1>
        <div className="d-flex">
          <ThemeToggle />
          <LanguageSelect />
        </div>
      </header>
      <main className="container-fluid flex-grow-1 d-flex flex-column pt-2">
        <div className="w-100">
          <p className="mb-0">
            {textsData.about}
          </p>
          <Link href="https://rejectconvenience.com/Why-Privacy/">
            {textsData.referenceLink}
          </Link>
        </div>
        <div className="d-flex flex-wrap justify-content-center container-md">
          <Category category="health" textsData={textsData} />
          <Category category="purchases" textsData={textsData} />
          <Category category="financial" textsData={textsData} />
          <Category category="location" textsData={textsData} />
          <Category category="contact_info" textsData={textsData} />
          <Category category="contacts" textsData={textsData} />
          <Category category="user_content" textsData={textsData} />
          <Category category="search" textsData={textsData} />
          <Category category="browsing" textsData={textsData} />
          <Category category="identifiers" textsData={textsData} />
          <Category category="usage_data" textsData={textsData} />
          <Category category="sensitive_info" textsData={textsData} />
          <Category category="diagnostics" textsData={textsData} />
          <Category category="other_data" textsData={textsData} />
        </div>
      </main>
      <footer id="footer" className="d-flex px-2 gap-2 justify-content-end align-items-center">
        <Link href="https://github.com/Rodak123/PrivacyVisualizer" className="text-decoration-none fs-6">[ {textsData.sourceCode} ]</Link>
      </footer>
    </>
  )
}
