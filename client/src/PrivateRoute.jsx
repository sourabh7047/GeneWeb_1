import React, { Component, useEffect, useState } from "react";
import { Navigate, Route } from "react-router-dom";
import { AuthUserContext } from "./component/Session";
// import { withFirebase } from "./component/Firebase";
export default function PrivateRouteBase({ component: Component, condition, ...rest }) {
  return (

      <Route
        {...rest}
        render={(props) => {
          return (
            <AuthUserContext.Consumer>
              {authUser => {
                return condition(authUser) ? (
                  <Component {...props} />
                ) : (
                  <Navigate to="/signin" />
                );
              }}
            </AuthUserContext.Consumer>
          );
          // return user ? (
          //   <Component {...props} />
          // ) : (
          //   <Navigate to="/signin" />
          // );
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



