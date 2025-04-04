import React from "react";
import PropTypes from "prop-types";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";

const Formatmenus = (props) => {
  console.log("Props:", props); // Debugging log

  if (!props.Format || props.Format.length === 0) {
    return null; // Hide the menu if no formats are available
  }

  return (
    <div>
      <Menu
        id="simple-menu"
        anchorEl={props.anchorEl}
        open={Boolean(props.anchorEl)}
        onClose={() => props.handleClose(null, "backdropClick")}
      >
        {props.Format.map((format, index) => (
          <MenuItem
            onClick={() => {
              console.log("Selected format:", format);
              props.handleClose(props.id, format);
            }}
            key={`${format}${index}`}
          >
            {format}
          </MenuItem>
        ))}
      </Menu>
    </div>
  );
};

// Default Props
Formatmenus.defaultProps = {
  anchorEl: null,
  handleClose: () => {},
  Format: [],
  id: "",
};

// Prop Validation
Formatmenus.propTypes = {
  anchorEl: PropTypes.oneOfType([PropTypes.object, PropTypes.func]),
  handleClose: PropTypes.func.isRequired,
  Format: PropTypes.arrayOf(PropTypes.string).isRequired,
  id: PropTypes.string.isRequired,
};

export default Formatmenus;