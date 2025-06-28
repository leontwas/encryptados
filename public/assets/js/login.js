// Manejar el evento de registro de nuevo usuario
document.getElementById('registerForm').addEventListener('submit', async (event) => {
    event.preventDefault();

    const nombre_usuario = document.getElementById('usernameRegister').value;
    const email = document.getElementById('emailRegister').value;
    const pass = document.getElementById('passwordRegister').value;

    const userData = { nombre_usuario, email, pass };

    try {
        const response = await fetch('/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(userData),
        });

        const result = await response.json();

        if (!response.ok) {
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: result.message || 'Error al crear usuario',
                confirmButtonColor: '#d33'
            });
            return;
        }

        Swal.fire({
            icon: 'success',
            title: '¡Éxito!',
            text: 'Usuario creado con éxito',
            confirmButtonColor: '#3085d6'
        });

        console.log(result);

    } catch (error) {
        Swal.fire({
            icon: 'error',
            title: 'Error de conexión',
            text: 'No se pudo conectar con el servidor.',
            confirmButtonColor: '#d33'
        });
        console.error('Error:', error);
    }
});
