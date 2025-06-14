import React from "react";
import { useState, useEffect } from "react";
import SummaryList from "./SummaryList";
import Puff  from "../../Assets/puff.svg";
import Styled from "styled-components";

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

  return (
    <>
      {isloading ? (
        <Loading>
          <Puff />
          <p>Loading...</p>
        </Loading>
      ) : (
        <Innerlayout>
          <SummaryList
            summaryItemList={loadingSummary}
            dataConstruct={props.dataConstruct}
          />
        </Innerlayout>
      )}
    </>
  );
}

export default Summary;

const Loading = Styled.div`
position: relative;
display: flex;
flex-direction: column; 
justify-content: space-around;
align-items: center;
top: 50%;
align-content: center;
`;

const Innerlayout = Styled.div`
flex: 1;
  margin-right: 2rem;
`;
