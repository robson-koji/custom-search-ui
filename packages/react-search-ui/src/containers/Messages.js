import PropTypes from "prop-types";
import { Component } from "react";
import { withSearch } from "..";
import { Messages } from "@elastic/react-search-ui-views";

export class MessagesContainer extends Component {
  static propTypes = {
    // Props
    className: PropTypes.string,
    view: PropTypes.func,
    // State
    pagingStart: PropTypes.number.isRequired,
    pagingEnd: PropTypes.number.isRequired,
    resultSearchTerm: PropTypes.string.isRequired,
    totalResults: PropTypes.number.isRequired
  };

  render() {
    const {
      className,
      pagingStart,
      pagingEnd,
      resultSearchTerm,
      totalResults,
      view,
      ...rest
    } = this.props;

    const View = view || Messages;

    return View({
      className,
      searchTerm: resultSearchTerm,
      start: pagingStart,
      end: pagingEnd,
      totalResults: totalResults,
      ...rest
    });
  }
}

export default withSearch(
  ({ pagingStart, pagingEnd, resultSearchTerm, totalResults }) => ({
    pagingStart,
    pagingEnd,
    resultSearchTerm,
    totalResults
  })
)(MessagesContainer);
