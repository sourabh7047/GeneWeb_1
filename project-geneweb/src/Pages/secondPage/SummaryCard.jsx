import React, { useState } from "react";
import Cards from "./Cards";
import classes from "./SummaryCard.module.css";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";
import FileFormat from "./FileFormat";
import Formatmenus from "./Formatmenus";
import download from "downloadjs";

function SummaryCard(props) {
  const [anchorEl, setAnchorEl] = React.useState(null);

  function handleClick(event) {
    setAnchorEl(event.currentTarget);
  }

  async function handleClose(id, format) {
    console.log("entered ///////////////////////////");
    setAnchorEl(null);
    if (format !== "backdropClick") {
      var retmode = "";
      var rettype = "";
      FileFormat.databaseList.forEach((database) => {
        console.log(database+"   "+props.dataConstruct.dbdata);

        if (database === props.dataConstruct.dbdata) {
          console.log(";;;;;;;;;;;;;;;;;;;;;;;")
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
        <h4>{props.title}</h4>
        <div style={{ paddingBottom: "12px" }} className={classes.flex}>
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
        </div>

        <hr className={classes.hrStyle} />
      </Cards>
    </li>
  );
}

export default SummaryCard;
