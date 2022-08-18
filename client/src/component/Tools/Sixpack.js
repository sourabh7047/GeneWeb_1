import React, { Component } from "react";
import "./style.css";
import NewlineText from "../NewlineText";
import Submit from "../../commons/SubmitButton";
import { userEmail } from "../Firebase/firebase";
import Grid from "@mui/material/Grid";
import { ReactComponent as Puff } from "../../Assets/puff.svg";
import {
  Formbody,
  QueryStyle,
  CodonQuery,
  FormCard,
  Wrapper,
  Outform,
  Modli,
  Modul,
  SubmitButtonAlign,
  PuffFit,
} from "./styles";

// https://stackoverflow.com/questions/14810506/map-function-for-objects-instead-of-arrays
var INITIAL_STATE = {
  firstorf: ["true", "false"],
  lastorf: ["true", "false"],
  reverse: ["true", "false"],
};

var Memory = ["firstorf", "lastorf", "reverse"];

class Sixpack extends Component {
  constructor(props) {
    super(props);
    console.log("SUCCESS1 ", userEmail);
    this.state = {
      toolname: this.props.locationFile.toolName.toLowerCase(),
      Rtype: "out",
      // email: JSON.parse(localStorage.getItem("authUser")).email,
      email: userEmail,
      codontable: [],
      codon: "",
      codonVal: "Codon",
      sequence: "",
      orfminsize: 1,
      isToolResponse: false,
      toolResponse: [],
      isToolQuarySend: false,
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
    this.setState({ codonVal: e.currentTarget.innerText });
    for (let obj of this.state.codontable) {
      if (obj.label[0] === e.currentTarget.innerText) {
        this.setState({ codon: obj.value[0] });
      }
    }
  };

  _onClick = (e, keyIdx) => {
    Memory[keyIdx] = e.target.innerText;
    this.setState({ [e.target.getAttribute("name")]: e.target.innerText });
  };

  handleToolResponse = (data) => {
    this.setState({
      toolResponse: data,
      isToolResponse: true,
    });
  };

  handleManualReset = (event) => {
    event.preventDefault();
    this.form.reset();
    this.setState({ isToolQuarySend: false });
    Object.keys(INITIAL_STATE).map((key, idx) => {
      return (Memory[idx] = key);
    });
  };

  handleReset = () => {
    this.setState({ codonVal: "codon" });
    this.setState({ isToolQuarySend: false });
  };

  onSubmit = (event) => {
    console.log(this.state);
    this.setState({ isToolQuarySend: true });

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
    const {
      sequence,
      codontable,
      isToolResponse,
      isToolQuarySend,
      toolResponse,
      codonVal,
    } = this.state;

    const isInvalid = sequence === "" || codontable === "";
    return (
      <Wrapper>
        <FormCard>
          <form
            onSubmit={this.onSubmit}
            ref={(form) => (this.form = form)}
            onReset={this.handleReset}
          >
            <Formbody>
              <p>
                Sixpack reads a DNA sequence and outputs the three forward and
                (optionally) three reverse translations in a visual manner.
              </p>
              <p></p>
              <p>Nuclic Acid sequence in any supported format:</p>
              <textarea
                onChange={this._onChange}
                name="sequence"
                value={this.state.value}
                rows="6"
                cols="62"
              />
              <div class="dropdown">
                <button
                  class="btn btn-large btn-secondary dropdown-toggle"
                  style={CodonQuery}
                  type="button"
                  id="dropdownMenuButton"
                  data-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
                  name="codon"
                  value={codonVal}
                >
                  {codonVal}
                </button>
                <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                  {codontable.map((value, idx) => {
                    return <p onClick={this._onClickCodon}>{value.label[0]}</p>;
                  })}
                </div>
              </div>
              <Grid container spacing={2}>
                {Object.keys(INITIAL_STATE).map((key, index) => {
                  return (
                    <Grid item xs={6} md={4}>
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
                          {Memory[index]}
                        </button>
                        <div
                          class="dropdown-menu"
                          aria-labelledby="dropdownMenuButton"
                        >
                          <Modul>
                            {INITIAL_STATE[key].map((value) => {
                              //   console.log(value);
                              return (
                                <Modli
                                  onClick={(event) =>
                                    this._onClick(event, index)
                                  }
                                  name={key}
                                >
                                  {value}
                                </Modli>
                              );
                            })}
                          </Modul>
                        </div>
                      </div>
                    </Grid>
                  );
                  // INITIAL_STATE[key].map((_, idx) => {});
                })}
              </Grid>
            </Formbody>
            <SubmitButtonAlign>
              <Submit type="submit" disabled={isInvalid}>
                Submit
              </Submit>
              <Submit type="reset" onClick={this.handleManualReset}>
                Reset
              </Submit>
            </SubmitButtonAlign>
          </form>
        </FormCard>
        <Outform>
          {isToolQuarySend ? (
            isToolResponse ? (
              <div style={{ padding: "5px", margin: "10px" }}>
                {toolResponse.map((line) => {
                  return (
                    <p style={{ fontSize: "12px", whiteSpace: "break-spaces" }}>
                      {line.props.children}
                    </p>
                  );
                })}
              </div>
            ) : (
              <PuffFit>
                <Puff />
              </PuffFit>
            )
          ) : (
            <div></div>
          )}
        </Outform>
      </Wrapper>
    );
  }
}

export default Sixpack;
