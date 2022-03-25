import React, { useState, useEffect, useRef } from "react";
import Menus from "../frontPage/Menus";
import { useHistory } from "react-router-dom";
import Warning from "./Header/Warning";
import Backdrop from "./Header/Backdrop";
import Button from "@material-ui/core/Button";
import StorageIcon from "@material-ui/icons/Storage";
import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown";
import { makeStyles } from "@material-ui/styles";
import SearchBar from "material-ui-search-bar";
import styled from "styled-components";
import "./FirstPage.css";

const useStyles = makeStyles({
  root: {
    background: "linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)",
    border: 0,
    borderRadius: 3,
    boxShadow: "0 3px 5px 2px rgba(255, 105, 135, .3)",
    color: "white",
    height: 48,
    padding: "0 30px",
  },
});

const FirstPage = () => {
  const [anchorEle, setAnchorEle] = useState(null);
  const [IsLoading, setIsLoading] = useState(true);
  const [DbName, setDbName] = useState("Database");
  const [WarningHook, setWarningHook] = useState(false);
  const history = useHistory();
  const DBdataRef = useRef();
  const [QueryTerm, setQueryTerm] = useState("");
  // const QuerytermRef = useRef();
  const [WebData, setWebData] = useState({
    dbData: "",
    webEnv: "",
  });

  // console.log(history);
  // const [Navbar, setNavbar] = useState(false);
  // const [History, setHistory] = useState();
  // const [WebEnv, setWebEnv] = useState("");
  // const [Dbdata, setDbdata] = useState("");
  // const classes = useStyles();

  //-----------------------------------------------------------EVENT HANDLERS-----------------------------------
  const handleClick = (event) => {
    setAnchorEle(event.currentTarget);
  };

  const handleClose = (name) => {
    if (name !== null) {
      setDbName(name);
    }
    setAnchorEle(null);
  };

  const removeWarning = () => {
    setWarningHook(false);
  };

  const handleDbStatus = () => {};

  const handleOnChange = (event) => {
    setQueryTerm(event);
  };

  const submitHandler = (event) => {
    event.preventDefault();
    // console.log(event);
    const EnteredDbdata = DBdataRef.current.value;
    const EnteredQueryTerm = QueryTerm;

    if (EnteredDbdata === "Database") {
      setWarningHook(true);
    } else {
      const searchData = {
        DBdata: EnteredDbdata,
        QueryTerm: EnteredQueryTerm,
      };

      // it is not any other component that need  to be bind to the component this OR using anonymus function thus we are directly calling the function
      onAddNewSearch(searchData);
    }
  };
  const changeBackground = () => {
    console.log(window.scrollY);
    let x = window.scrollY;
    if (x > 80) {
      this.setState({
        navbar: true,
      });
      console.log("yes");
    } else {
      this.setState({
        navbar: false,
      });
    }
  };

  const onAddNewSearch = (searchData) => {
    // it is a standard javascipt function nothing to do with node
    console.log(searchData);
    fetch("/internal/dbinfoData", {
      method: "POST",
      body: JSON.stringify(searchData),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then(function (response) {
        return response.json();
      })
      .then((myJson) => {
        console.log(myJson);
        setWebData({ dbdata: myJson.dbdata, webEnv: myJson.webEnv });
        // this.setState({ dbdata: myJson.dbdata, webEnv: myJson.webEnv });

        history.push({
          pathname: `/${myJson.dbdata}/webenv/${myJson.webEnv}/page/${myJson.page}`,
          state: {
            query: myJson.queryKey,
            length: myJson.length,
          },
        });
      });
  };

  useEffect(() => {
    window.addEventListener("scroll", changeBackground);
  }, []);

  return (
    <div>
      <div classname="view">
        <Nav>
          <LeftPlacement>
            <h1>Gntx</h1>
          </LeftPlacement>
          {/* <div style={{ flex: "1" }}></div> */}
          <RightPlacement>
            <Form onSubmit={submitHandler}>
              <ContentBox>
                <DbButton
                  style={{
                    background: "#fff",
                    height: "3rem",
                    width: "10rem",
                  }}
                  startIcon={<StorageIcon />}
                  endIcon={<KeyboardArrowDownIcon size="large" />}
                  aria-haspopup="true"
                  aria-controls="Menus"
                  onClick={handleClick}
                  name="DBdata"
                  value={DbName}
                  ref={DBdataRef}
                  // className={useStyles.root}
                >
                  {DbName}
                </DbButton>
                <Menus
                  anchorEl={anchorEle}
                  handleClose={handleClose}
                  DbStatus={handleDbStatus}
                />
              </ContentBox>
              <ContentBox>
                <SearchBar
                  value={QueryTerm}
                  onChange={(e) => {
                    handleOnChange(e);
                  }}
                  style={{ width: "30rem", minWidth: "5rem" }}
                />
              </ContentBox>
            </Form>
          </RightPlacement>
          {WarningHook && (
            <Warning DbName={DbName} removeWarning={removeWarning} />
          )}
          {WarningHook && <Backdrop removeWarning={removeWarning} />}
        </Nav>
      </div>
    </div>
  );
};

export default FirstPage;

const Nav = styled.div`
  background: transparent;
  position: sticky;
  top: 0;
  transition: 1s;

  top: ${({ popNavProp }) =>
    !popNavProp ? "0px !important;" : "-90px !important;"};

  height: 90px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  z-index: 10;
  margin-bottom: 10px;

  @media (min-width: 992px) {
    width: 100vw;
  }
`;

const DbButton = styled(Button)`
  box-shadow: 0px 2px 1px -1px rgb(0 0 0 / 20%),
    0px 1px 1px 0px rgb(0 0 0 / 14%), 0px 1px 3px 0px rgb(0 0 0 / 12%);
`;

const Form = styled.form`
  display: flex;
  justify-content: space-around;
`;

const LeftPlacement = styled.div`
  padding: 0px 20px;
`;

const RightPlacement = styled.div`
  padding: 0px 20px;
  display: flex;
  justify-content: space-around;
  flex-direction: row;
`;

const ContentBox = styled.div`
  display: flex;
  flex-direction: column;
  margin-right: 2rem;
`;
