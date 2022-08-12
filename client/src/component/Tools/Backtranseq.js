import React, { Component } from "react";
import NewlineText from "../NewlineText";
// import "./style.css";
import Submit from "../../commons/SubmitButton";
import { userEmail } from "../Firebase/firebase";
import { ReactComponent as Puff } from "../../Assets/puff.svg";
import {
  Formbody,
  CodonQuery,
  FormCard,
  Wrapper,
  Outform,
  SubmitButtonAlign,
  PuffFit,
} from "./styles";

class Backtranseq extends Component {
  constructor(props) {
    super(props);
    if (props) {
      console.log("locationFIle", this.props.locationFile)
      // console.log(props);
      // console.log("First", userEmail);
    }
    this.state = {
      email: userEmail,
      Rtype: "out",
      toolname: this.props.locationFile.toolName.toLowerCase(),
      table: [],
      isToolResponse: false,
      toolResponse: [],
      sequence: "",
      codontable: "Codon Table",
      codon: "codon",
      isToolQuarySend: false,
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
      .then((codon) => {
        let ct = codon;
        console.log(ct);
        this.setState({ table: ct });
      });
  };

  _onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  _onClick = (e) => {
    this.setState({ codon: e.currentTarget.innerText });
    for (let obj of this.state.table) {
      if (obj.label[0] === e.currentTarget.innerText) {
        this.setState({ codontable: obj.value[0] });
      }
    }
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
  };

  handleReset = () => {
    this.setState({ codon: "codon" });
    this.setState({ isToolQuarySend: false });
  };

  onSubmit = (event) => {
    this.setState({ isToolQuarySend: true });

    fetch(`/toolname/${this.state.toolname}/Rtype/${this.state.Rtype}/run`, {
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
            // console.log(typeof result.Response);
            NewlineText(result.Response).then((array) => {
              this.handleToolResponse(array);
            });
          });
        } else {
          // error display
          console.log(res.status);
          console.log(res.body);
        }
      })
      .catch((error) => {
        console.log(error);
      });
    event.preventDefault();
  };

  render() {
    const {
      table,
      sequence,
      codontable,
      isToolResponse,
      toolResponse,
      isToolQuarySend,
      codon,
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
                EMBOSS Backtranseq reads a protein sequence and writes the
                nucleic acid sequence it is most likely to have come from.
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
              <div className="dropdown">
                <button
                  class="btn btn-large btn-primary dropdown-toggle "
                  style={CodonQuery}
                  type="button"
                  id="dropdownMenuButton"
                  data-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
                  name="codontable"
                  value={codon}
                >
                  {codon}
                </button>
                <div
                  className="dropdown-menu"
                  aria-labelledby="dropdownMenuButton"
                >
                  {table.map((obj) => {
                    return <p onClick={this._onClick}>{obj.label[0]}</p>;
                  })}
                </div>
              </div>
              <SubmitButtonAlign>
                <Submit type="submit" disabled={isInvalid}>
                  Submit
                </Submit>
                <Submit type="reset" onClick={this.handleManualReset}>
                  Reset
                </Submit>
              </SubmitButtonAlign>
            </Formbody>
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

export default Backtranseq;
