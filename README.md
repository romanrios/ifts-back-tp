# Proyecto Integrador – Desarrollo Web Backend
IFTS N° 29 | Año 2025 | Comisión A | Grupo 11

<img width="1366" height="768" alt="screenshot" src="https://github.com/user-attachments/assets/2f2bf3af-bf7d-432b-a0cd-eb8ffe184a78" />

<img width="1366" height="768" alt="screenshot2" src="https://github.com/user-attachments/assets/3513d099-c7de-42c3-ab19-c245f8e12780" />



## Integrantes
- Córdoba, Daniel Ignacio  
- Giménez, Mariela Belén  
- Lucchelli, Eugenia  
- Ríos, Román  

---

## Descripción

Proyecto basado en el caso “Restaurante Sabor Urbano”. Backend desarrollado en Express.js, con Pug para las vistas y MongoDB/Mongoose como base de datos.

Incluye autenticación con Passport, manejo de sesiones, control de acceso, administración de cuenta y CRUD completos de todos los módulos.

Integra arquitectura MVC, renderizado de vistas, protección de rutas y pruebas básicas. El sistema fue diseñado y desarrollado en equipo como proyecto integrador de la cursada.

---

## Tecnologías
**Backend:** Node.js, Express.js, MongoDB, Mongoose, Passport (passport-local), express-session, bcrypt, connect-flash, method-override, dotenv  
**Frontend:** Pug, Bootstrap 5  
**Desarrollo:** Nodemon  

---

## Funcionalidades Principales

### 1. Autenticación y Sesiones
- Login con usuario o email mediante passport-local.  
- Registro con contraseñas hasheadas (bcrypt).  
- Sesiones persistentes con express-session.  
- Serialización y deserialización de usuarios.  
- Mensajes flash para retroalimentación del usuario.

### 2. Gestión de Cuenta
- Modificación de username, email y contraseña.  
- Validación de duplicados.  
- Eliminación de cuenta con cierre automático de sesión.

### 3. Protección de Rutas
- Middleware `ensureAuthenticated`.  
- Protección de todos los módulos del sistema.  
- Acceso público solo a login y registro.

### 4. CRUD de Módulos
- **Clientes:** creación, edición, listado, detalle y eliminación.  
- **Empleados:** CRUD completo (rol, área).  
- **Productos:** CRUD con precio.  
- **Plataformas:** CRUD.  
- **Pedidos:** CRUD con relaciones a Cliente, Producto, Plataforma y Empleado.  
  - Precio autocompletado según el producto.  
  - Integridad mediante referencias ObjectId.

### 5. Manejo de Errores y Feedback
- Middleware `errorHandler`.  
- Mensajes flash para acciones y errores.


---

## Estructura del Proyecto
```bash
src/
  config/
    db.js
    passportConfig.js
  controllers/
    authController.js
    clientesController.js
    empleadosController.js
    pedidosController.js
    plataformasController.js
    productosController.js
  middlewares/
    ensureAuth.js
    errorHandler.js
  models/
    User.js
    ClientesModel.js
    EmpleadosModel.js
    PedidosModel.js
    PlataformasModel.js
    ProductosModel.js
  routes/
    authRoutes.js
    clienteRoutes.js
    empleadoRoutes.js
    indexRoutes.js
    pedidoRoutes.js
    plataformaRoutes.js
    productoRoutes.js
  views/
    inicio/
    clientes/
    empleados/
    pedidos/
    plataformas/
    productos/
    error.pug
    layout.pug
  index.js
```

---


## Instalación y Ejecución

### 1. Clonar el repositorio
```bash
git clone https://github.com/romanrios/ifts-back-tp.git
cd ifts-back-tp
```

### 2. Instalar dependencias
```bash
npm install
```

### 3. Configurar variables de entorno (`.env`)
```env
PORT=3000
MONGO_URI=tu_connection_string
SESSION_SECRET=un_secret_cualquiera
```

### 4. Ejecutar la aplicación
Desarrollo:
```bash
npm run dev
```
Producción:
```bash
npm start
```

### 5. Acceso
```
http://localhost:3000
```

---

## Enlaces
- Repositorio GitHub: https://github.com/romanrios/ifts-back-tp  
- Deploy: https://ifts-back-tp.onrender.com/  

---

**Instituto de Formación Técnica Superior N°29**
Tecnicatura Superior en Desarrollo de Software
Año 2025


