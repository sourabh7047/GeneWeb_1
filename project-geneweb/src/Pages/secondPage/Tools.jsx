import React, { Component } from "react";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import { Link } from "react-router-dom";
import * as ROUTES from "../../routes";
import WebContext from "./context";
import { withRouter } from "react-router-dom";

class Tools extends Component {
  toolRedirect(e, webFile) {
    this.props.history.push({
      pathname:  `/webenv/${webFile.webenv}/tools/${e.currentTarget.innerText}`,
      state: {
        webFile: webFile,
        toolName: e.currentTarget.innerText
      }
    })
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
              {/* <Link to={{ pathname: ROUTES.TOOLS, state: { Webdata: data } }}>
                Backtranseq
              </Link> */}
              <p onClick={(e) => this.toolRedirect(e, webFile)}>Backtranseq</p>
            </MenuItem>
          </Menu>
        )}
      </WebContext.Consumer>
    );
  }
}
// onClick={this.props.handleClose}
export default withRouter(Tools);
