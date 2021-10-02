import PropTypes from "prop-types";
import i18n from "i18next";
import React from "react";

import { appendClassName } from "./view-helpers";

function Messages({ className, searchTerm, ...rest }) {
  return (
    <div className={appendClassName("sui-messages", className)} {...rest}>
      {i18n.t("Nenhuma publicação localizada para a busca:")} <br />
      &quot;
      <b>{searchTerm}</b>&quot;
    </div>
  );
}

Messages.propTypes = {
  end: PropTypes.number.isRequired,
  searchTerm: PropTypes.string.isRequired,
  start: PropTypes.number.isRequired,
  totalResults: PropTypes.number.isRequired,
  className: PropTypes.string
};

export default Messages;
