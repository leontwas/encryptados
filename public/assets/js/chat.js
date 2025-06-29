function agregarAlChat(texto, quien) {
  const chat = document.getElementById('chat-box');
  const div = document.createElement('div');
  div.innerHTML = `<strong>${quien === 'user' ? '🧑 Vos' : '🤖 Bot'}:</strong> ${texto}`;
  chat.appendChild(div);
  chat.scrollTop = chat.scrollHeight;
}

function enviarMensaje() {
  const input = document.getElementById('input');
  const mensaje = input.value.trim();
  if (!mensaje) return;

  agregarAlChat(mensaje, 'user');
  input.value = '';

  fetch('/api/chatbot', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ mensaje })
  })
    .then(res => res.json())
    .then(data => {
      agregarAlChat(data.respuesta || 'No hubo respuesta.', 'bot');
    })
    .catch(err => {
      console.error(err);
      agregarAlChat('❌ Error al conectar con la IA.', 'bot');
    });
}

// 🔹 Funciones para mostrar/ocultar/minimizar el chat
document.addEventListener('DOMContentLoaded', () => {
  const chatContainer = document.getElementById('chat-container');
  const abrirChat = document.getElementById('abrir-chat');
  const minimizarBtn = document.getElementById('minimizar');
  const maximizarBtn = document.getElementById('maximizar');
  const cerrarBtn = document.getElementById('cerrar');
  const chatBox = document.getElementById('chat-box');
  const chatInput = document.querySelector('.chat-input-group');

  abrirChat.addEventListener('click', (e) => {
    e.preventDefault();
    chatContainer.style.display = 'block';
    chatBox.style.display = 'block';
    chatInput.style.display = 'flex';
  });

  minimizarBtn.addEventListener('click', () => {
    chatBox.style.display = 'none';
    chatInput.style.display = 'none';
  });

  maximizarBtn.addEventListener('click', () => {
    chatBox.style.display = 'block';
    chatInput.style.display = 'flex';
  });

  cerrarBtn.addEventListener('click', () => {
    chatContainer.style.display = 'none';
  });
});

    const chatContainer = document.getElementById('chat-container');
    const abrirChat = document.getElementById('abrir-chat');
    const minimizarBtn = document.getElementById('minimizar');
    const maximizarBtn = document.getElementById('maximizar');
    const cerrarBtn = document.getElementById('cerrar');
    const chatBox = document.getElementById('chat-box');
    const chatInput = document.querySelector('.chat-input-group');

    abrirChat.addEventListener('click', (e) => {
      e.preventDefault();
      chatContainer.style.display = 'block';
      chatBox.style.display = 'block';
      chatInput.style.display = 'flex';
    });

    minimizarBtn.addEventListener('click', () => {
      chatBox.style.display = 'none';
      chatInput.style.display = 'none';
    });

    maximizarBtn.addEventListener('click', () => {
      chatBox.style.display = 'block';
      chatInput.style.display = 'flex';
    });

    cerrarBtn.addEventListener('click', () => {
      chatContainer.style.display = 'none';
    });