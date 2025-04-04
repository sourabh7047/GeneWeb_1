import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import SearchBar from "material-ui-search-bar";
import Button from "@material-ui/core/Button";
import StorageIcon from "@material-ui/icons/Storage";
import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown";
import Menus from "./Menus"; // Import the Menus component
import "./FirstPage.css";

const FirstPage = () => {
  const [anchorEl, setAnchorEl] = useState(null); // Renamed from 'anchorEle' to 'anchorEl'
  const [DbName, setDbName] = useState("Database");
  const [QueryTerm, setQueryTerm] = useState("");
  const history = useHistory();

  // Event Handlers
  const handleClick = (event) => setAnchorEl(event.currentTarget);

  const handleClose = (name) => {
    if (name) {
      setDbName(name);
    }
    setAnchorEl(null); // Updated to use 'anchorEl'
  };

  const handleOnChange = (event) => {
    var event = event.trim();
    setQueryTerm(event)}

  const submitHandler = (event) => {
    event.preventDefault();
    if (DbName === "Database") {
      alert("Please select a database!");
    } else {
      const searchData = { DBdata: DbName, QueryTerm };
      console.log(searchData);
      fetch("/internal/dbinfoData", {
        method: "POST",
        body: JSON.stringify(searchData),
        headers: { "Content-Type": "application/json" },
      })
        .then((response) => response.json())
        .then((myJson) => {
          history.push({
            pathname: `/${myJson.dbdata}/webenv/${myJson.webEnv}/page/${myJson.page}`,
            state: { query: myJson.queryKey, length: myJson.length },
          });
        });
    }
  };

  // Database Status Handler
  const handleDbStatus = (status) => {
    console.log(`Database Status: ${status ? "Loading..." : "Ready"}`);
  };

  return (
    <MainContainer>

      {/* Hero Section */}
      <HeroSection>
        <h1>Welcome to Gntx</h1>
        <p>Search across integrated NCBI and EBI databases effortlessly.</p>
      </HeroSection>

      {/* Search Bar Section */}
      <SearchSection>
        <Form onSubmit={submitHandler}>
          <ContentBox>
            <DbButton
              startIcon={<StorageIcon />}
              endIcon={<KeyboardArrowDownIcon />}
              onClick={handleClick}
            >
              {DbName}
            </DbButton>
            <Menus
              anchorEl={anchorEl} // Updated to use 'anchorEl'
              handleClose={handleClose}
              DbStatus={handleDbStatus}
            />
          </ContentBox>
          <ContentBox>
            <SearchBar
              value={QueryTerm}
              onChange={(e) => handleOnChange(e)}
              placeholder="Enter search term..."
            />
          </ContentBox>
          <SearchButton type="submit">Search</SearchButton>
        </Form>
      </SearchSection>
    </MainContainer>
  );
};

export default FirstPage;

// Styled Components
const MainContainer = styled.div`
  background: linear-gradient(135deg, #f9f9f9, #e0f7fa);
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-family: "Poppins", sans-serif;
`;

const HeroSection = styled.div`
  text-align: center;
  margin-bottom: 2rem;

  h1 {
    font-size: 2.5rem;
    color: #0074d9;
    margin-bottom: 0.5rem;
  }

  p {
    font-size: 1.2rem;
    color: #555;
  }
`;

const SearchSection = styled.div`
  background: rgba(255, 255, 255, 0.9);
  padding: 2rem;
  border-radius: 15px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 800px;
`;

const Form = styled.form`
  display: flex;
  align-items: center;
  gap: 1rem;
  justify-content: space-between;
`;

const ContentBox = styled.div`
  display: flex;
  align-items: center;
`;

const DbButton = styled(Button)`
  background: linear-gradient(135deg, #0074d9, #2ecc40);
  color: white;
  border-radius: 25px;
  padding: 0.7rem 1.5rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease;

  &:hover {
    transform: scale(1.05);
  }
`;

const SearchButton = styled(Button)`
  background: linear-gradient(135deg, #ff416c, #ff4b2b);
  color: white;
  border-radius: 25px;
  padding: 0.7rem 1.5rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease;

  &:hover {
    transform: scale(1.05);
  }
`;