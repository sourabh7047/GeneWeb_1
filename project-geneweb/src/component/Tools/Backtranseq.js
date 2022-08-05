import React, { Component } from "react";
import NewlineText from "../NewlineText";
import styled from "styled-components";
import "./style.css";
import Submit from "../../commons/SubmitButton";

class Backtranseq extends Component {
  constructor(props) {
    super(props);
    if (props) {
      console.log(props);
    }
    this.state = {
      email: JSON.parse(localStorage.getItem("authUser")).email,
      Rtype: "out",

      toolname: this.props.locationFile.toolName.toLowerCase(),
      table: [],
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

  handleToolResponse = (data) => {
    this.setState({
      toolResponse: data,
      isToolResponse: true,
    });
  };

  onSubmit = (event) => {
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
    const { table, sequence, codontable, isToolResponse, toolResponse } =
      this.state;

    const isInvalid = sequence === "" || codontable === "";
    return (
      <Wrapper>
        <FormCard>
          <form onSubmit={this.onSubmit}>
            <Formbody>
            <p>EMBOSS Backtranseq reads a protein sequence and writes the nucleic acid sequence it is most likely to have come from.</p>
            <p></p>
              <p>Protein sequence in any supported format:</p>
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
                  {table.map((obj) => {
                    return <p onClick={this._onClick}>{obj.label[0]}</p>;
                  })}
                </div>
              </div>
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
            <div style={{padding: '5px', margin: '10px',}}>
              {toolResponse.map((line) => {
                console.log(toolResponse);
                return <p>{line}</p>;
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

export default Backtranseq;

const INITIAL_STATE = {
  sequence: "",
  codontable: "",
};

const Formbody = styled.div`
  margin: 20px;
`;

const QueryStyle = {
  margin: "10px 0",
};

const FormCard = styled.div`
  margin: 50px;
  height: 700px;
  width: 700px;
  border-radius: 10px;
  background: white;
  box-shadow: rgba(0, 0, 0, 0.7) 2px 8px 15px;
`;

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Outform = styled.div`
  margin: 50px;
  height: 700px;
  width: 700px;
  border-radius: 10px;
  background: white;
  box-shadow: rgba(0, 0, 0, 0.7) 2px 8px 15px;
  overflow: scroll;
`;
