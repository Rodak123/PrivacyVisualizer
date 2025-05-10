import React from "react";

export const DecimalsDisplay = ({ decimals }) => {
  return (
    <>
      {decimals.map((text, index) => {
        return (
          <React.Fragment key={index}>
            <span>{text}</span>
            {index < decimals.length - 1 && (<br />)}
          </React.Fragment>
        );
      })}
    </>
  );
};

export const LocationDisplay = ({ location }) => {
  const decimals = location.decimals.decimal;

  const coarseDecimals = decimals.slice(0, 2);
  const preciseDecimals = decimals.slice(2);

  return (
    <>
      <p className="mb-0"><strong>{location.coarseLocation}:</strong></p>
      <p>
        <DecimalsDisplay decimals={coarseDecimals} />
      </p>
      <p className="mb-0"><strong>{location.preciseLocation}:</strong></p>
      <p>
        <DecimalsDisplay decimals={preciseDecimals} />
      </p>
    </>
  );
};