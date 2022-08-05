import { useState } from "react";
import classes from "./Header.module.css";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";
import ToolsMenu from "./ToolsMenu";
import { useHistory } from "react-router-dom";
import styled from "styled-components";

const useStyles = makeStyles((theme) => ({
  root: {
    color: "#fff",
    padding: "5px 20px",
    "& > *": {
      margin: theme.spacing(0.4),
    },
  },
}));
export default function Header(props) {
  const [anchor, setanchor] = useState(null);
  const mStyle = useStyles();
  const history = useHistory();

  function handleClick(event) {
    setanchor(event.currentTarget);
  }

  function handleClose(event) {
    setanchor(null);
    if (event) {
      var str = event.target.textContent;
      var modifiedStr = str.toLowerCase().replace(/ /g, "_");
      history.push("/tools/backtranseq");
      // `/webenv/${props.dataConstruct.webEnv}/tools/${modifiedStr}`
    }
  }

  return (
    <div>
      <Nav>
        <Desktop>
          <div className={classes.wrapperRight}>
            <ul>
              <li>
                <Button className={mStyle.root}>About</Button>
              </li>
              <li>
                <Button
                  className={mStyle.root}
                  aria-haspopup="true"
                  aria-controls={ToolsMenu}
                  onClick={handleClick}
                >
                  Tools
                </Button>
                <ToolsMenu anchor={anchor} handleClose={handleClose} />
              </li>

              <li>
                <Button className={mStyle.root} endIcon={<ArrowDropDownIcon />}>
                  More
                </Button>
              </li>
            </ul>
          </div>
        </Desktop>
      </Nav>
    </div>
  );
}

const Nav = styled.div`
  height: 10rem;
  width: 100%;
`;

const Desktop = styled.div`
  width: 100%;
  height: 55px;
`;

const WrapperRight = styled.div`
  display: flex;
  height: 55px;
  justify-content: flex-end;
`;

// ipg
// eslint-disable-next-line no-lone-blocks
{
  /* <Card>
   <h2>title Name</h2>
      <div style={{ paddingBottom: "12px" }} className={classes.flex}>
            <p>accesionkey</p> --acc
            <p>28800982</p>  -- ipg id
            <p>Organism</p>  -- organism
            <p>2</p> -- protein count
            <p>
              download
              <span>
                <ArrowDropDownIcon />
              </span>{" "}
            </p>
      </Card> */
}

// Pubmed
// <Card>
// eslint-disable-next-line no-lone-blocks
{
  /* <h2>title Name</h2> */
}
// <div style={{ paddingBottom: "12px" }} className={classes.flex}>
//       <p>NLM unique id </p>
//       <p> volume</p>
//       <p>pages</p>
//       <p>language</p>
//       <p>
//         download
//         <span>
//           <ArrowDropDownIcon />
//         </span>{" "}
//       </p>
// </Card>

// structure
// <Card>
// eslint-disable-next-line no-lone-blocks
{
  /* <h2>title Name</h2> */
}
// <div style={{ paddingBottom: "12px" }} className={classes.flex}>
//       <p>PdbDescr </p>
//       <p> pdbAcc</p>
//       <p>pdbClass</p>
//       <p>LigCount</p>
//       <p>
//         Connect PDB
//         <span>
//           <ArrowDropDownIcon />
//         </span>{" "}
//       </p>
// </Card>

// structure
// eslint-disable-next-line no-lone-blocks
{
  /* <Card>
<h2>title Name</h2>
<div style={{ paddingBottom: "12px" }} className={classes.flex}>
      <p>PdbDescr </p>
      <p> pdbAcc</p>
      <p>pdbClass</p>
      <p>LigCount</p>
      <p>
        Connect PDB
        <span>
          <ArrowDropDownIcon />
        </span>{" "}
      </p>
</Card> */
}

// genome
// eslint-disable-next-line no-lone-blocks
{
  /* <Card>
<h2>Organism name </h2>
<div style={{ paddingBottom: "12px" }} className={classes.flex}>
      <p>Assembly Accession </p>
      <p> Assembly Id</p>
      <p>number of chromosomes</p>
      <p>
        Connect PDB
        <span>
          <ArrowDropDownIcon />
        </span>{" "}
      </p>
</Card> */
}
