# OAST Importadores – Frontend (Vue 3 + Vite)

SPA para la gestión de importadores del OAST.  
Desarrollada con Vue 3, Vite, Axios y MDBootstrap.  
Consume la API Laravel del backend.

---

## 1. Descripción del proyecto
Permite:
- Login con Sanctum  
- Listado de importadores  
- Creación de importadores mediante formulario  
- Gestión de usuarios (solo administradores)  
- Navegación protegida según rol  

---

## 2. Tecnologías utilizadas
- Vue 3  
- Vite  
- Axios  
- MDBootstrap  
- Vue Router  
- Git / GitHub  

---

## 3. Instalación

### 3.1 Clonar repositorio
```bash
git clone https://github.com/YunkyWan/oast-web.git
cd oast-web
```
### 3.2 Instalar dependencias
```bash
npm install
```
### 3.3 Crear archivo .env
Crea un archivo .env en la raíz del proyecto con este contenido:
```bash
VITE_API_URL=http://localhost:8000
```

### 3.4 Ejecutar entorno de desarrollo
```bash
npm run dev
```
Frontend disponible en:
👉 http://localhost:5173

---

## 4. Estructura del proyecto

css
Copiar código
src/  
 ├── api/           
 ├── components/    
 ├── composables/    
 ├── router/         
 ├── views/          
 ├── main.js  
 └── App.vue
 
---
## 5. Rutas principales
- /login

- /importadores

- /importadores/nuevo

- /usuarios (solo admin)

- /usuarios/nuevo

- /usuarios/:id/editar


---

## 6. Uso de la aplicación
### 6.1. Acceso
1. Abre http://localhost:5173
2. Introduce las credenciales del usuario administrador:
3. Usuario: admin@oast.local
4. Contraseña: 123456
5. Al iniciar sesión se mostrará el menú principal.
### 6.2. Menú principal
- Importadores:  
  Permite consultar, crear y modificar registros de importadores.
- Usuarios
(Visible solo para administradores):  
Muestra el listado de usuarios y permite su gestión.
- Salir:  
Cierra la sesión actual.
Cada opción cuenta con un icono de Font Awesome para una mejor identificación visual.
### 6.3. Módulo de Importadores
- Listado: muestra todos los importadores registrados.  
- Nuevo Importador: formulario dividido en secciones (Identificación, Domicilio Fiscal, Representante, etc.).  
- Edición: permite actualizar los datos existentes.
- Validación: los campos obligatorios se indican visualmente.
- Accesibilidad: todos los formularios siguen la guía WCAG 2.1 nivel AA.
### 6.4. Módulo de Usuarios (solo admin)
- Listado: muestra todos los usuarios del sistema, su rol y fecha de creación.
- Nuevo usuario: permite registrar un nuevo usuario y asignarle rol (admin o consultor).
- Edición: permite modificar los datos o la contraseña.
- Eliminación: elimina un usuario de forma permanente.
- La interfaz usa MDBootstrap con form-outline y etiquetas flotantes.
### 6.5. Sistema de roles y permisos
- Administrador: acceso completo a todos los módulos.
- Consultor: acceso de solo lectura al listado de importadores.
- La asignación de roles se realiza automáticamente desde el panel de usuarios.

---

## 7. Integración con backend
- Autenticación con cookies de Sanctum

- Axios configurado con interceptores

- Estado global mediante useAuth()

- Manejo de roles y navegación protegida
