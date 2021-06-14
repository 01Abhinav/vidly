import React from "react";

const Like = (props) => {
  var classes = "fa fa-heart-o";
  if (props.liked === true) {
    classes = "fa fa-heart";
  }
  return (
    <i
      onClick={props.onClick}
      style={{ cursor: "pointer" }}
      className={classes}
    ></i>
  );
};

export default Like;
