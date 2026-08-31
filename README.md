# Mueblería Hermanos Jota — E-commerce
 
E-commerce desarrollado como proyecto grupal, enfocado en construir la fachada completa y la experiencia interactiva del cliente utilizando únicamente tecnologías del lado del cliente (HTML, CSS y JavaScript), simulando una experiencia de compra sin conexión a un backend real.
 
## 📅 Información del proyecto
 
- **Equipo:** 3 integrantes
- **Entrega:** Sprint 1 y Sprin 2
## 👥 Integrantes
 
- Juan Ignacio Sotomayor — [GitHub](https://github.com/JuanIgnacioSotomayor)
- Mariel Anabella Gutiérrez — [GitHub](https://github.com/marielgutierrez)
- Santiago Rojas — [GitHub](https://github.com/zant172)

## 📖 Descripción del proyecto
 
El sitio simula una tienda online de muebles, totalmente responsiva y visualmente atractiva. Los productos se gestionan de forma local mediante JavaScript (arrays de objetos), sin conexión a una base de datos ni backend real. Su carga se simula como una petición asíncrona, replicando el comportamiento de una API.
 
### Objetivos de aprendizaje
 
- Estructurar un sitio web complejo utilizando HTML5 semántico.
- Aplicar estilos y diseño responsivo con CSS3, dominando el Modelo de Cajas y Flexbox.
- Implementar lógica de programación con JavaScript para crear una experiencia de usuario dinámica.
- Manipular el DOM para crear y modificar contenido.
- Gestionar colecciones de datos utilizando Arrays de Objetos.
- Simular una petición de datos asíncrona para cargar el catálogo.
- Manejar la interacción del usuario a través de eventos.
- Colaborar en un proyecto utilizando Git y GitHub.
## ⚙️ Funcionalidades
 
### 🏠 Página de Inicio — `index.html`
- Header con logo y navegación
- Hero Banner principal
- 3–4 productos destacados cargados dinámicamente
- Footer con información básica
### 🛋️ Catálogo de Productos — `productos.html`
- Grilla de tarjetas de productos
- Datos obtenidos desde un archivo JavaScript local
- Cada producto enlaza a su página de detalle
- Campo de búsqueda (bonus funcional)
### 🔍 Detalle de Producto — `producto.html`
- Imagen grande y descripción completa
- Detalles de fabricación y precio
- Botón "Añadir al Carrito"
### ✉️ Contacto — `contacto.html`
- Formulario con Nombre, Email y Mensaje
- Validación del lado del cliente con JavaScript
- Mensaje de éxito mostrado dinámicamente mediante el DOM
### 🛒 Carrito
- Carrito simulado con contador visible en el header
## 🛠️ Tecnologías utilizadas
 
- **HTML5** — estructura semántica del sitio
- **CSS3** — diseño responsivo Mobile First, Flexbox, Modelo de Cajas
- **JavaScript (Vanilla JS)** — lógica de la aplicación, manipulación del DOM, manejo de eventos, gestión de datos con Arrays de Objetos y simulación de carga asíncrona (`setTimeout` / `async-await`)
- **Git & GitHub** — control de versiones y trabajo colaborativo
## 📐 Requisitos técnicos
 
- **HTML:** etiquetas semánticas obligatorias, código limpio y bien indentado
- **CSS:** 100% responsivo (enfoque Mobile First), uso de Flexbox en las secciones principales, estilos en archivo externo
- **JavaScript:** productos definidos en un array de objetos (`.js`), renderizado dinámico vía DOM, carga asíncrona simulada, interactividad mediante `addEventListener`
## 📂 Estructura del proyecto
 
```
proyecto-muebleria/
├── index.html
├── productos.html
├── producto.html
├── contacto.html
├── css/
│   └── styles.css
├── js/
│   ├── products.js
│   └── main.js
├── images/
│   
└── README.md
```
 
## 🚀 Cómo ejecutar el proyecto
 
1. Cloná el repositorio:
```bash
   git clone https://github.com/usuario/mueblería-hermanos-jota.git
```
2. Abrí `index.html` en tu navegador (no requiere instalación de dependencias ni servidor backend).
## 🌿 Flujo de trabajo (Git)
 
Cada integrante trabaja su parte en una rama propia siguiendo la convención `feature/<nombre-de-la-tarea>` y realiza un Pull Request hacia `main` para su revisión antes de mergear.
