import React from "react";
import BodyLayout from "./BodyLayout";
import classes from "./Header.module.css";
import Summary from "./Summary";
import PaginationComponent from "./PaginationComponent";
import Webcontext from "./context";
import styled from "styled-components";

function Body(props) {
  const dataSetLength = props.dataConstruct.length;

  return (
    <div>
      <Webcontext.Consumer>
        {(data) => (
          <BodyLayout>
            <Data>
              <Summary dataConstruct={data} />
            </Data>

            <PaginationComponent
              totalDataset={data.length}
              dataConstruct={props.dataConstruct}
            />
          </BodyLayout>
        )}
      </Webcontext.Consumer>
    </div>
  );
}

export default Body;

const Data = styled.div`
  overflow: auto;
  height: 100%;
`;
