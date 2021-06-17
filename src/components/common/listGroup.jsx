import React from "react";

const ListGroup = (props) => {
  const { items, onItemSelect, selectedItem } = props;
  return (
    <ul className="list-group-sm">
      {items.map((item) => (
        <li
          style={{ cursor: "pointer" }}
          key={item._id}
          onClick={() => onItemSelect(item)}
          className={
            selectedItem === item ? "list-group-item active" : "list-group-item"
          }
        >
          {item.name}
        </li>
      ))}
    </ul>
  );
};

export default ListGroup;
