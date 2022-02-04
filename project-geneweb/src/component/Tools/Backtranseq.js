import React, { Component } from "react";
import "./style.css";

const INITIAL_STATE = {
  sequence: "",
  codontable: "",
};

class Backtranseq extends Component {
  constructor(props) {
    super(props);
    if (props) {
      console.log(true);
      console.log(props);
    } else {
      console.log(false);
    }
    this.state = {
      toolname: this.props.locationFile.toolName.toLowerCase(),
      table: [],
      ...INITIAL_STATE,
    };

    this.parameterDetail = this.parameterDetail.bind(this);
  }

  componentDidMount() {
    this.parameterDetail();
  }

  parameterDetail() {
    // eslint-disable-next-line no-unused-expressions
    fetch(`/toolname/parameterDetail/emboss_${this.state.toolname}/codontable`)
      .then(function (Response) {
        return Response.json();
      })
      .then((codontable) => {
        let ct = codontable;
        this.setState({ table: ct });
      });
  }

  onChange(e) {
    this.setState({ [this.target.name]: e.target.value });
    // console.log(JSON.parse(e.view.localStorage.authUser).email);
  }
  
  onClick(e) {
    this.setState({ codontable: e.currentTarget.innerText });
  }
  onSubmit(event) {
    fetch(`/toolname/emboss_${this.state.toolname}/run`, {
      method: "POST",
      body: JSON.stringify({
        emailId: JSON.parse(event.view.localStorage.authUser).email,
        ...INITIAL_STATE,
      }),
    });
    event.preventDefault();
  }

  render() {
    const { table, sequence } = this.state;

    const isInvalid = sequence === "";
    return (
      <div>
        <form onSubmit={this.onSubmit}>
          <p>Protein sequence in any supported format:</p>
          <textarea
            onChange={this.onChange.bind(this)}
            name="sequence"
            rows="6"
            cols="100"
          />
          <div class="dropdown">
            <button
              class="btn btn-large btn-secondary dropdown-toggle"
              type="button"
              id="dropdownMenuButton"
              data-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
            >
              Dropdown button
            </button>
            <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
              {table.map((obj) => {
                return <p onClick={this.onClick.bind(this)}>{obj.label[0]}</p>;
              })}
            </div>
          </div>
          <button disabled={isInvalid} type="submit">
            Submit
          </button>
        </form>
      </div>
    );
  }
}

export default Backtranseq;
