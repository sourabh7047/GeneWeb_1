import React, { Component } from "react";
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
import Tcoffee from "../Tools/Tcoffee";

class ToolRedirect extends Component {
  constructor(props) {
    super(props);
    console.log("ToolRedirect", this.props.location.state)
    this.state = {
      location: this.props.location,
    };
  }

  renderSwitch(location) {
    // eslint-disable-next-line default-case
    switch (location.state.toolName) {
      case "emboss_Backtranseq":
        return <Backtranseq locationFile={location.state} />;
      case "emboss_Sixpack":
        return <Sixpack locationFile={location.state} />;
      case "emboss_Transeq":
        return <Transeq locationFile={location.state} />;
      case "emboss_Cpgplot":
        return <Cpgplot locationFile={location.state} />;
      case "emboss_Pepstats":
        return <Pepstats locationFile={location.state} />;
      case "saps":
        return <SAPS locationFile={location.state} />;
      case "emboss_newcpgreport":
        return <NewCpgReport locationFile={location.state} />;
      case "clustalo":
        return <ClustalOmega locationFile={location.state} />;
      case "kalign":
        return <Kalign locationFile={location.state} />;
      case "muscle":
        return <Muscle locationFile={location.state} />;
      case "tcoffee":
        return <Tcoffee locationFile={location.state} />;
    }
  }

  render() {
    const { location } = this.state;
    return <div>{this.renderSwitch(location)}</div>;
  }
}

export default ToolRedirect;
