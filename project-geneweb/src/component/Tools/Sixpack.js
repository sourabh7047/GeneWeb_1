import React, { Component } from "react";
import "./style.css";
import { AuthUserContext } from "../Session";

// https://stackoverflow.com/questions/14810506/map-function-for-objects-instead-of-arrays
var INITIAL_STATE = {
  firstorf: ["true", "false"],
  lastorf: ["true", "false"],
  reverse: ["true", "false"],
};

class Sixpack extends Component {
  constructor(props) {
    super(props);

    this.state = {
      toolname: this.props.locationFile.toolName.toLowerCase(),
      email: JSON.parse(localStorage.getItem("authUser")).email,
      codontable: [],
      codon: "",
      sequence: "",
      orfminsize: 1,
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
      .then((Array) => {
        this.setState({ codontable: Array });
      });
  };

  _onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  _onClickCodon = (e) => {
    for (let obj of this.state.codontable) {
      if (obj.label[0] === e.currentTarget.innerText) {
        this.setState({ codon: obj.value[0] });
      }
    }
  };

  _onClick = (e) => {
    console.log(e.target.innerText);

    this.setState({ [e.target.getAttribute("name")]: e.target.innerText });
  };

  onSubmit = (event) => {
    console.log(this.state);
    fetch(`/toolname/emboss_${this.state.toolname}/run`, {
      method: "POST",
      body: JSON.stringify({
        email: this.state.email,
        // codon: this.state.codon,
        firstorf: this.state.firstorf,
        lastorf: this.state.lastorf,
        reverse: this.state.reverse,
        orfminsize: this.state.orfminsize,
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
          console.log(res.status);
          console.log(res.body);
          //   res.json().then((result) => {
          //     console.log(result);
          //   });
        }
      })
      .catch((error) => {
        console.log("this is the error");
        console.log(error);
      });
    event.preventDefault();
  };

  render() {
    const { sequence, codontable } = this.state;

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
              {codontable.map((value, idx) => {
                return <p onClick={this._onClickCodon}>{value.label[0]}</p>;
              })}
            </div>
          </div>
          {Object.keys(INITIAL_STATE).map((key, index) => {
            return (
              <div class="dropdown">
                <button
                  class="btn btn-large btn-secondary dropdown-toggle"
                  type="button"
                  id="dropdownMenuButton"
                  data-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
                >
                  {key}
                </button>
                <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                  <ul>
                    {INITIAL_STATE[key].map((value) => {
                      //   console.log(value);
                      return (
                        <li onClick={this._onClick} name={key}>
                          {value}
                        </li>
                      );
                    })}
                  </ul>
                </div>
              </div>
            );
            // INITIAL_STATE[key].map((_, idx) => {});
          })}
          <button disabled={isInvalid} type="submit">
            Submit
          </button>
        </form>
      </div>
    );
  }
}

export default Sixpack;
