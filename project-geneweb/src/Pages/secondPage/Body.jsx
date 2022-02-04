import React from "react";
import BodyLayout from "./BodyLayout";
import Cards from "./Cards";
import classes from "./Header.module.css";
import Summary from "./Summary";
import PaginationComponent from "./PaginationComponent";
import Webcontext from "./context";

function Body(props) {
  const dataSetLength = props.dataConstruct.length;

  return (
    <div>
      <Webcontext.Consumer>
        {(data) => (
          <BodyLayout>
            <div className={classes.data}>
              <Summary dataConstruct={data} />
            </div>
            <div>
              <PaginationComponent
                totalDataset={data.length}
                dataConstruct={props.dataConstruct}
              />
            </div>
          </BodyLayout>
        )}
      </Webcontext.Consumer>
    </div>
  );
}

Body.propTypes = {};

export default Body;
