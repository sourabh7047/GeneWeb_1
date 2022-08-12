import React, { Component } from "react";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import { Link } from "react-router-dom";
import * as ROUTES from "../../routes";
import WebContext from "./context";
import { withRouter } from "react-router-dom";

const ToolList = [
  "emboss_Backtranseq",
  "emboss_Sixpack",
  "emboss_Transeq",
  "emboss_Cpgplot",
  "emboss_Pepstats",
  "saps",
  "emboss_newcpgreport",
  "clustalo",
  "kalign",
  "muscle",
  "tcoffee",
];

class ToolsMenu extends Component {
  toolRedirect(e, webFile) {
    console.log("toolmenu");
    this.props.history.push({
      pathname: `/tools/${e.currentTarget.innerText}`,
      state: {
        toolName: e.currentTarget.innerText,
      },
    });
  }
  render() {
    return (
      <WebContext.Consumer>
        {(webFile) => (
          <Menu
            id="Tools"
            anchorEl={this.props.anchor}
            keepMounted
            open={Boolean(this.props.anchor)}
            onClose={() => this.props.handleClose(null)}
          >
            <MenuItem>
              <ul>
                {ToolList.map((_tool, idx) => {
                  return (
                    <li onClick={(e) => this.toolRedirect(e, webFile)}>
                      {_tool}
                    </li>
                  );
                })}
              </ul>
            </MenuItem>
          </Menu>
        )}
      </WebContext.Consumer>
    );
  }
}
// onClick={this.props.handleClose}
export default withRouter(ToolsMenu);
