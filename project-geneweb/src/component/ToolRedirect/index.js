import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import Backtranseq from '../Tools/Backtranseq'

class ToolRedirect extends Component {
  constructor(props) {
    super(props);

    this.state = {
      location: this.props.location,
    };
  }

  renderSwitch(location){
      console.log(location.state)
      // eslint-disable-next-line default-case
      switch(location.state.toolName){
          case 'Backtranseq': 
           return <Backtranseq locationFile={location.state} />
      }
  }


  render() {
    const { location } = this.state;
    return (
        <div>
            {this.renderSwitch(location)}
        </div>
    )
  }
}

export default withRouter(ToolRedirect);
