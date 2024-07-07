import React, { useState } from "react";
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
  const [animateOut, setAnimateOut] = useState(false);

  const goTo = (path: string) => {
    setAnimateOut(true);
    setTimeout(() => {
      window.scrollTo(0, 0);
      setLocation(path)
      setAnimateOut(false);
    }, 2000)
  };

  return (
    <>
      <main className={animateOut ? "animate-out" : "animate-in"}>
        <header>jandermauer</header>
        <Switch>
          {/* Secciones Principales */}
          <Route path="/" component={Home} />
          <Route path="/ilustracion">
            <MainSection key="ilustraciones" type="images" />
          </Route>
          <Route path="/video">
            <MainSection key="videos" type="videos" />
          </Route>
          <Route path="/perfil">
            <Profile />
          </Route>

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
      </main>
      <NavBottom goTo={goTo} />
    </>
  );
};

export default App;
