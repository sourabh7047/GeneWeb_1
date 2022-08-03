import React, { Component } from "react";
import "./style.css";
import styled from "styled-components";
import NewlineText from "../NewlineText";
import Submit from "../../commons/SubmitButton";

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
      Rtype: "out",
      email: JSON.parse(localStorage.getItem("authUser")).email,
      codontable: [],
      codon: "",
      sequence: "",
      orfminsize: 1,
      isToolResponse: false,
      toolResponse: [],
      ...INITIAL_STATE,
    };
  }

  componentDidMount() {
    this.parameterDetail();
  }

  parameterDetail = () => {
    // eslint-disable-next-line no-unused-expressions
    fetch(`/toolname/parameterDetail/${this.state.toolname}/codontable`)
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

  handleToolResponse = (data) => {
    this.setState({
      toolResponse: data,
      isToolResponse: true,
    });
  };

  onSubmit = (event) => {
    console.log(this.state);
    fetch(`/toolname/${this.state.toolname}/Rtype/${this.state.Rtype}/run`, {
      method: "POST",
      body: JSON.stringify({
        email: this.state.email,
        codon: this.state.codon,
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
            // console.log(typeof result.Response);
            NewlineText(result.Response).then((array) => {
              this.handleToolResponse(array);
            });
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
    const { sequence, codontable, isToolResponse, toolResponse } = this.state;

    const isInvalid = sequence === "" || codontable === "";
    return (
      <Wrapper>
        <FormCard>
          <form onSubmit={this.onSubmit}>
            <Formbody>
              <p>Sixpack reads a DNA sequence and outputs the three forward and (optionally) three reverse translations in a visual manner.</p>
              <p></p>
              <p>Nuclic Acid sequence in any supported format:</p>
              <textarea
                onChange={this._onChange}
                name="sequence"
                value={this.state.value}
                rows="6"
                cols="55"
              />
              <div class="dropdown">
                <button
                  class="btn btn-large btn-secondary dropdown-toggle"
                  style={QueryStyle}
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
                      style={QueryStyle}
                      type="button"
                      id="dropdownMenuButton"
                      data-toggle="dropdown"
                      aria-haspopup="true"
                      aria-expanded="false"
                    >
                      {key}
                    </button>
                    <div
                      class="dropdown-menu"
                      aria-labelledby="dropdownMenuButton"
                    >
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
            </Formbody>
            <submitButtonAlign>
              <Submit type="submit" disabled={isInvalid}>
                Submit
              </Submit>
            </submitButtonAlign>
          </form>
        </FormCard>
        <Outform>
          {isToolResponse ? (
            <div style={{padding: '10px', margin: '10px'}}>
              {toolResponse.map((line) => {
                console.log(toolResponse);
                return line;
              })}
            </div>
          ) : (
            <div>
              <h4>nothing to show</h4>
            </div>
          )}
        </Outform>
      </Wrapper>
    );
  }
}

export default Sixpack;

const FormCard = styled.div`
  margin: 50px;
  height: 700px;
  width: 700px;
  border-radius: 10px;
  background: white;
  box-shadow: rgba(0, 0, 0, 0.7) 2px 8px 15px;
`;

const Formbody = styled.div`
  margin: 20px;
`;

const QueryStyle = {
  margin: "10px 0",
};

const Outform = styled.div`
  margin: 50px;
  height: 700px;
  width: 700px;
  border-radius: 10px;
  background: white;
  box-shadow: rgba(0, 0, 0, 0.7) 2px 8px 15px;
  overflow: scroll;

`;

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
