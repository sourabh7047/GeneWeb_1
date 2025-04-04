import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";
import FileFormat from "./FileFormat";
import Formatmenus from "./Formatmenus";
import download from "downloadjs";
import styled from "styled-components";

const SummaryCard = (props) => {
  const [anchorEl, setAnchorEl] = React.useState(null);

  // Handle dropdown menu open
  const handleClick = (event) => setAnchorEl(event.currentTarget);

  // Handle dropdown menu close and file download
  const handleClose = async (id, format) => {
    setAnchorEl(null);
    if (format !== "backdropClick") {
      let retmode = "";
      let rettype = "";

      // Determine the file format details based on the database
      FileFormat.databaseList.forEach((database) => {
        if (database === props.dataConstruct.dbdata) {
          retmode = FileFormat.databaseData[database].Filetype[format].retmode;
          rettype = FileFormat.databaseData[database].Filetype[format].retype;
        }
      });

      // Extract Accession ID
      const Acc = id.split(" ").pop();

      // Fetch data for download
      const fetchData = { retmode, rettype };
      try {
        const response = await fetch(
          `/internal/${props.dataConstruct.dbdata}/download/${Acc}`,
          {
            method: "POST",
            body: JSON.stringify(fetchData),
            headers: { "Content-Type": "application/json" },
          }
        );

        if (!response.ok) throw new Error("Failed to download file");

        const data = await response.text();
        download(data, `sequence.${rettype}`, "text/fasta");
      } catch (error) {
        console.error(error);
      }
    }
  };

  return (
    <CardContainer>
      <Card>
        <Title>{props.title || "Untitled"}</Title>
        <Hr />
        <Content>
          <p><strong>Field 1:</strong> {props.FirstField || "N/A"}</p>
          <p><strong>Field 2:</strong> {props.SecondField || "N/A"}</p>
          <p><strong>Field 3:</strong> {props.ThirdField || "N/A"}</p>
          <p><strong>Field 4:</strong> {props.FourthField || "N/A"}</p>
          <DownloadButtonWrapper>
            <Button
              variant="contained"
              color="primary"
              endIcon={<ArrowDropDownIcon />}
              onClick={handleClick}
            >
              Download
            </Button>
            <Formatmenus
              anchorEl={anchorEl}
            handleClose={handleClose}
            Format={props.Format}
            id={props.FirstField}
            />
          </DownloadButtonWrapper>
        </Content>
      </Card>
    </CardContainer>
  );
};

export default SummaryCard;

// Styled Components
const CardContainer = styled.li`
  list-style: none;
  margin: 1rem 0;
  width: 100%;
`;

const Card = styled.div`
  background: linear-gradient(135deg, #ffffff, #f0f8ff);
  border-radius: 15px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  padding: 1.5rem;
  transition: transform 0.3s ease, box-shadow 0.3s ease;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 6px 10px rgba(0, 0, 0, 0.2);
  }
`;

const Title = styled.h4`
  font-size: 1.2rem;
  color: #0074d9;
  margin-bottom: 0.5rem;
`;

const Hr = styled.hr`
  border: 0;
  height: 1px;
  background: #ddd;
  margin: 0.5rem 0;
`;

const Content = styled.div`
  line-height: 1.5rem;
  color: #333;

  p {
    margin: 0.5rem 0;
  }

  strong {
    color: #0074d9;
  }
`;

const DownloadButtonWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-top: 1rem;
`;