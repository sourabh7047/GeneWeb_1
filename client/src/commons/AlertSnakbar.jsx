import React, { useState } from "react";
import styled from "styled-components";
import Snackbar from "@mui/material/Snackbar";
import Button from "@mui/material/Button";
import Slide from "@mui/material/Slide";

const TransitionDown = (props) => {
  return <Slide {...props} direction="down" />;
};

const vertical = "top";
const horizontal = "center";

const AlertSnackbar = ({ error }) => {
  const [open, setOpen] = useState(true);
  
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  return (
    <Snackbar
      open={open}
      onClose={handleClose}
      // autoHideDuration={4000} causing error as we are setting alerts using redux timeouts
      anchorOrigin={{ vertical, horizontal }}
      //   key={alert.id}
      message={error}
      TransitionComponent={TransitionDown}
      ContentProps={{
        sx: {
          background:
            alert.alertType === "success"
              ? "green"
              : alert.alertType === "warning"
              ? "orange"
              : "red",
          zIndex: "999",
        },
      }}
      //   action={
      //     alert.hasAction ? (
      //       <Button color="inherit" size="small">
      //         <Anchor href={`${alert.hasAction}`} target="_blank">
      //           View
      //         </Anchor>
      //       </Button>
      //     ) : (
      //       ""
      //     )
      //   }
    />
  );
};

const Anchor = styled.a`
  text-decoration: none;
  color: white;

  &:hover {
    color: #f5f5f5;
  }
`;

export default AlertSnackbar;
