import React, { Component } from "react";
import "./style.css";
import NewlineText from "../NewlineText";
import Grid from "@mui/material/Grid";
import { userEmail } from "../Firebase/firebase";
import Submit from "../../commons/SubmitButton";
import { ReactComponent as Puff } from "../../Assets/puff.svg";

import {
  Formbody,
  QueryStyle,
  FormCard,
  Wrapper,
  Outform,
  SubmitButtonAlign,
  Modli,
  Modul,
  PuffFit,
} from "./styles";

var Memory = ["stype", "format", "gapopen", "gapext", "termgap", "bonus"];

var INITIAL_STATE = {
  stype: ["protein", "dna"],
  format: ["fasta", "clu", "macsim"],
  gapopen: [110], //100 to 950
  gapext: [40], //10 to 100
  termgap: [2],
  bonus: [0],
};

class Kalign extends Component {
  constructor(props) {
    super(props);

    this.state = {
      toolname: this.props.locationFile.toolName.toLowerCase(),
      email: userEmail,
      Rtype: "aln-clustalw",
      // codontable: [],
      // codon: "",
      sequence: "",
      isToolResponse: false,
      isToolQuarySend: false,
      toolResponse: [],
      // orfminsize: 1,
      ...INITIAL_STATE,
    };
  }

  _onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
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
    this.setState({ isToolQuarySend: false });
  };

  onSubmit = (event) => {
    console.log(this.state);
    fetch(`/toolname/${this.state.toolname}/Rtype/${this.state.Rtype}/run`, {
      method: "POST",
      body: JSON.stringify({
        email: this.state.email,
        // codon: this.state.codon,
        format: this.state.format,
        stype: this.state.stype,
        gapopen: this.state.gapopen,
        gapext: this.state.gapext,
        termgap: this.state.termgap,
        bonus: this.state.bonus,
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

          //convert to base64
          // var b64Response = btoa(
          //   unescape(encodeURIComponent(result.Response))
          // );
          // // console.log(b64Response);

          //create an image
          // var outputImg = document.createElement("img");
          // outputImg.src = "data:image/png;base64," + b64Response;
          // console.log(outputImg.src);
          // document.body.appendChild(outputImg);
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
              <p>A fast and accurate multiple sequence alignment algorithm.</p>
              <p></p>
              <p>
                <b>Important note:</b> This tool can align up to 2000 sequences
                or a maximum file size of 2 MB.
              </p>
              <textarea
                onChange={this._onChange}
                name="sequence"
                value={this.state.value}
                rows="6"
                cols="62"
              />
              <Grid container spacing={2}>
                {Object.keys(INITIAL_STATE).map((key, index) => {
                  return (
                    <Grid item xs={6} md={4}>
                      <div className="dropdown">
                        <button
                          className="btn btn-large btn-secondary dropdown-toggle"
                          type="button"
                          style={QueryStyle}
                          id="dropdownMenuButton"
                          data-toggle="dropdown"
                          aria-haspopup="true"
                          aria-expanded="false"
                        >
                          {Memory[index]}
                        </button>
                        <div
                          className="dropdown-menu"
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

export default Kalign;
