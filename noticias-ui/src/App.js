import React, { Component } from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import logo from "./assets/Group 2593.png";  

import Noticia from "./components/noticia.component";
import NoticiasList from "./components/noticias-list.component";

function App() {
  return (
        <div className="container">

       <img src={logo} />

      <BrowserRouter>
        <Routes>
          <Route path="/listagem"   element={<NoticiasList />} />
          <Route path="/"   element={<NoticiasList />} />
		  <Route path="/noticia/:id"   element={<Noticia />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
