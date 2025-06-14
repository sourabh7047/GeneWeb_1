import React, { Component } from "react";
import "./style.css";

var INITIAL_STATE = {
  format: ["clustalw", "fasta_aln", "msf", "phylip", "score_html"],
  matrix: ["none", "blosum", "pam"],
  order: ["aligned", "input"],
  stype: ["protein", "dna", "rna"],
};

class Tcoffee extends Component {
  constructor(props) {
    super(props);

    this.state = {
      toolname: this.props.locationFile.toolName.toLowerCase(),
      email: JSON.parse(localStorage.getItem("authUser")).email,
      // codontable: [],
      // codon: "",
      sequence: "",
      // orfminsize: 1,
      ...INITIAL_STATE,
    };
  }

  _onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  _onClick = (e, keyIdx) => {
    this.setState({ [e.target.getAttribute("name")]: e.target.innerText });
  };

  onSubmit = (event) => {
    console.log(this.state);
    fetch(`/toolname/${this.state.toolname}/run`, {
      method: "POST",
      body: JSON.stringify({
        email: this.state.email,
        // codon: this.state.codon,
        format: this.state.format,
        matrix: this.state.matrix,
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
          res.json().then((result) => {
            console.log(result.Response);
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
            cols="62"
          />

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
                        <li
                          onClick={(event) => this._onClick(event, index)}
                          name={key}
                        >
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

export default Tcoffee;
