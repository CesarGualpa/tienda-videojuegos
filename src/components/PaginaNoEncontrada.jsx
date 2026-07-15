import { Link } from "react-router-dom";
import "./PaginaNoEncontrada.css";

function PaginaNoEncontrada() {
  return (
    <div className="pagina-404">
      <div className="pagina-404-card">
        <h1>404</h1>
        <h2>Página no encontrada</h2>
        <p>La ruta que intentaste abrir no existe en esta aplicación.</p>

        <Link to="/">Volver al inventario</Link>
      </div>
    </div>
  );
}

export default PaginaNoEncontrada;