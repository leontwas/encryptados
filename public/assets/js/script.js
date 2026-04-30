const box = document.querySelector(".box");
const outerBox = document.querySelector(".outerBox");

let isDragging = false;
let isHovered = false;
let startX;
let currentRotation = 0;
let rotationVelocity = 0.5; // Velocidad del giro automático (grados por frame)

// Bucle de animación principal
function animate() {
    // Si no se está arrastrando y no hay hover, el carrusel gira solo
    if (!isDragging && !isHovered) {
        currentRotation += rotationVelocity;
        box.style.transform = `perspective(1000px) rotateY(${currentRotation}deg)`;
    }
    requestAnimationFrame(animate);
}

// Iniciar el bucle
animate();

// --- Eventos de Mouse ---

// Detectar Hover
outerBox.addEventListener("mouseenter", () => {
    isHovered = true;
});

outerBox.addEventListener("mouseleave", () => {
    isHovered = false;
    isDragging = false; // Por seguridad, si el mouse sale mientras arrastra
    outerBox.style.cursor = "grab";
});

// Al presionar el mouse
outerBox.addEventListener("mousedown", (e) => {
    isDragging = true;
    startX = e.clientX;
    outerBox.style.cursor = "grabbing";
});

// Al mover el mouse
window.addEventListener("mousemove", (e) => {
    if (!isDragging) return;

    // Calculamos el desplazamiento
    const deltaX = e.clientX - startX;
    
    // Aplicamos la rotación manual sumada a la actual
    // (Ajustamos currentRotation directamente para que al soltar siga desde ahí)
    currentRotation += deltaX * 0.2; // Sensibilidad del arrastre
    box.style.transform = `perspective(1000px) rotateY(${currentRotation}deg)`;
    
    // Actualizamos el punto de inicio para el siguiente movimiento
    startX = e.clientX;
});

// Al soltar el mouse
window.addEventListener("mouseup", () => {
    if (isDragging) {
        isDragging = false;
        outerBox.style.cursor = "grab";
    }
});

// Estilo inicial del cursor
outerBox.style.cursor = "grab";
