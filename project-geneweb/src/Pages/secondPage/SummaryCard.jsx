import React, { useState } from "react";
// import Cards from "./Cards";
import classes from "./SummaryCard.module.css";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";
import FileFormat from "./FileFormat";
import Formatmenus from "./Formatmenus";
import download from "downloadjs";
import styled from "styled-components";

function SummaryCard(props) {
  const [anchorEl, setAnchorEl] = React.useState(null);

  function handleClick(event) {
    setAnchorEl(event.currentTarget);
  }

  async function handleClose(id, format) {
    // console.log("entered ///////////////////////////");
    setAnchorEl(null);
    if (format !== "backdropClick") {
      var retmode = "";
      var rettype = "";
      FileFormat.databaseList.forEach((database) => {
        console.log(database + "   " + props.dataConstruct.dbdata);

        if (database === props.dataConstruct.dbdata) {
          // console.log(";;;;;;;;;;;;;;;;;;;;;;;");
          retmode = FileFormat.databaseData[database].Filetype[format].retmode;
          rettype = FileFormat.databaseData[database].Filetype[format].retype;
        }
      });
      let Acc = id.split(" ").pop();

      let fetchData = {
        retmode: retmode,
        rettype: rettype,
      };

      console.log(Acc);
      await fetch(`/internal/${props.dataConstruct.dbdata}/download/${Acc}`, {
        method: "POST",
        body: JSON.stringify(fetchData),
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then(function (response) {
          if (response.ok) {
            return response.text();
          } else {
            throw new Error("Something went wrong");
          }
        })
        .then(function (data) {
          download(data, `sequence.${rettype}`, "text/fasta");
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }
  console.log("entered SummaryCard");
  return (
    <li className={classes.list}>
      <Cards>
        <Title>{props.title}</Title>
        <Hr />
        <Content>
          <p>{props.FirstField}</p>
          <p>{props.SecondField}</p>
          <p>{props.ThirdField}</p>
          <p>{props.FourthField}</p>
          <Button
            aria-controls="simple-menu"
            aria-haspopup="true"
            endIcon={<ArrowDropDownIcon />}
            onClick={handleClick}
            classes={{
              root: classes.root,
            }}
          >
            Download
          </Button>
          <Formatmenus
            anchorEl={anchorEl}
            handleClose={handleClose}
            Format={props.Format}
            id={props.FirstField}
          />
        </Content>
      </Cards>
    </li>
  );
}

export default SummaryCard;

const Hr = styled.hr`
  margin-bottom: 5px;
`;

const Title = styled.h4`
  line-height: 2rem;
  margin: 0px;
`;

const Content = styled.div`
  line-height: 1rem;
`;

const Cards = styled.div`
  width: 100%;
  height: 220px;
  color: white;
  margin: 20px 0px;
  padding: 20px;
  gap: 20px;
  display: block;
  border-radius: 10px;
  backdrop-filter: blur(4px);
  background-color: rgba(201, 75, 236, 0.151);
  box-shadow: rgba(0, 0, 0, 0.3) 2px 0px 0px;
  border: 1px rgba(255, 255, 255, 0.4) solid;
  border-bottom: 1px rgba(40, 40, 40, 0.35) solid;
  border-right: 1px rgba(40, 40, 40, 0.35) solid;

  &:hover {
    box-shadow: rgba(0, 0, 0, 0.7) 2px 8px 15px;
    box-shadow: #fbffff 0px 0px 20px;
    transition: 0.25s;
  }
`;
