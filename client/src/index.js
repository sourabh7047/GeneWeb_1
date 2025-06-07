//  so react package kind of convert the html that we write inside the render function in the javascript ESversion that every browser can understand.
// it uses babel javascipt compiler for doing so
import React from "react";
// react dom is used to pick a dom elemnt from the index.html either by class or id or by the tag or by any combination and convert and change its
// functioning now this can add html or actual javascript
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import * as serviceWorker from "./serviceWorker";
import Firebase, { FirebaseContext } from "./component/Firebase";
import { SearchProvider } from "./context/searchContext";

import "./index.css";
import App from "./App";

// react.render(what to SharedWorker, where to show);
ReactDOM.render(
  <FirebaseContext.Provider value={new Firebase()}>
    <BrowserRouter>
      <SearchProvider>
        <App />
      </SearchProvider>
    </BrowserRouter>
  </FirebaseContext.Provider>,
  document.getElementById("root")
);

// so to convert the javascript into the form which is readable by the  html elements then...
// you can add any sort of javascript text whether it is text a math formula or a script with any style attached
// but you can attach only expression not statement and a big difference in both is expression is set to any value whereas when we use
// statements like if or while then its a work
// for making things more complex for us we can ever use ES6 TEMPLATE LITERALS for example <h1>{`${name} ${surname}`}</h1>
// so here h1 takes the string under which we have written javascipt using {} and then to write string inside the javascipt we have used
// ` ` under which to use javascipt we use ${ under this we can even use string concatination}
// css uses kebab case like classname whereas jsx uses camel case like className
// jsx function name in pascal style since its usage look like an html tag it helps in differencating between the tags
// so when you tab on to some document element then its jsx rendering is primary secondary comes the html code from the index.js because it is an interpreter language
// airbnb jsx style guide
// so to make it more reliable under the component folder make sub folder for the logging scrren component and the main screen component
// so in the normal convension when we have to import anything, we use import x , {y(), z} in es6 but we can also use import * as pi from ...
// and then use it in the javascipt form as pi.x, pi.y() etc..
// whenever you are using className it has to be attched with the html tag rather tha function tags of the jsx

// var name = " sourabh asharma";
// ReactDOM.render(<h1>my name is {name}</h1>, document.getElementById("root"));
// instead of using class use classname
