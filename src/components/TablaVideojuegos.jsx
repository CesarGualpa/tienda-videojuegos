import "./TablaVideojuegos.css";

function TablaVideojuegos({ videojuegos }) {
  return (
    <div className="tabla-videojuegos-page">
      <div className="tabla-header">
        <div>
          <h2>Videojuegos</h2>
          <p>Listado de videojuegos disponibles en la tienda</p>
        </div>
      </div>

      <div className="tabla-contenedor">
        <table className="tabla-videojuegos">
          <thead>
            <tr>
              <th>Título</th>
              <th>Género</th>
              <th>Plataforma</th>
              <th>Lanzamiento</th>
              <th>Precio</th>
              <th>Disponible</th>
              <th>Progreso</th>
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
                  <td>{juego.lanzamiento}</td>
                  <td>${juego.precio}</td>
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
                      <progress
                        value={juego.progreso}
                        max={1}
                        aria-label={`Progreso de ${juego.titulo}`}
                      ></progress>

                      <span>{porcentaje}%</span>
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