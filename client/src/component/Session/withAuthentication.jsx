import React, { useState, useEffect } from "react";
import AuthUserContext from "./context";
import { withFirebase } from "../Firebase";

const withAuthentication = (Component) => {
  const WithAuthentication = ({ firebase, ...props }) => {
    // State to hold the authenticated user
    const [authUser, setAuthUser] = useState(() => {
      const storedUser = localStorage.getItem("authUser");
      return storedUser ? JSON.parse(storedUser) : null;
    });
    console.log("hello");
    // Effect to listen for authentication state changes
    useEffect(() => {
      // Subscribe to Firebase's auth state listener
      const unsubscribe = firebase.onAuthUserListener(
        (authUser) => {
          console.log("authUser", authUser);
          console.log("//");
          // Save the authenticated user to localStorage
          localStorage.setItem("authUser", JSON.stringify(authUser));
          // Update the state with the authenticated user
          setAuthUser(authUser);
        },
        () => {
          // Remove the user from localStorage if not authenticated
          localStorage.removeItem("authUser");
          // Update the state to indicate no user is logged in
          setAuthUser(null);
        }
      );

      // Cleanup the listener when the component unmounts
      return () => unsubscribe();
    }, [firebase]);

    // Log the current authUser for debugging
    console.log("hello", authUser);

    // Provide the authUser context and render the wrapped component
    return (
      <AuthUserContext.Provider value={authUser}>
        <Component {...props} />
      </AuthUserContext.Provider>
    );
  };

  // Wrap the functional component with the `withFirebase` HOC to inject the `firebase` prop
  return withFirebase(WithAuthentication);
};

export default withAuthentication;