import React, { useState, useEffect } from "react";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import "./FirstPage.css";

import { Component } from "react";

class Menus extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dbData: [],
      isLoading: true,
    };
  }
  getData = () => {
    this.setState({
      isLoading: true,
    });
    fetch("/internal/dbinfo")
      .then((response) => {
        return response.json();
      })
      .then((text) => {
        console.log(text);
        this.setState({
          isLoading: false,
          dbData: text,
        });
      });
  };

  componentDidMount() {
    this.getData();
  }
  render() {
    if (this.state.isLoading) {
      return (
        <section>
          <p>Loading...</p>
        </section>
      );
    } else {
      return (
        <Menu
          id="Menus"
          anchorEl={this.props.anchorEl}
          keepMounted
          open={Boolean(this.props.anchorEl)}
          onClose={() => this.props.handleClose(null)}
        >
          
          {this.state.dbData.map((item, index) => (
            <MenuItem
              onClick={() => this.props.handleClose(this.state.dbData[index])}
              key={index}
            >
              {item}
            </MenuItem>
          ))}
        </Menu>
      );
    }
  }
}

export default Menus;
