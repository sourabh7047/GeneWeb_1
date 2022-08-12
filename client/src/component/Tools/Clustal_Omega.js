import React, { Component } from "react";
import "./style.css";
import NewlineText from "../NewlineText";
import { ReactComponent as Puff } from "../../Assets/puff.svg";
import { userEmail } from "../Firebase/firebase";
import Submit from "../../commons/SubmitButton";
import Grid from "@mui/material/Grid";
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
  guidetreeout: ["default", "documented", "terse", "verbose"],
  dismatout: [
    "BACSU",
    "CHICK",
    "DROME",
    "ECOLI",
    "HUMAN",
    "MOUSE",
    "RAT",
    "XENLA",
    "YEAST",
    "swp23s",
  ],
  dealign: ["lys-arg", "lys-arg-his"],
  mbed: ["true", "false"],
  mbediteration: ["true", "false"],
  iterations: [0, 1, 2, 3, 4, 5],
  gtiterations: [-1, 0, 1, 2, 3, 4, 5],
  hummiterations: [-1, 0, 1, 2, 3, 4, 5],
  outfmt: [
    "clustal_num",
    "clustal",
    "fa",
    "msf",
    "nexus",
    "phylip",
    "selex",
    "stockholm",
    "vienna",
  ],
  order: ["aligned", "input"],
  stype: ["protein", "dna", "rna"],
};

var Memory = [
  "guidetreeout",
  "dismatout",
  "dealign",
  "mbed",
  "mbediteration",
  "iterations",
  "gtiterations",
  "hummiterations",
  "outfmt",
  "order",
  "stype",
];

class SAPS extends Component {
  constructor(props) {
    super(props);

    this.state = {
      toolname: this.props.locationFile.toolName.toLowerCase(),
      Rtype: "aln-clustal_num",
      email: userEmail,
      // codontable: [],
      // codon: "",
      sequence: null,
      isToolResponse: false,
      isToolQuarySend: false,
      toolResponse: [],
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
    console.log(e.target.value);
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
    // this.setState({ sequence: ""});
    this.setState({ isToolQuarySend: false });
  };

  onSubmit = (event) => {
    this.setState({ isToolQuarySend: true });
    // console.log(this.state);
    fetch(`/toolname/${this.state.toolname}/Rtype/${this.state.Rtype}/run`, {
      method: "POST",
      body: JSON.stringify({
        email: this.state.email,
        guidetreeout: this.state.guidetreeout,
        dismatout: this.state.dismatout,
        dealign: this.state.dealign,
        mbed: this.state.mbed,
        mbediteration: this.state.mbediteration,
        iterations: this.state.iterations,
        gtiterations: this.state.gtiterations,
        hummiterations: this.state.hummiterations,
        outfmt: this.state.outfmt,
        order: this.state.order,
        stype: this.state.stype,
        sequence: this.state.sequence,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        if (res.status === 200) {
          // console.log(res.json());
          res.json().then((result) => {
            // console.log(typeof result.Response);
            NewlineText(result.Response).then((array) => {
              this.handleToolResponse(array);
            });
          });

          //   //convert to base64
          //   // var b64Response = btoa(
          //   //   unescape(encodeURIComponent(result.Response))
          //   // );
          //   // // console.log(b64Response);

          //   //create an image
          //   // var outputImg = document.createElement("img");
          //   // outputImg.src = "data:image/png;base64," + b64Response;
          //   // console.log(outputImg.src);
          //   // document.body.appendChild(outputImg);
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
              <p>
                Clustal Omega is a new multiple sequence alignment program that
                uses seeded guide trees and HMM profile-profile techniques to
                generate alignments between three or more sequences.
              </p>
              <p></p>
              <p>
                Important note: This tool can align up to 4000 sequences or a
                maximum file size of 4 MB.
              </p>
              <p></p>
              <p>Protein sequence in any supported format:</p>

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
                          class="btn btn-large btn-secondary dropdown-toggle button-width"
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

export default SAPS;
