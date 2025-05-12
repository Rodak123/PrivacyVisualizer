import React from "react";
import { ThemeToggle } from "../components/ThemeToggle";
import { Link } from "../components/Link";
import { Category } from "../components/Category";
import { LanguageSelect } from "../components/LanguageSelect";
import { createFileName, useScreenshot } from "use-react-screenshot";
import { useLocalizedTexts } from "../hooks/useLocalizedTexts";
import { validateTextsXML } from "../utils/validateXML";

export const HomePage = () => {
  const textsData = useLocalizedTexts({
    file: 'texts.xml',
    validator: validateTextsXML,
    parser: (xmlJson) => xmlJson.texts
  });

  const categoriesRef = React.useRef(null);
  const [_, takeScreenshot] = useScreenshot({
    type: "image/jpeg",
    quality: 1.0
  });

  const downloadImage = (image, { extension = 'jpg' } = {}) => {
    const name = prompt(textsData?.savePrompt, textsData?.savePromptDefault);

    if (name === null) return;

    const a = document.createElement("a");
    a.href = image;
    a.download = createFileName(extension, name);
    a.click();
  };

  const getImage = () => takeScreenshot(categoriesRef.current).then(downloadImage);

  return (
    <>
      <header id="header" className="d-flex px-2 mt-1 align-items-center justify-content-between">
        <h1 className="title fs-3 mb-0 flex-grow-1 text-truncate">{textsData?.title}</h1>
        <div className="d-flex">
          <button type="button" className="btn" onClick={getImage}>Save</button>
          <LanguageSelect />
          <ThemeToggle />
        </div>
      </header>
      <main className="flex-grow-1 align-items-center d-flex flex-column pt-2">
        <div className="px-2">
          <p className="mb-0">
            {textsData?.about}
          </p>
          <Link href="https://rejectconvenience.com/Why-Privacy/">
            {textsData?.referenceLink}
          </Link>
        </div>
        <div className="d-flex flex-column pt-2" style={{ maxWidth: '600px' }}>
          <div className="w-100 row justify-content-center p-2" style={{ backgroundColor: 'var(--bs-body-bg)' }} ref={categoriesRef}>
            <Category category="health" />
            <Category category="purchases" />
            <Category category="financial" />
            <Category category="location" />
            <Category category="contact_info" />
            <Category category="contacts" />
            <Category category="user_content" />
            <Category category="search" />
            <Category category="browsing" />
            <Category category="identifiers" />
            <Category category="usage_data" />
            <Category category="sensitive_info" />
            <Category category="diagnostics" />
            <Category category="other_data" />
          </div>
        </div>
      </main>
      <footer id="footer" className="d-flex px-2 gap-2 justify-content-end align-items-center">
        <Link href="https://github.com/Rodak123/PrivacyVisualizer" className="text-decoration-none fs-6">[ {textsData?.sourceCode} ]</Link>
      </footer>
    </>
  )
}
