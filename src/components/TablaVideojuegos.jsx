import { useNavigate } from "react-router-dom";
import "./TablaVideojuegos.css";

function TablaVideojuegos({ videojuegos, onEliminar }) {
  const navigate = useNavigate();

  function manejarEditar(juego) {
    navigate("/editar", { state: { videojuego: juego } });
  }

  return (
    <div className="tabla-videojuegos-page">
      <div className="tabla-header">
        <div>
          <h2>Inventario de videojuegos</h2>
          <p>Registros disponibles en la tienda</p>
        </div>
      </div>

      <div className="tabla-contenedor">
        <table className="tabla-videojuegos">
          <thead>
            <tr>
              <th>Título</th>
              <th>Género</th>
              <th>Plataforma</th>
              <th>Fecha</th>
              <th>Precio</th>
              <th>Calificación</th>
              <th>Disponible</th>
              <th>Progreso</th>
              <th>Sinopsis</th>
              <th>Acciones</th>
            </tr>
          </thead>

          <tbody>
            {videojuegos.map((juego) => {
              const porcentaje = Math.round(juego.progreso * 100);

              return (
                <tr key={juego.id}>
                  <td>{juego.titulo}</td>
                  <td>{juego.genero}</td>
                  <td>{juego.plataforma}</td>
                  <td>{juego.fechaLanzamiento}</td>
                  <td>${juego.precio}</td>
                  <td>{juego.calificacion}/100</td>

                  <td>
                    <span
                      className={
                        juego.disponible
                          ? "estado disponible"
                          : "estado no-disponible"
                      }
                    >
                      {juego.disponible ? "Disponible" : "No disponible"}
                    </span>
                  </td>

                  <td>
                    <div className="progreso-contenedor">
                      <progress value={juego.progreso} max={1}></progress>
                      <span>{porcentaje}%</span>
                    </div>
                  </td>

                  <td className="sinopsis-celda">{juego.sinopsis}</td>

                  <td>
                    <div className="acciones">
                      <button
                        className="btn btn-editar"
                        onClick={() => manejarEditar(juego)}
                      >
                        Editar
                      </button>

                      <button
                        className="btn btn-eliminar"
                        onClick={() => onEliminar(juego.id)}
                      >
                        Eliminar
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default TablaVideojuegos;