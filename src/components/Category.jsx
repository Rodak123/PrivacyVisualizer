import React from "react";
import { LocationDisplay } from "./LocationDisplay";
import { validateCategoryXML, validateTextsXML } from "../utils/validateXML";
import { useLocalizedTexts } from "../hooks/useLocalizedTexts";
import { Loading } from "./Loading";

const parse = (xml) => {
  return xml.trim().replace('\n', '');
};

const STATUSES = ['none', 'not-linked', 'linked', 'tracking'];

export const Category = ({ category }) => {
  const textsData = useLocalizedTexts({
    file: 'texts.xml',
    validator: validateTextsXML,
    parser: (xmlJson) => xmlJson.texts
  });

  const categoryData = useLocalizedTexts({
    file: `${category}.xml`,
    validator: validateCategoryXML,
    parser: (xmlJson) => xmlJson.category
  });

  const [status, setStatus] = React.useState(0);

  const changeStatus = () => {
    setStatus((status + 1) % STATUSES.length);
  }

  const modalId = `${category}Modal`;
  const modalLabelId = `${category}ModalLabel`;

  let { name = '', definition = '', benefits = '', consequences = '', searchTerms = { term: [] }, location = null } = categoryData ?? {};

  if (typeof searchTerms.term === 'string')
    searchTerms.term = [searchTerms.term];

  return (
    <div className="col-4 col-md-3 col-lg-3 mb-4 d-flex justify-content-center">
      <div className={"category card " + STATUSES[status]}>
        <div
          id={category}
          type="button"
          title={textsData?.changeImportance}
          className="card-img-top d-flex justify-content-center w-100"
          onClick={changeStatus}
        >
          {(categoryData === null || textsData === null)
            ? (
              <div className="w-100 d-flex justify-content-center align-items-center" style={{ height: 'auto', aspectRatio: '1' }}>
                <Loading className="text-light" />
              </div>
            )
            : (<img draggable={false} className="w-100" src={`images/${category}.png`} alt={category} />)
          }
        </div>
        <div className="card-body">
          <p
            type="button"
            className="card-title m-0 text-center w-100"
            title={textsData?.learnMore}
            data-bs-toggle="modal"
            data-bs-target={`#${modalId}`}
          >
            {name}
          </p>
          {/* <i className="bi bi-info-square-fill ms-1" /> */}
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
              <h1 className="modal-title fs-5 text-truncate" id={modalLabelId}>{name}</h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <p className="h5 text-truncate">{textsData?.definition}:</p>
              <p>{parse(definition)}</p>
              {location !== null && (<LocationDisplay location={location} />)}
              <p className="h5 benefits text-truncate">{textsData?.benefits}:</p>
              <p>{parse(benefits)}</p>
              <p className="h5 consequences text-truncate">{textsData?.consequences}:</p>
              <p>{parse(consequences)}</p>
              <p className="h5 text-truncate">{textsData?.searchTerms}:</p>
              <p>{searchTerms.term.join(", ")}</p>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">
                {textsData?.close}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div >
  );
};