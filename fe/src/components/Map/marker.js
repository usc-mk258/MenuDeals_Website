import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

import "./marker.scss";

const Marker = (props) => {
  return (
    <div>
      <div className="pin bounce"></div>
      <div className="pulse"></div>
    </div>
  );
};

Marker.defaultProps = {
  onClick: null,
};

Marker.propTypes = {
  onClick: PropTypes.func,
  text: PropTypes.string.isRequired,
};

export default Marker;
