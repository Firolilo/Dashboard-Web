let users = JSON.parse(localStorage.getItem('users')) || [];
let userToEdit = null; // Índice del usuario que se está editando

// Inicializar con el usuario admin/admin como administrador si no existe
function initializeAdmin() {
    const adminExists = users.some(user => user.username === 'admin');
    
    if (!adminExists) {
        const admin = {
            username: 'admin',
            password: 'admin',
            role: 'admin'
        };
        users.push(admin);
        localStorage.setItem('users', JSON.stringify(users));
    }
}

// Función para cargar los usuarios registrados (sin mostrar el usuario logueado)
function loadUsers() {
    const loggedInUser = localStorage.getItem('loggedInUser'); // Usuario actualmente logueado
    const userList = document.getElementById('user-list');
    userList.innerHTML = ''; // Limpiamos la lista

    // Recorremos los usuarios almacenados en el array, omitiendo al usuario logueado
    users.forEach((user, index) => {
        if (user.username !== loggedInUser || user.username !== "admin") { // Omitimos al usuario logueado
            const li = document.createElement('li');
            li.innerHTML = `
                ${user.username} (${user.role}) 
                <button onclick="editUser(${index})">Editar</button>
                <button onclick="deleteUser('${user.username}')">Eliminar</button>`;
            userList.appendChild(li);
        }
    });
}

// Función para agregar un usuario nuevo
function addUser() {
    const username = document.getElementById('new-username').value;
    const password = document.getElementById('new-password').value;
    const role = document.getElementById('new-role').value;

    if (username === "" || password === "") {
        alert("Por favor, completa todos los campos.");
        return;
    }

    // Verificamos si el usuario ya existe
    const existingUser = users.find(user => user.username === username);
    if (existingUser) {
        alert("El usuario ya existe.");
        return;
    }

    // Creamos el nuevo usuario y lo agregamos al array de usuarios
    const newUser = {
        username: username,
        password: password,
        role: role
    };

    users.push(newUser);
    localStorage.setItem('users', JSON.stringify(users)); // Guardamos el array actualizado
    alert("Usuario agregado exitosamente.");
    loadUsers(); // Recargar lista de usuarios
}

// Función para eliminar un usuario
function deleteUser(username) {
    users = users.filter(user => user.username !== username);
    localStorage.setItem('users', JSON.stringify(users));
    alert("Usuario eliminado.");
    loadUsers();
}

// Función para editar un usuario
function editUser(index) {
    userToEdit = index;
    const user = users[index];

    // Mostrar los datos del usuario seleccionado en los campos de edición
    document.getElementById('edit-username').value = user.username;
    document.getElementById('edit-password').value = user.password;
    document.getElementById('edit-role').value = user.role;

    // Mostrar el modal de edición
    document.getElementById('edit-user-modal').style.display = 'block';
}

// Función para guardar los cambios de un usuario editado
function saveChanges() {
    if (userToEdit !== null) {
        const updatedUsername = document.getElementById('edit-username').value;
        const updatedPassword = document.getElementById('edit-password').value;
        const updatedRole = document.getElementById('edit-role').value;

        if (updatedUsername === "" || updatedPassword === "") {
            alert("Por favor, completa todos los campos.");
            return;
        }

        // Actualizamos los datos del usuario
        users[userToEdit].username = updatedUsername;
        users[userToEdit].password = updatedPassword;
        users[userToEdit].role = updatedRole;

        // Guardamos los cambios en el localStorage
        localStorage.setItem('users', JSON.stringify(users));
        alert("Usuario actualizado exitosamente.");
        loadUsers();

        // Ocultar el modal de edición
        document.getElementById('edit-user-modal').style.display = 'none';
        userToEdit = null;
    }
}

// Inicializamos el administrador al cargar la página
initializeAdmin();

// Cargar usuarios al abrir la página
loadUsers();
