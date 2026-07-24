import type { PresupuestoDetalle } from "../types/presupuestos-with-detail.interfaces";

export const PRESUPUESTOS_CON_DETALLE: PresupuestoDetalle[] = [
  {
    id: 1,
    titulo: "Pintura completa piso 3 habitaciones",
    descripcion:
      "Pintura completa de un piso de 80m² con 3 dormitorios, salón, cocina y 2 baños. Se incluye lijado, imprimación y dos manos de pintura plástica en paredes y techos. Algunas paredes tienen gotele que se eliminarán.",
    estado: "Borrador",
    subtotal: 3432,
    iva: 21,
    total: 4152.72,
    capitulos: [
      {
        id: 1,
        numero: 1,
        nombre: "PREPARACION DE PAREDES",
        detalles: [
          {
            id: 1,
            numero: 1,
            descripcion:
              "Eliminación de gotele en algunas paredes para asegurar una superficie lisa para la pintura.",
            cantidad: 20,
            unidad: "m2",
            precio_unitario: 16,
            subtotal: 320,
            generado_por_ia: true,
          },
          {
            id: 2,
            numero: 2,
            descripcion:
              "Lijado general de todas las paredes y techos para asegurar una superficie lisa para la pintura.",
            cantidad: 256,
            unidad: "m2",
            precio_unitario: 3,
            subtotal: 768,
            generado_por_ia: true,
          },
          {
            id: 3,
            numero: 3,
            descripcion:
              "Aplicación de plastecido o masilla en áreas necesarias para asegurar una superficie lisa.",
            cantidad: 10,
            unidad: "m2",
            precio_unitario: 4,
            subtotal: 40,
            generado_por_ia: true,
          },
          {
            id: 4,
            numero: 4,
            descripcion:
              "Aplicación de imprimación en todas las paredes y techos para asegurar una buena adherencia de la pintura.",
            cantidad: 256,
            unidad: "m2",
            precio_unitario: 2,
            subtotal: 512,
            generado_por_ia: true,
          },
        ],
      },
      {
        id: 2,
        numero: 2,
        nombre: "PINTURA DE PAREDES Y TECHOS",
        detalles: [
          {
            id: 5,
            numero: 1,
            descripcion:
              "Aplicación de 2 manos de pintura plástica en todas las paredes y techos.",
            cantidad: 256,
            unidad: "m2",
            precio_unitario: 7,
            subtotal: 1792,
            generado_por_ia: true,
          },
        ],
      },
    ],
  },
  {
    id: 2,
    titulo: "Reforma cocina piso Cádiz",
    descripcion:
      "Reforma de cocina de 12m² en piso antiguo, incluyendo eliminación de azulejos viejos de pared y suelo, instalación de nuevos porcelánicos, pintura del techo con humedades y cambio de encimera. Materiales de gama media.",
    estado: "Borrador",
    subtotal: 2440.4,
    iva: 21,
    total: 2952.88,
    capitulos: [
      {
        id: 3,
        numero: 1,
        nombre: "PREPARACION Y DEMOLICION",
        detalles: [
          {
            id: 6,
            numero: 1,
            descripcion:
              "Eliminación de azulejos viejos de suelo (12m²) y pared (perímetro 14m × altura 2.4m = 33.6m²). Incluye mano de obra y eliminación de residuos.",
            cantidad: 45.6,
            unidad: "m2",
            precio_unitario: 9.5,
            subtotal: 433.2,
            generado_por_ia: true,
          },
        ],
      },
      {
        id: 4,
        numero: 2,
        nombre: "SOLADOS Y REVESTIMIENTOS",
        detalles: [
          {
            id: 7,
            numero: 1,
            descripcion:
              "Solado cerámico suelo cocina 12m² (3m × 4m). Incluye material y adhesivo/mortero + mano de obra + nivelación.",
            cantidad: 12,
            unidad: "m2",
            precio_unitario: 35,
            subtotal: 420,
            generado_por_ia: true,
          },
          {
            id: 8,
            numero: 2,
            descripcion:
              "Alicatado porcelánico paredes cocina (perímetro 14m × altura 2.4m = 33.6m²). Incluye material, adhesivo y mano de obra.",
            cantidad: 33.6,
            unidad: "m2",
            precio_unitario: 12.5,
            subtotal: 420,
            generado_por_ia: true,
          },
        ],
      },
      {
        id: 5,
        numero: 3,
        nombre: "PINTURA",
        detalles: [
          {
            id: 9,
            numero: 1,
            descripcion:
              "Pintura plástica techo cocina 12m². Incluye imprimación y dos manos de pintura.",
            cantidad: 12,
            unidad: "m2",
            precio_unitario: 45,
            subtotal: 540,
            generado_por_ia: true,
          },
        ],
      },
      {
        id: 6,
        numero: 4,
        nombre: "ENCIMERA",
        detalles: [
          {
            id: 10,
            numero: 1,
            descripcion:
              "Suministro e instalación de encimera de cocina de 3m de largo. Incluye material y mano de obra.",
            cantidad: 1,
            unidad: "ud",
            precio_unitario: 627.2,
            subtotal: 627.2,
            generado_por_ia: true,
          },
        ],
      },
    ],
  },
  {
    id: 3,
    titulo:
      "Reforma integral de baño de 6m2. Demolición de alicatado y solado existente, nuevo alicatado hasta techo, solado antideslizante, sustitución de inodoro, lavamanos empotrado, plato de ducha de 80x80 con mampara fija, nueva instalación de fontanería y electricidad, pintura techo.",
    descripcion:
      "Descripción técnica con mediciones explícitas. Separación de solados y alicatados.",
    estado: "Borrador",
    subtotal: 3935,
    iva: 21,
    total: 4761.35,
    capitulos: [
      {
        id: 7,
        numero: 1,
        nombre: "SOLADOS Y REVESTIMIENTOS",
        detalles: [
          {
            id: 11,
            numero: 1,
            descripcion:
              "Solado cerámica suelo baño 6m² (2m × 3m). Incluye material y adhesivo/mortero + mano de obra + nivelación.",
            cantidad: 6,
            unidad: "m2",
            precio_unitario: 40,
            subtotal: 240,
            generado_por_ia: true,
          },
          {
            id: 12,
            numero: 2,
            descripcion:
              "Alicatado azulejo blanco 20×20cm paredes baño (perímetro 10m × altura 2.4m = 24m²). Incluye material, adhesivo y mano de obra.",
            cantidad: 24,
            unidad: "m2",
            precio_unitario: 45,
            subtotal: 1080,
            generado_por_ia: true,
          },
          {
            id: 13,
            numero: 3,
            descripcion:
              "Rodapié azulejo 10m coincidente con alicatado. Material + instalación.",
            cantidad: 10,
            unidad: "m",
            precio_unitario: 12,
            subtotal: 120,
            generado_por_ia: true,
          },
        ],
      },
      {
        id: 8,
        numero: 2,
        nombre: "SANITARIOS",
        detalles: [
          {
            id: 14,
            numero: 1,
            descripcion:
              "Suministro e instalación completa de inodoro cerámica con cisterna de doble descarga. Incluye conexión hidráulica y desagüe.",
            cantidad: 1,
            unidad: "ud",
            precio_unitario: 650,
            subtotal: 650,
            generado_por_ia: true,
          },
          {
            id: 15,
            numero: 2,
            descripcion:
              "Suministro e instalación de lavamanos cerámica 60cm con grifo monomando cromado. Incluye conexión agua fría/caliente y desagüe.",
            cantidad: 1,
            unidad: "ud",
            precio_unitario: 300,
            subtotal: 300,
            generado_por_ia: true,
          },
        ],
      },
      {
        id: 9,
        numero: 3,
        nombre: "PLATO DE DUCHA Y MAMPARA",
        detalles: [
          {
            id: 16,
            numero: 1,
            descripcion:
              "Suministro e instalación de plato de ducha 80x80 cm. Incluye material y mano de obra.",
            cantidad: 1,
            unidad: "ud",
            precio_unitario: 400,
            subtotal: 400,
            generado_por_ia: true,
          },
          {
            id: 17,
            numero: 2,
            descripcion:
              "Suministro e instalación de mampara fija para plato de ducha. Incluye material y mano de obra.",
            cantidad: 1,
            unidad: "ud",
            precio_unitario: 400,
            subtotal: 400,
            generado_por_ia: true,
          },
        ],
      },
      {
        id: 10,
        numero: 4,
        nombre: "FONTANERÍA Y ELECTRICIDAD",
        detalles: [
          {
            id: 18,
            numero: 1,
            descripcion:
              "Nueva instalación de fontanería para baño. Incluye materiales y mano de obra.",
            cantidad: 1,
            unidad: "ud",
            precio_unitario: 200,
            subtotal: 200,
            generado_por_ia: true,
          },
          {
            id: 19,
            numero: 2,
            descripcion:
              "Nueva instalación de electricidad para baño. Incluye materiales y mano de obra.",
            cantidad: 1,
            unidad: "ud",
            precio_unitario: 145,
            subtotal: 145,
            generado_por_ia: true,
          },
        ],
      },
      {
        id: 11,
        numero: 5,
        nombre: "PINTURA",
        detalles: [
          {
            id: 20,
            numero: 1,
            descripcion:
              "Pintura techo con pintura plástica de alta calidad. Incluye mano de obra y materiales.",
            cantidad: 1,
            unidad: "ud",
            precio_unitario: 400,
            subtotal: 400,
            generado_por_ia: true,
          },
        ],
      },
    ],
  },
  {
    id: 4,
    titulo:
      "Reforma integral de baño de 6m2. Demolición de alicatado y solado existente, nuevo alicatado hasta techo, solado antideslizante, sustitución de inodoro, lavamanos empotrado, plato de ducha de 80x80 con mampara fija, nueva instalación de fontanería y electricidad, pintura techo.",
    descripcion: "Reforma completa baño principal",
    estado: "Borrador",
    subtotal: 3935,
    iva: 21,
    total: 4761.35,
    capitulos: [
      {
        id: 12,
        numero: 1,
        nombre: "SOLADOS Y REVESTIMIENTOS",
        detalles: [
          {
            id: 21,
            numero: 1,
            descripcion:
              "Solado cerámica suelo baño 6m² (2m × 3m). Incluye material y adhesivo/mortero + mano de obra + nivelación.",
            cantidad: 6,
            unidad: "m2",
            precio_unitario: 40,
            subtotal: 240,
            generado_por_ia: true,
          },
          {
            id: 22,
            numero: 2,
            descripcion:
              "Alicatado azulejo blanco 20×20cm paredes baño (perímetro 10m × altura 2.4m = 24m²). Incluye material, adhesivo y mano de obra.",
            cantidad: 24,
            unidad: "m2",
            precio_unitario: 45,
            subtotal: 1080,
            generado_por_ia: true,
          },
          {
            id: 23,
            numero: 3,
            descripcion:
              "Rodapié azulejo 10m coincidente con alicatado. Material + instalación.",
            cantidad: 10,
            unidad: "m",
            precio_unitario: 12,
            subtotal: 120,
            generado_por_ia: true,
          },
        ],
      },
      {
        id: 13,
        numero: 2,
        nombre: "SANITARIOS",
        detalles: [
          {
            id: 24,
            numero: 1,
            descripcion:
              "Suministro e instalación completa de inodoro cerámica con cisterna de doble descarga. Incluye conexión hidráulica y desagüe.",
            cantidad: 1,
            unidad: "ud",
            precio_unitario: 650,
            subtotal: 650,
            generado_por_ia: true,
          },
          {
            id: 25,
            numero: 2,
            descripcion:
              "Suministro e instalación de lavamanos cerámica 60cm con grifo monomando cromado. Incluye conexión agua fría/caliente y desagüe.",
            cantidad: 1,
            unidad: "ud",
            precio_unitario: 300,
            subtotal: 300,
            generado_por_ia: true,
          },
        ],
      },
      {
        id: 14,
        numero: 3,
        nombre: "PLATO DE DUCHA Y MAMPARA",
        detalles: [
          {
            id: 26,
            numero: 1,
            descripcion:
              "Suministro e instalación de plato de ducha 80x80cm. Incluye material y mano de obra.",
            cantidad: 1,
            unidad: "ud",
            precio_unitario: 350,
            subtotal: 350,
            generado_por_ia: true,
          },
          {
            id: 27,
            numero: 2,
            descripcion:
              "Suministro e instalación de mampara fija para plato de ducha. Incluye material y mano de obra.",
            cantidad: 1,
            unidad: "ud",
            precio_unitario: 150,
            subtotal: 150,
            generado_por_ia: true,
          },
        ],
      },
      {
        id: 15,
        numero: 4,
        nombre: "FONTANERÍA Y ELECTRICIDAD",
        detalles: [
          {
            id: 28,
            numero: 1,
            descripcion:
              "Nueva instalación de fontanería para baño. Incluye material y mano de obra.",
            cantidad: 1,
            unidad: "ud",
            precio_unitario: 300,
            subtotal: 300,
            generado_por_ia: true,
          },
          {
            id: 29,
            numero: 2,
            descripcion:
              "Nueva instalación de electricidad para baño. Incluye material y mano de obra.",
            cantidad: 1,
            unidad: "ud",
            precio_unitario: 245,
            subtotal: 245,
            generado_por_ia: true,
          },
        ],
      },
      {
        id: 16,
        numero: 5,
        nombre: "PINTURA",
        detalles: [
          {
            id: 30,
            numero: 1,
            descripcion: "Pintura techo baño. Incluye material y mano de obra.",
            cantidad: 1,
            unidad: "ud",
            precio_unitario: 500,
            subtotal: 500,
            generado_por_ia: true,
          },
        ],
      },
    ],
  },
  {
    id: 5,
    titulo: "Reforma completa baño principal",
    descripcion:
      "Reforma integral de baño de 6m2. Demolición de alicatado y solado existente, nuevo alicatado hasta techo, solado antideslizante, sustitución de inodoro, lavamanos empotrado, plato de ducha de 80x80 con mampara fija, nueva instalación de fontanería y electricidad, pintura techo.",
    estado: "Borrador",
    subtotal: 4190,
    iva: 21,
    total: 5069.9,
    capitulos: [
      {
        id: 17,
        numero: 1,
        nombre: "SOLADOS Y REVESTIMIENTOS",
        detalles: [
          {
            id: 31,
            numero: 1,
            descripcion:
              "Solado cerámica suelo baño 6m² (2m × 3m). Incluye material y adhesivo/mortero + mano de obra + nivelación.",
            cantidad: 6,
            unidad: "m2",
            precio_unitario: 40,
            subtotal: 240,
            generado_por_ia: true,
          },
          {
            id: 32,
            numero: 2,
            descripcion:
              "Alicatado azulejo blanco 20×20cm paredes baño (perímetro 10m × altura 2.4m = 24m²). Incluye material, adhesivo y mano de obra.",
            cantidad: 24,
            unidad: "m2",
            precio_unitario: 45,
            subtotal: 1080,
            generado_por_ia: true,
          },
          {
            id: 33,
            numero: 3,
            descripcion:
              "Rodapié azulejo 10m coincidente con alicatado. Material + instalación.",
            cantidad: 10,
            unidad: "m",
            precio_unitario: 12,
            subtotal: 120,
            generado_por_ia: true,
          },
        ],
      },
      {
        id: 18,
        numero: 2,
        nombre: "SANITARIOS",
        detalles: [
          {
            id: 34,
            numero: 1,
            descripcion:
              "Suministro e instalación completa de inodoro cerámica con cisterna de doble descarga. Incluye conexión hidráulica y desagüe.",
            cantidad: 1,
            unidad: "ud",
            precio_unitario: 650,
            subtotal: 650,
            generado_por_ia: true,
          },
          {
            id: 35,
            numero: 2,
            descripcion:
              "Suministro e instalación de lavamanos cerámica 60cm con grifo monomando cromado. Incluye conexión agua fría/caliente y desagüe.",
            cantidad: 1,
            unidad: "ud",
            precio_unitario: 300,
            subtotal: 300,
            generado_por_ia: true,
          },
        ],
      },
      {
        id: 19,
        numero: 3,
        nombre: "PLATO DE DUCHA Y MAMPARA",
        detalles: [
          {
            id: 36,
            numero: 1,
            descripcion:
              "Suministro e instalación de plato de ducha 80x80. Incluye material y mano de obra.",
            cantidad: 1,
            unidad: "ud",
            precio_unitario: 400,
            subtotal: 400,
            generado_por_ia: true,
          },
          {
            id: 37,
            numero: 2,
            descripcion:
              "Suministro e instalación de mampara fija para plato de ducha. Incluye material y mano de obra.",
            cantidad: 1,
            unidad: "ud",
            precio_unitario: 400,
            subtotal: 400,
            generado_por_ia: true,
          },
        ],
      },
      {
        id: 20,
        numero: 4,
        nombre: "FONTANERÍA Y ELECTRICIDAD",
        detalles: [
          {
            id: 38,
            numero: 1,
            descripcion:
              "Nueva instalación de fontanería para baño. Incluye materiales y mano de obra.",
            cantidad: 1,
            unidad: "ud",
            precio_unitario: 250,
            subtotal: 250,
            generado_por_ia: true,
          },
          {
            id: 39,
            numero: 2,
            descripcion:
              "Nueva instalación de electricidad para baño. Incluye materiales y mano de obra.",
            cantidad: 1,
            unidad: "ud",
            precio_unitario: 250,
            subtotal: 250,
            generado_por_ia: true,
          },
        ],
      },
      {
        id: 21,
        numero: 5,
        nombre: "PINTURA",
        detalles: [
          {
            id: 40,
            numero: 1,
            descripcion:
              "Pintura techo con pintura plástica de alta calidad. Incluye material y mano de obra.",
            cantidad: 1,
            unidad: "ud",
            precio_unitario: 500,
            subtotal: 500,
            generado_por_ia: true,
          },
        ],
      },
    ],
  },
];
