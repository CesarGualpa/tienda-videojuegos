import { useState } from "react";
import "./App.css";
import data from "./data/videojuegos";
import TablaVideojuegos from "./components/TablaVideojuegos";

function App() {
  const [videojuegos, setVideojuegos] = useState(data);

  return (
    <div className="app">
      <header className="app-header">
        <h1>Tienda de Videojuegos</h1>
        <p>Renderizado de listas y uso de props en React</p>
      </header>

      <main>
        <TablaVideojuegos videojuegos={videojuegos} />
      </main>
    </div>
  );
}

export default App;