// frontend-web/script.js



const API_URL = 'http://localhost:5000/api';

document.addEventListener('DOMContentLoaded', () => {
    cargarNombre();
    cargarUsuarios();

    document.getElementById('form-usuario').addEventListener('submit', agregarUsuario);
});

// Cargar tu nombre desde el endpoint /api/hueytlelt
async function cargarNombre() {
    try {
        const res = await fetch(`${API_URL}/hueytlelt`);
        const data = await res.json();
        document.getElementById('mi-nombre').textContent = data.nombreCompleto;
    } catch (err) {
        document.getElementById('mi-nombre').textContent = "Error al cargar";
        console.error(err);
    }
}

// CRUD: Leer usuarios
async function cargarUsuarios() {
    const lista = document.getElementById('lista-usuarios');
    try {
        const res = await fetch(`${API_URL}/usuarios`);
        const usuarios = await res.json();

        lista.innerHTML = ''; // Limpiar lista

        if (usuarios.length === 0) {
            lista.innerHTML = '<li>No hay usuarios en la base de datos.</li>';
        } else {
            usuarios.forEach(user => {
                const li = document.createElement('li');
                li.textContent = `ID: ${user.id} - Nombre: ${user.nombre}`;
                lista.appendChild(li);
            });
        }
    } catch (err) {
        lista.innerHTML = '<li>Error al cargar usuarios.</li>';
        console.error(err);
    }
}

// CRUD: Crear usuario
async function agregarUsuario(e) {
    e.preventDefault();
    const nombreInput = document.getElementById('nombre-usuario');
    const nombre = nombreInput.value;

    try {
        await fetch(`${API_URL}/usuarios`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ nombre }),
        });
        nombreInput.value = ''; // Limpiar input
        cargarUsuarios(); // Recargar la lista
    } catch (err) {
        console.error('Error al agregar usuario:', err);
    }
}