// Función para inicializar el admin si no existe
function initializeAdmin() {
    let users = JSON.parse(localStorage.getItem('users')) || [];

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

// Función para iniciar sesión
function login() {
    const username = document.getElementById('login-username').value;
    const password = document.getElementById('login-password').value;

    if (username === "" || password === "") {
        alert("Por favor, completa todos los campos.");
        return;
    }

    let users = JSON.parse(localStorage.getItem('users')) || [];

    // Verificamos si el usuario existe
    const user = users.find(user => user.username === username);

    if (!user) {
        alert("El usuario no existe.");
        return;
    }

    // Verificamos si la contraseña es correcta
    if (user.password !== password) {
        alert("Contraseña incorrecta.");
        return;
    }

    // Guardamos el usuario y su rol en localStorage para usarlo en el dashboard
    localStorage.setItem('loggedInUser', username);
    localStorage.setItem('loggedInUserRole', user.role);

    // Redirigir al dashboard
    if (user.role === 'admin') {
        window.location.href = "admin-dashboard.html";  // Dashboard con CRUD para admins
    } else {
        window.location.href = "dashboard.html";  // Dashboard normal para miembros
    }
}

// Inicializar administrador al cargar la página
initializeAdmin();
