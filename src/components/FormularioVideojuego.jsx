import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./FormularioVideojuego.css";

function FormularioVideojuego({ onGuardar }) {
  const location = useLocation();
  const navigate = useNavigate();

  const videojuegoRecuperado = location.state?.videojuego || null;

  const fechaActual = new Date().toISOString().split("T")[0];

  const [titulo, setTitulo] = useState("");
  const [genero, setGenero] = useState("");
  const [plataforma, setPlataforma] = useState("");
  const [fechaLanzamiento, setFechaLanzamiento] = useState("");
  const [precio, setPrecio] = useState("");
  const [disponible, setDisponible] = useState(false);
  const [progreso, setProgreso] = useState(0);
  const [sinopsis, setSinopsis] = useState("");
  const [calificacion, setCalificacion] = useState("");

  const [errores, setErrores] = useState({});
  const [formularioEnviado, setFormularioEnviado] = useState(false);

  useEffect(() => {
    if (videojuegoRecuperado) {
      setTitulo(videojuegoRecuperado.titulo);
      setGenero(videojuegoRecuperado.genero);
      setPlataforma(videojuegoRecuperado.plataforma);
      setFechaLanzamiento(videojuegoRecuperado.fechaLanzamiento);
      setPrecio(videojuegoRecuperado.precio);
      setDisponible(videojuegoRecuperado.disponible);
      setProgreso(videojuegoRecuperado.progreso * 100);
      setSinopsis(videojuegoRecuperado.sinopsis);
      setCalificacion(videojuegoRecuperado.calificacion);
    } else {
      setTitulo("");
      setGenero("");
      setPlataforma("");
      setFechaLanzamiento("");
      setPrecio("");
      setDisponible(false);
      setProgreso(0);
      setSinopsis("");
      setCalificacion("");
    }

    setErrores({});
    setFormularioEnviado(false);
  }, [videojuegoRecuperado]);

  function validarFormulario() {
    const erroresActivos = {};

    if (titulo.trim() === "") {
      erroresActivos.titulo = "El título del videojuego es obligatorio.";
    } else if (titulo.trim().length < 3) {
      erroresActivos.titulo = "El título debe tener al menos 3 caracteres.";
    }

    if (genero === "") {
      erroresActivos.genero = "Debes seleccionar un género.";
    }

    if (plataforma === "") {
      erroresActivos.plataforma = "Debes seleccionar una plataforma.";
    }

    if (fechaLanzamiento === "") {
      erroresActivos.fechaLanzamiento =
        "Debes ingresar la fecha de lanzamiento.";
    } else if (fechaLanzamiento > fechaActual) {
      erroresActivos.fechaLanzamiento =
        "La fecha de lanzamiento no puede ser futura.";
    }

    if (precio === "") {
      erroresActivos.precio = "El precio es obligatorio.";
    } else if (Number(precio) <= 0) {
      erroresActivos.precio = "El precio debe ser mayor a 0.";
    }

    if (sinopsis.trim() === "") {
      erroresActivos.sinopsis = "La sinopsis es obligatoria.";
    } else if (sinopsis.trim().length < 10) {
      erroresActivos.sinopsis =
        "La sinopsis debe tener al menos 10 caracteres.";
    } else if (sinopsis.trim().length > 250) {
      erroresActivos.sinopsis =
        "La sinopsis no puede superar los 250 caracteres.";
    }

    if (calificacion === "") {
      erroresActivos.calificacion = "La calificación es obligatoria.";
    } else if (Number(calificacion) <= 1 || Number(calificacion) >= 100) {
      erroresActivos.calificacion =
        "La calificación debe ser mayor que 1 y menor que 100.";
    }

    return erroresActivos;
  }

  useEffect(() => {
    if (formularioEnviado) {
      const erroresActualizados = validarFormulario();
      setErrores(erroresActualizados);
    }
  }, [
    titulo,
    genero,
    plataforma,
    fechaLanzamiento,
    precio,
    sinopsis,
    calificacion,
    formularioEnviado
  ]);

  function manejarSubmit(e) {
    e.preventDefault();

    setFormularioEnviado(true);

    const erroresActivos = validarFormulario();

    if (Object.keys(erroresActivos).length > 0) {
      setErrores(erroresActivos);
      return;
    }

    const videojuego = {
      id: videojuegoRecuperado ? videojuegoRecuperado.id : Date.now(),
      titulo: titulo.trim(),
      genero: genero,
      plataforma: plataforma,
      fechaLanzamiento: fechaLanzamiento,
      precio: Number(precio),
      disponible: disponible,
      progreso: Number(progreso) / 100,
      sinopsis: sinopsis.trim(),
      calificacion: Number(calificacion)
    };

    onGuardar(videojuego);
    navigate("/");
  }

  function manejarCancelar() {
    navigate("/");
  }

  return (
    <div className="formulario-page">
      <form className="formulario-card" onSubmit={manejarSubmit} noValidate>
        <h2>
          {videojuegoRecuperado
            ? "Editar videojuego"
            : "Registrar videojuego"}
        </h2>

        <p>
          Completa la información del videojuego. Los campos se validan antes de
          guardar.
        </p>

        <div className="formulario-grupo">
          <label>Título del videojuego</label>
          <input
            type="text"
            value={titulo}
            onChange={(e) => setTitulo(e.target.value)}
            placeholder="Ejemplo: Super Mario Odyssey"
          />
          {errores.titulo && (
            <span className="error-mensaje">{errores.titulo}</span>
          )}
        </div>

        <div className="formulario-grupo">
          <label>Género</label>
          <select value={genero} onChange={(e) => setGenero(e.target.value)}>
            <option value="">Selecciona un género</option>
            <option value="Aventura">Aventura</option>
            <option value="Acción">Acción</option>
            <option value="RPG">RPG</option>
            <option value="Shooter">Shooter</option>
            <option value="Terror">Terror</option>
            <option value="Deportes">Deportes</option>
            <option value="Carreras">Carreras</option>
            <option value="Sandbox">Sandbox</option>
          </select>
          {errores.genero && (
            <span className="error-mensaje">{errores.genero}</span>
          )}
        </div>

        <div className="formulario-grupo">
          <label>Plataforma</label>

          <div className="opciones-radio">
            <label>
              <input
                type="radio"
                value="PC"
                checked={plataforma === "PC"}
                onChange={(e) => setPlataforma(e.target.value)}
              />
              PC
            </label>

            <label>
              <input
                type="radio"
                value="PlayStation 5"
                checked={plataforma === "PlayStation 5"}
                onChange={(e) => setPlataforma(e.target.value)}
              />
              PlayStation 5
            </label>

            <label>
              <input
                type="radio"
                value="Xbox Series X/S"
                checked={plataforma === "Xbox Series X/S"}
                onChange={(e) => setPlataforma(e.target.value)}
              />
              Xbox Series X/S
            </label>

            <label>
              <input
                type="radio"
                value="Nintendo Switch"
                checked={plataforma === "Nintendo Switch"}
                onChange={(e) => setPlataforma(e.target.value)}
              />
              Nintendo Switch
            </label>
          </div>

          {errores.plataforma && (
            <span className="error-mensaje">{errores.plataforma}</span>
          )}
        </div>

        <div className="formulario-grupo">
          <label>Fecha de lanzamiento</label>
          <input
            type="date"
            value={fechaLanzamiento}
            max={fechaActual}
            onChange={(e) => setFechaLanzamiento(e.target.value)}
          />
          {errores.fechaLanzamiento && (
            <span className="error-mensaje">{errores.fechaLanzamiento}</span>
          )}
        </div>

        <div className="formulario-grupo">
          <label>Precio</label>
          <input
            type="number"
            value={precio}
            onChange={(e) => setPrecio(e.target.value)}
            placeholder="Ejemplo: 59.99"
            step="0.01"
          />
          {errores.precio && (
            <span className="error-mensaje">{errores.precio}</span>
          )}
        </div>

        <div className="formulario-grupo">
          <label>Sinopsis / Descripción</label>
          <textarea
            value={sinopsis}
            onChange={(e) => setSinopsis(e.target.value)}
            placeholder="Escribe una reseña corta del videojuego"
            maxLength="250"
          ></textarea>

          <small>{sinopsis.length}/250 caracteres</small>

          {errores.sinopsis && (
            <span className="error-mensaje">{errores.sinopsis}</span>
          )}
        </div>

        <div className="formulario-grupo">
          <label>Calificación de la crítica</label>
          <input
            type="number"
            value={calificacion}
            onChange={(e) => setCalificacion(e.target.value)}
            placeholder="Ejemplo: 95"
          />
          {errores.calificacion && (
            <span className="error-mensaje">{errores.calificacion}</span>
          )}
        </div>

        <div className="formulario-grupo checkbox-grupo">
          <label>
            <input
              type="checkbox"
              checked={disponible}
              onChange={(e) => setDisponible(e.target.checked)}
            />
            Disponible en tienda
          </label>
        </div>

        <div className="formulario-grupo">
          <label>Progreso de descarga: {progreso}%</label>
          <input
            type="range"
            min="0"
            max="100"
            value={progreso}
            onChange={(e) => setProgreso(e.target.value)}
          />
        </div>

        <div className="formulario-botones">
          <button className="btn-guardar" type="submit">
            Guardar
          </button>

          <button
            className="btn-cancelar"
            type="button"
            onClick={manejarCancelar}
          >
            Cancelar
          </button>
        </div>
      </form>
    </div>
  );
}

export default FormularioVideojuego;