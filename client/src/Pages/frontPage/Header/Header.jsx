import { useNavigate } from "react-router-dom";
import Form from "./Form";
import "./Header.css";

import React, { Component } from "react";

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      navbar: false,
    };
    this.history = props.history;
    this.webEnv = "";
    this.dbdata = "";
    this.changeBackground = this.changeBackground.bind(this);
  }

  onAddNewSearch = (searchData) => {
    // it is a standard javascipt function nothing to do with node
    console.log(searchData);
    fetch("/internal/dbinfoData", {
      method: "POST",
      body: JSON.stringify(searchData),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then(function (response) {
        return response.json();
      })
      .then((myJson) => {
        console.log(myJson);
        this.setState({ dbdata: myJson.dbdata, webEnv: myJson.webEnv });

        this.history.push({
          pathname: `/${myJson.dbdata}/webenv/${myJson.webEnv}/page/${myJson.page}`,
          state: {
            query: myJson.queryKey,
            length: myJson.length,
          },
        });
      });
  };

  changeBackground(){
    console.log(window.scrollY);
    let x =window.scrollY;
    if (x > 80) {
      this.setState({
        navbar: true,
      });
      console.log("yes");
    } else {
      this.setState({
        navbar: false,
      });
    }
  };

  componentDidMount() {
    window.addEventListener("scroll", this.changeBackground);
  }

  render() {
    return (
      <nav className={this.state.navbar? "navs active" : "navs"}>
        <div>
          <h1>Gntx</h1>
        </div>
        <div style={{ flex: "1" }}></div>
        <Form AddNewSearch={this.onAddNewSearch.bind(this)} />
      </nav>
    );
  }
}

export default Header;

// export default function Header() {
//   const history = useNavigate();
//   // states-------------------------------

//   // handlerfunctions----------------------
//   const onAddNewSearch = (searchData) => {
//     // it is a standard javascipt function nothing to do with node
//     console.log(searchData);
//     fetch("/dbinfoData", {
//       method: "POST",
//       body: JSON.stringify(searchData),
//       headers: {
//         "Content-Type": "application/json",
//       },
//     })
//       .then(function (response) {
//         return response.json();
//       })
//       .then(function (myJson) {
//         history.push({
//           pathname: `/${myJson.dbdata}/webenv/${myJson.webEnv}/page/${myJson.page}`,
//           state: {
//             query: myJson.queryKey,
//             length: myJson.length,
//           },
//         });
//       });
//   };

//   // virtualDOM eleemnts-------------------

//   return (
//     <header>
//       <div>
//         <h1>Gntx</h1>
//       </div>
//       <div style={{ flex: "1" }}></div>
//       <Form AddNewSearch={onAddNewSearch} />
//     </header>
//   );
// }
