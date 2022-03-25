import Header from "./Header";
// import BodyLayout from "./BodyLayout";
import Summary from "./Summary";
import PaginationComponent from "./PaginationComponent";
import { useLocation, useParams } from "react-router";
import WebContext from "./context";
import styled from "styled-components";

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
      <Header dataConstruct={dataConstruct} />
      <Bodylayout>
        <Data>
          <Summary dataConstruct={dataConstruct} />
        </Data>

        <PaginationComponent
          totalDataset={dataConstruct.length}
          dataConstruct={dataConstruct}
        />
      </Bodylayout>
    </WebContext.Provider>
  );
};

export default SecondPage;

const Data = styled.div`
  overflow: auto;
  height: 100%;
`;

const Bodylayout = styled.div`
  border-radius: 6px;
  box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.3);
  display: flex;
  flex-direction: column;
  height: 87%;
  margin: 10px 0;
  padding: 1rem;
  position: absolute;
  right: 5%;
  top: 6%;
  width: 80%;
  z-index: 2;

  border-radius: 10px;
  backdrop-filter: blur(5px);
  background-color: rgba(201, 75, 236, 0.151);
  box-shadow: rgba(0, 0, 0, 0.3) 2px 8px 8px;
  border: 1px rgba(255, 255, 255, 0.4) solid;
  border-bottom: 1px rgba(40, 40, 40, 0.35) solid;
  border-right: 1px rgba(40, 40, 40, 0.35) solid;
`;
