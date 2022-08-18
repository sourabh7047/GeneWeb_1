import React, { Component } from "react";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import { Link } from "react-router-dom";
import * as ROUTES from "../../routes";
import WebContext from "./context";
import { withRouter } from "react-router-dom";
import styled from "styled-components";

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
              <Modul>
                {ToolList.map((_tool, idx) => {
                  return (
                    <Modli onClick={(e) => this.toolRedirect(e, webFile)}>
                      {_tool}
                    </Modli>
                  );
                })}
              </Modul>
            </MenuItem>
          </Menu>
        )}
      </WebContext.Consumer>
    );
  }
}
// onClick={this.props.handleClose}
export default withRouter(ToolsMenu);

const Modli = styled.li`
  text-align: center;
  list-style: none;
  margin-left: -2em;
  &:hover {
    background: #756dd4;
  }
`;

const Modul = styled.ul`
  list-style-position: inside;
`;
