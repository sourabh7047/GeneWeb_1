import React, { Component } from "react";
import "./style.css";
import NewlineText from "../NewlineText";
import styled from "styled-components";
import { ReactComponent as Puff } from "../../Assets/puff.svg";
import Grid from "@mui/material/Grid";
import Submit from "../../commons/SubmitButton";

var INITIAL_STATE = {
  outputtype: ["default", "documented", "terse", "verbose"],
  species: [
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
  positiveresidues: ["lys-arg", "lys-arg-his"],
};

var Memory = ["outputtype", "species", "positiveresidues"];

class SAPS extends Component {
  constructor(props) {
    super(props);

    this.state = {
      toolname: this.props.locationFile.toolName.toLowerCase(),
      email: JSON.parse(localStorage.getItem("authUser")).email,
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

  onSubmit = (event) => {
    this.setState({ isToolQuarySend: true });
    fetch(`/toolname/${this.state.toolname}/Rtype/${this.state.Rtype}/run`, {
      method: "POST",
      body: JSON.stringify({
        email: this.state.email,
        // codon: this.state.codon,
        outputtype: this.state.outputtype,
        species: this.state.species,
        positiveresidues: this.state.positiveresidues,
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
          <form onSubmit={this.onSubmit}>
            <Formbody>
              <p>
                SAPS evaluates a wide variety of protein sequence properties
                using statistics. Properties considered include compositional
                biases, clusters and runs of charge and other amino acid types,
                different kinds and extents of repetitive structures, locally
                periodic motifs, and anomalous spacings between identical
                residue types.
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
                          class="btn btn-large btn-secondary dropdown-toggle"
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
              <div style={{ padding: "5px", margin: "10px" }}></div>
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

const FormCard = styled.div`
  margin: 50px;
  height: 700px;
  width: 700px;
  border-radius: 10px;
  background: white;
  overflow-y: scroll;
  box-shadow: rgba(0, 0, 0, 0.7) 2px 8px 15px;
`;

const Formbody = styled.div`
  margin: 20px;
`;

const QueryStyle = {
  margin: "10px 0",
  backgroundColor: "#567FC3",
};

const Outform = styled.div`
  margin: 50px;
  padding: 1.2rem;
  height: 700px;
  width: 700px;
  border-radius: 10px;
  background: white;
  box-shadow: rgba(0, 0, 0, 0.7) 2px 8px 15px;
  overflow-y: scroll;
`;

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const SubmitButtonAlign = styled.div`
  display: flex;
  justify-content: center;
`;

const PuffFit = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
`;
