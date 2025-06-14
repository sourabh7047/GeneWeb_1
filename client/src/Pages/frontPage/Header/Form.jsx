import React, { useRef, useState } from "react";
import StorageIcon from "@mui/icons-material/Storage";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import Button from "@mui/material/Button";
import Menus from "../Menus";
import Warning from "./Warning";
import Backdrop from "./Backdrop";
import { createTheme } from "@mui/material";


export default function Form(props) {
  // states and hooks -----------------
  const useStyles = createTheme({
    root: {
      background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
      border: 0,
      borderRadius: 3,
      boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
      color: 'white',
      height: 48,
      padding: '0 30px',
    },
  });
  const [anchorEle, setAnchorEle] = useState(null);
  const [DbName, setDbName] = useState("Database");
  const [WarningHook, setWarningHook] = useState(false);
  const DBdataRef = useRef();
  const QuerytermRef = useRef();
  const classes = useStyles();

  // eventHandle---------------------------
  const handleClick = (event) => {
    setAnchorEle(event.currentTarget);
  };

  const handleClose = (name) => {
    if (name !== null) {
      setDbName(name);
    }
    setAnchorEle(null);
  };

  const handleSearch = (event) => {}

  const removeWarning = () => {
    setWarningHook(false);
  };

  const submitHandler = (event) => {
    event.preventDefault();
    console.log(event);
    const EnteredDbdata = DBdataRef.current.value;
    const EnteredQueryTerm = QuerytermRef.current.value;

    if (EnteredDbdata === "Database") {
      setWarningHook(true);
    } else {
      const searchData = {
        DBdata: EnteredDbdata,
        QueryTerm: EnteredQueryTerm,
      };

      // it is not any other component that need  to be bind to the component this OR using anonymus function thus we are directly calling the function
      props.AddNewSearch(searchData);
    }
  };

  //   virtualDom Element--------------------
  return (
    <div>
      <form onSubmit={submitHandler}>
        <ul className="db-search">
          <li>
            <Button
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
            </Button>
            <Menus anchorEl={anchorEle} handleClose={handleClose} />
          </li>
          <li>
            <input
              type="search"
              placeholder="write your query"
              ref={QuerytermRef}
              required
            />
          </li>
          <li>
            <button onClick={handleSearch} >Search</button>
          </li>
        </ul>
      </form>
      {WarningHook && <Warning DbName={DbName} removeWarning={removeWarning} />}
      {WarningHook && <Backdrop removeWarning={removeWarning} />}
    </div>
  );
}
