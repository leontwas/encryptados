document.addEventListener("DOMContentLoaded", function () {
  const searchInput = document.querySelector(".form-control");
  const searchButton = document.querySelector(".btn-outline-success");

  function normalizar(texto) {
    return texto
      .toLowerCase()
      .normalize("NFD") // elimina acentos
      .replace(/[\u0300-\u036f]/g, "");
  }

  searchButton.addEventListener("click", function (event) {
    event.preventDefault();
    const searchTerm = normalizar(searchInput.value.trim());

    const cards = document.querySelectorAll("#product-list .article");

    cards.forEach(card => {
      const nombre = normalizar(card.querySelector(".texto-negro1")?.textContent || "");
      const descripcion = normalizar(card.querySelector(".texto-negro2")?.textContent || "");

      // Coincidencia exacta de palabra
      const regex = new RegExp(`\\b${searchTerm}\\b`, "i");

      if (regex.test(nombre) || regex.test(descripcion)) {
        card.parentElement.style.display = "block";
      } else {
        card.parentElement.style.display = "none";
      }
    });
  });
});
