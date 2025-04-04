import Header from "./Header";
import Summary from "./Summary";
import PaginationComponent from "./PaginationComponent";
import { useLocation, useParams } from "react-router";
import WebContext from "./context";
import styled from "styled-components";
import SearchAppBar from "../../commons/nav";

const SecondPage = (props) => {
  let Location = useLocation();
  const { dbdata, webenv, page } = useParams();

  let dataConstruct = {
    dbdata: dbdata,
    webenv: webenv,
    page: page,
    length: Location.state.length,
    query: Location.state.query,
  };

  console.log(dataConstruct);

  return (
    <WebContext.Provider value={dataConstruct}>
      <SearchAppBar />
      <MainContainer>
        <Bodylayout>
          <Data>
            <Summary dataConstruct={dataConstruct} />
          </Data>

          <PaginationComponent
            totalDataset={dataConstruct.length}
            dataConstruct={dataConstruct}
          />
        </Bodylayout>
      </MainContainer>
    </WebContext.Provider>
  );
};

export default SecondPage;

const MainContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh; /* Ensures the container spans the full viewport height */
  padding-top: 60px; /* Accounts for the navigation bar's height */
`;

const Data = styled.div`
  overflow: auto; /* Allows scrolling if content overflows */
  height: 100%; /* Takes up the full height of the parent */
`;

const Bodylayout = styled.div`
  border-radius: 6px;
  box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.3);
  display: flex;
  flex-direction: column;
  margin: 10px auto; /* Centers the layout horizontally */
  padding: 1rem;
  width: 80%; /* Responsive width */
  max-width: 1200px; /* Limits the maximum width */

  /* Dynamic height calculation */
  height: calc(100vh - 120px); /* Subtract navigation bar height (60px) + padding/margin (60px) */
  background-color: rgba(201, 75, 236, 0.151);
  box-shadow: rgba(0, 0, 0, 0.3) 2px 8px 8px;
  border: 1px rgba(255, 255, 255, 0.4) solid;
  border-bottom: 1px rgba(40, 40, 40, 0.35) solid;
  border-right: 1px rgba(40, 40, 40, 0.35) solid;

  /* Overflow behavior */
  overflow: hidden; /* Prevents content from spilling out */
`;