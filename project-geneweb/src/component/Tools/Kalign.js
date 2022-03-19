import React, { Component } from "react";
import "./style.css";
import { AuthUserContext } from "../Session";
import NewlineText from "../NewlineText";

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
      email: JSON.parse(localStorage.getItem("authUser")).email,
      Rtype: "aln-clustalw",
      // codontable: [],
      // codon: "",
      sequence: "",
      isToolResponse: false,
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
    const { sequence, codontable, isToolResponse, toolResponse } = this.state;

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
        {isToolResponse ? (
          <div>
            {toolResponse.map((line) => {
              console.log(toolResponse);
              return <h6>{line}</h6>;
            })}
          </div>
        ) : (
          <div>
            <h4>nothing to show</h4>
          </div>
        )}
      </div>
    );
  }
}

export default Kalign;
