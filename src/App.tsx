import React from "react";
import { useLocation, Switch, Route } from "wouter";
import ImagesSection from "./components/ImagesSection";
import MainSection from "./components/MainSection";
import VideosSection from "./components/VideosSection";
import Home from "./components/Home";
import NavBottom from "./components/nav-bottom";
import "./App.css";

const App = () => {
  const [location, setLocation] = useLocation();

  return (
    <>
      <div className="bot-nav">
        <div onClick={() => setLocation("/")}>Portada</div>
        <div onClick={() => setLocation("/informatica")}>informatica</div>
        <div onClick={() => setLocation("/biologia")}>biologia</div>
        <div onClick={() => setLocation("/fisicayquimica")}>fisicayquimica</div>
        <div onClick={() => setLocation("/geografiaehistoria")}>
          geografiaehistoria
        </div>
        <div onClick={() => setLocation("/geologia")}>geologia</div>
        <div onClick={() => setLocation("/tecnologia")}>tecnologia</div>
        <div onClick={() => setLocation("/otros")}>otros</div>
        <div onClick={() => setLocation("/videos")}>videos</div>
      </div>

      <Switch>
        <Route path="/" component={Home} />
        <Route path="/ilustraciones">
          <MainSection key="ilustraciones" />
        </Route>
        <Route path="/biologia">
          <ImagesSection key="biologia" folderName="biologia" />
        </Route>
        <Route path="/informatica">
          <ImagesSection key="informatica" folderName="informatica" />
        </Route>
        <Route path="/fisicayquimica">
          <ImagesSection key="fisicayquimica" folderName="fisicayquimica" />
        </Route>
        <Route path="/geografiaehistoria">
          <ImagesSection
            key="geografiaehistoria"
            folderName="geografiaehistoria"
          />
        </Route>
        <Route path="/geologia">
          <ImagesSection key="geologia" folderName="geologia" />
        </Route>
        <Route path="/otros">
          <ImagesSection key="otros" folderName="otros" />
        </Route>
        <Route path="/tecnologia">
          <ImagesSection key="tecnologia" folderName="tecnologia" />
        </Route>
        <Route path="/videos" component={VideosSection} />

        {/* Default route in a switch */}
        <Route>Pagina no encontrada</Route>
      </Switch>
      <NavBottom />
    </>
  );
};

export default App;
