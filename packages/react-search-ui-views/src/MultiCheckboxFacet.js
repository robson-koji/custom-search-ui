import PropTypes from "prop-types";
import React from "react";

import { FacetValue } from "./types";
import { appendClassName, getFilterValueDisplay, getFilterCleanValueDisplay } from "./view-helpers";

function MultiCheckboxFacet({
  type="parent",
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
})

  {
    const renderRec = (option) =>{ 
      // debugger;
      // console.log(option.value)      
      if (option.children.length > 0){
          return <MultiCheckboxFacet 
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
      }
    } 


  return (
    <fieldset className={appendClassName(`sui-facet-${type}`, className)}>
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
          const checked = option.selected;
          const has_children = Boolean(option.children.length > 0)

          return (
            <label
              key={`${getFilterValueDisplay(option.value)}`}
              htmlFor={`example_facet_${label}${getFilterValueDisplay(
                option.value
              )}`}
              className={`sui-multi-checkbox-facet__option-label-${type}`}
            >
              <div className="sui-multi-checkbox-facet__option-input-wrapper">
                <div className="sui-multi-checkbox-facet__option-input-wrapper-left">
                { 
                has_children && 
                <span className="sui-multi-checkbox-facet__has-children">
                  +
                </span>
                }                  
                 


                  <input
                    id={`example_facet_${label}${getFilterValueDisplay(
                      option.value
                    )}`}
                    type="checkbox"
                    className="sui-multi-checkbox-facet__checkbox"
                    checked={checked}
                    onChange={(_ev) =>{
                      // debugger;
                      checked ? onRemove(option.value) : onSelect(option.value)
                    }
                    }
                  />
                  <span className={`sui-multi-checkbox-facet__input-text`}>
                    {getFilterCleanValueDisplay(option.value)}
                  </span>
                </div>
                <span className="sui-multi-checkbox-facet__option-count">
                  {option.count.toLocaleString("en")}
                </span>
              </div>




              { option.hasOwnProperty('children') && renderRec(option) }


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
  // label: PropTypes.string.isRequired,
  // onMoreClick: PropTypes.func.isRequired,
  // onRemove: PropTypes.func.isRequired,
  // onSelect: PropTypes.func.isRequired,
  // onSearch: PropTypes.func.isRequired,
  options: PropTypes.arrayOf(FacetValue).isRequired,
  // showMore: PropTypes.bool.isRequired,
  className: PropTypes.string,
  showSearch: PropTypes.bool,
  searchPlaceholder: PropTypes.string
};

export default MultiCheckboxFacet;
