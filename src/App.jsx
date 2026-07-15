import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import "./App.css";

import data from "./data/videojuegos";

import Navbar from "./components/Navbar";
import TablaVideojuegos from "./components/TablaVideojuegos";
import FormularioVideojuego from "./components/FormularioVideojuego";
import PaginaNoEncontrada from "./components/PaginaNoEncontrada";

function App() {
  const [videojuegos, setVideojuegos] = useState(data);

  function agregarVideojuego(videojuegoNuevo) {
    setVideojuegos([...videojuegos, videojuegoNuevo]);
  }

  function eliminarVideojuego(id) {
    const filtrados = videojuegos.filter((juego) => juego.id !== id);
    setVideojuegos(filtrados);
  }

  function editarVideojuego(videojuegoEditado) {
    const actualizados = videojuegos.map((juego) => {
      if (juego.id === videojuegoEditado.id) {
        return videojuegoEditado;
      } else {
        return juego;
      }
    });

    setVideojuegos(actualizados);
  }

  function manejarGuardar(videojuego) {
    const existe = videojuegos.find((juego) => juego.id === videojuego.id);

    if (existe) {
      editarVideojuego(videojuego);
    } else {
      agregarVideojuego(videojuego);
    }
  }

  return (
    <BrowserRouter>
      <Navbar />

      <main className="app-contenedor">
        <Routes>
          <Route
            path="/"
            element={
              <TablaVideojuegos
                videojuegos={videojuegos}
                onEliminar={eliminarVideojuego}
              />
            }
          />

          <Route
            path="/nuevo"
            element={<FormularioVideojuego onGuardar={manejarGuardar} />}
          />

          <Route
            path="/editar"
            element={<FormularioVideojuego onGuardar={manejarGuardar} />}
          />

          <Route path="*" element={<PaginaNoEncontrada />} />
        </Routes>
      </main>
    </BrowserRouter>
  );
}

export default App;