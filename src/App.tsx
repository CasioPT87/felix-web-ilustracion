import React from "react";
import { useLocation, Switch, Route } from "wouter";
import Una from './components/una'
import Dos from './components/dos'
import NavBottom from "./components/nav-bottom";
import "./App.css";

const App = () => {
  const [location, setLocation] = useLocation();

  return (
    <>
      <h1>hola que pasa comostamoooos</h1>
      <a onClick={() => setLocation("/uno")}>Vamos a uno</a>
      <a onClick={() => setLocation("/dos")}>Vamos a dos!!!</a>
      <Switch>
        <Route path="/uno" component={Una} />
        <Route path="/dos" component={Dos} />

        {/* Default route in a switch */}
        <Route>404: No such page!</Route>
      </Switch>
      <NavBottom />
    </>
  );
};

export default App;
