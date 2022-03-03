import React, { Component } from "react";
import "./style.css";
import { AuthUserContext } from "../Session";

class Backtranseq extends Component {
  constructor(props) {
    super(props);
    if (props) {
      console.log(props);
    }
    this.state = {
      toolname: this.props.locationFile.toolName.toLowerCase(),
      table: [],
      ...INITIAL_STATE,
    };
  }

  componentDidMount() {
    this.parameterDetail();
  }

  parameterDetail = () => {
    // eslint-disable-next-line no-unused-expressions
    fetch(`/toolname/parameterDetail/emboss_${this.state.toolname}/codontable`)
      .then(function (Response) {
        return Response.json();
      })
      .then((codontable) => {
        let ct = codontable;
        console.log(ct);
        this.setState({ table: ct });
      });
  };

  _onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  _onClick = (e) => {
    for (let obj of this.state.table) {
      if (obj.label[0] === e.currentTarget.innerText) {
        this.setState({ codontable: obj.value[0] });
      }
    }
  };

  onSubmit = (event) => {
    fetch(`/toolname/emboss_${this.state.toolname}/run`, {
      method: "POST",
      body: JSON.stringify({
        email: this.state.email,
        codontable: this.state.codontable,
        sequence: this.state.sequence,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        if (res.status === 200) {
          res.json().then((result) => {
            console.log(result);
          });
        } else {
          // error display
        }
      })
      .catch((error) => {
        console.log(error);
      });
    event.preventDefault();
  };

  render() {
    const { table, sequence, codontable } = this.state;

    const isInvalid = sequence === "" || codontable === "";
    return (
      <div>
        <form onSubmit={this.onSubmit}>
          <p>Protein sequence in any supported format:</p>
          <textarea
            onChange={this._onChange}
            name="sequence"
            value={this.state.value}
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
                return <p onClick={this._onClick}>{obj.label[0]}</p>;
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

const INITIAL_STATE = {
  sequence: "",
  codontable: "",
  email: JSON.parse(localStorage.getItem("authUser")).email,
};
