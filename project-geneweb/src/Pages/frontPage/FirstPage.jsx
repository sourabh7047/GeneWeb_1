import React from "react";
import Header from "./Header/Header";
import "./FirstPage.css";
import bioinfo from "../../videos/Bioinfo2.mp4";

function FirstPage() {
  return (
    <div>
      <div classname="view">
        <Header />
        <video
          src={bioinfo}
          className="video"
          loop
          muted
          autoPlay
          poster
          alt="bioinfo.img"
        />
      </div>
    </div>
  );
}

export default FirstPage;
