import React from "react";
import PropTypes from "prop-types";
import _ from "lodash";

const Pagination = ({ itemsCount, pageSize, currentPage, onPageChange }) => {
  const numberOfPages = Math.ceil(itemsCount / pageSize);

  if (numberOfPages === 1) {
    return null;
  }

  const pages = _.range(1, numberOfPages + 1);

  return (
    <nav>
      <ul className="pagination">
        {pages.map(page => {
          let listItemClasses = "page-item";
          if (page === currentPage) listItemClasses += " active";
          return (
            <li key={page} className={listItemClasses}>
              <span onClick={() => onPageChange(page)} className="page-link">
                {page}
              </span>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};

Pagination.propTypes = {
  itemsCount: PropTypes.number.isRequired,
  pageSize: PropTypes.number.isRequired,
  currentPage: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired
};

export default Pagination;
