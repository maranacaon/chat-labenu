import React, { useEffect, useState } from "react";
import { GlobalStyle } from './globalStyles'
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Chat } from './pages/Chat'
import { Login } from "./pages/Login";
import { SignUp } from "./pages/SignUp";
import { firebase } from "./services/firebase";


export default function App() {
  const [currentUser, setCurrentUser] = useState();
  const [authLoading, setAuthLoading] = useState(true);

  useEffect(() => {
    const cleanListener = firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        
        setCurrentUser(user)
        
      } else {

        setCurrentUser(null)
      }

      setAuthLoading(false)
    });

    return () => {
      cleanListener()
    }
  }, [])

  return (
    <div>
      <GlobalStyle />
      <Router>
          {!authLoading && <Switch>
            <Route exact path="/">
              <Chat currentUser={currentUser}/>
            </Route>
            <Route exact path="/login">
              <Login currentUser={currentUser}/>
            </Route>
            <Route exact path="/signup">
              <SignUp currentUser={currentUser}/>
            </Route>
          </Switch>}
      </Router>
    </div>
  );
}