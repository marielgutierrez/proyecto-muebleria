// Catálogo de productos Hermanos Jota
// Simulación de API / Colección de datos
const featuredProducts = [
    {
        id: 1,
        name: "Sillón Copacabana",
        category: "Living",
        material: "Cuero curtido vegetal, acero pintado",
        price: 185000,
        measurements: "90 × 85 × 95 cm",
        image: "images/products/sillon-copacabana.png",
        description: "Sillón lounge en cuero cognac con base giratoria en acero Burnt Sienna, inspirado en la estética brasilera moderna de los 60.",
        manufacturing: "Fabricado íntegramente a mano en nuestra Casa Taller de San Cristóbal. La base se compone de tubos de acero laminado en caliente curvados con matriz de precisión y soldados mediante proceso TIG con terminaciones esmeriladas. El tapizado se realiza en cuero vacuno argentino de flor entera seleccionado, curtido 100% al vegetal con taninos de quebracho y mimosa sin cromo. El relleno combina espuma de poliuretano de alta resiliencia (35 kg/m³) y una capa superior de vellón siliconado para un apoyo ergonómico inigualable.",
        specs: {
            "Dimensiones": "90 cm ancho × 85 cm profundidad × 95 cm alto",
            "Estructura": "Acero tubular de 2 mm con base giratoria continua de 4 radios",
            "Tapicería": "Cuero vacuno flor entera de curtido vegetal natural (color cognac)",
            "Acabado": "Pintura electrostática en polvo horneada tono Burnt Sienna mate",
            "Origen": "Taller Hermanos Jota · San Cristóbal, Buenos Aires",
            "Garantía": "10 años en estructura metálica / 5 años en tapicería (Programa Herencia Viva)"
        },
        highlights: [
            "Cuero vacuno curtido vegetal que envejece desarrollando una pátina única",
            "Mecanismo de giro suave 360° con rulemanes blindados silenciosos",
            "Acabados libres de cromo y metales pesados",
            "Diseño atemporal con confort ergonómico envolvente"
        ]
    },
    {
        id: 2,
        name: "Biblioteca Recoleta",
        category: "Almacenamiento",
        material: "Estructura de acero, estantes de roble",
        price: 232000,
        measurements: "100 × 35 × 200 cm",
        image: "images/products/biblioteca-recoleta.png",
        description: "Sistema modular de estantes abierto con estructura Sage Green y repisas en roble claro, ideal para colecciones y objetos de diseño.",
        manufacturing: "Construida bajo los estándares del diseño racionalista de mediados de siglo. Cada estante está compuesto por madera maciza de roble blanco argentino alistonado de 25 mm de espesor, estabilizada en cámara de secado para evitar torsiones. La estructura metálica vertical de esbeltos perfiles rectangulares se ensambla con soldadura invisible pulida a mano y terminación de laca horneada en tono Sage Green. Incluye niveladores de latón macizo para una perfecta estabilidad sobre cualquier superficie.",
        specs: {
            "Dimensiones": "100 cm ancho × 35 cm profundidad × 200 cm alto",
            "Estructura": "Perfiles de acero macizo con fijación oculta y escuadras de refuerzo",
            "Estantes": "Roble claro macizo certificado FSC® de 25 mm de espesor",
            "Acabado": "Hidrolaca poliuretánica al agua de bajo COV y esmalte microtexturado Sage Green",
            "Origen": "Taller Hermanos Jota · San Cristóbal, Buenos Aires",
            "Garantía": "10 años en ensamble y estructura (Programa Herencia Viva)"
        },
        highlights: [
            "Madera de roble con certificación forestal responsable FSC®",
            "Capacidad de carga probada de hasta 45 kg por estante",
            "Acabados al agua no tóxicos de bajísima emisión (cero COV)",
            "Pies de apoyo regulables en latón con protección para suelos delicados"
        ]
    },
    {
        id: 3,
        name: "Aparador Uspallata",
        category: "Almacenamiento",
        material: "Nogal macizo FSC®, herrajes de latón",
        price: 210000,
        measurements: "180 × 45 × 75 cm",
        image: "images/products/aparador-uspallata.png",
        description: "Aparador de seis puertas fabricado en nogal sostenible con tiradores metálicos en acabado latón y silueta minimalista.",
        manufacturing: "Obra culmen de nuestra carpintería de banco. El frente de seis puertas presenta un corte a veta continua seleccionada pieza por pieza para asegurar armonía cromática y textural en todo su ancho. Las uniones de la carcasa están resueltas mediante caja y espiga en inglete a 45 grados, brindando una resistencia estructural para toda la vida. Las puertas montan bisagras alemanas ocultas con freno amortiguado (soft-close), y los tiradores cilíndricos son torneados individualmente en latón macizo cepillado.",
        specs: {
            "Dimensiones": "180 cm ancho × 45 cm profundidad × 75 cm alto",
            "Cuerpo y Puertas": "Nogal macizo seleccionado con certificación de trazabilidad FSC®",
            "Herrajes": "Bisagras ocultas soft-close y tiradores torneados en latón macizo satinado",
            "Interior": "3 divisiones internas con repisas regulables y pasacables posteriores",
            "Acabado": "3 manos de aceite de lino puro y cera de carnauba aplicadas a muñeca",
            "Origen": "Taller Hermanos Jota · San Cristóbal, Buenos Aires",
            "Garantía": "10 años de garantía estructural (Programa Herencia Viva)"
        },
        highlights: [
            "Veta de nogal continua seleccionada artesanalmente de extremo a extremo",
            "Puertas con cierre suave y silencioso de alta durabilidad",
            "Tratamiento al aceite natural que nutre la madera y resalta su calidez",
            "Tiradores en latón macizo pulidos y encerados a mano"
        ]
    },
    {
        id: 4,
        name: "Butaca Mendoza",
        category: "Living",
        material: "Guatambú macizo, tela bouclé",
        price: 98000,
        measurements: "80 × 75 × 85 cm",
        image: "images/products/butaca-mendoza.png",
        description: "Butaca tapizada en bouclé Dusty Rose con base de madera de guatambú y respaldo curvo de máximo confort.",
        manufacturing: "Inspirada en las líneas orgánicas de los maestros escandinavos adaptadas a las maderas de nuestra tierra. El chasis curvo se elabora en guatambú macizo estacionado, moldeado mediante curvado al vapor y ensamblado con espigas dobles encoladas bajo prensa hidráulica. El asiento incorpora un sistema de suspensión elástica entrelazada de origen italiano y espuma de alta densidad (30 kg/m³). El tapizado exterior en suave tejido bouclé de tono Dusty Rose resiste más de 40.000 ciclos de fricción, conservando su textura afelpada por décadas.",
        specs: {
            "Dimensiones": "80 cm ancho × 75 cm profundidad × 85 cm alto",
            "Estructura": "Guatambú macizo secado en cámara con uniones espigadas dobles",
            "Tapizado": "Bouclé texturado de alto gramaje (480 g/m²) tono Dusty Rose",
            "Suspensión": "Cinchas elásticas pretensadas italianas con refuerzo perimetral",
            "Acabado": "Laca poliuretánica mate al agua con filtro UV",
            "Origen": "Taller Hermanos Jota · San Cristóbal, Buenos Aires",
            "Garantía": "10 años en esqueleto de madera (Programa Herencia Viva)"
        },
        highlights: [
            "Madera nativa de guatambú de extraordinaria resistencia y grano fino",
            "Tapizado en bouclé de máxima suavidad y alta durabilidad",
            "Ergonomía envolvente diseñada para horas de lectura y relax",
            "Patas torneadas con regatones protectores de fieltro natural"
        ]
    }
];
