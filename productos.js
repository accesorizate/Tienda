const productos = [

    {
        id: "album-fotografico",
        nombre: "Álbum fotográfico",
        categoria: "albumes",
        descripcion: "Álbum fotográfico personalizado para guardar tus mejores recuerdos.",
        precio: 19950,
        imagen: "",
        personalizable: true
    },

 {
    id: "foto-polaroid",
    nombre: "Foto Polaroid",
    categoria: "fotografias",
    descripcion: "Fotos Polaroid personalizadas.",
    precio: 1990,
    imagen: "",
    personalizable: true,

    opciones: {
        medidas: [
            "5 × 8 cm"
        ],

        acabados: {

            "Normal": [
                {
                    cantidad: 10,
                    precio: 1990
                },
                {
                    cantidad: 35,
                    precio: 5990
                },
                {
                    cantidad: 50,
                    precio: 7990
                },
                {
                    cantidad: 100,
                    precio: 11990
                }
            ],

            "Laminada": [
                {
                    cantidad: 25,
                    precio: 5990
                },
                {
                    cantidad: 50,
                    precio: 9990
                },
                {
                    cantidad: 100,
                    precio: 16950
                }
            ],

            "Plastificada + imantada": [
                {
                    cantidad: 20,
                    precio: 6990
                },
                {
                    cantidad: 60,
                    precio: 19800
                },
                {
                    cantidad: 100,
                    precio: 26990
                }
            ]

        },

        observaciones: true
    }
},

    {
        id: "cuadro-21x29",
        nombre: "Cuadro personalizado 21 × 29 cm",
        categoria: "cuadros",
        descripcion: "Cuadro personalizado en formato 21 × 29 cm.",
        precio: 9990,
        imagen: "",
        personalizable: true,

opciones: {
    tipoDiseno: true,
    textoPersonalizado: true,
    observaciones: true
}
    },

    {
        id: "cuadro-33x48",
        nombre: "Cuadro personalizado 33 × 48 cm",
        categoria: "cuadros",
        descripcion: "Cuadro personalizado en formato 33 × 48 cm.",
        precio: 100,
        imagen: "",
        personalizable: true,
            
opciones: {
    tipoDiseno: true,
    textoPersonalizado: true,
    observaciones: true
}
    },

    {
        id: "poster-21x29",
        nombre: "Póster 21 × 29 cm",
        categoria: "posters",
        descripcion: "Póster personalizado en formato 21 × 29 cm.",
        precio: 1000,
        imagen: "",
        personalizable: true
    },

    {
        id: "poster-29x42",
        nombre: "Póster 29 × 42 cm",
        categoria: "posters",
        descripcion: "Póster personalizado en formato 29 × 42 cm.",
        precio: 1500,
        imagen: "",
        personalizable: true
    },

    {
        id: "tarjetas-presentacion",
        nombre: "Tarjetas de presentación 9 × 5,5 cm",
        categoria: "tarjetas",
        descripcion: "Tarjetas de presentación personalizadas de 9 × 5,5 cm.",
        precio: 100,
        imagen: "",
        personalizable: true
    },

    {
        id: "stickers",
        nombre: "Stickers personalizados",
        categoria: "stickers",
        descripcion: "Stickers personalizados disponibles en diferentes cantidades.",
        precio: 100,
        imagen: "",
        personalizable: true,
        cantidades: [10, 20, 30, 50, 100]
    }

];
