import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import { withFirebase } from '../Firebase';
import * as ROUTES from '../../routes';
import styled from 'styled-components';
import './styles.css'

const PasswordForgetPage = () => (
  <>
  <div class="back-button">
    <a href="#"><i class="fas fa-arrow-left"></i> Back to Sign In</a>
  </div>

  <section id="password-reset">
    <div class="container">
      <div class="reset-box">
        <h2>Reset Your Password</h2>
        <p>Enter your email address below, and we'll send you instructions to reset your password.</p>
        <PasswordForgetForm />
    
        <div class="signin-link">
          Remember your password? <a href={ROUTES.SIGN_IN}>Sign In Here</a>
        </div>
      </div>
    </div>
  </section>

  <footer>
    <div class="container">
      <div class="partners">
        <img src='assets/ncbi-logo.png' alt="NCBI Logo"/>
        <img src="ebi-logo.png" alt="EBI Logo"/>
      </div>
    </div>
  </footer>
  </>
);

const INITIAL_STATE = {
  email: '',
  error: null,
};

class PasswordForgetFormBase extends Component {
  constructor(props) {
    super(props);

    this.state = { ...INITIAL_STATE };
  }

  onSubmit = event => {
    const { email } = this.state;

    this.props.firebase
      .doPasswordReset(email)
      .then(() => {
        this.setState({ ...INITIAL_STATE });
      })
      .catch(error => {
        this.setState({ error });
      });

    event.preventDefault();
  };

  onChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  render() {
    const { email, error } = this.state;

    const isInvalid = email === '';

    return (
      <form onSubmit={this.onSubmit}>
          <div class="input-group">
            <i class="fas fa-envelope"></i>
        <input
          name="email"
          value={this.state.email}
          onChange={this.onChange}
          type="text"
          placeholder="Email Address"
          required
          />
          </div>
        <button className='pf-cta-button' disabled={isInvalid} type="submit">
        Send Reset Link
        </button>

        {error && <p>{error.message}</p>}
      </form>
    );
  }
}

const PasswordForgetLink = () => (
  <p>
    <MLink  to={ROUTES.PASSWORD_FORGET}>Forgot Password?</MLink>
  </p>
);

export default PasswordForgetPage;

const PasswordForgetForm = withFirebase(PasswordForgetFormBase);

export { PasswordForgetForm, PasswordForgetLink };

const MLink = styled(Link)`
  color: #757575;
  text-decoration: none;
  
`;