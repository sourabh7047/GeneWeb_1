import React from "react";
import { Route, Routes } from "react-router-dom";

import FirstPage from "./Pages/frontPage/FirstPage";
import SecondPage from "./Pages/secondPage/SecondPage";
import LandingPage from "./component/Landing";
import AccountPage from "./component/Account";
// import Basepage from "./component/Basepage";
// import PassordChangePage from "./component/PasswordChange";
import PasswordForgetPage from "./component/PasswordForget";
import SignUpPage from "./component/SignUp";
// import SingOutPage from "./component/SignOut";
// import UsersPage from "./component/Users";
import SignInPage from "./component/SignIn";
// import Navigation from "./component/Navigation";
import * as ROUTES from "./routes";
import HomePage from "./component/Home";
import ToolRedirect from "./component/ToolRedirect";
import "./App.css";
import PrivateRoute from "./PrivateRoute";
import { withAuthentication } from './component/Session';

const App = () => {

  // const isAuthenticated  = (authUser) => !!authUser;
  return (
    <div>
      <Routes>
        <Route path={ROUTES.SIGN_IN} component={SignInPage} exact />
        <Route exact path={ROUTES.LANDING} component={LandingPage} />
        <Route path={ROUTES.PASSWORD_FORGET} component={PasswordForgetPage} />
        <Route path={ROUTES.HOME} component={HomePage} />
        <Route path={ROUTES.ACCOUNT} component={AccountPage} />
        <PrivateRoute path={ROUTES.SEARCH} component={FirstPage} condition={isAuthenticated} />
        <Route
          path="/:dbdata/webenv/:webenv/page/:page"
          component={(prop) => (
            <SecondPage key={window.location.pathname}></SecondPage>
          )}
        />
        <PrivateRoute path="/tools/:tools" component={ToolRedirect} condition={isAuthenticated}/>
        <Route path={ROUTES.SIGN_UP} component={SignUpPage} exact />
      </Routes>
    </div>
  );
};

export default withAuthentication(App);