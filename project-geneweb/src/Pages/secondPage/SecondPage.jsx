import Header from "./Header";
import Body from "./Body";
import { useLocation, useParams } from "react-router";
import WebContext from "./context";
 
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
    <div>
      <WebContext.Provider value= {dataConstruct}>
      <Header dataConstruct={dataConstruct}  />
      <Body dataConstruct={dataConstruct} />
      </WebContext.Provider>
    </div>
  );
};

export default SecondPage;
