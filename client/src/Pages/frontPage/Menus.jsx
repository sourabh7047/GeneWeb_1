import React, { useState, useEffect } from "react";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import "./FirstPage.css";

const Menus = ({ anchorEl, handleClose, DbStatus }) => {
  const [Dbdata, setDbdata] = useState([]);

  const DbInfo = async () => {
    DbStatus(true);

    await fetch("/internal/dbinfo")
      .then((response) => {
        console.log(response)
        return response.json();
      })
      .then((text) => {
        console.log(text);
        setDbdata(text);
      });
    DbStatus(false);
  };

  useEffect(() => {
    DbInfo();
  }, []);

  return (
    <Menu
      id="Menus"
      anchorEl={anchorEl} 
      keepMounted
      open={Boolean(anchorEl)}
      onClose={() => handleClose(null)}
    >
      {Dbdata.map((item, index) => (
        <MenuItem onClick={() => handleClose(Dbdata[index])} key={index}>
          {item}
        </MenuItem>
      ))}
    </Menu>
  );
};

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

export default Menus;
