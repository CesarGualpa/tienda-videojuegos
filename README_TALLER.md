# Tienda Videojuegos

## Opción seleccionada

La opción seleccionada para este taller es una **lista funcional de videojuegos** desarrollada en React.

## Descripción del ejercicio

Este proyecto consiste en una aplicación web llamada **Tienda Videojuegos**, donde se muestra una lista de videojuegos registrados en una tabla. Cada videojuego contiene información como título, género, plataforma, fecha de lanzamiento, precio, disponibilidad, progreso de descarga, sinopsis y calificación.

La aplicación permite visualizar los videojuegos, registrar nuevos juegos, editar registros existentes y eliminar elementos de la lista.

## Funcionalidad principal

La funcionalidad principal del proyecto es renderizar una lista de videojuegos en pantalla utilizando React. La información se muestra de forma organizada en una tabla responsiva, permitiendo que el usuario pueda consultar los datos principales de cada videojuego.

Además, el proyecto incluye funcionalidades adicionales como:

* Registro de nuevos videojuegos.
* Edición de videojuegos existentes.
* Eliminación de registros.
* Validación de formularios.
* Persistencia de datos con LocalStorage.
* Navegación SPA usando React Router.
* Notificaciones visuales tipo Toast.

## Cómo se construye y muestra la lista

La lista de videojuegos se maneja desde el estado principal de la aplicación en `App.jsx`, usando el hook `useState`.

Los datos iniciales provienen del archivo:


src/data/videojuegos.js


Luego, la lista se envía mediante props al componente encargado de mostrar la tabla:


src/components/TablaVideojuegos.jsx


Dentro de este componente se utiliza el método `.map()` para recorrer el arreglo de videojuegos y renderizar una fila por cada elemento de la lista.

Cada videojuego se identifica mediante su propiedad `id`, la cual se usa como `key` en React para mantener un renderizado correcto y ordenado.

## Correcciones realizadas

Durante el desarrollo del proyecto se realizaron correcciones y mejoras sobre la estructura inicial del ejercicio:

* Se separó el proyecto en componentes reutilizables.
* Se evitó trabajar todo el código directamente en `App.jsx`.
* Se corrigió el manejo de arreglos al agregar nuevos registros.
* Se usó correctamente `.map()` para editar elementos de la lista.
* Se implementó `filter()` para eliminar videojuegos.
* Se corrigió el manejo del checkbox usando `e.target.checked`.
* Se agregaron validaciones para evitar registros incompletos o incorrectos.
* Se agregó persistencia con `LocalStorage` para conservar los datos al recargar la página.
* Se mejoró el diseño responsive de la tabla y el formulario.

## Instalación y ejecución local

Para ejecutar el proyecto localmente, sigue estos pasos:

1. Entrar a la carpeta del proyecto:

cd tienda-videojuegos


2. Instalar las dependencias:

npm install


3. Ejecutar el servidor de desarrollo:

npm run dev


4. Abrir en el navegador el enlace que aparece en la terminal, por ejemplo:

http://localhost:5173/


## Tecnologías utilizadas

* React
* Vite
* JavaScript
* CSS
* React Router DOM
* LocalStorage
* Git y GitHub

## Nombre del estudiante

**César Amaguaña**

## Observaciones

El proyecto presentado se encuentra más avanzado que el requerimiento base del taller, ya que además del renderizado de listas incluye navegación, formularios, validaciones, edición, eliminación y persistencia local de datos.

El ejercicio mantiene como base principal el trabajo con listas en React mediante el renderizado dinámico de videojuegos.
