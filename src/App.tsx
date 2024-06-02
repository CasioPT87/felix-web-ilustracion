import React from "react";
import { useLocation, Switch, Route } from "wouter";
import ImagesSection from "./components/ImagesSection";
import MainSection from "./components/MainSection";
import VideosSection from "./components/VideosSection";
import Home from "./components/Home";
import Profile from "./components/Profile/index";
import NavBottom from "./components/nav-bottom";
import "./App.css";

const App = () => {
  const [location, setLocation] = useLocation();

  return (
    <>
      <div className="bot-nav">
        <div onClick={() => setLocation("/")}>Portada</div>
        <div onClick={() => setLocation("/informatica")}>informatica</div>
        <div onClick={() => setLocation("/ilustraciones")}>ilustraciones</div>
        <div onClick={() => setLocation("/biologia")}>biologia</div>
        <div onClick={() => setLocation("/fisicayquimica")}>fisicayquimica</div>
        <div onClick={() => setLocation("/geografiaehistoria")}>
          geografiaehistoria
        </div>
        <div onClick={() => setLocation("/geologia")}>geologia</div>
        <div onClick={() => setLocation("/tecnologia")}>tecnologia</div>
        <div onClick={() => setLocation("/otros")}>otros</div>
        <div onClick={() => setLocation("/videos/animacion3d")}>
          videos de 4 min
        </div>
      </div>

      <Switch>
        
        {/* Secciones Principales */}
        <Route path="/" component={Home} />
        <Route path="/ilustracion">
          <MainSection key="ilustraciones" type="images" />
        </Route>
        <Route path="/video">
          <MainSection key="videos" type="videos" />
        </Route>
        <Route path="/perfil" component={Profile} />

        {/* Subsecciones */}
        <Route path="/ilustracion/biologia">
          <ImagesSection key="biologia" folderName="biologia" />
        </Route>
        <Route path="/ilustracion/informatica">
          <ImagesSection key="informatica" folderName="informatica" />
        </Route>
        <Route path="/ilustracion/fisicayquimica">
          <ImagesSection key="fisicayquimica" folderName="fisicayquimica" />
        </Route>
        <Route path="/ilustracion/geografiaehistoria">
          <ImagesSection
            key="geografiaehistoria"
            folderName="geografiaehistoria"
          />
        </Route>
        <Route path="/ilustracion/geologia">
          <ImagesSection key="geologia" folderName="geologia" />
        </Route>
        <Route path="/ilustracion/otros">
          <ImagesSection key="otros" folderName="otros" />
        </Route>
        <Route path="/ilustracion/tecnologia">
          <ImagesSection key="tecnologia" folderName="tecnologia" />
        </Route>
        <Route path="/video/animacion3d" component={VideosSection} />

        <Route>Ops!! lo siento, no es una url valida para este sitio</Route>
      </Switch>
      <NavBottom />
    </>
  );
};

export default App;
