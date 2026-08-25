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
        class="view-product"
        data-id="${producto.id}">
        Ver detalles
    </button>

`;

            contenedor.appendChild(tarjeta);

        });

    }

// ==========================================
// VENTANA DE DETALLES DEL PRODUCTO
// ==========================================

document.addEventListener("click", function (evento) {

    if (!evento.target.classList.contains("view-product")) {
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

    const ventana = document.createElement("div");

    ventana.className = "product-modal";

    ventana.innerHTML = `

        <div class="product-modal-content">

            <button class="close-product-modal">
                ✕
            </button>

            <h2>
                ${producto.nombre}
            </h2>

            <p>
                ${producto.descripcion}
            </p>
${producto.opciones?.tipoDiseno ? `
    
    <label for="tipo-diseno">
        🎨 Tipo de diseño
    </label>

    <select id="tipo-diseno">

        <option value="">
            Selecciona un diseño
        </option>

        <option value="Cumpleaños">
            Cumpleaños
        </option>

        <option value="Aniversario">
            Aniversario
        </option>

        <option value="Día de la madre">
            Día de la madre
        </option>

        <option value="Día del padre">
            Día del padre
        </option>

        <option value="Graduación">
            Graduación
        </option>

        <option value="Nacimiento">
            Nacimiento
        </option>

        <option value="Navidad">
            Navidad
        </option>

        <option value="Spotify">
            Spotify
        </option>

        <option value="Otro">
            Otro
        </option>

    </select>

` : ""}


${producto.opciones?.textoPersonalizado ? `

    <label for="texto-personalizado">
        ✏️ Texto personalizado
    </label>

    <input
        type="text"
        id="texto-personalizado"
        placeholder="Escribe el texto que quieres incluir..."
    >

` : ""}


