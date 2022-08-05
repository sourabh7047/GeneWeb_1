import React, { useState } from "react";

import "./styles.css";

export default function File() {
  function handleClick(event) {
    console.log(event.currentTarget.classList);
  }

  return (
    <div className="App">
      <div className="wrapper">
        <div className="navbar">
          <ul>
            <li>
              <a href="#" className={`a_parent`}>
                <div className="wrap">
                  <span className="icon">
                    <i className="fas fa-home"></i>
                  </span>
                  <span className="text">Home</span>
                </div>
              </a>
            </li>
            <li>
              <a href="#" className={`a_parent`}>
                <div className="wrap">
                  <span className="icon">
                    <i className="fas fa-volleyball-ball"></i>
                  </span>
                  <span className="text">sports</span>
                </div>
              </a>

              <div className="dd_menu">
                <ul>
                  <li>
                    <a href="#" className="dd_menu_a">
                      <div className="wrap">
                        <span className="icon">
                          <i className="fas fa-volleyball-ball"></i>
                        </span>
                        <span className="text">running</span>
                      </div>
                    </a>
                  </li>
                  <li>
                    <a href="#" className="dd_menu_a">
                      <div className="wrap">
                        <span className="icon">
                          <i className="fas fa-volleyball-ball"></i>
                        </span>
                        <span className="text">running</span>
                      </div>
                    </a>
                  </li>
                  <li>
                    <a href="#" className="dd_menu_a">
                      <div className="wrap">
                        <span className="icon">
                          <i className="fas fa-volleyball-ball"></i>
                        </span>
                        <span className="text">running</span>
                      </div>
                    </a>
                  </li>
                  <li>
                    <a href="#" className="dd_menu_a">
                      <div className="wrap">
                        <span className="icon">
                          <i className="fas fa-volleyball-ball"></i>
                        </span>
                        <span className="text">running</span>
                      </div>
                    </a>
                  </li>
                </ul>
              </div>
            </li>
            <li>
              <a href="#" className={`a_parent `}>
                <div className="wrap">
                  <span className="icon"></span>
                  <span className="text">Food</span>
                </div>
              </a>
            </li>
            <li>
              <a href="#" className={`a_parent`}>
                <div className="wrap">
                  <span className="icon"></span>
                  <span className="text">items</span>
                </div>
              </a>
            </li>
            <li>
              <a href="#" className={`a_parent`}>
                <div className="wrap">
                  <span className="icon">
                    <i className="fas fa-cog"></i>
                  </span>
                  <span className="text">settings</span>
                </div>
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
