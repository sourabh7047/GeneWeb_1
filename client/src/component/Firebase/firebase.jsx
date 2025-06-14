import app from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/database";
import "firebase/compat/firestore";
import React, { Component } from "react";
const config = {
  apiKey: import.meta.env.REACT_APP_API_KEY,
  authDomain: import.meta.env.REACT_APP_AUTH_DOMAIN,
  databaseURL: import.meta.env.REACT_APP_DATABASE_URL,
  projectId: import.meta.env.REACT_APP_PROJECT_ID,
  storageBucket: import.meta.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.REACT_APP_MESSAGING_SENDER_ID,
  appId: import.meta.env.REACT_APP_ID,
  measurementId: import.meta.env.REACT_APP_MEASUREMENT_ID
};

let userEmail;
let currentUser

class Firebase {
  constructor() {
    app.initializeApp(config);

    /* Helper */

    this.serverValue = app.database.ServerValue;
    this.emailAuthProvider = app.auth.EmailAuthProvider;

    /* Firebase APIs */

    this.auth = app.auth();
    this.db = app.database();
    this.dbstore = app.firestore();

    /* Social Sign In Method Provider */

    this.googleProvider = new app.auth.GoogleAuthProvider();
    this.facebookProvider = new app.auth.FacebookAuthProvider();
    this.twitterProvider = new app.auth.TwitterAuthProvider();
  }

  // *** Auth API ***

  doCreateUserWithEmailAndPassword = (email, password) =>
    this.auth.createUserWithEmailAndPassword(email, password);
  // .then((cred=>{
  //    this.dbstore.collection('users').doc(cred.user.uid).set({
  //     email: cred.user.email
  //   })
  // }))

  doSignInWithEmailAndPassword = (email, password) =>
    this.auth.signInWithEmailAndPassword(email, password).then(() => {
      userEmail = email;
      this.auth.onAuthStateChanged((user) => {
        currentUser = user
      });
    });

  doSignInWithGoogle = () => this.auth.signInWithPopup(this.googleProvider);

  doSignInWithFacebook = () => this.auth.signInWithPopup(this.facebookProvider);

  doSignInWithTwitter = () => this.auth.signInWithPopup(this.twitterProvider);

  getRedirectResults = async () => await this.auth.getRedirectResult();
  

  doSignOut = () => this.auth.signOut();

  doPasswordReset = (email) => this.auth.sendPasswordResetEmail(email);

  doOnAuthStateChanged = () => {
    console.log("entered");
  };

  doSendEmailVerification = () => {
    var actionCodeSettings = {
      url:
        "https://geneweb-5912d.firebaseapp.com" +
        "/?email=" +
        app.auth().currentUser.email,
      handleCodeInApp: true,
      dynamicLinkDomain: "geneweb.page.link",
    };

    this.auth.currentUser
      .sendEmailVerification(actionCodeSettings)
      .then(function () {});
  };

  doPasswordUpdate = (password) =>
    this.auth.currentUser.updatePassword(password);

  // *** Merge Auth and DB User API *** //

  onAuthUserListener = (next, fallback) =>
    this.auth.onAuthStateChanged((authUser) => {
      // console.log(authUser);
      if (authUser) {
        console.log(authUser);
        this.user(authUser.uid)
          .once("value")
          .then((snapshot) => {
            const dbUser = snapshot.val();
            // console.log(dbUser);

            // default empty roles
            // if (!dbUser.roles) {
            //   dbUser.roles = {};
            // }

            // merge auth and db user
            authUser = {
              uid: authUser.uid,
              email: authUser.email,
              emailVerified: authUser.emailVerified,
              providerData: authUser.providerData,
              ...dbUser,
            };

            next(authUser);
          });
      } else {
        fallback();
      }
    });

  // *** User API ***

  dbstore = () => this.dbstore;

  user = (uid) => this.db.ref(`users/${uid}`);

  users = () => this.db.ref("users");

  // *** Message API ***

  message = (uid) => this.db.ref(`messages/${uid}`);

  messages = () => this.db.ref("messages");
}

export default Firebase;
export { userEmail, currentUser };
