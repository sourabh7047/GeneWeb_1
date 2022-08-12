import React, { Component } from "react";
import "./style.css";
import Submit from "../../commons/SubmitButton";
import NewlineText from "../NewlineText";
import Grid from "@mui/material/Grid";
import { userEmail } from "../Firebase/firebase";
import { ReactComponent as Puff } from "../../Assets/puff.svg";
import {
  Formbody,
  QueryStyle,
  FormCard,
  Wrapper,
  Outform,
  SubmitButtonAlign,
  PuffFit,
} from "./styles";

var INITIAL_STATE = {
  window: ["100"],
  minlen: ["200"],
  minoe: ["0.6"],
  minpc: ["50"],
};

var Memory = ["window", "minlen", "minoe", "minpc"];

class Cpgplot extends Component {
  constructor(props) {
    super(props);

    this.state = {
      toolname: this.props.locationFile.toolName.toLowerCase(),
      email: userEmail,
      table: [],
      Rtype: "out",
      isToolResponse: false,
      toolResponse: [],
      // codontable: [],
      // codon: "",
      sequence: "",
      // orfminsize: 1,
      ...INITIAL_STATE,
    };
  }

  // componentDidMount() {
  //   this.parameterDetail();
  // }

  // parameterDetail = () => {
  //   // eslint-disable-next-line no-unused-expressions
  //   console.log(this.state.toolname);
  //   fetch(`/toolname/parameterDetail/emboss_${this.state.toolname}/codontable`)
  //     .then(function (Response) {
  //       return Response.json();
  //     })
  //     .then((Array) => {
  //       this.setState({ codontable: Array });
  //     });
  // };

  _onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  // _onClickCodon = (e) => {
  //   for (let obj of this.state.codontable) {
  //     if (obj.label[0] === e.currentTarget.innerText) {
  //       this.setState({ codon: obj.value[0] });
  //     }
  //   }
  // };

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

  handleManualReset = (event) => {
    event.preventDefault();
    this.form.reset();
    this.setState({ isToolQuarySend: false });
    Object.keys(INITIAL_STATE).map((key, idx) => {
      return (Memory[idx] = key);
    });
  };

  handleReset = () => {
    this.setState({ isToolQuarySend: false });
  };

  onSubmit = (event) => {
    this.setState({ isToolQuarySend: true });
    console.log(this.state);
    fetch(`/toolname/${this.state.toolname}/Rtype/${this.state.Rtype}/run`, {
      method: "POST",
      body: JSON.stringify({
        email: this.state.email,
        // codon: this.state.codon,
        window: this.state.window,
        minlen: this.state.minlen,
        minoe: this.state.minoe,
        minpc: this.state.minpc,
        sequence: this.state.sequence,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        if (res.status === 200) {
          res.json().then((result) => {
            console.log(result.Response);
            //convert to base64
            // var b64Response = btoa(
            //   unescape(encodeURIComponent(result.Response))
            // );
            // console.log(b64Response);

            //create an image
            // var outputImg = document.createElement("img");
            // outputImg.src = "data:image/png;base64," + b64Response;
            // console.log(outputImg.src);
            // document.body.appendChild(outputImg);
            NewlineText(result.Response).then((array) => {
              this.handleToolResponse(array);
            });
          });
        } else {
          console.log(res.status);
          console.log(res.body);
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
              <p>Nuclic Acid sequence in any supported format:</p>
              <textarea
                onChange={this._onChange}
                name="sequence"
                value={this.state.value}
                rows="6"
                cols="62"
              />
              {/* <div class="dropdown">
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
                return <p>{value.label[0]}</p>;
              })}
            </div>
          </div> */}
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

export default Cpgplot;
