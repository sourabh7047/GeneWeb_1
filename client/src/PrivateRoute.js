import React, { Component, useEffect, useState } from "react";
import { Redirect, Route } from "react-router-dom";
// import { withFirebase } from "./component/Firebase";
import { currentUser } from "./component/Firebase/firebase";

export default function PrivateRouteBase({ component: Component, ...rest }) {
    const user = currentUser
  return (
    <Route
      {...rest}
      render={(props) => {
        return user ? (
          <Component {...props} />
        ) : (
          <Redirect to="/signin" />
        );
      }}
    ></Route>
  );
}

// class PrivateRouteBase extends Component {
//   constructor(props) {
//     super(props);
//     console.log('user',this.props.firebase.doOnAuthStateChanged())
//     this.state = {
//       component: props.Component,
//       path: props.path,
//       currentUser: null,
//     }
//   }

//   componentDidMount() {
//     console.log("us")
//     console.log(this.props.firebase.doOnAuthStateChanged())
//     this.setState({ currentUser: this.props.firebase.doOnAuthStateChanged() });
//   }

//   render() {
//     const {currentUser, path } = this.state;
//     return (
//       <Route

//         render={(props) => {
//           return currentUser ? (
//             <Component {...this.props} />
//           ): null

//         }}
//       ></Route>
//     );
//   }
// }



