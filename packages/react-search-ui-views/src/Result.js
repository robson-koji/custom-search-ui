import PropTypes from "prop-types";
import i18n from "i18next";
import React from "react";

import { appendClassName } from "./view-helpers";
import { isFieldValueWrapper } from "./types/FieldValueWrapper";

function getFieldType(result, field, type) {
  if (result[field]) return result[field][type];
}

function getRaw(result, field) {
  return getFieldType(result, field, "raw");
}

function getSnippet(result, field) {
  return getFieldType(result, field, "snippet");
}

function htmlEscape(str) {
  if (!str) return "";

  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

function getEscapedField(result, field) {
  // Fallback to raw values here, because non-string fields
  // will not have a snippet fallback. Raw values MUST be html escaped.
  const safeField =
    getSnippet(result, field) || htmlEscape(getRaw(result, field));
  return Array.isArray(safeField) ? safeField.join(", ") : safeField;
}

function getEscapedFields(result) {
  return Object.keys(result).reduce((acc, field) => {
    // If we receive an arbitrary value from the response, we may not properly
    // handle it, so we should filter out arbitrary values here.
    //
    // I.e.,
    // Arbitrary value: "_metaField: '1939191'"
    // vs.
    // FieldValueWrapper: "_metaField: {raw: '1939191'}"
    if (!isFieldValueWrapper(result[field])) return acc;
    return { ...acc, [field]: getEscapedField(result, field) };
  }, {});
}

function htmlDecode(content) {
  let e = document.createElement("div");
  e.innerHTML = content.replace(/&lt;a /g, ' &lt;a target="_parent" ');
  return e.childNodes.length === 0 ? "" : e.childNodes[0].nodeValue;
}

function Result({ className, result, ...rest }) {
  const fields = getEscapedFields(result);

  return (
    <li className={appendClassName("sui-result", className)} {...rest}>
      <div className="sui-result__body">
        <ul className="sui-result__details">
          {Object.entries(fields)
            .filter(([fieldName]) => fieldName == i18n.t("referencia"))
            .map(([fieldName, fieldValue]) => (
              <li key={fieldName}>
                {/* <span className="sui-result__key">{fieldName}</span>{" "} */}
                <span
                  className="sui-result__value"
                  // dangerouslySetInnerHTML={{ __html: fieldValue.replace(/&lt;a /g, ' &lt;a target="_parent" ') }}
                  dangerouslySetInnerHTML={{ __html: htmlDecode(fieldValue) }}
                />
              </li>
            ))}
        </ul>
      </div>
    </li>
  );
}

Result.propTypes = {
  result: PropTypes.object.isRequired,
  className: PropTypes.string
};

export default Result;
