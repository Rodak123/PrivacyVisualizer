import { LocaleContext } from "../context/LocaleContext";
import React from "react";
import { LocationDisplay } from "./LocationDisplay";
import { validateCategoryXML } from "../utils/validateXML";

const extractElem = (xml) => {
  return xml.trim().replace('\n', '');
};

const STATUSES = ['none', 'not-linked', 'linked', 'tracking'];

export const Category = ({ category, textsData }) => {
  const { fetchLocaleXML, locale } = React.useContext(LocaleContext);
  const [categoryData, setCategoryData] = React.useState(null);
  const [lastLocale, setLastLocale] = React.useState(null);
  const [status, setStatus] = React.useState(0);

  const changeStatus = () => {
    setStatus((status + 1) % STATUSES.length);
  }

  React.useEffect(() => {
    const loadCategoryData = async () => {
      const json = await fetchLocaleXML(`${category}.xml`);
      if (json === null) {
        console.error(`Error fetching or parsing XML of category: ${category}, retrying`);
        setTimeout(loadCategoryData, 200);
        return;
      }

      if (!validateCategoryXML(json)) {
        console.error(`Wrong XML format of category: ${category}`);
        return;
      }

      setCategoryData(json.category);
      setLastLocale(locale);
    };

    if (categoryData === null || locale !== lastLocale) loadCategoryData();
  }, [locale, fetchLocaleXML, category, categoryData, lastLocale]);

  if (categoryData == null)
    return null;

  const modalId = `${category}Modal`;
  const modalLabelId = `${category}ModalLabel`;

  let { name, definition, benefits, consequences, searchTerms, location = null } = categoryData;

  if (typeof searchTerms.term === 'string')
    searchTerms.term = [searchTerms.term];

  return (
    <>
      <div className={"category m-1 m-md-3 card " + STATUSES[status]}>
        <div
          id={category}
          type="button"
          title={textsData.changeImportance}
          className="card-img-top d-flex justify-content-center"
          onClick={changeStatus}
        >
          <img draggable={false} className="w-100" src={`images/${category}.png`} alt={category} />
        </div>
        <div className="card-body" >
          <p
            title={textsData.learnMore}
            type="button"
            className="card-title m-0 justify-content-center"
            data-bs-toggle="modal"
            data-bs-target={`#${modalId}`}
          >
            {name}
          </p>
          <i className="bi bi-info-square-fill ms-1"></i>
        </div>
      </div>
      <div
        className="modal fade"
        id={modalId}
        tabIndex="-1"
        aria-labelledby={modalLabelId}
        aria-hidden="true"
      >
        <div className="modal-dialog modal-fullscreen-sm-down modal-lg">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id={modalLabelId}>{name}</h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <p className="h5">{textsData.definition}:</p>
              <p>{extractElem(definition)}</p>
              {location !== null && (<LocationDisplay location={location} />)}
              <p className="h5 benefits">{textsData.benefits}:</p>
              <p>{extractElem(benefits)}</p>
              <p className="h5 consequences">{textsData.consequences}:</p>
              <p>{extractElem(consequences)}</p>
              <p className="h5">{textsData.searchTerms}:</p>
              <p>{searchTerms.term.join(", ")}</p>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">
                {textsData.close}
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};