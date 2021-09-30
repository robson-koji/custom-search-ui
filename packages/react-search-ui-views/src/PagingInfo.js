import PropTypes from "prop-types";
import i18n from "i18next";
import React from "react";

import { appendClassName } from "./view-helpers";

function PagingInfo({
  className,
  end,
  searchTerm,
  start,
  totalResults,
  ...rest
}) {
  return (
    <div className={appendClassName("sui-paging-info", className)} {...rest}>
      {i18n.t("Mostrando")}{" "}
      <strong>
        {start} - {end}
      </strong>{" "}
      {i18n.t("de")} <strong>{totalResults}</strong>
      {searchTerm && (
        <>
          {" "}
          {i18n.t("para")}: <em>{searchTerm}</em>
        </>
      )}
    </div>
  );
}

PagingInfo.propTypes = {
  end: PropTypes.number.isRequired,
  searchTerm: PropTypes.string.isRequired,
  start: PropTypes.number.isRequired,
  totalResults: PropTypes.number.isRequired,
  className: PropTypes.string
};

export default PagingInfo;
