import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Pagination from "@material-ui/lab/Pagination";
import classes from "./PaginationComponent.module.css";
import { useHistory } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      marginTop: theme.spacing(2),
    },
  },
}));

export default function PaginationButtons(props) {
  const classes = useStyles();
  const history = useHistory();

  const singlePageSet = 20;
  const totalPages = Math.ceil(props.totalDataset / singlePageSet);

  const handleClick = (event) => {
    console.log(event);
    history.push({
      pathname: `/${props.dataConstruct.dbdata}/webenv/${props.dataConstruct.webenv}/page/${event.target.textContent}`,
      state: {
        query: props.dataConstruct.query,
        length: props.dataConstruct.length,
      },
    });
  };

  return (
    <div className={classes.root} style={{alignContent:"center"}}>
      <Pagination
        page={parseInt(props.dataConstruct.page)}
        count={totalPages}
        onClick={handleClick}
        hideNextButton = {true} 
        hidePrevButton = {true}
        style={{display:"inline-flex", alignSelf:"center"}}
      />
    </div>
  );
}
