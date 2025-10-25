# Proyecto de Arquitectura de Microservicios con Docker

**Alumno:** Gael Andre Hueytlelt Villalobos
**Matrícula:** 233392

Este proyecto implementa una arquitectura de microservicios básica utilizando Docker Compose, cumpliendo con los requisitos de la materia. La arquitectura consta de un frontend web, un backend (API REST) y una base de datos persistente.

---

## 1. Diagrama de Arquitectura

El flujo de datos sigue este esquema:
1.  El **Usuario** accede al **Frontend** (Nginx) en el puerto `3000`.
2.  El **Frontend** (JavaScript) realiza peticiones HTTP al **Backend** (Node.js) en el puerto `5000`.
3.  El **Backend** se comunica con la **Base de Datos** (MySQL) a través de la red interna de Docker (`mi-red-interna`) para realizar operaciones CRUD.
4.  La **Base de Datos** guarda los datos en un **Volumen Nombrado** (`db-data-mysql`) para asegurar la persistencia.



---

## 2. Servicios Incluidos

El `docker-compose.yml` orquesta los siguientes 3 servicios:

### 1. `frontend-web-hueytlelt` (Frontend)
* **Imagen Base:** `nginx:1.25-alpine` (Construida desde Dockerfile)
* **Puerto (Host):** `3000`
* **Puerto (Contenedor):** `80`
* **Tecnología:** HTML, CSS y JavaScript (Vanilla).
* **Función:** Sirve la interfaz de usuario estática y consume datos de la API.

### 2. `backend-api-hueytlelt` (Backend API)
* **Imagen Base:** `node:18` (Construida desde Dockerfile)
* **Puerto (Host):** `5000`
* **Puerto (Contenedor):** `5000`
* **Tecnología:** Node.js y Express.
* **Función:** Expone una API REST para operaciones CRUD y se conecta a la base de datos.
* **Endpoint Personalizado:** `GET /api/hueytlelt` (retorna mi nombre completo).

### 3. `db-mysql-hueytlelt` (Base de Datos)
* **Imagen:** `mysql:8.0`
* **Puerto (Host):** `3307` (para evitar conflictos locales)
* **Puerto (Contenedor):** `3306`
* **Nombre de la BD:** `gaelandrehueytlelt`
* **Volumen:** `db-data-mysql` (para persistencia de datos).

---

## 3. Cómo Levantar el Entorno


1. Navegar a la carpeta del proyecto:
    ```bash
    cd proyecto-gael-docker-compose
    ```
2. Construir y levantar los contenedores:
    ```bash
    sudo docker compose up --build
    ```

---

## 3. Verificación

Una vez que todos los contenedores estén corriendo:

1.  **Probar Frontend:** Abrir el navegador en `http://localhost:3000`.
2.  **Probar Conexión Backend:** Verificar que el nombre "Gael Andre Hueytlelt Villalobos" se carga correctamente.
3.  **Probar CRUD:** Usar el formulario para agregar un nuevo usuario.
4.  **Probar Persistencia:**
    * Detener los contenedores con `CTRL + C` y luego `sudo docker compose down`.
    * Volver a levantarlos con `sudo docker compose up`.
    * Recargar la página. Los usuarios agregados deben seguir allí.# proyecto-gael-docker-compose
