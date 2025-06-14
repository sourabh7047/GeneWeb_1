// import React, { useState, useEffect } from "react";
// import Menu from "@mui/material/Menu";
// import MenuItem from "@mui/material/MenuItem";
// import "./FirstPage.css";

// const Menus = ({ anchorEl, handleClose, DbStatus }) => {
//   const [Dbdata, setDbdata] = useState([]);

//   const DbInfo = async () => {
//     DbStatus(true);

//     await fetch("/internal/dbinfo")
//       .then((response) => {
//         console.log(response)
//         return response.json();
//       })
//       .then((text) => {
//         console.log(text);
//         setDbdata(text);
//       });
//     DbStatus(false);
//   };

//   useEffect(() => {
//     DbInfo();
//   }, []);

//   return (
//     <Menu
//       id="Menus"
//       anchorEl={anchorEl} 
//       keepMounted
//       open={Boolean(anchorEl)}
//       onClose={() => handleClose(null)}
//     >
//       {Dbdata.map((item, index) => (
//         <MenuItem onClick={() => handleClose(Dbdata[index])} key={index}>
//           {item}
//         </MenuItem>
//       ))}
//     </Menu>
//   );
// };


import React, { useState, useEffect } from "react";
import { Menu, MenuItem, CircularProgress } from "@mui/material";
import styled from "styled-components";

const StyledMenu = styled(Menu)`
  .MuiPaper-root {
    background: #fff;
    border-radius: 8px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  }

  .MuiMenuItem-root {
    font-size: 0.9rem;
    color: #333;
    transition: background-color 0.3s ease;

    &:hover {
      background-color: #f0f8ff;
    }
  }
`;

const LoadingIndicator = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 1rem;
`;

const Menus = ({ anchorEl, handleClose, DbStatus }) => { // Updated to use 'anchorEl'
  const [Dbdata, setDbdata] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  // Fetch Database Information
  const fetchDbInfo = async () => {
    DbStatus(true); // Notify parent that data fetching has started
    try {
      const response = await fetch("/internal/dbinfo");
      if (!response.ok) {
        throw new Error("Failed to fetch database information.");
      }
      const data = await response.json();
      setDbdata(data);
    } catch (err) {
      console.error(err);
      setError(true); // Set error state if fetching fails
    } finally {
      setLoading(false); // Mark loading as complete
      DbStatus(false); // Notify parent that data fetching has ended
    }
  };

  useEffect(() => {
    fetchDbInfo();
  }, []);

  return (
    <StyledMenu
      id="Menus"
      anchorEl={anchorEl} // Updated to use 'anchorEl'
      keepMounted
      open={Boolean(anchorEl)} // Updated to use 'anchorEl'
      onClose={() => handleClose(null)}
    >
      {loading && (
        <LoadingIndicator>
          <CircularProgress size={20} />
        </LoadingIndicator>
      )}
      {error && (
        <MenuItem disabled>Error loading databases. Please try again.</MenuItem>
      )}
      {!loading && !error && Dbdata.length === 0 && (
        <MenuItem disabled>No databases available.</MenuItem>
      )}
      {!loading &&
        !error &&
        Dbdata.map((item, index) => (
          <MenuItem key={index} onClick={() => handleClose(item)}>
            {item}
          </MenuItem>
        ))}
    </StyledMenu>
  );
};

export default Menus;

// class Menus extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       dbData: [],
//       isLoading: true,
//     };
//   }
//   getData = () => {
//     this.setState({
//       isLoading: true,
//     });
//     fetch("/internal/dbinfo")
//       .then((response) => {
//         return response.json();
//       })
//       .then((text) => {
//         console.log(text);
//         this.setState({
//           isLoading: false,
//           dbData: text,
//         });
//       });
//   };

//   componentDidMount() {
//     this.getData();
//   }
//   render() {
//     if (this.state.isLoading) {
//       return (
//         <section>
//           <p>Loading...</p>
//         </section>
//       );
//     } else {
//       return (
//         <Menu
//           id="Menus"
//           anchorEl={this.props.anchorEl}
//           keepMounted
//           open={Boolean(this.props.anchorEl)}
//           onClose={() => this.props.handleClose(null)}
//         >
//           {this.state.dbData.map((item, index) => (
//             <MenuItem
//               onClick={() => this.props.handleClose(this.state.dbData[index])}
//               key={index}
//             >
//               {item}
//             </MenuItem>
//           ))}
//         </Menu>
//       );
//     }
//   }
// }

// export default Menus;
