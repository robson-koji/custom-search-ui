import PropTypes from "prop-types";
import React, { Component } from "react";
import { withSearch } from "..";
import { SearchBox } from "@elastic/react-search-ui-views";

export class SearchBoxContainer extends Component {
  static propTypes = {
    // Props
    debounceLength: PropTypes.number,
    inputProps: PropTypes.object,
    searchAsYouType: PropTypes.bool,
    view: PropTypes.func,
    // State
    searchTerm: PropTypes.string.isRequired,
    // Actions
    setSearchTerm: PropTypes.func.isRequired
  };

  state = {
    isFocused: false
  };

  handleFocus = () => {
    this.setState({
      isFocused: true
    });
  };

  handleBlur = () => {
    this.setState({
      isFocused: false
    });
  };

  handleSubmit = e => {
    const { searchTerm, setSearchTerm } = this.props;

    e.preventDefault();
    setSearchTerm(searchTerm);
  };

  handleChange = value => {
    const { searchAsYouType, setSearchTerm, debounceLength } = this.props;
    const options = searchAsYouType
      ? {
          refresh: true,
          debounce: debounceLength || 200
        }
      : {
          refresh: false
        };
    setSearchTerm(value, options);
  };

  render() {
    const { isFocused } = this.state;
    const { inputProps, searchTerm, view } = this.props;

    const View = view || SearchBox;

    return (
      <View
        isFocused={isFocused}
        onChange={e => this.handleChange(e.currentTarget.value)}
        onSubmit={this.handleSubmit}
        value={searchTerm}
        inputProps={{
          onFocus: this.handleFocus,
          onBlur: this.handleBlur,
          ...inputProps
        }}
      />
    );
  }
}

export default withSearch(SearchBoxContainer);
