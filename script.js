document.addEventListener("DOMContentLoaded", function () {

    const contenedor = document.getElementById("products-container");

    let carrito = [];

    // ==========================================
    // GENERAR PRODUCTOS
    // ==========================================

    if (contenedor) {

        contenedor.innerHTML = "";

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

    }


    // ==========================================
    // AGREGAR PRODUCTOS AL CARRITO
    // ==========================================

    document.addEventListener("click", function (evento) {

        if (!evento.target.classList.contains("add-to-cart")) {
            return;
        }

        const idProducto = evento.target.dataset.id;

        const producto = productos.find(function (p) {
            return p.id === idProducto;
        });

        if (!producto) {
            console.error("Producto no encontrado.");
            return;
        }

        const productoExistente = carrito.find(function (p) {
            return p.id === idProducto;
        });

        if (productoExistente) {

            productoExistente.cantidad++;

        } else {

            carrito.push({
                ...producto,
                cantidad: 1
            });

        }

        actualizarCarrito();

    });


    // ==========================================
    // ACTUALIZAR CARRITO
    // ==========================================

    function actualizarCarrito() {

        const contenedorCarrito =
            document.getElementById("cart-items");

        const contador =
            document.getElementById("cart-count");

        const totalElemento =
            document.getElementById("cart-total");


        if (!contenedorCarrito) return;


        contenedorCarrito.innerHTML = "";


        if (carrito.length === 0) {

            contenedorCarrito.innerHTML = `
                <p id="empty-cart">
                    Tu carrito está vacío.
                </p>
            `;

            if (contador) {
                contador.textContent = "0";
            }

            if (totalElemento) {
                totalElemento.textContent = "$0";
            }

            return;
        }


        let total = 0;
        let cantidadTotal = 0;


        carrito.forEach(function (producto) {

            const subtotal =
                producto.precio * producto.cantidad;

            total += subtotal;

            cantidadTotal += producto.cantidad;


            const elemento = document.createElement("div");

            elemento.className = "cart-item";

            elemento.innerHTML = `

                <h3>
                    ${producto.nombre}
                </h3>

                <p>
                    Precio: $${producto.precio}
                </p>

                <div>

                    <button
                        class="decrease"
                        data-id="${producto.id}">
                        −
                    </button>

                    <span>
                        ${producto.cantidad}
                    </span>

                    <button
                        class="increase"
                        data-id="${producto.id}">
                        +
                    </button>

                    <button
                        class="remove"
                        data-id="${producto.id}">
                        🗑️
                    </button>

                </div>

                <p>
                    Subtotal: $${subtotal}
                </p>

            `;

            contenedorCarrito.appendChild(elemento);

        });


        if (contador) {
            contador.textContent = cantidadTotal;
        }

        if (totalElemento) {
            totalElemento.textContent =
                "$" + total.toLocaleString("es-CL");
        }

    }


    // ==========================================
    // BOTONES DEL CARRITO
    // ==========================================

    document.addEventListener("click", function (evento) {

        const id = evento.target.dataset.id;


        // AUMENTAR
        if (evento.target.classList.contains("increase")) {

            const producto = carrito.find(function (p) {
                return p.id === id;
            });

            if (producto) {
                producto.cantidad++;
            }

            actualizarCarrito();
        }


        // DISMINUIR
        if (evento.target.classList.contains("decrease")) {

            const producto = carrito.find(function (p) {
                return p.id === id;
            });

            if (producto) {

                producto.cantidad--;

                if (producto.cantidad <= 0) {

                    carrito = carrito.filter(function (p) {
                        return p.id !== id;
                    });

                }

            }

            actualizarCarrito();
        }


        // ELIMINAR
        if (evento.target.classList.contains("remove")) {

            carrito = carrito.filter(function (p) {
                return p.id !== id;
            });

            actualizarCarrito();
        }

    });


    console.log(
        "AccesorizateSpA - tienda cargada correctamente"
    );

});
