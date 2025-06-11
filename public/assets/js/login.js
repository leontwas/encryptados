// Controlar el evento de enviar el formulario
document.getElementById('loginForm').addEventListener('submit', async (event) => { 
    event.preventDefault();

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    const loginData = { username, password };

    try {
        const response = await fetch('/.netlify/functions/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(loginData),
        });

        if (!response.ok) {
            const errorData = await response.json();
            alert('Error: ' + (errorData.message || 'Error desconocido'));
            return;
        }

        const result = await response.json();
        localStorage.setItem('authToken', result.token);
        window.location.href = './administrador.html';
    } catch (error) {
        alert('Error de conexión al servidor.');
    }
});

// Agregar funcionalidad al checkbox "Mostrar Contraseña"
document.getElementById('visible').addEventListener('change', (event) => {
    const passwordInput = document.getElementById('password');
    if (event.target.checked) {
        passwordInput.type = 'text';
    } else {
        passwordInput.type = 'password';
    }
});


