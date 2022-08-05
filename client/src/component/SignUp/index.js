import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import { compose } from "recompose";

import { withFirebase } from "../Firebase";
import * as ROUTES from "../../routes";
import * as ROLES from "../../constants/roles";
import styled from "styled-components";

const SignUpPage = () => (
  <div>
    <Main>
      <Container>
        <h1>SignUp</h1>
        <SignUpForm />
      </Container>
    </Main>
  </div>
);

const INITIAL_STATE = {
  username: "",
  email: "",
  passwordOne: "",
  passwordTwo: "",
  isAdmin: false,
  error: null,
};

const ERROR_CODE_ACCOUNT_EXISTS = "auth/email-already-in-use";

const ERROR_MSG_ACCOUNT_EXISTS = `
  An account with this E-Mail address already exists.
  Try to login with this account instead. If you think the
  account is already used from one of the social logins, try
  to sign in with one of them. Afterward, associate your accounts
  on your personal account page.
`;

class SignUpFormBase extends Component {
  constructor(props) {
    super(props);

    this.state = { ...INITIAL_STATE };
  }

  onSubmit = (event) => {
    const { username, email, passwordOne, isAdmin } = this.state;
    const roles = {};

    if (isAdmin) {
      roles[ROLES.ADMIN] = ROLES.ADMIN;
    }

    this.props.firebase
      .doCreateUserWithEmailAndPassword(email, passwordOne)
      .then((authUser) => {
        // Create a user in your Firebase realtime database
        return this.props.firebase.dbstore
          .collection("users")
          .doc(authUser.user.uid)
          .set({
            displayName: username,
            email: email,
            data: [],
          });
      })

      //   return this.props.firebase.user(authUser.user.uid).set({
      //     username,
      //     email
      //   });
      // })
      .then(() => {
        return this.props.firebase.doSendEmailVerification();
      })
      .then(() => {
        this.setState({ ...INITIAL_STATE });
        this.props.history.push(ROUTES.HOME);
      })
      .catch((error) => {
        if (error.code === ERROR_CODE_ACCOUNT_EXISTS) {
          error.message = ERROR_MSG_ACCOUNT_EXISTS;
        }

        this.setState({ error });
      });

    event.preventDefault();
  };

  onChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };

  onChangeCheckbox = (event) => {
    this.setState({ [event.target.name]: event.target.checked });
  };

  render() {
    const { username, email, passwordOne, passwordTwo, isAdmin, error } =
      this.state;

    const isInvalid =
      passwordOne !== passwordTwo ||
      passwordOne === "" ||
      email === "" ||
      username === "";

    return (
      <Form onSubmit={this.onSubmit}>
        <Input
          name="username"
          value={username}
          onChange={this.onChange}
          type="text"
          placeholder="Full Name"
        />
        <Input
          name="email"
          value={email}
          onChange={this.onChange}
          type="text"
          placeholder="Email Address"
        />
        <Password
          name="passwordOne"
          value={passwordOne}
          onChange={this.onChange}
          type="password"
          placeholder="Password"
        />
        <Password
          name="passwordTwo"
          value={passwordTwo}
          onChange={this.onChange}
          type="password"
          placeholder="Confirm Password"
        />
        {/* <label>
          Admin:
          <input
            name="isAdmin"
            type="checkbox"
            checked={isAdmin}
            onChange={this.onChangeCheckbox}
          />
        </label> */}
        <Submit disabled={isInvalid} type="submit">
          Sign Up
        </Submit>

        {error && <p>{error.message}</p>}
      </Form>
    );
  }
}

const SignUpLink = () => (
  <P>
    Don't have an account? <MLink to={ROUTES.SIGN_UP}>Sign Up</MLink>
  </P>
);

const SignUpForm = compose(withRouter, withFirebase)(SignUpFormBase);

export default SignUpPage;

export { SignUpForm, SignUpLink };

const P = styled.p`
  color: #757575;
`;

const MLink = styled(Link)`
  color: black;
  text-decoration: none;
`;

const Main = styled.div`
  height: 100vh;
  fixed: no-repeat;
  background-size: cover;
`;

const Container = styled.div`
  width: 420px;
  height: 600px;
  background: inherit;
  position: absolute;
  overflow: hidden;
  top: 50%;
  left: 50%;
  margin-left: -175px;
  margin-top: -250px;
  border-radius: 8px;

  &:before {
    width: 470px;
    height: 650px;
    content: "";
    position: absolute;
    top: -25px;
    left: -25px;
    bottom: 0;
    right: 0;
    background: inherit;
    box-shadow: inset 0 0 0 300px rgba(255, 255, 255, 0.2);
    filter: blur(10px);
  }
`;

const Input = styled.input.attrs({
  type: "text",
})`
  background: 0;
  width: 350px;
  outline: 0;
  border: 0;
  border-bottom: 2px solid rgba(255, 255, 255, 0.3);
  margin: 20px 0;
  padding-bottom: 10px;
  font-size: 18px;
  font-weight: bold;
  color: rgba(255, 255, 255, 0.8);
`;

const Password = styled(Input).attrs({
  type: "password",
})``;

const Submit = styled.button`
  border: 0;
  border-radius: 8px;
  padding-bottom: 0;
  height: 60px;
  width: 10rem;
  background: #df2359;
  color: white;
  cursor: pointer;
  transition: all 600ms ease-in-out;

  &:hover {
    background: #c0392b;
  }
`;

const Form = styled.form`
  text-align: center;
  position: absolute;
  left: 50%;
  top: 55%;
  transform: translate(-50%, -50%);
`;
