import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { compose } from "recompose";
import { SignUpLink } from "../SignUp";
import { PasswordForgetLink } from "../PasswordForget";
import { withFirebase } from "../Firebase";
import * as ROUTES from "../../routes";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import AlertSnackbar from "../../commons/AlertSnakbar";

import {
  faGoogle,
  faFacebook,
  faTwitter,
} from "@fortawesome/free-brands-svg-icons";

const LinkWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  position: absolute;
  top: 87%;
  left: 15%;
`;

const SignInPage = () => (
  <div>
    <Main>
      <Container>
        <h1 style={{ padding: "50px", paddingLeft: "130px" }}>SignIn</h1>
        <SignInForm />
        <Wrapper>
          <SignInGoogle />
          <SignInFacebook />
          <SignInTwitter />
        </Wrapper>
        <LinkWrapper>
          <PasswordForgetLink />
          <SignUpLink />
        </LinkWrapper>
      </Container>
    </Main>
  </div>
);

const INITIAL_STATE = {
  email: "",
  password: "",
  error: null,
};

const ERROR_CODE_ACCOUNT_EXISTS =
  "auth/account-exists-with-different-credential";

const ERROR_MSG_ACCOUNT_EXISTS = `
  An account with an E-Mail address to
  this social account already exists. Try to login from
  this account instead and associate your social accounts on
  your personal account page.
`;

class SignInFormBase extends Component {
  constructor(props) {
    super(props);
    this.state = { ...INITIAL_STATE };
  }

  onSubmit = (event) => {
    const { email, password } = this.state;

    this.props.firebase
      .doSignInWithEmailAndPassword(email, password)
      .then(() => {
        this.setState({ ...INITIAL_STATE });
        this.props.history.push(ROUTES.SEARCH);
      })
      .catch((error) => {
        this.setState({ error });
      });

    event.preventDefault();
  };

  onChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };

  render() {
    const { email, password, error } = this.state;

    const isInvalid = password === "" || email === "";

    return (
      <Div>
        {/* <Img src="https://bit.ly/2tlJLoz" /> */}

        {/* <span><a href="#">Forgot Password?</a></span> */}

        <Form onSubmit={this.onSubmit}>
          <Input
            name="email"
            value={email}
            onChange={this.onChange}
            type="text"
            placeholder="Email Address"
          />
          <Password
            name="password"
            value={password}
            onChange={this.onChange}
            type="password"
            placeholder="Password"
          />
          <Submit disabled={isInvalid} type="submit">
            Sign In
          </Submit>

          {error && <p>{error.message}</p>}
        </Form>
      </Div>
    );
  }
}

class SignInGoogleBase extends Component {
  constructor(props) {
    super(props);
    this.state = { ...INITIAL_STATE };
  }

  onSubmit = (event) => {
    const { email, password } = this.state;

    this.props.firebase
      .doSignInWithGoogle()
      .then((socialAuthUser) => {
        // Create a user in your Firebase Realtime Database too
        return this.props.firebase.user(socialAuthUser.user.uid).set({
          username: socialAuthUser.user.displayName,
          email: socialAuthUser.user.email,
          roles: {},
        });
      })
      .then(() => {
        this.setState({ email: email });
        this.props.history.push(ROUTES.SEARCH);
      })
      .catch((error) => {
        if (error.code === ERROR_CODE_ACCOUNT_EXISTS) {
          error.message = ERROR_MSG_ACCOUNT_EXISTS;
        }
        this.setState({ error });
      });

    event.preventDefault();
  };

  render() {
    const { error } = this.state;

    return (
      <form onSubmit={this.onSubmit}>
        {/* <button type="submit">Sign In with Google</button> */}
        <MFontAwesomeIcon
          type="submit"
          icon={faGoogle}
          size="2x"
          onClick={this.onSubmit.bind(this)}
        />

        {/* {error && <p>{error.message}</p> } */}
      </form>
    );
  }
}

class SignInFacebookBase extends Component {
  constructor(props) {
    super(props);
    this.state = { error: null };
  }

  onSubmit = (event) => {
    this.props.firebase
      .doSignInWithFacebook()
      .then((socialAuthUser) => {
        // Create a user in your Firebase Realtime Database too
        return this.props.firebase.user(socialAuthUser.user.uid).set({
          username: socialAuthUser.additionalUserInfo.profile.name,
          email: socialAuthUser.additionalUserInfo.profile.email,
          roles: {},
        });
      })
      .then(() => {
        this.setState({ error: null });
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

  render() {
    const { error } = this.state;

    return (
      <form onSubmit={this.onSubmit}>
        {/* <button type="submit">Sign In with Facebook</button> */}
        <MFontAwesomeIcon icon={faFacebook} type="submit" size="2x" />
        {error && <p>{error.message}</p>}
      </form>
    );
  }
}

class SignInTwitterBase extends Component {
  constructor(props) {
    super(props);

    this.state = { error: null };
  }

  onSubmit = (event) => {
    this.props.firebase
      .doSignInWithTwitter()
      .then((socialAuthUser) => {
        // Create a user in your Firebase Realtime Database too
        return this.props.firebase.user(socialAuthUser.user.uid).set({
          username: socialAuthUser.additionalUserInfo.profile.name,
          email: socialAuthUser.additionalUserInfo.profile.email,
          roles: {},
        });
      })
      .then(() => {
        this.setState({ error: null });
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

  render() {
    const { error } = this.state;

    return (
      <form onSubmit={this.onSubmit}>
        {/* <button type="submit">Sign In with Twitter</button> */}
        <MFontAwesomeIcon icon={faTwitter} type="submit" size="2x" />
        {error && <p>{error.message}</p>}
      </form>
    );
  }
}

const SignInForm = compose(withRouter, withFirebase)(SignInFormBase);

const SignInGoogle = compose(withRouter, withFirebase)(SignInGoogleBase);

const SignInFacebook = compose(withRouter, withFirebase)(SignInFacebookBase);

const SignInTwitter = compose(withRouter, withFirebase)(SignInTwitterBase);

export default SignInPage;

export { SignInForm, SignInGoogle, SignInFacebook, SignInTwitter };

const Div = styled.div``;

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-item: center;
  position: absolute;
  top: 82%;
  left: 50%;
  transform: translate(-50%, -50%);
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

const Img = styled.img`
  width: 120px;
  height: 120px;
  border-radius: 100%;
  position: relative;
`;

const Form = styled.form`
  text-align: center;
  position: absolute;
  left: 50%;
  top: 55%;
  transform: translate(-50%, -50%);
`;

const Input = styled.input.attrs({
  type: "text",
})`
  background: 0;
  width: 250px;
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

const MFontAwesomeIcon = styled(FontAwesomeIcon)`
  margin: 0px 20px;
`;

// span a{
//   color: rgba(255,255,255, 0.8);
// }
