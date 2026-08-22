document.addEventListener("DOMContentLoaded", function () {

    const contenedor = document.getElementById("products-container");

    // ==========================================
    // CARRITO
    // ==========================================

    let carrito = JSON.parse(localStorage.getItem("carritoAccesorizate")) || [];


    // ==========================================
    // GUARDAR CARRITO
    // ==========================================

    function guardarCarrito() {

        localStorage.setItem(
            "carritoAccesorizate",
            JSON.stringify(carrito)
        );

    }


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

                <div class="product-price">
                    ${
                        producto.precio > 0
                        ? "$" + producto.precio.toLocaleString("es-CL")
                        : "Consultar precio"
                    }
                </div>

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
    // AGREGAR AL CARRITO
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

            console.error("Producto no encontrado:", idProducto);

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


        guardarCarrito();

        actualizarCarrito();


        // Cambiar temporalmente el texto del botón

        const boton = evento.target;

        const textoOriginal = boton.textContent;

        boton.textContent = "✓ Agregado";

        setTimeout(function () {

            boton.textContent = textoOriginal;

        }, 1200);

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


        if (!contenedorCarrito) {
            return;
        }


        contenedorCarrito.innerHTML = "";


        // ======================================
        // CARRITO VACÍO
        // ======================================

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


        // ======================================
        // CALCULAR TOTAL
        // ======================================

        let total = 0;

        let cantidadTotal = 0;


        // ======================================
        // MOSTRAR PRODUCTOS
        // ======================================

        carrito.forEach(function (producto) {

            const precio =
                Number(producto.precio) || 0;

            const cantidad =
                Number(producto.cantidad) || 1;

            const subtotal =
                precio * cantidad;


            total += subtotal;

            cantidadTotal += cantidad;


            const elemento =
                document.createElement("div");


            elemento.className = "cart-item";


            elemento.innerHTML = `

                <h3>
                    ${producto.nombre}
                </h3>

                <p>
                    Precio:
                    ${
                        precio > 0
                        ? "$" + precio.toLocaleString("es-CL")
                        : "Consultar"
                    }
                </p>


                <div class="cart-controls">

                    <button
                        class="decrease"
                        data-id="${producto.id}">
                        −
                    </button>


                    <span class="cart-quantity">
                        ${cantidad}
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
                    Subtotal:
                    ${
                        precio > 0
                        ? "$" + subtotal.toLocaleString("es-CL")
                        : "Consultar"
                    }
                </p>

            `;


            contenedorCarrito.appendChild(elemento);

        });


        // ======================================
        // ACTUALIZAR CONTADOR
        // ======================================

        if (contador) {

            contador.textContent =
                cantidadTotal;

        }


        // ======================================
        // ACTUALIZAR TOTAL
        // ======================================

        if (totalElemento) {

            totalElemento.textContent =
                "$" + total.toLocaleString("es-CL");

        }

    }


    // ==========================================
    // BOTONES DEL CARRITO
    // ==========================================

    document.addEventListener("click", function (evento) {

        const id =
            evento.target.dataset.id;


        // ======================================
        // AUMENTAR
        // ======================================

        if (
            evento.target.classList.contains("increase")
        ) {

            const producto =
                carrito.find(function (p) {

                    return p.id === id;

                });


            if (producto) {

                producto.cantidad++;

            }


            guardarCarrito();

            actualizarCarrito();

        }


        // ======================================
        // DISMINUIR
        // ======================================

        if (
            evento.target.classList.contains("decrease")
        ) {

            const producto =
                carrito.find(function (p) {

                    return p.id === id;

                });


            if (producto) {

                producto.cantidad--;


                if (producto.cantidad <= 0) {

                    carrito =
                        carrito.filter(function (p) {

                            return p.id !== id;

                        });

                }

            }


            guardarCarrito();

            actualizarCarrito();

        }


        // ======================================
        // ELIMINAR
        // ======================================

        if (
            evento.target.classList.contains("remove")
        ) {

            carrito =
                carrito.filter(function (p) {

                    return p.id !== id;

                });


            guardarCarrito();

            actualizarCarrito();

        }

    });


    // ==========================================
    // VACIAR CARRITO
    // ==========================================

    document.addEventListener("click", function (evento) {

        if (
            evento.target.id !== "clear-cart"
        ) {
            return;
        }


        carrito = [];


        guardarCarrito();

        actualizarCarrito();

    });


    // ==========================================
    // CARGAR CARRITO AL INICIAR
    // ==========================================

    actualizarCarrito();


    // ==========================================
    // MENSAJE DE COMPROBACIÓN
    // ==========================================

    console.log(
        "AccesorizateSpA - tienda cargada correctamente"
    );

    console.log(
        "Productos disponibles:",
        productos.length
    );

});
