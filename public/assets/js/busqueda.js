document.addEventListener("DOMContentLoaded", function () {
    const searchInput = document.querySelector(".form-control");
    const searchButton = document.querySelector(".btn-outline-success");

    // Eliminar resaltados cuando el input se da clic
    searchInput.addEventListener("click", function () {
        removeHighlights(); // Quita los resaltados previos
    });

    // Cuando el botón de búsqueda se da clic
    searchButton.addEventListener("click", function (event) {
        event.preventDefault(); // Evita que el formulario recargue la página
        const searchTerm = searchInput.value.trim();
        if (searchTerm !== "") {
            highlightText(searchTerm); // Resalta el texto
            moveCursorToFirstMatch();   // Mueve el cursor a la primera coincidencia
        }
    });
});

function highlightText(word) {
    removeHighlights(); // Elimina los resaltados previos
    const elements = document.body.querySelectorAll("*:not(script):not(style):not(.logo-crisal)");

    elements.forEach(element => {
        if (!isExcluded(element)) {
            element.childNodes.forEach(node => {
                if (node.nodeType === Node.TEXT_NODE) {
                    const regex = new RegExp(`(${word})`, "gi");
                    let match;
                    let newText = node.nodeValue;

                    // Reemplazamos todas las coincidencias con <span> resaltado
                    while ((match = regex.exec(node.nodeValue)) !== null) {
                        newText = newText.replace(match[0], `<span class="highlight">${match[0]}</span>`);
                    }

                    if (newText !== node.nodeValue) {
                        const tempDiv = document.createElement("div");
                        tempDiv.innerHTML = newText;
                        while (tempDiv.firstChild) {
                            element.insertBefore(tempDiv.firstChild, node);
                        }
                        element.removeChild(node);
                    }
                }
            });
        }
    });
}

function isExcluded(element) {
    return document.querySelector(".carousel")?.contains(element) || false;
}

function removeHighlights() {
    document.querySelectorAll(".highlight").forEach(el => {
        el.replaceWith(document.createTextNode(el.textContent)); // Remueve el resaltado, pero mantiene el texto
    });
}

function moveCursorToFirstMatch() {
    const firstHighlight = document.querySelector(".highlight");
    if (firstHighlight) {
        firstHighlight.scrollIntoView({ behavior: "smooth", block: "center" }); // Desplaza la página para ver la coincidencia

        // Mueve el cursor a la primera coincidencia encontrada
        const range = document.createRange();
        const selection = window.getSelection();
        range.selectNodeContents(firstHighlight);
        selection.removeAllRanges();
        selection.addRange(range);
    }
}

