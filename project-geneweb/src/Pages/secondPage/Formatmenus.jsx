import React from "react";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import FileFormat from "./FileFormat";

const Formatmenus = (props) => {
   

  return (
    <div>
      <Menu
        id="simple-menu"
        anchorEl={props.anchorEl}
        open={Boolean(props.anchorEl)}
        onClose={props.handleClose}
      >
        {props.Format.map((format, index) => {
          return (
            <MenuItem
              onClick={() => {
                props.handleClose(props.id , format);
              }}
              key={`${format}${index}`}
            >
              {format}
            </MenuItem>
          );
        })}
      </Menu>
    </div>
  );
};

export default Formatmenus;
