import React, { useEffect, useState } from "react";
import Axios from "axios";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { CookiesProvider } from "react-cookie";

import Profile from "./pages/profile";

export default function App() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const getUserData = async () => {
      try {
        const resp = await Axios.get(
          "https://raw.githubusercontent.com/akshay8033/AuthPoliceV2/master/accounts.json"
        );
        const users = resp.data.accounts;
        setUsers(users);
        setLoading(false);
      } catch (err) {
        console.log(err);
      }
    };

    getUserData();
  }, []);

  return loading ? (
    <p>Loading .....</p>
  ) : (
    <CookiesProvider>
      <Router>
        <Switch>
          <Route path="/account/:id">
            <Profile users={users} />
          </Route>
        </Switch>
      </Router>
    </CookiesProvider>
  );
}
