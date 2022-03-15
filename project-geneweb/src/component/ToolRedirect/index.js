import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import Backtranseq from "../Tools/Backtranseq";
import Sixpack from "../Tools/Sixpack";
import Transeq from "../Tools/Transeq";
import Cpgplot from "../Tools/Cpgplot";
import Pepstats from "../Tools/Pepstats";
import SAPS from "../Tools/SAPS";
import NewCpgReport from "../Tools/NewCpgReport";
import ClustalOmega from "../Tools/Clustal_Omega";
import Kalign from "../Tools/Kalign";
import Muscle from "../Tools/Muscle";

class ToolRedirect extends Component {
  constructor(props) {
    super(props);

    this.state = {
      location: this.props.location,
    };
  }

  renderSwitch(location) {
    console.log(location.state);
    console.log(location.state);
    // eslint-disable-next-line default-case
    switch (location.state.toolName) {
      case "Backtranseq":
        return <Backtranseq locationFile={location.state} />;
      case "sixpack":
        return <Sixpack locationFile={location.state} />;
      case "transeq":
        return <Transeq locationFile={location.state} />;
      case "cpgplot":
        return <Cpgplot locationFile={location.state} />;
      case "pepstats":
        return <Pepstats locationFile={location.state} />;
      case "saps":
        return <SAPS locationFile={location.state} />;
      case "newcpgreport":
        return <NewCpgReport locationFile={location.state} />;
      case "clustalo":
        return <ClustalOmega locationFile={location.state} />;
      case "kalign":
        return <Kalign locationFile={location.state} />;
      case "muscle":
        return <Muscle locationFile={location.state} />;
    }
  }

  render() {
    const { location } = this.state;
    return <div>{this.renderSwitch(location)}</div>;
  }
}

export default withRouter(ToolRedirect);
