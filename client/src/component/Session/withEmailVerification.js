import React from 'react';
import app from 'firebase/compat/app';
import auth from 'firebase/compat/auth';
import AuthUserContext from './context';
import { withFirebase } from '../Firebase';

const needsEmailVerification = authUser =>{
  console.log(authUser);
  return authUser &&
  !authUser.emailVerified &&
  authUser.providerData
    .map(provider => provider.providerId)
    .includes('password');}

const withEmailVerification = Component => {
  class WithEmailVerification extends React.Component {
    constructor(props) {
      super(props)
      this.auth = app.auth();
      this.onSendEmailVerification = this.onSendEmailVerification.bind(this);
      this.state = { isSent: false };
    }

    onSendEmailVerification = () => {
      var actionCodeSettings = {
        url:
          'https://geneweb-5912d.firebaseapp.com' +
          '/?email=' +
          app.auth().currentUser.email,
        handleCodeInApp: true,
        dynamicLinkDomain: 'geneweb.page.link',
      };

      this.auth.currentUser
        .sendEmailVerification(actionCodeSettings)
        .then(function() {})
        .then(() => this.setState({ isSent: true }));
    };
    

    render() {
      return (
        <AuthUserContext.Consumer>
          {authUser =>
            needsEmailVerification(authUser) ? (
              <div>
                {this.state.isSent ? (
                  <p>
                    E-Mail confirmation sent: Check your E-Mails (Spam
                    folder included) for a confirmation E-Mail.
                    Refresh this page once you confirmed your E-Mail.
                  </p>
                ) : (
                  <p>
                    Verify your E-Mail: Check your E-Mails (Spam
                    folder included) for a confirmation E-Mail or send
                    another confirmation E-Mail.
                  </p>
                )}

                <button
                  type="button"
                  onClick={this.onSendEmailVerification}
                  disabled={this.state.isSent}
                >
                  Send confirmation E-Mail
                </button>
              </div>
            ) : (
              <Component {...this.props} />
            )
          }
        </AuthUserContext.Consumer>
      );
    }
  }

  return withFirebase(WithEmailVerification);
};

export default withEmailVerification;
