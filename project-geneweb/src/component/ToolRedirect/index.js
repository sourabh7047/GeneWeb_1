import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import Backtranseq from "../Tools/Backtranseq";
import Sixpack from "../Tools/Sixpack";
import Transeq from "../Tools/Transeq";

class ToolRedirect extends Component {
  constructor(props) {
    super(props);

    this.state = {
      location: this.props.location,
    };
  }

  renderSwitch(location) {
    console.log(location.state);
    // eslint-disable-next-line default-case
    switch (location.state.toolName) {
      case "Backtranseq":
        return <Backtranseq locationFile={location.state} />;
      case "sixpack":
        return <Sixpack locationFile={location.state} />;
      case "transeq":
        return <Transeq locationFile={location.state} />;
    }
  }

  render() {
    const { location } = this.state;
    return <div>{this.renderSwitch(location)}</div>;
  }
}

export default withRouter(ToolRedirect);
