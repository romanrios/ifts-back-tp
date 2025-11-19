# Trabajo Integrador – Desarrollo Web Backend
IFTS N° 29 | Año 2025 | Comisión A | Grupo 11



## Integrantes
- Córdoba, Daniel Ignacio
- Giménez, Mariela Belén
- Lucchelli, Eugenia
- Ríos, Román

## Descripción
Este proyecto corresponde al Trabajo Integrador de Desarrollo Web Backend del Instituto de Formación Técnica Superior N° 29. Se desarrolló en base al caso del restaurante “Sabor Urbano”, implementando un backend en Express.js con Pug como motor de plantillas y MongoDB/Mongoose como base de datos.

Incluye:
- Gestión completa de Clientes, Empleados, Productos, Plataformas y Pedidos
- Autenticación con Passport.js
- Sesiones persistentes
- Protección de rutas
- Gestión de cuenta
- Testing manual

## Tecnologías utilizadas
### Backend
Node.js, Express.js, MongoDB, Mongoose, Passport, express-session, bcrypt, connect-flash, method-override, dotenv

### Frontend
Pug, Bootstrap 5

### Desarrollo
Nodemon

## Instalación y ejecución
1. Clonar el repositorio:
```
git clone https://github.com/romanrios/ifts-back-tp.git
cd ifts-back-tp
```

2. Instalar dependencias:
```
npm install
```

3. Configurar variables de entorno:
```
PORT=3000
MONGO_URI=tu_connection_string
SESSION_SECRET=un_secret_cualquiera
```

4. Ejecutar:
```
npm run dev
```
o
```
npm start
```

5. Abrir en el navegador:
http://localhost:3000

## Funcionalidades principales
- Autenticación con Passport (login, registro, logout)
- Sesiones persistentes
- Gestión de cuenta del usuario
- Protección de rutas
- CRUD de Clientes, Empleados, Productos, Plataformas y Pedidos

## Testing
Pruebas manuales de CRUD e integración, especialmente en Pedidos.

## Base de datos
### Empleados
```
{ _id, rol, area }
```

### Pedidos
```
{ _id, cliente, producto, plataforma, idEmpleado, precio, descripcion }
```

## Enlaces útiles
Repositorio: https://github.com/romanrios/ifts-back-tp
Deploy: https://ifts-back-tp.onrender.com/

