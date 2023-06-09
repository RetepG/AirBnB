import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Switch, Route } from "react-router-dom";
import * as sessionActions from "./store/session";
import Navigation from "./components/Navigation";
import AllSpots from "./components/Spots"
import CreateSpotForm from "./components/CreateSpot"
import SpotById from "./components/SpotById";
import MySpots from "./components/ManageSpot";
import UpdateSpot from "./components/UpdateSpot";

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <>
      <Navigation isLoaded={isLoaded} />
      {isLoaded &&
        <Switch>
          <Route exact path="/" >
            <AllSpots />
          </Route >
          <Route path='/spots/new'>
            <CreateSpotForm />
          </Route>
          <Route path='/spots/current'>
            <MySpots />
          </Route>
          <Route path='/spots/:id/edit'>
            <UpdateSpot />
          </Route>
          <Route path='/spots/:id'>
            <SpotById />
          </Route>
          <Route>
            <h1>Page not Found</h1>
          </Route>
        </Switch>
      }
    </>
  );
}

export default App;
