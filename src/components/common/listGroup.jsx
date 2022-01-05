import React from "react";
import PropTypes from "prop-types";

const ListGroup = props => {
  const { items, valueProperty, textProperty, selectedItem, onItemSelect } =
    props;

  return (
    <ul className="list-group">
      {items.map(item => {
        let classes = "list-group-item clickable";
        if (item === selectedItem) classes += " active";
        return (
          <li
            key={item[valueProperty]}
            className={classes}
            onClick={() => onItemSelect(item)}
          >
            {item[textProperty]}
          </li>
        );
      })}
    </ul>
  );
};

ListGroup.defaultProps = {
  textProperty: "name",
  valueProperty: "_id"
};

ListGroup.propTypes = {
  items: PropTypes.arrayOf(PropTypes.object).isRequired,
  valueProperty: PropTypes.string.isRequired,
  textProperty: PropTypes.string.isRequired,
  onItemSelect: PropTypes.func.isRequired
};

export default ListGroup;
