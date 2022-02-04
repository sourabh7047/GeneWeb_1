import React from "react";
import { useState, useEffect } from "react";
import SummaryList from "./SummaryList";
import classes from "./Summary.module.css";
import { ReactComponent as Puff } from '../../Assets/puff.svg';




function Summary(props) {
  // pagination

  // const [currentPage, setcurrentPage] = useState(1);

  // summary
  const [isloading, setisloading] = useState(true);
  const [loadingSummary, setLoadingSummary] = useState([]);
 

  // let pages = [];

  useEffect(() => {
    setisloading(true);

    fetch(
      `/internal/${props.dataConstruct.dbdata}/webenv/${props.dataConstruct.webenv}/query/${props.dataConstruct.query}/page/${props.dataConstruct.page}`
    )
      .then(function (res) {
        return res.json();
      })
      .then(function (data) {
        console.log(data);
        // setlength(data.length);
        setLoadingSummary(data.summary);
        setisloading(false);
      });


  }, []);

  if (isloading) {
    return (
      <section class={classes.loading}>
        <Puff/>
        <p>Loading...</p>
      </section>
    );
  }

  return (
    <div className={`${classes.innerlayout} `}>
      <SummaryList summaryItemList={loadingSummary} dataConstruct={props.dataConstruct} />
    </div>
  );
}

export default Summary;
