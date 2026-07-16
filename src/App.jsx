import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import "./App.css";

import data from "./data/videojuegos";

import Navbar from "./components/Navbar";
import TablaVideojuegos from "./components/TablaVideojuegos";
import FormularioVideojuego from "./components/FormularioVideojuego";
import PaginaNoEncontrada from "./components/PaginaNoEncontrada";
import AlertaNotificacion from "./components/AlertaNotificacion";

function App() {
  const [videojuegos, setVideojuegos] = useState(() => {
    const datosGuardados = localStorage.getItem("lista_videojuegos");

    if (datosGuardados) {
      return JSON.parse(datosGuardados);
    }

    return data;
  });

  const [mensajeToast, setMensajeToast] = useState("");

  useEffect(() => {
    localStorage.setItem("lista_videojuegos", JSON.stringify(videojuegos));
  }, [videojuegos]);

  function mostrarToast(mensaje) {
    setMensajeToast(mensaje);
  }

  function cerrarToast() {
    setMensajeToast("");
  }

  function agregarVideojuego(videojuegoNuevo) {
    setVideojuegos([...videojuegos, videojuegoNuevo]);
    mostrarToast("Videojuego registrado correctamente");
  }

  function eliminarVideojuego(id) {
    const filtrados = videojuegos.filter((juego) => juego.id !== id);
    setVideojuegos(filtrados);
    mostrarToast("Videojuego eliminado correctamente");
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
    mostrarToast("Videojuego editado correctamente");
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

      {mensajeToast && (
        <AlertaNotificacion mensaje={mensajeToast} onCerrar={cerrarToast} />
      )}

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