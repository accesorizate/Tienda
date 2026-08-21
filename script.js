document.addEventListener("DOMContentLoaded", function () {

    const contenedor = document.getElementById("products-container");

    // Comprobamos que exista el contenedor
    if (!contenedor) {
        console.error("No se encontró el contenedor de productos.");
        return;
    }

    // Limpiamos las categorías que estaban escritas manualmente
    contenedor.innerHTML = "";

    // Creamos cada producto automáticamente
    productos.forEach(function (producto) {

        const tarjeta = document.createElement("div");

        tarjeta.className = "category";

        tarjeta.innerHTML = `
            <div class="category-icon">
                📦
            </div>

            <h3>${producto.nombre}</h3>

            <p>${producto.descripcion}</p>

            <button
                class="add-to-cart"
                data-id="${producto.id}">
                Agregar al carrito
            </button>
        `;

        contenedor.appendChild(tarjeta);

    });

});
