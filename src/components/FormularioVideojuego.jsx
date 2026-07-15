import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./FormularioVideojuego.css";

function FormularioVideojuego({ onGuardar }) {
  const location = useLocation();
  const navigate = useNavigate();

  const videojuegoRecuperado = location.state?.videojuego || null;

  const [titulo, setTitulo] = useState("");
  const [genero, setGenero] = useState("");
  const [plataforma, setPlataforma] = useState("");
  const [lanzamiento, setLanzamiento] = useState("");
  const [precio, setPrecio] = useState("");
  const [disponible, setDisponible] = useState(false);
  const [progreso, setProgreso] = useState(0);

  useEffect(() => {
    if (videojuegoRecuperado) {
      setTitulo(videojuegoRecuperado.titulo);
      setGenero(videojuegoRecuperado.genero);
      setPlataforma(videojuegoRecuperado.plataforma);
      setLanzamiento(videojuegoRecuperado.lanzamiento);
      setPrecio(videojuegoRecuperado.precio);
      setDisponible(videojuegoRecuperado.disponible);
      setProgreso(videojuegoRecuperado.progreso * 100);
    } else {
      setTitulo("");
      setGenero("");
      setPlataforma("");
      setLanzamiento("");
      setPrecio("");
      setDisponible(false);
      setProgreso(0);
    }
  }, [videojuegoRecuperado]);

  function manejarGuardar() {
    const videojuego = {
      id: videojuegoRecuperado ? videojuegoRecuperado.id : Date.now(),
      titulo: titulo,
      genero: genero,
      plataforma: plataforma,
      lanzamiento: Number(lanzamiento),
      precio: Number(precio),
      disponible: disponible,
      progreso: Number(progreso) / 100
    };

    onGuardar(videojuego);
    navigate("/");
  }

  function manejarCancelar() {
    navigate("/");
  }

  return (
    <div className="formulario-page">
      <div className="formulario-card">
        <h2>
          {videojuegoRecuperado
            ? "Editar videojuego"
            : "Registrar videojuego"}
        </h2>

        <p>
          Completa los datos del videojuego para guardarlo en el inventario.
        </p>

        <div className="formulario-grupo">
          <label>Título</label>
          <input
            type="text"
            value={titulo}
            onChange={(e) => setTitulo(e.target.value)}
            placeholder="Ejemplo: Super Mario Odyssey"
          />
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
        </div>

        <div className="formulario-grupo">
          <label>Año de lanzamiento</label>
          <input
            type="number"
            value={lanzamiento}
            onChange={(e) => setLanzamiento(e.target.value)}
            placeholder="Ejemplo: 2023"
          />
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
          <button className="btn-guardar" onClick={manejarGuardar}>
            Guardar
          </button>

          <button className="btn-cancelar" onClick={manejarCancelar}>
            Cancelar
          </button>
        </div>
      </div>
    </div>
  );
}

export default FormularioVideojuego;