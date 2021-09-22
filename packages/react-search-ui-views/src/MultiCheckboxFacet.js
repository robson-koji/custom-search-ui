import PropTypes from "prop-types";
import React from "react";

import { FacetValue } from "./types";
import {
  appendClassName,
  getFilterValueDisplay,
  getFilterCleanValueDisplay
} from "./view-helpers";

const hashCode = s =>
  s.split("").reduce((a, b) => ((a << 5) - a + b.charCodeAt(0)) | 0, 0);

function MultiCheckboxFacet({
  child_id = null,
  type = "parent",
  className,
  label,
  onMoreClick,
  onRemove,
  onSelect,
  options,
  showMore,
  showSearch,
  onSearch,
  searchPlaceholder
}) {
  const renderRec = (option, id) => {
    // debugger;
    // console.log(option.value)
    if (option.children.length > 0) {
      return (
        <MultiCheckboxFacet
          child_id={id}
          key={option.value}
          options={option.children}
          // label={label}
          type="child"
          onSelect={onSelect}
          onRemove={onRemove}
          onSearch={onSearch}
          onMoreClick={onMoreClick}
          // showMore={showMore}
          // showSearch={showSearch}
        />
      );
    }
  };

  const handleClick = (e, option, checked) => {
    // Plus sign besides checkbox with children, call function to show children.
    if (e.target.className === "sui-multi-checkbox-facet__has-children") {
      const child_id = e.target.getAttribute("child");
      const child = document.getElementById(child_id);
      if (child.style.display === "none" || child.style.display === "") {
        child.style.display = "block";
        e.target.innerHTML = " − ";
      } else {
        child.style.display = "none";
        e.target.innerHTML = " + ";
      }
      e.preventDefault();
    } else if (e.defaultPrevented) {
      return; // Exits here if event has been handled
    } else {
      // Block hierarchical facets checkbox event capture (bubbling)
      e.preventDefault();
      // Checkbox action
      checked ? onRemove(option.value) : onSelect(option.value);
    }
  };
  return (
    <fieldset
      className={appendClassName(`sui-facet-${type}`, className)}
      id={child_id}
    >
      <legend className={`sui-facet-${type}__title`}>{label}</legend>

      {showSearch && (
        <div className="sui-facet-search">
          <input
            className="sui-facet-search__text-input"
            type="search"
            placeholder={searchPlaceholder || "Search"}
            onChange={e => {
              onSearch(e.target.value);
            }}
          />
        </div>
      )}

      <div className="sui-multi-checkbox-facet">
        {options.length < 1 && <div>No matching options</div>}
        {options.map(option => {
          const id_hash = hashCode(option.value);
          const checked = option.selected;
          const has_children = Boolean(option.children.length > 0);

          return (
            <label
              key={`${getFilterValueDisplay(option.value)}`}
              htmlFor={`example_facet_${label}${getFilterValueDisplay(
                option.value
              )}`}
              className={`sui-multi-checkbox-facet__option-label-${type}`}
            >
              <div
                className="sui-multi-checkbox-facet__option-input-wrapper"
                onClick={e => handleClick(e, option, checked)}
              >
                <div className="sui-multi-checkbox-facet__option-input-wrapper-left">
                  {has_children && (
                    <span
                      className="sui-multi-checkbox-facet__has-children"
                      child={id_hash}
                    >
                      +
                    </span>
                  )}
                  <input
                    id={`example_facet_${label}${getFilterValueDisplay(
                      option.value
                    )}`}
                    type="checkbox"
                    className="sui-multi-checkbox-facet__checkbox"
                    checked={checked}
                    // onClick={e => handleClick(e, option, checked)}
                  />
                  <span className={`sui-multi-checkbox-facet__input-text`}>
                    {getFilterCleanValueDisplay(option.value)}
                  </span>
                </div>
                <span className="sui-multi-checkbox-facet__option-count">
                  {option.count.toLocaleString("en")}
                </span>
              </div>

              {option.hasOwnProperty("children") && renderRec(option, id_hash)}
            </label>
          );
        })}
      </div>

      {showMore && (
        <button
          type="button"
          className="sui-facet-view-more"
          onClick={onMoreClick}
          aria-label="Show more options"
        >
          + More
        </button>
      )}
    </fieldset>
  );
}

MultiCheckboxFacet.propTypes = {
  type: PropTypes.string.isRequired,
  label: PropTypes.string,
  onMoreClick: PropTypes.func.isRequired,
  onRemove: PropTypes.func.isRequired,
  onSelect: PropTypes.func.isRequired,
  onSearch: PropTypes.func.isRequired,
  options: PropTypes.arrayOf(FacetValue).isRequired,
  showMore: PropTypes.bool,
  className: PropTypes.string,
  showSearch: PropTypes.bool,
  searchPlaceholder: PropTypes.string,
  child_id: PropTypes.number
};

export default MultiCheckboxFacet;
