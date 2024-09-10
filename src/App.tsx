import React, { useState } from "react";
import { useLocation, Switch, Route } from "wouter";
import ImagesSection from "./components/ImagesSection";
import MainSection from "./components/MainSection";
import VideosSection from "./components/VideosSection";
import Home from "./components/Home";
import Profile from "./components/Profile/index";
import NavBottom from "./components/nav-bottom";
import Contact from "./components/Contact";
import Navigation from "./components/Navigation";
import monigote from "./static/monigote.png";
import "./App.css";

const App = () => {
  const [location, setLocation] = useLocation();
  const [animateOut, setAnimateOut] = useState(false);

  const goTo = (path: string, callback?: any) => {
    setAnimateOut(true);
    setTimeout(() => {
      window.scrollTo(0, 0);
      console.log(path);
      setLocation(path);
      setAnimateOut(false);
      if (callback && typeof callback === "function") callback();
    }, 2000);
  };

  return (
    <>
      <header>
        <>
          <div className="header-name">
            <img src={monigote} />
            <p onClick={() => goTo("/")}>Felix Moreno Arrastio</p>
          </div>

          <Navigation goTo={goTo} />
        </>
      </header>
      <main className={animateOut ? "animate-out" : "animate-in"}>
        <Switch>
          {/* Secciones Principales */}
          <Route path="/" component={Home} />
          <Route path="/ilustracion">
            <MainSection
              key="ilustraciones"
              type="images"
              pillText="Ilustraciones"
            />
          </Route>
          <Route path="/video">
            <MainSection
              key="videos"
              type="videos"
              pillText="Animación y edición de vídeo"
            />
          </Route>
          <Route path="/perfil">
            <Profile />
          </Route>
          <Route path="/contacto">
            <Contact />
          </Route>

          {/* Subsecciones */}
          <Route path="/ilustracion/biologia">
            <ImagesSection
              key="biologia"
              folderName="biologia"
              pillText="Biología"
            />
          </Route>
          <Route path="/ilustracion/informatica">
            <ImagesSection
              key="informatica"
              folderName="informatica"
              pillText="Informática"
            />
          </Route>
          <Route path="/ilustracion/fisicayquimica">
            <ImagesSection
              key="fisicayquimica"
              folderName="fisicayquimica"
              pillText="Física y Química"
            />
          </Route>
          <Route path="/ilustracion/geografiaehistoria">
            <ImagesSection
              key="geografiaehistoria"
              folderName="geografiaehistoria"
              pillText="Geografía e Historia"
            />
          </Route>
          <Route path="/ilustracion/geologia">
            <ImagesSection
              key="geologia"
              folderName="geologia"
              pillText="Geología"
            />
          </Route>
          <Route path="/ilustracion/otros">
            <ImagesSection
              key="otros"
              folderName="otros"
              pillText="Otras ilustraciones"
            />
          </Route>
          <Route path="/ilustracion/tecnologia">
            <ImagesSection
              key="tecnologia"
              folderName="tecnologia"
              pillText="Tecnología"
            />
          </Route>
          <Route path="/video/animacion3d">
            <VideosSection pillText="Animación 3D" type="3d" />
          </Route>
          <Route path="/video/edicion">
            <VideosSection pillText="Edición de Vídeo" type="edicion" />
          </Route>
          <Route>Ops!! lo siento, no es una url valida para este sitio</Route>
        </Switch>
      </main>
      <NavBottom goTo={goTo} />
    </>
  );
};

export default App;