${producto.opciones?.observaciones ? `

    <label for="product-notes">
        📝 Observaciones
    </label>

    <textarea
        id="product-notes"
        placeholder="Indica cualquier detalle adicional..."
    ></textarea>

` : ""}


            <div class="product-price">

                ${
                    producto.precio > 0
                    ? "$" + producto.precio.toLocaleString("es-CL")
                    : "Consultar precio"
                }

            </div>

            <label>
                Cantidad
            </label>

            <div class="quantity-selector">

                <button
                    class="modal-decrease">
                    −
                </button>

                <span id="modal-quantity">
                    1
                </span>

                <button
                    class="modal-increase">
                    +
                </button>

            </div>


            <button
                class="modal-add-cart"
                data-id="${producto.id}">

                🛒 Agregar al carrito

            </button>

        </div>

    `;

    document.body.appendChild(ventana);

});

// ==========================================
// FUNCIONES DE LA VENTANA DE PRODUCTO
// ==========================================

document.addEventListener("click", function (evento) {

    // ------------------------------------------
    // CERRAR VENTANA
    // ------------------------------------------

    if (
        evento.target.classList.contains(
            "close-product-modal"
        )
    ) {

        const ventana =
            document.querySelector(".product-modal");

        if (ventana) {
            ventana.remove();
        }

        return;
    }


    // ------------------------------------------
    // AUMENTAR CANTIDAD
    // ------------------------------------------

    if (
        evento.target.classList.contains(
            "modal-increase"
        )
    ) {

        const cantidad =
            document.getElementById(
                "modal-quantity"
            );

        if (cantidad) {

            let valor =
                parseInt(cantidad.textContent);

            valor++;

            cantidad.textContent = valor;

        }

        return;
    }


    // ------------------------------------------
    // DISMINUIR CANTIDAD
    // ------------------------------------------

    if (
        evento.target.classList.contains(
            "modal-decrease"
        )
    ) {

        const cantidad =
            document.getElementById(
                "modal-quantity"
            );

        if (cantidad) {

            let valor =
                parseInt(cantidad.textContent);

            if (valor > 1) {

                valor--;

                cantidad.textContent = valor;

            }

        }

        return;
    }


    // ------------------------------------------
    // AGREGAR PRODUCTO DESDE LA VENTANA
    // ------------------------------------------

    if (
        evento.target.classList.contains(
            "modal-add-cart"
        )
    ) {

        const idProducto =
            evento.target.dataset.id;


        const producto =
            productos.find(function (p) {

                return p.id === idProducto;

            });


        if (!producto) {

            console.error(
                "Producto no encontrado."
            );

            return;

        }


        const cantidadElemento =
            document.getElementById(
                "modal-quantity"
            );


        const notasElemento =
            document.getElementById(
                "product-notes"
            );

        const tipoDisenoElemento =
            document.getElementById(
               "tipo-diseno"
    );

       const textoPersonalizadoElemento =
           document.getElementById(
              "texto-personalizado"
    );
        
        const cantidad =
            cantidadElemento
            ? parseInt(
                cantidadElemento.textContent
            )
            : 1;


        const notas =
            notasElemento
            ? notasElemento.value.trim()
            : "";

        const tipoDiseno =
    tipoDisenoElemento
    ? tipoDisenoElemento.value
    : "";

const textoPersonalizado =
    textoPersonalizadoElemento
    ? textoPersonalizadoElemento.value.trim()
    : "";


        // --------------------------------------
        // BUSCAR PRODUCTO EXISTENTE
        // --------------------------------------

        const productoExistente =
            carrito.find(function (p) {

                return p.id === idProducto;

            });


if (productoExistente) {

    productoExistente.cantidad += cantidad;


    // --------------------------------------
    // ACTUALIZAR OBSERVACIÓN
    // --------------------------------------

    if (notas) {

        productoExistente.observacion =
            productoExistente.observacion
            ? productoExistente.observacion +
              " | " +
              notas
            : notas;

    }


    // --------------------------------------
    // ACTUALIZAR TIPO DE DISEÑO
    // --------------------------------------

    if (tipoDiseno) {

        productoExistente.tipoDiseno =
            tipoDiseno;

    }


    // --------------------------------------
    // ACTUALIZAR TEXTO PERSONALIZADO
    // --------------------------------------

    if (textoPersonalizado) {

        productoExistente.textoPersonalizado =
            textoPersonalizado;

    }


} else {

    carrito.push({

        ...producto,

        cantidad: cantidad,

        observacion: notas,

        tipoDiseno: tipoDiseno,

        textoPersonalizado: textoPersonalizado

    });

}

        // --------------------------------------
        // GUARDAR Y ACTUALIZAR
        // --------------------------------------

        guardarCarrito();

        actualizarCarrito();


        // --------------------------------------
        // CERRAR VENTANA
        // --------------------------------------

        const ventana =
            document.querySelector(
                ".product-modal"
            );


        if (ventana) {

            ventana.remove();

        }


        // --------------------------------------
        // AVISO
        // --------------------------------------

        alert(
            "Producto agregado al carrito ✓"
        );

    }

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
// FINALIZAR PEDIDO POR WHATSAPP
// ==========================================

document.addEventListener("click", function (evento) {

    if (evento.target.id !== "checkout-button") {
        return;
    }

    // Comprobar si el carrito está vacío

    if (carrito.length === 0) {

        alert("Tu carrito está vacío.");

        return;
    }


    // Número de WhatsApp de AccesorizateSpA

    const numeroWhatsApp = "56920635715";


    // Crear mensaje

    let mensaje =
        "Hola, AccesorizateSpA 👋\n\n" +
        "Quiero realizar el siguiente pedido:\n\n";


    let total = 0;


    carrito.forEach(function (producto) {

        const precio =
            Number(producto.precio) || 0;

        const cantidad =
            Number(producto.cantidad) || 1;

        const subtotal =
            precio * cantidad;


        total += subtotal;


        mensaje +=
            "📦 " +
            producto.nombre +
            " × " +
            cantidad +
            " — $" +
            subtotal.toLocaleString("es-CL") +
            "\n";

if (producto.tipoDiseno) {

    mensaje +=
        "🎨 Diseño: " +
        producto.tipoDiseno +
        "\n";

}


if (producto.textoPersonalizado) {

    mensaje +=
        "✏️ Texto para el diseño: " +
        producto.textoPersonalizado +
        "\n";

}


if (producto.observacion) {

    mensaje +=
        "📝 Observación: " +
        producto.observacion +
        "\n";

}
        
    });


    mensaje +=
        "\n💰 Total: $" +
        total.toLocaleString("es-CL") +
        "\n\n";


    mensaje +=
        "Quedo atento/a para confirmar mi pedido. 😊";


    // Convertir el mensaje para utilizarlo en una URL

    const mensajeCodificado =
        encodeURIComponent(mensaje);


    // Crear enlace de WhatsApp

    const enlaceWhatsApp =
        "https://wa.me/" +
        numeroWhatsApp +
        "?text=" +
        mensajeCodificado;


    // Abrir WhatsApp

    window.open(
        enlaceWhatsApp,
        "_blank"
    );

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
