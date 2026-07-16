import { useEffect } from "react";
import "./AlertaNotificacion.css";

function AlertaNotificacion({ mensaje, onCerrar }) {
  useEffect(() => {
    const temporizador = setTimeout(() => {
      onCerrar();
    }, 3000);

    return () => {
      clearTimeout(temporizador);
    };
  }, [mensaje, onCerrar]);

  return (
    <div className="toast-notificacion">
      <p>{mensaje}</p>
    </div>
  );
}

export default AlertaNotificacion;