import React, { Component } from "react";

const SignUpContext = React.createContext(null);

export const withSignUp = Component => props => (
    <SignUpContext.Consumer>
        {SignUp => <Component {...props} SignUp ={SignUp}/>} 
    </SignUpContext.Consumer>
)

export default SignUpContext;