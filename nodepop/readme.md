# Desarrollar un website con SSR (ejs) para un servicio de venta de artículos de segunda mano llamado Nodepop.

- Programa hecho en python con el framework Flask, App Registro Criptomoneda con motor de base de datos SQLite

## Intalación de dependencias

- En la carpeta del proyecto ejecutar el comando

$ npm install 

## Librerías utilizadas

- Node.js  
- Express  
- EJS (para renderizado del lado del servidor \- SSR)  
- MongoDB \+ Mongoose  
- Express-session (para manejo de sesión y login)  
- Express-validator (para validaciones de inputs)  
- Bootstrap (para el estilo del frontend)

## Ejecución del servidor

Para iniciar el servidor:   
`npm run dev`  
O en modo desarrollo (con autorecarga):  
`npm run dev`

## Estructura básica del proyecto

/models         → Modelos de Mongoose (Product, User)  
/controllers    → Controladores (lógica de rutas)  
/routes         → Rutas principales (products, login)  
/views          → Vistas EJS (SSR)  
/public         → Archivos estáticos (CSS, imágenes, etc.)  
app.js          → Configuración principal del servidor

## Funcionalidades principales

Registro y login de usuarios (con sesión)

Listado de productos filtrables y ordenables

Búsqueda por nombre, rango de precios y etiquetas

Agregar y eliminar productos propios

Renderizado de vistas con EJS

