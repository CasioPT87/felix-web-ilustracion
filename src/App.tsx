import React from "react";
import { useLocation, Switch, Route } from "wouter";
import ImagesSection from "./components/ImagesSection";
import NavBottom from "./components/nav-bottom";
import "./App.css";

const App = () => {
  const [location, setLocation] = useLocation();

  return (
    <>
      <h1>hola que pasa comostamoooos</h1>
      <div onClick={() => setLocation("/informatica")}>informatica</div>
      <div onClick={() => setLocation("/biologia")}>biologia</div>
      <div onClick={() => setLocation("/fisicayquimica")}>fisicayquimica</div>
      <div onClick={() => setLocation("/geografiaehistoria")}>geografiaehistoria</div>
      <div onClick={() => setLocation("/geologia")}>geologia</div>
      <div onClick={() => setLocation("/tecnologia")}>tecnologia</div>
      <div onClick={() => setLocation("/otros")}>otros</div>

      <Switch>
        <Route path="/biologia">
          <ImagesSection key='biologia' folderName="biologia" />
        </Route>
        <Route path="/informatica">
          <ImagesSection key='informatica' folderName="informatica" />
        </Route>
        <Route path="/fisicayquimica">
          <ImagesSection key='fisicayquimica' folderName="fisicayquimica" />
        </Route>
        <Route path="/geografiaehistoria">
          <ImagesSection key='geografiaehistoria' folderName="geografiaehistoria" />
        </Route>
        <Route path="/geologia">
          <ImagesSection key='geologia' folderName="geologia" />
        </Route>
        <Route path="/otros">
          <ImagesSection key='otros' folderName="otros" />
        </Route>
        <Route path="/tecnologia">
          <ImagesSection key='tecnologia' folderName="tecnologia" />
        </Route>

        {/* Default route in a switch */}
        <Route>404: No such page!</Route>
      </Switch>
      <NavBottom />
    </>
  );
};

export default App;
