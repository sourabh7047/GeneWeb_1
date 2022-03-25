import React from "react";
import { Route, Switch } from "react-router-dom";

import FirstPage from "./Pages/frontPage/FirstPage";
import SecondPage from "./Pages/secondPage/SecondPage";
import LandingPage from "./component/Landing";
import AccountPage from "./component/Account";
import Basepage from "./component/Basepage";
import PassordChangePage from "./component/PasswordChange";
import PasswordForgetPage from "./component/PasswordForget";
import SignUpPage from "./component/SignUp";
import SingOutPage from "./component/SignOut";
import UsersPage from "./component/Users";
import SignInPage from "./component/SignIn";
import Navigation from "./component/Navigation";
import * as ROUTES from "./routes";
import HomePage from "./component/Home";
import Backtranseq from "./component/Tools/Backtranseq";
import ToolRedirect from "./component/ToolRedirect";
import Home from "./component/Home";
import "./App.css";

const App = () => {
  return (
    <div>
      <Switch>
        <Route exact path={ROUTES.LANDING} component={LandingPage} />
        <Route path={ROUTES.SIGN_IN} component={SignInPage} exact />
        <Route path={ROUTES.PASSWORD_FORGET} component={PasswordForgetPage} />
        <Route path={ROUTES.HOME} component={HomePage} />
        <Route path={ROUTES.ACCOUNT} component={AccountPage} />
        <Route path={ROUTES.TOOLS} component={Backtranseq} />
        {/* <Route path={ROUTES.ADMIN} component={AdminPage} /> */}
        <Route path={ROUTES.SEARCH} exact component={FirstPage} />
        <Route
          path="/:dbdata/webenv/:webenv/page/:page"
          component={(prop) => (
            <SecondPage key={window.location.pathname}></SecondPage>
          )}
        />
        <Route path="/webenv/:webenv/tools/:tools" component={ToolRedirect} />
        <Route path={ROUTES.SIGN_UP} component={SignUpPage} exact />
      </Switch>
    </div>
  );
};

export default App;
