/**
 * LectoAula - Lectoescritura 1º Primaria v2.0
 * Aplicación táctil para pizarra digital con escritura manual
 * Mejoras: sílabas correctas, tipografía seleccionable, layout optimizado
 */

class LectoApp {
    constructor() {
        // Estado
        this.score = 0;
        this.currentDifficulty = 1;
        this.gameMode = '';
        this.roundFinished = false;

        // Configuración de tipografía
        this.fontSettings = {
            type: 'escolar',  // 'escolar' (lazada), 'arial', 'comic'
            case: 'minusculas' // 'minusculas', 'mayusculas'
        };

        // OPTIMIZACIÓN: Cleanup tasks y handlers
        this.cleanupTasks = [];
        this.canvasHandlers = null;

        // Vocabulario por niveles CON SÍLABAS CORRECTAS según gramática española
        this.vocabulary = {
            1: [
                // Monosílabas
                { word: 'sol', emoji: '☀️', silabas: ['sol'] },
                { word: 'pez', emoji: '🐟', silabas: ['pez'] },
                { word: 'pie', emoji: '🦶', silabas: ['pie'] },
                { word: 'flor', emoji: '🌸', silabas: ['flor'] },
                { word: 'pan', emoji: '🍞', silabas: ['pan'] },
                { word: 'tren', emoji: '🚂', silabas: ['tren'] },
                { word: 'cruz', emoji: '✝️', silabas: ['cruz'] },
                // Bisílabas
                { word: 'luna', emoji: '🌙', silabas: ['lu', 'na'] },
                { word: 'casa', emoji: '🏠', silabas: ['ca', 'sa'] },
                { word: 'mesa', emoji: '🪑', silabas: ['me', 'sa'] },
                { word: 'pato', emoji: '🦆', silabas: ['pa', 'to'] },
                { word: 'gato', emoji: '🐱', silabas: ['ga', 'to'] },
                { word: 'perro', emoji: '🐶', silabas: ['pe', 'rro'] },
                { word: 'oso', emoji: '🐻', silabas: ['o', 'so'] },
                { word: 'sapo', emoji: '🐸', silabas: ['sa', 'po'] },
                { word: 'mano', emoji: '✋', silabas: ['ma', 'no'] },
                { word: 'ojo', emoji: '👁️', silabas: ['o', 'jo'] },
                { word: 'boca', emoji: '👄', silabas: ['bo', 'ca'] },
                { word: 'uva', emoji: '🍇', silabas: ['u', 'va'] },
                { word: 'nube', emoji: '☁️', silabas: ['nu', 'be'] },
                { word: 'dedo', emoji: '👆', silabas: ['de', 'do'] },
                { word: 'niño', emoji: '👦', silabas: ['ni', 'ño'] },
                { word: 'niña', emoji: '👧', silabas: ['ni', 'ña'] }
            ],
            2: [
                // Bisílabas con grupos consonánticos
                { word: 'plato', emoji: '🍽️', silabas: ['pla', 'to'] },
                { word: 'libro', emoji: '📖', silabas: ['li', 'bro'] },
                { word: 'globo', emoji: '🎈', silabas: ['glo', 'bo'] },
                { word: 'fruta', emoji: '🍎', silabas: ['fru', 'ta'] },
                { word: 'brazo', emoji: '💪', silabas: ['bra', 'zo'] },
                { word: 'clavo', emoji: '🔩', silabas: ['cla', 'vo'] },
                { word: 'tigre', emoji: '🐯', silabas: ['ti', 'gre'] },
                { word: 'primo', emoji: '👦', silabas: ['pri', 'mo'] },
                { word: 'truco', emoji: '🎩', silabas: ['tru', 'co'] },
                { word: 'crema', emoji: '🧴', silabas: ['cre', 'ma'] },
                { word: 'grupo', emoji: '👥', silabas: ['gru', 'po'] },
                { word: 'drama', emoji: '🎭', silabas: ['dra', 'ma'] },
                // Bisílabas con consonantes que se separan (al-to, ar-bol)
                { word: 'árbol', emoji: '🌲', silabas: ['ár', 'bol'] },
                { word: 'alto', emoji: '📏', silabas: ['al', 'to'] },
                // Trisílabas
                { word: 'piedra', emoji: '🪨', silabas: ['pie', 'dra'] },
                { word: 'flecha', emoji: '➡️', silabas: ['fle', 'cha'] },
                { word: 'estrella', emoji: '⭐', silabas: ['es', 'tre', 'lla'] },
                { word: 'zapato', emoji: '👟', silabas: ['za', 'pa', 'to'] },
                { word: 'pelota', emoji: '⚽', silabas: ['pe', 'lo', 'ta'] },
                { word: 'conejo', emoji: '🐰', silabas: ['co', 'ne', 'jo'] },
                { word: 'tomate', emoji: '🍅', silabas: ['to', 'ma', 'te'] },
                { word: 'banana', emoji: '🍌', silabas: ['ba', 'na', 'na'] }
            ],
            3: [
                // Trisílabas
                { word: 'espada', emoji: '⚔️', silabas: ['es', 'pa', 'da'] },
                { word: 'insecto', emoji: '🐛', silabas: ['in', 'sec', 'to'] },
                { word: 'campana', emoji: '🔔', silabas: ['cam', 'pa', 'na'] },
                { word: 'ventana', emoji: '🪟', silabas: ['ven', 'ta', 'na'] },
                { word: 'montaña', emoji: '⛰️', silabas: ['mon', 'ta', 'ña'] },
                { word: 'invierno', emoji: '❄️', silabas: ['in', 'vier', 'no'] },
                { word: 'caballo', emoji: '🐴', silabas: ['ca', 'ba', 'llo'] },
                { word: 'mariposa', emoji: '🦋', silabas: ['ma', 'ri', 'po', 'sa'] },
                // Cuatrisílabas
                { word: 'elefante', emoji: '🐘', silabas: ['e', 'le', 'fan', 'te'] },
                { word: 'escalera', emoji: '🪜', silabas: ['es', 'ca', 'le', 'ra'] },
                { word: 'cocodrilo', emoji: '🐊', silabas: ['co', 'co', 'dri', 'lo'] },
                { word: 'dinosaurio', emoji: '🦕', silabas: ['di', 'no', 'sau', 'rio'] },
                { word: 'helicóptero', emoji: '🚁', silabas: ['he', 'li', 'cóp', 'te', 'ro'] },
                { word: 'semáforo', emoji: '🚦', silabas: ['se', 'má', 'fo', 'ro'] },
                { word: 'teléfono', emoji: '📞', silabas: ['te', 'lé', 'fo', 'no'] },
                { word: 'ordenador', emoji: '💻', silabas: ['or', 'de', 'na', 'dor'] },
                // Pentasílabas
                { word: 'refrigerador', emoji: '🧊', silabas: ['re', 'fri', 'ge', 'ra', 'dor'] },
                { word: 'computadora', emoji: '🖥️', silabas: ['com', 'pu', 'ta', 'do', 'ra'] }
            ]
        };

        // Frases para comprensión
        this.sentences = {
            1: [
                { text: 'El gato bebe leche.', question: '¿Qué bebe el gato?', options: ['agua', 'leche', 'zumo'], correct: 'leche' },
                { text: 'El sol sale de día.', question: '¿Cuándo sale el sol?', options: ['de noche', 'de día', 'de tarde'], correct: 'de día' },
                { text: 'La luna brilla en el cielo.', question: '¿Dónde brilla la luna?', options: ['en el mar', 'en el cielo', 'en la tierra'], correct: 'en el cielo' }
            ],
            2: [
                { text: 'El perro juega con la pelota en el jardín.', question: '¿Dónde juega el perro?', options: ['en casa', 'en el jardín', 'en la calle'], correct: 'en el jardín' },
                { text: 'La niña come una manzana roja.', question: '¿De qué color es la manzana?', options: ['verde', 'amarilla', 'roja'], correct: 'roja' }
            ],
            3: [
                { text: 'Los pájaros construyen sus nidos en los árboles durante la primavera.', question: '¿Cuándo construyen los nidos?', options: ['en verano', 'en primavera', 'en invierno'], correct: 'en primavera' }
            ]
        };

        // Categorías para clasificar
        this.categories = {
            animales: ['gato', 'perro', 'pato', 'oso', 'pez', 'tigre'],
            cosas: ['mesa', 'casa', 'libro', 'plato', 'silla', 'cama'],
            frutas: ['manzana', 'pera', 'uva', 'fresa', 'plátano', 'naranja'],
            colores: ['rojo', 'azul', 'verde', 'amarillo', 'rosa', 'negro']
        };

        // Currículo LOMLOE - 1º Primaria - Lengua Castellana
        this.curriculumObjectives = [
            {
                id: 'CE1',
                title: 'Comunicación oral',
                description: 'Reconocer, comprender y producir mensajes orales sencillos.',
                activities: ['dictado', 'rimas', 'contarSilabas']
            },
            {
                id: 'CE2',
                title: 'Conciencia fonológica',
                description: 'Identificar fonemas, sílabas y palabras en la lengua oral.',
                activities: ['contarSilabas', 'buscaSilaba', 'inicial', 'rimas', 'silabas']
            },
            {
                id: 'CE3',
                title: 'Correspondencia grafema-fonema',
                description: 'Establecer correspondencias entre grafemas y fonemas.',
                activities: ['sopa', 'completa', 'dictado', 'ahorcado']
            },
            {
                id: 'CE4',
                title: 'Lectura de palabras y oraciones',
                description: 'Leer palabras y oraciones sencillas con precisión y fluidez.',
                activities: ['une', 'comprension', 'oraciones']
            },
            {
                id: 'CE5',
                title: 'Comprensión lectora',
                description: 'Comprender el sentido global de textos escritos sencillos.',
                activities: ['comprension', 'une']
            },
            {
                id: 'CE6',
                title: 'Escritura de palabras',
                description: 'Escribir palabras y oraciones sencillas con corrección.',
                activities: ['dictado', 'copia', 'silabas', 'completa']
            },
            {
                id: 'CE7',
                title: 'Vocabulario',
                description: 'Ampliar el vocabulario básico de uso cotidiano.',
                activities: ['clasificar', 'memory', 'une', 'sopa']
            },
            {
                id: 'CE8',
                title: 'Segmentación silábica',
                description: 'Segmentar palabras en sílabas y reconocer estructuras silábicas.',
                activities: ['silabas', 'contarSilabas', 'buscaSilaba', 'carrera', 'equipo']
            },
            {
                id: 'CE9',
                title: 'Educación Literaria',
                description: 'Leer y disfrutar textos literarios (cuentos, poemas, adivinanzas) adecuados a su edad.',
                activities: ['adivinanzas', 'ordenaCuento', 'rimas']
            }
        ];

        // Mapeo de actividades a nombres legibles
        this.activityNames = {
            sopa: 'Sopa de Letras',
            une: 'Une Palabra',
            completa: 'Completa',
            silabas: 'Ordena Sílabas',
            comprension: 'Comprensión',
            dictado: 'Dictado',
            copia: 'Copia',
            oraciones: 'Oraciones',
            inicial: 'Letra Inicial',
            contarSilabas: 'Cuenta Sílabas',
            rimas: 'Rimas',
            buscaSilaba: 'Busca Sílaba',
            memory: 'Memory',
            ahorcado: 'Ahorcado',
            clasificar: 'Clasificar',
            carrera: 'Carrera 2P',
            adivinanzas: 'Adivinanzas',
            ordenaCuento: 'Ordena Cuento',
            equipo: 'Equipo 2P'
        };

        // Adivinanzas para educación literaria
        this.adivinanzas = [
            {
                texto: 'Blanca por dentro,\nverde por fuera.\nSi quieres que te lo diga,\nespera.',
                respuesta: 'pera',
                opciones: [
                    { texto: 'pera', emoji: '🍐' },
                    { texto: 'manzana', emoji: '🍎' },
                    { texto: 'sandía', emoji: '🍉' }
                ],
                emoji: '🍐'
            },
            {
                texto: 'Oro parece,\nplata no es.\nAbran las cortinas\ny verán lo que es.',
                respuesta: 'plátano',
                opciones: [
                    { texto: 'plátano', emoji: '🍌' },
                    { texto: 'naranja', emoji: '🍊' },
                    { texto: 'limón', emoji: '🍋' }
                ],
                emoji: '🍌'
            },
            {
                texto: 'Tengo agujas y no sé coser,\ntengo números y no sé leer.',
                respuesta: 'reloj',
                opciones: [
                    { texto: 'reloj', emoji: '⏰' },
                    { texto: 'cactus', emoji: '🌵' },
                    { texto: 'erizo', emoji: '🦔' }
                ],
                emoji: '⏰'
            },
            {
                texto: 'Tiene ojos y no ve,\ntiene agua pero no la bebe,\ntiene carne y no la come,\ntiene barba y no es hombre.',
                respuesta: 'coco',
                opciones: [
                    { texto: 'coco', emoji: '🥥' },
                    { texto: 'papa', emoji: '🥔' },
                    { texto: 'cebolla', emoji: '🧅' }
                ],
                emoji: '🥥'
            },
            {
                texto: 'Vuelo sin alas,\nsilbo sin boca,\nazoto sin manos,\ny tú no me tocas.',
                respuesta: 'viento',
                opciones: [
                    { texto: 'viento', emoji: '💨' },
                    { texto: 'nube', emoji: '☁️' },
                    { texto: 'lluvia', emoji: '🌧️' }
                ],
                emoji: '💨'
            },
            {
                texto: 'Soy redonda como el mundo,\nal sol me mandas tostar.\nMe puedes comer con nata,\npor eso dulce y ¡a disfrutar!',
                respuesta: 'tortita',
                opciones: [
                    { texto: 'tortita', emoji: '🥞' },
                    { texto: 'pizza', emoji: '🍕' },
                    { texto: 'galleta', emoji: '🍪' }
                ],
                emoji: '🥞'
            }
        ];

        // Cuentos cortos para ordenar (con variantes por nivel)
        this.cuentos = [
            {
                titulo: 'El gato y el ratón',
                partes: [ // N1: Simple
                    { orden: 1, texto: 'Un gato vio a un ratón.', emoji: '🐱' },
                    { orden: 2, texto: 'El ratón corrió a su casa.', emoji: '🐭' },
                    { orden: 3, texto: 'El gato no pudo atraparlo.', emoji: '🏠' }
                ],
                partesN2: [ // N2: Más complejo
                    { orden: 1, texto: 'Un gato gris caminaba sigilosamente por la sala y vio un ratón.', emoji: '🐱' },
                    { orden: 2, texto: 'El pequeño ratón asustado corrió velozmente hacia su agujero.', emoji: '🐭' },
                    { orden: 3, texto: 'El gato se quedó triste porque no pudo atrapar su cena.', emoji: '🏠' }
                ],
                partesN3: [ // N3: 4 partes
                    { orden: 1, texto: 'Un gato hambriento buscaba comida por la cocina.', emoji: '🐱' },
                    { orden: 2, texto: 'De repente, vio un ratón comiendo queso.', emoji: '🐭' },
                    { orden: 3, texto: 'El ratón escapó rápidamente a su escondite.', emoji: '💨' },
                    { orden: 4, texto: 'El gato decidió buscar comida en otro lugar.', emoji: '😿' }
                ]
            },
            {
                titulo: 'La semilla',
                partes: [
                    { orden: 1, texto: 'Ana plantó una semilla.', emoji: '🌱' },
                    { orden: 2, texto: 'La regó todos los días.', emoji: '💧' },
                    { orden: 3, texto: 'Creció una flor bonita.', emoji: '🌸' }
                ],
                partesN2: [
                    { orden: 1, texto: 'Ana hizo un agujero en la tierra y plantó una pequeña semilla.', emoji: '🌱' },
                    { orden: 2, texto: 'Con mucho cuidado, la regó con agua fresca cada mañana.', emoji: '💧' },
                    { orden: 3, texto: 'Finalmente, brotó una hermosa flor de colores brillantes.', emoji: '🌸' }
                ],
                partesN3: [
                    { orden: 1, texto: 'Ana encontró una semilla misteriosa en el jardín.', emoji: '🌱' },
                    { orden: 2, texto: 'Decidió plantarla en una maceta con tierra buena.', emoji: '🪴' },
                    { orden: 3, texto: 'La regó y la puso al sol durante semanas.', emoji: '☀️' },
                    { orden: 4, texto: '¡Sorpresa! Nació una flor mágica gigante.', emoji: '🌻' }
                ]
            },
            {
                titulo: 'El perro y su hueso',
                partes: [
                    { orden: 1, texto: 'El perro encontró un hueso.', emoji: '🦴' },
                    { orden: 2, texto: 'Lo enterró en el jardín.', emoji: '🌳' },
                    { orden: 3, texto: 'Al día siguiente lo comió.', emoji: '🐕' }
                ],
                partesN2: [
                    { orden: 1, texto: 'Un perro muy feliz encontró un hueso grande y delicioso.', emoji: '🦴' },
                    { orden: 2, texto: 'Para guardarlo, cavó un hoyo profundo en el jardín.', emoji: '🌳' },
                    { orden: 3, texto: 'Al día siguiente, volvió al sitio y disfrutó su tesoro.', emoji: '🐕' }
                ],
                partesN3: [
                    { orden: 1, texto: 'Toby el perro salió a pasear al parque.', emoji: '🐕' },
                    { orden: 2, texto: 'Debajo de un banco halló un hueso olvidado.', emoji: '🦴' },
                    { orden: 3, texto: 'Corrió a casa y lo escondió bajo tierra.', emoji: '🏡' },
                    { orden: 4, texto: 'Luego se echó a dormir soñando con su premio.', emoji: '💤' }
                ]
            }
        ];

        // Estado de actividades
        this.currentWord = null;
        this.currentEmoji = null;
        this.currentSilabas = [];
        this.syllables = [];
        this.selectedSyllables = [];
        this.memoryCards = [];
        this.flippedCards = [];
        this.matchedPairs = 0;
        this.hangmanWord = '';
        this.hangmanGuessed = [];
        this.hangmanErrors = 0;
        this.sopaGrid = [];
        this.sopaWords = [];
        this.sopaFound = [];

        // Canvas
        this.isDrawing = false;
        this.penColor = '#1e293b';
        this.lastX = 0;
        this.lastY = 0;
        this.hasDrawn = false;

        // Cache DOM
        this.elements = {
            viewMenu: document.getElementById('view-menu'),
            viewGame: document.getElementById('view-game'),
            gameTitle: document.getElementById('game-title'),
            score: document.getElementById('score'),
            instruction: document.getElementById('instruction'),
            exerciseContainer: document.getElementById('exercise-container'),
            gameContainer: document.getElementById('game-container'),
            canvas: document.getElementById('canvas-pizarra'),
            ctx: null,
            rightPanel: document.getElementById('right-panel'),
            btnSpeak: document.getElementById('btn-speak')
        };

        if (this.elements.canvas) {
            this.elements.ctx = this.elements.canvas.getContext('2d');
        }

        this.init();

        // Mapeo de actividades
        this.activityNames = {
            lectura: 'Lectura Exploradora',
            silabas: 'Sílabas Perdidas',
            ahorcado: 'Ahorcado Ninja',
            dictado: 'Dictado Mágico',
            parejas: 'Parejas de Palabras',
            ordena: 'Ordena la Palabra',
            escribe: 'Escritura Libre'
        };

        // Portal Bridge
        window.addEventListener('message', (event) => {
            if (event.data.type === 'INIT_USER') {
                this.activeUser = event.data.user;
                this.score = event.data.user.points || 0;
                const scoreEl = document.getElementById('score');
                if (scoreEl) scoreEl.innerText = this.score;
            }
        });
    }

    init() {
        this.autoScaleForSmartboard();
        this.loadFontSettings();
        this.initCanvas();
        this.bindEvents();

        // OPTIMIZACIÓN: Debounced resize
        const debouncedResize = this.debounce(() => {
            this.autoScaleForSmartboard();
            this.resizeCanvas();
        }, 150);

        window.addEventListener('resize', debouncedResize);
        this.cleanupTasks.push(() => window.removeEventListener('resize', debouncedResize));
    }

    /**
     * Debounce utility - Delays execution until after wait time has elapsed
     */
    debounce(fn, delay = 300) {
        let timeoutId;
        return (...args) => {
            clearTimeout(timeoutId);
            timeoutId = setTimeout(() => fn.apply(this, args), delay);
        };
    }

    /**
     * Auto-scale para smartboards - Escala automáticamente el contenido
     * para que encaje perfectamente en cualquier resolución de pantalla
     */
    autoScaleForSmartboard() {
        const appElement = document.getElementById('app');
        if (!appElement) return;

        const viewportHeight = window.innerHeight;
        const viewportWidth = window.innerWidth;

        // Resolución de diseño base (para la que está optimizado)
        const baseHeight = 1080;
        const baseWidth = 1920;

        // Calcular el factor de escala necesario
        const scaleY = viewportHeight / baseHeight;
        const scaleX = viewportWidth / baseWidth;
        const scale = Math.min(scaleY, scaleX, 1); // Nunca agrandar, solo reducir

        // Aplicar escala si es necesario
        if (scale < 0.98) { // Solo si necesita reducirse significativamente
            appElement.style.transform = `scale(${scale})`;
            appElement.style.transformOrigin = 'top left';
            appElement.style.width = `${100 / scale}%`;
            appElement.style.height = `${100 / scale}%`;

            console.log(`⚙️ Auto-scale aplicado: ${(scale * 100).toFixed(1)}% (${viewportWidth}x${viewportHeight})`);
        } else {
            // Reset si la pantalla es suficientemente grande
            appElement.style.transform = '';
            appElement.style.width = '';
            appElement.style.height = '';
        }
    }

    bindEvents() {
        // Exponer métodos globales
        window.startActivity = (mode) => this.startActivity(mode);
        window.goToMenu = () => this.goToMenu();
        window.setDifficulty = (d) => this.setDifficulty(d);
        window.resetRound = () => this.resetRound();
        window.generateExercise = () => this.generateExercise();
        window.clearCanvas = () => this.clearCanvas();
        window.reportToPortal = (ok) => this.reportToPortal(ok);
        window.setPenColor = (color) => this.setPenColor(color);
        window.checkWriting = () => this.checkWriting();
        window.speakCurrentWord = () => this.speakWord(this.currentWord);

        // Configuración de fuente
        window.setFontType = (type) => this.setFontType(type);
        window.setFontCase = (c) => this.setFontCase(c);
        window.openFontSettings = () => this.openFontSettings();
        window.closeFontSettings = () => this.closeFontSettings();

        // Métodos de actividades
        window.selectOption = (option) => this.selectOption(option);
        window.selectLetter = (letter, index) => this.selectLetter(letter, index);
        window.selectSyllable = (syllable, element) => this.selectSyllable(syllable, element);
        window.countSyllable = () => this.countSyllable();
        window.flipCard = (index) => this.flipCard(index);
        window.guessLetter = (letter) => this.guessLetter(letter);
        window.selectSopaCell = (row, col) => this.selectSopaCell(row, col);
        window.selectCategory = (category) => this.selectCategory(category);
        window.selectWordForCategory = (word) => this.selectWordForCategory(word);
        window.selectImageWord = (word) => this.selectImageWord(word);
        window.selectDictadoSyllable = (syl, el) => this.selectDictadoSyllable(syl, el);
        window.speakSyllabizedWord = () => this.speakSyllabizedWord();
        // Carrera multijugador
        window.startCarreraRound = () => this.startCarreraRound();
        window.selectCarreraSyllable = (player, syl) => this.selectCarreraSyllable(player, syl);
        window.restartCarrera = () => this.restartCarrera();
        // Currículo
        window.openCurriculumModal = () => this.openCurriculumModal();
        window.closeCurriculumModal = () => this.closeCurriculumModal();
        window.toggleObjective = (id) => this.toggleObjective(id);
        window.startActivityFromCurriculum = (activity) => this.startActivityFromCurriculum(activity);
        // Adivinanzas y Cuentos
        window.selectAdivinanzaOption = (option) => this.selectAdivinanzaOption(option);
        window.selectCuentoParte = (index) => this.selectCuentoParte(index);
        window.nextCuento = () => this.nextCuento();
        // Equipo colaborativo
        window.startEquipoRound = () => this.startEquipoRound();
        window.selectEquipoSyllable = (player, syl) => this.selectEquipoSyllable(player, syl);
        window.restartEquipo = () => this.restartEquipo();
    }

    reportToPortal(ok) {
        if (window.parent !== window) {
            window.parent.postMessage({
                type: 'UPDATE_SCORE_DETAILED',
                app: 'lecto',
                score: this.score,
                activity: this.activityNames[this.gameMode] || this.gameMode,
                ok: ok
            }, '*');
        }
    }

    // === FORMATEO DE TEXTO ===
    formatWord(text) {
        if (!text) return text;
        if (this.fontSettings.case === 'mayusculas') {
            return text.toUpperCase();
        } else {
            return text.toLowerCase();
        }
    }

    formatLetter(letter) {
        if (!letter) return letter;
        if (this.fontSettings.case === 'mayusculas') {
            return letter.toUpperCase();
        } else {
            return letter.toLowerCase();
        }
    }

    getFontClass() {
        return `font-${this.fontSettings.type}`;
    }

    setFontType(type) {
        this.fontSettings.type = type;
        document.querySelectorAll('.font-type-btn').forEach(btn => {
            btn.classList.toggle('active', btn.dataset.type === type);
        });
        this.generateExercise();
    }

    setFontCase(c) {
        this.fontSettings.case = c;
        document.querySelectorAll('.font-case-btn').forEach(btn => {
            btn.classList.toggle('active', btn.dataset.case === c);
        });
        this.generateExercise();
    }

    openFontSettings() {
        document.getElementById('font-modal').style.display = 'flex';
    }

    closeFontSettings() {
        document.getElementById('font-modal').style.display = 'none';
    }

    // === CURRÍCULO LOMLOE ===

    openCurriculumModal() {
        this.renderCurriculumObjectives();
        document.getElementById('curriculum-modal').style.display = 'flex';
    }

    closeCurriculumModal() {
        document.getElementById('curriculum-modal').style.display = 'none';
    }

    renderCurriculumObjectives() {
        const container = document.getElementById('curriculum-list');
        let html = '';

        this.curriculumObjectives.forEach(obj => {
            html += `
                <div class="curriculum-item" id="obj-${obj.id}">
                    <div class="curriculum-header" onclick="toggleObjective('${obj.id}')">
                        <span class="curriculum-id">${obj.id}</span>
                        <span class="curriculum-title">${obj.title}</span>
                        <span class="curriculum-toggle">▼</span>
                    </div>
                    <div class="curriculum-body" id="body-${obj.id}" style="display:none;">
                        <p class="curriculum-description">${obj.description}</p>
                        <p class="activities-label">Actividades relacionadas:</p>
                        <div class="curriculum-activities">
                            ${obj.activities.map(act => `
                                <button class="curriculum-activity-btn" onclick="startActivityFromCurriculum('${act}')">
                                    ${this.activityNames[act] || act}
                                </button>
                            `).join('')}
                        </div>
                    </div>
                </div>
            `;
        });

        container.innerHTML = html;
    }

    toggleObjective(id) {
        const body = document.getElementById(`body-${id}`);
        const item = document.getElementById(`obj-${id}`);
        const isOpen = body.style.display !== 'none';

        // Cerrar todos
        document.querySelectorAll('.curriculum-body').forEach(b => b.style.display = 'none');
        document.querySelectorAll('.curriculum-item').forEach(i => i.classList.remove('open'));

        // Abrir este si estaba cerrado
        if (!isOpen) {
            body.style.display = 'block';
            item.classList.add('open');
        }
    }

    startActivityFromCurriculum(activity) {
        this.closeCurriculumModal();
        this.startActivity(activity);
    }

    // === NAVEGACIÓN ===
    startActivity(mode) {
        this.elements.viewMenu.classList.remove('active');
        this.elements.viewGame.classList.add('active');
        this.setGameMode(mode);
    }

    goToMenu() {
        this.elements.viewGame.classList.remove('active');
        this.elements.viewMenu.classList.add('active');
    }

    setGameMode(mode) {
        this.gameMode = mode;
        this.roundFinished = false;

        const titles = {
            'sopa': 'SOPA DE LETRAS',
            'une': 'UNE IMAGEN Y PALABRA',
            'completa': 'COMPLETA LA PALABRA',
            'silabas': 'ORDENA SÍLABAS',
            'comprension': 'COMPRENSIÓN LECTORA',
            'dictadoVisual': 'DICTADO VISUAL',
            'dictadoAuditivo': 'DICTADO AUDITIVO',
            'copia': 'COPIA LA PALABRA',
            'oraciones': 'FORMA ORACIONES',
            'inicial': 'LETRA INICIAL',
            'contarSilabas': 'CUENTA SÍLABAS',
            'rimas': 'BUSCA LA RIMA',
            'buscaSilaba': 'BUSCA LA SÍLABA',
            'memory': 'MEMORY',
            'ahorcado': 'AHORCADO',
            'clasificar': 'CLASIFICAR',
            'carrera': 'CARRERA DE SÍLABAS 🏁',
            'adivinanzas': 'ADIVINANZAS 🤔',
            'ordenaCuento': 'ORDENA EL CUENTO 📖',
            'equipo': 'EQUIPO 2P 🤝'
        };

        this.elements.gameTitle.innerText = titles[mode] || 'ACTIVIDAD';

        // Mostrar/ocultar botón de audio
        const needsAudio = ['dictadoAuditivo', 'contarSilabas'].includes(mode);
        this.elements.btnSpeak.style.display = needsAudio ? 'block' : 'none';

        // Mostrar/ocultar panel de escritura y ajustar layout
        const needsCanvas = ['dictadoVisual', 'dictadoAuditivo', 'copia'].includes(mode);
        this.elements.rightPanel.style.display = needsCanvas ? 'flex' : 'none';

        // Ajustar layout para maximizar espacio
        if (needsCanvas) {
            this.elements.gameContainer.classList.remove('layout-fullscreen');
        } else {
            this.elements.gameContainer.classList.add('layout-fullscreen');
        }

        this.generateExercise();
        setTimeout(() => this.resizeCanvas(), 100);
    }

    setDifficulty(d) {
        this.currentDifficulty = d;
        document.querySelectorAll('.difficulty-btn').forEach((btn, i) => {
            btn.classList.toggle('active', i + 1 === d);
        });
        this.generateExercise();
    }

    resetRound() {
        this.generateExercise();
    }

    // === GENERADOR DE EJERCICIOS ===
    generateExercise() {
        this.roundFinished = false;
        this.hasDrawn = false;
        this.clearCanvas();
        this.elements.instruction.className = 'instruction-pill instruction-active';

        // Speak current word automatically on start

        const vocab = this.vocabulary[this.currentDifficulty];
        const randomItem = vocab[Math.floor(Math.random() * vocab.length)];
        this.currentWord = randomItem.word;
        this.currentEmoji = randomItem.emoji;
        this.currentSilabas = randomItem.silabas;

        switch (this.gameMode) {
            case 'sopa': this.genSopa(); break;
            case 'une': this.genUne(); break;
            case 'completa': this.genCompleta(); break;
            case 'silabas': this.genSilabas(); break;
            case 'comprension': this.genComprension(); break;
            case 'dictado': this.genDictado(); break;
            case 'copia': this.genCopia(); break;
            case 'oraciones': this.genOraciones(); break;
            case 'inicial': this.genInicial(); break;
            case 'contarSilabas': this.genContarSilabas(); break;
            case 'rimas': this.genRimas(); break;
            case 'buscaSilaba': this.genBuscaSilaba(); break;
            case 'memory': this.genMemory(); break;
            case 'ahorcado': this.genAhorcado(); break;
            case 'clasificar': this.genClasificar(); break;
            case 'carrera': this.genCarrera(); break;
            case 'adivinanzas': this.genAdivinanzas(); break;
            case 'ordenaCuento': this.genOrdenaCuento(); break;
            case 'equipo': this.genEquipo(); break;
            default: this.elements.exerciseContainer.innerHTML = '<p>Actividad no encontrada</p>';
        }

        setTimeout(() => this.scanningManager.refresh(), 200);
    }

    // === ACTIVIDADES DE LECTURA ===

    genSopa() {
        const size = 7;
        const words = this.getRandomWords(3);
        this.sopaWords = words;
        this.sopaFound = [];
        this.sopaGrid = [];

        // Generar grid vacío
        for (let i = 0; i < size; i++) {
            this.sopaGrid.push([]);
            for (let j = 0; j < size; j++) {
                this.sopaGrid[i].push('');
            }
        }

        // Colocar palabras horizontalmente
        words.forEach((word, idx) => {
            const row = idx * 2;
            if (row < size) {
                const maxCol = Math.max(0, size - word.length);
                const col = Math.floor(Math.random() * (maxCol + 1));
                for (let i = 0; i < word.length && col + i < size; i++) {
                    this.sopaGrid[row][col + i] = this.formatLetter(word[i]);
                }
            }
        });

        // Rellenar con letras aleatorias
        const letters = this.fontSettings.case === 'mayusculas' ? 'ABCDEFGHIJLMNOPRSTUVZ' : 'abcdefghijlmnoprstuvz';
        for (let i = 0; i < size; i++) {
            for (let j = 0; j < size; j++) {
                if (!this.sopaGrid[i][j]) {
                    this.sopaGrid[i][j] = letters[Math.floor(Math.random() * letters.length)];
                }
            }
        }

        this.renderSopa();
        this.elements.instruction.innerText = `Encuentra: ${words.map(w => this.formatWord(w)).join(', ')}`;
    }

    renderSopa() {
        const fontClass = this.getFontClass();
        let html = `<div class="letter-grid sopa-large ${fontClass}" style="grid-template-columns: repeat(7, 1fr);">`;
        for (let i = 0; i < this.sopaGrid.length; i++) {
            for (let j = 0; j < this.sopaGrid[i].length; j++) {
                const letter = this.sopaGrid[i][j];
                const found = this.isCellFound(i, j) ? 'found' : '';
                html += `<div class="letter-cell ${found}" onclick="selectSopaCell(${i}, ${j})">${letter}</div>`;
            }
        }
        html += `</div>`;
        this.elements.exerciseContainer.innerHTML = html;
    }

    isCellFound(row, col) {
        for (const found of this.sopaFound) {
            if (found.row === row && col >= found.startCol && col < found.startCol + found.word.length) {
                return true;
            }
        }
        return false;
    }

    selectSopaCell(row, col) {
        for (const word of this.sopaWords) {
            if (this.sopaFound.some(f => f.word === word)) continue;

            let match = true;
            for (let i = 0; i < word.length; i++) {
                const gridLetter = this.sopaGrid[row][col + i] || '';
                const wordLetter = this.formatLetter(word[i]);
                if (col + i >= 7 || gridLetter !== wordLetter) {
                    match = false;
                    break;
                }
            }
            if (match) {
                this.sopaFound.push({ word, row, startCol: col });
                this.playSound('success');
                this.renderSopa();

                if (this.sopaFound.length === this.sopaWords.length) {
                    this.handleSuccess();
                }
                return;
            }
        }
    }

    genUne() {
        const items = this.getRandomItems(4);
        const shuffledWords = [...items].sort(() => Math.random() - 0.5);
        this.uneItems = items;
        this.uneWords = shuffledWords;
        this.selectedImage = null;

        const fontClass = this.getFontClass();
        this.elements.instruction.innerText = 'Toca una imagen y luego su palabra';

        let html = `<div class="animate-pop fullscreen-activity" style="display:flex; flex-direction:column; gap:1rem; align-items:center; width:100%;">`;
        html += `<div style="display:flex; gap:0.75rem; flex-wrap:wrap; justify-content:center; width:100%;">`;
        items.forEach((item, i) => {
            html += `<div class="image-card large-card" onclick="selectImageWord('img_${i}')" id="img_${i}" data-word="${item.word}">${item.emoji}</div>`;
        });
        html += `</div>`;
        html += `<div style="display:flex; gap:0.75rem; flex-wrap:wrap; justify-content:center; width:100%;">`;
        shuffledWords.forEach((item, i) => {
            html += `<div class="word-card large-card ${fontClass}" onclick="selectImageWord('word_${i}')" id="word_${i}" data-word="${item.word}">${this.formatWord(item.word)}</div>`;
        });
        html += `</div></div>`;

        this.elements.exerciseContainer.innerHTML = html;
    }

    selectImageWord(id) {
        const el = document.getElementById(id);
        const word = el.dataset.word;

        if (id.startsWith('img_')) {
            document.querySelectorAll('.image-card').forEach(c => c.classList.remove('selected'));
            el.classList.add('selected');
            this.selectedImage = word;
        } else if (this.selectedImage) {
            if (word === this.selectedImage) {
                el.classList.add('correct');
                document.querySelector(`.image-card.selected`).classList.add('correct');
                this.playSound('success');
                this.selectedImage = null;

                if (document.querySelectorAll('.word-card.correct').length === this.uneItems.length) {
                    setTimeout(() => this.handleSuccess(), 500);
                }
            } else {
                el.classList.add('incorrect');
                this.playSound('error');
                setTimeout(() => el.classList.remove('incorrect'), 500);
            }
        }
    }

    genCompleta() {
        const word = this.currentWord;
        const gapIndex = Math.floor(Math.random() * word.length);
        this.completaWord = word;
        this.completaGapIndex = gapIndex;
        this.completaLetter = word[gapIndex];

        // Generar opciones CON ACENTOS CORRECTOS
        const options = [this.completaLetter];
        const allLetters = this.fontSettings.case === 'mayusculas'
            ? 'ABCDEFGHIJKLMNÑOPQRSTUVWXYZÁÉÍÓÚ'
            : 'abcdefghijklmnñopqrstuvwxyzáéíóú';

        while (options.length < 4) {
            const letter = allLetters[Math.floor(Math.random() * allLetters.length)];
            if (!options.includes(letter) && !options.includes(letter.toLowerCase()) && !options.includes(letter.toUpperCase())) {
                options.push(this.fontSettings.case === 'mayusculas' ? letter.toUpperCase() : letter.toLowerCase());
            }
        }
        options.sort(() => Math.random() - 0.5);

        const fontClass = this.getFontClass();
        this.elements.instruction.innerText = '¿Qué letra falta?';

        let wordHtml = '';
        for (let i = 0; i < word.length; i++) {
            if (i === gapIndex) {
                wordHtml += `<div class="letter-gap" id="gap"></div>`;
            } else {
                wordHtml += `<span>${this.formatWord(word[i])}</span>`;
            }
        }

        let html = `<div class="animate-pop fullscreen-activity" style="display:flex; flex-direction:column; align-items:center; gap:2.5rem;">`;
        html += `<div class="image-card large-card">${this.currentEmoji}</div>`;
        html += `<div class="word-with-gap large-text ${fontClass}">${wordHtml}</div>`;
        html += `<div class="options-container">`;
        options.forEach(opt => {
            html += `<button class="option-btn large-btn ${fontClass}" onclick="selectLetter('${opt}')">${opt}</button>`;
        });
        html += `</div></div>`;

        this.elements.exerciseContainer.innerHTML = html;
    }

    selectLetter(letter) {
        if (this.roundFinished) return;

        const gap = document.getElementById('gap');
        gap.innerText = letter;

        const correctLetter = this.fontSettings.case === 'mayusculas'
            ? this.completaLetter.toUpperCase()
            : this.completaLetter.toLowerCase();

        if (letter.toLowerCase() === this.completaLetter.toLowerCase()) {
            gap.classList.add('filled');
            setTimeout(() => this.handleSuccess(), 600);
        } else {
            gap.style.background = '#fee2e2';
            this.playSound('error');
            setTimeout(() => {
                gap.innerText = '';
                gap.style.background = '';
            }, 500);
        }
    }

    checkAnswer(userWord) {
        if (this.roundFinished) return;
        const correct = userWord.toLowerCase().trim() === this.currentWord.toLowerCase().trim();

        if (correct) {
            this.points += 10;
            this.roundFinished = true;
            this.elements.instruction.innerText = "¡Excelente!";
            this.elements.instruction.className = 'instruction-pill success-pop';
            this.reportToPortal(true);

            // Narrate on success

            setTimeout(() => this.generateExercise(), 1500);
        } else {
            this.elements.instruction.innerText = "Sigue intentándolo";
            this.elements.instruction.className = 'instruction-pill error-shake';
            setTimeout(() => {
                this.elements.instruction.innerText = "Escribe la palabra";
                this.elements.instruction.className = 'instruction-pill instruction-active';
            }, 1000);
        }
    }

    genSilabas() {
        // Usar sílabas predefinidas correctas
        this.syllables = [...this.currentSilabas];
        // Desordenar
        this.syllables.sort(() => Math.random() - 0.5);
        this.selectedSyllables = [];
        this.targetWord = this.currentWord; // La palabra objetivo es la actual

        this.elements.instruction.innerText = 'Ordena las sílabas';

        const fontClass = this.getFontClass();

        // Contenedor principal
        let html = `<div class="animate-pop fullscreen-activity">`;

        // Imagen grande
        html += `<div class="image-card large-card">${this.currentEmoji}</div>`;

        // Zona de respuesta (donde se van colocando las sílabas)
        html += `<div id="answer-zone" class="answer-zone large-answer ${fontClass}" style="min-height: 80px; margin: 2rem 0; display:flex; gap:0.5rem; justify-content:center;"></div>`;

        // Zona de sílabas desordenadas
        html += `<div class="options-container">`;
        this.syllables.forEach((syl, i) => {
            html += `<div class="syllable-card large-syllable ${fontClass}" onclick="selectSyllable('${syl}', this)" data-index="${i}">${this.formatWord(syl)}</div>`;
        });
        html += `</div></div>`;

        this.elements.exerciseContainer.innerHTML = html;
    }

    selectSyllable(syllable, element) {
        if (this.roundFinished) return;

        element.style.display = 'none';
        this.selectedSyllables.push(syllable);

        const fontClass = this.getFontClass();
        const zone = document.getElementById('answer-zone');
        zone.innerHTML = this.selectedSyllables.map(s =>
            `<div class="syllable-card ${fontClass}" style="cursor:default">${this.formatWord(s)}</div>`
        ).join('');

        if (this.selectedSyllables.length === this.syllables.length) {
            const formed = this.selectedSyllables.join('');
            if (formed === this.targetWord) {
                // Pequeño retardo para ver la palabra completa bien formada (Fix solicitado)
                setTimeout(() => {
                    this.handleSuccess();
                }, 500);
            } else {
                zone.classList.add('shake');
                this.playSound('error');
                setTimeout(() => {
                    zone.classList.remove('shake');
                    this.selectedSyllables = [];
                    zone.innerHTML = '';
                    document.querySelectorAll('.syllable-card').forEach(c => c.style.display = 'flex');
                }, 600);
            }
        }
    }

    genComprension() {
        const sentences = this.sentences[this.currentDifficulty] || this.sentences[1];
        const item = sentences[Math.floor(Math.random() * sentences.length)];
        this.comprensionCorrect = item.correct;

        const fontClass = this.getFontClass();
        this.elements.instruction.innerText = 'Lee y responde';

        let html = `<div class="animate-pop fullscreen-activity" style="display:flex; flex-direction:column; align-items:center; gap:2rem;">`;
        html += `<div class="reading-text large-reading ${fontClass}">${item.text}</div>`;
        html += `<div style="font-size:1.5rem; font-weight:700; color:var(--primary);">${item.question}</div>`;
        html += `<div class="options-container">`;
        item.options.forEach(opt => {
            html += `<button class="option-btn large-btn ${fontClass}" onclick="selectOption('${opt}')">${opt}</button>`;
        });
        html += `</div></div>`;

        this.elements.exerciseContainer.innerHTML = html;
    }

    genDictado() {
        // Unificar Dictado Visual y Auditivo
        // Mostrar imagen, botón de audio y opciones de sílabas para escribir
        this.dictadoWrittenWord = '';
        this.dictadoTargetWord = this.currentWord;
        this.currentSilabasOrdenadas = [...this.currentSilabas]; // Copia ordenada para verificar

        this.elements.instruction.innerText = 'Escucha y escribe';

        // Limpiar canvas si fuera necesario, pero aquí usamos input visual
        // Si hay canvas activo, lo usamos. Si no, modo selección.
        // Asumimos modo pizarra para escritura manual si está visible.
        // Pero el usuario pidió "selector de sílabas en Dictado Visual, Audio y Copia". 
        // Implementamos la versión híbrida: Pizarra a la derecha, pero input de ayuda si se quiere.
        // Vamos a implementar la versión estándar de dictado con soporte de sílabas.

        this.renderDictado();
    }

    renderDictado() {
        const fontClass = this.getFontClass();

        let html = `<div class="animate-pop fullscreen-activity" style="display:flex; flex-direction:column; align-items:center; gap:1.5rem;">`;

        // Imagen y Audio
        html += `<div style="display:flex; align-items:center; gap:1rem;">`;
        html += `<div class="image-card large-card">${this.currentEmoji}</div>`;
        html += `<button class="btn-sound large-btn" onclick="speakWord('${this.currentWord}')">🔊</button>`;
        html += `</div>`;

        // Zona de respuesta (Input visual de lo que se lleva escrito con sílabas)
        // NOTA: Si usan el canvas, esto es complementario.
        html += `<div id="dictado-answer" class="dictado-answer ${fontClass}" style="min-height:60px; font-size:2rem; border-bottom:2px solid #ccc; min-width:200px; text-align:center; padding:0.5rem;">
            ${this.dictadoWrittenWord ? this.formatWord(this.dictadoWrittenWord) : ''}
        </div>`;

        // Selector de Sílabas (con distractores)
        // Generar pool de sílabas: correctas + distractores
        if (!this.dictadoOptions) {
            const correctSylls = [...this.currentSilabas];
            const distractors = this.getDistractorSyllables(correctSylls, this.currentDifficulty);
            // Mezclar
            this.dictadoOptions = [...correctSylls, ...distractors].sort(() => Math.random() - 0.5);
            this.dictadoUsedOptions = []; // Indices usados
        }

        html += `<div class="options-container">`;
        this.dictadoOptions.forEach((syl, i) => {
            const used = this.dictadoUsedOptions.includes(i);
            // Estilo usado
            const style = used ? 'opacity:0.5; pointer-events:none; background:#e2e8f0;' : '';
            html += `<button class="syllable-card ${fontClass}" style="${style}" onclick="selectDictadoSyllable('${syl}', ${i})">${this.formatWord(syl)}</button>`;
        });
        html += `</div>`;

        html += `<div style="margin-top:1rem; font-size:0.9rem; color:#666;">(También puedes escribir en la pizarra)</div>`;

        html += `</div>`;
        this.elements.exerciseContainer.innerHTML = html;

        // Auto-reproducir audio al inicio (DESACTIVADO POR PETICIÓN DEL USUARIO)
        // setTimeout(() => this.speakWord(this.currentWord), 500);
    }

    selectDictadoSyllable(syl, index) {
        if (this.roundFinished) return;

        // Verificar si es la sílaba correcta en el orden correcto
        // Necesitamos saber cuántas sílabas llevamos escritas correctamente
        // O reconstruir palabra.
        // Estrategia: La palabra se construye en orden. Verificar si 'syl' coincide con la siguiente sílaba esperada.

        // Cuántas sílabas tiene la palabra objetivo?
        const currentProgress = this.dictadoWrittenWord.length; // Esto es caracteres, no sílabas. Mal.
        // Mejor trackear el índice de sílaba.
        if (typeof this.dictadoSyllableIndex === 'undefined') this.dictadoSyllableIndex = 0;

        const expectedSyllable = this.currentSilabasOrdenadas[this.dictadoSyllableIndex];

        if (syl === expectedSyllable) {
            this.playSound('pop');
            this.dictadoWrittenWord += syl;
            this.dictadoSyllableIndex++;
            this.dictadoUsedOptions.push(index);

            this.renderDictado();

            // Verificar si completó la palabra
            if (this.dictadoWrittenWord === this.dictadoTargetWord) {
                // Éxito
                setTimeout(() => { // Retardo para ver palabra
                    this.checkWriting(true); // true indica input digital (no canvas estrictamente)
                }, 500);
            }
        } else {
            this.playSound('error');
            // Feedback visual error
            const ans = document.getElementById('dictado-answer');
            ans.style.borderColor = 'red';
            setTimeout(() => ans.style.borderColor = '#ccc', 500);
        }
    }

    // Función auxiliar para checkWriting unificado
    checkWriting(fromDigitalInput = false) {
        // Si viene de digital input, ya está verificado.
        // Si viene de botón "Combrobar" (canvas), hay que confiar en el usuario o implementar OCR (no tenemos).
        // En esta app, "checkWriting" original era solo feedback positivo asumiendo que el niño escribió en canvas.
        // Ahora con input digital, tenemos verificación real.

        if (fromDigitalInput) {
            this.elements.instruction.innerHTML = `<span class="feedback-success">¡Muy bien! Escrito correctamente.</span>`;
            this.score += 10;

            this.reportToPortal(true);
            this.elements.score.innerText = this.score;
            this.roundFinished = true;
            this.playSound('applause');
            this.launchConfetti();
            setTimeout(() => this.showSuccessModal(), 1500);
            return;
        }

        // Lógica original de canvas check (placebo + refuerzo)
        if (!this.hasDrawn) {
            this.elements.instruction.innerHTML = `<span class="feedback-error">¡Escribe algo primero!</span>`;
            this.playSound('error');
            this.reportToPortal(false);
            return;
        }
        this.elements.instruction.innerHTML = `<span class="feedback-success">¡Muy bien! Estás aprendiendo mucho.</span>`;
        this.score += 10;
        this.reportToPortal(true);
        this.elements.score.innerText = this.score;
        this.roundFinished = true;
        this.playSound('applause');
        setTimeout(() => this.showSuccessModal(), 1500);
    }

    genCopia() {
        this.elements.instruction.innerText = 'Copia la palabra';
        const fontClass = this.getFontClass();

        // Similar al dictado pero mostrando la palabra
        let html = `<div class="animate-pop fullscreen-activity" style="display:flex; flex-direction:column; align-items:center; gap:2rem;">`;
        html += `<div class="word-card large-model ${fontClass}" style="cursor:default;">${this.formatWord(this.currentWord)}</div>`;
        html += `<div style="font-size:3rem;">${this.currentEmoji}</div>`;
        html += `<div class="model-lines" style="width:100%; height:2px; background:#ddd; margin-top:2rem;"></div>`;
        html += `<p style="color:#666;">Cópiala en la pizarra de la derecha 👉</p>`;
        html += `</div>`;

        this.elements.exerciseContainer.innerHTML = html;
        // DESACTIVADO: Lectura automática por petición del usuario
        // this.speakWord(this.currentWord);
    }

    genOraciones() {
        const sentences = this.oraciones[this.currentDifficulty] || this.oraciones[1];
        // Fallback oraciones data si no existe (simulado)
        if (!this.oraciones) {
            // Definir algunas básicas si se borraron
            this.oraciones = {
                1: ['El gato bebe leche.', 'Mi mamá me mima.', 'Susi sale sola.'],
                2: ['El perro corre por el campo.', 'La casa tiene ventanas grandes.'],
                3: ['Ayer fuimos al parque con mis amigos.', 'Me gusta leer cuentos antes de dormir.']
            };
        }
        const relevant = this.oraciones[this.currentDifficulty] || this.oraciones[1];
        const sentence = relevant[Math.floor(Math.random() * relevant.length)];

        this.elements.instruction.innerText = 'Lee la oración';
        const fontClass = this.getFontClass();

        let html = `<div class="animate-pop fullscreen-activity" style="display:flex; flex-direction:column; align-items:center; gap:1.5rem; justify-content:center; height:100%; width:100%;">`;
        html += `<div class="reading-text ${fontClass}" style="font-size:2.5rem; text-align:center;">${sentence}</div>`;
        html += `<div style="display:flex; gap:1rem;">`;
        html += `<button class="btn-sound large-btn" onclick="speakWord('${sentence}')">🔊 Leer</button>`;
        html += `</div></div>`;

        this.elements.exerciseContainer.innerHTML = html;
    }

    genInicial() {
        const letter = this.currentWord.charAt(0);
        this.correctInitial = letter;

        // Generar opciones de letras
        const options = [letter, 's', 'm', 'p', 'l'].filter((v, i, a) => a.indexOf(v) === i).slice(0, 4); // Placeholder logic
        if (!options.includes(letter)) options[0] = letter;
        options.sort(() => Math.random() - 0.5);

        this.elements.instruction.innerText = '¿Con qué letra empieza?';
        const fontClass = this.getFontClass();

        let html = `<div class="animate-pop fullscreen-activity" style="display:flex; flex-direction:column; align-items:center; gap:2rem;">`;
        html += `<div class="image-card large-card">${this.currentEmoji}</div>`;
        html += `<div class="options-container">`;
        options.forEach(opt => {
            html += `<button class="option-btn large-btn ${fontClass}" onclick="selectOption('${opt}')">${opt.toUpperCase()}</button>`;
        });
        html += `</div></div>`;

        this.elements.exerciseContainer.innerHTML = html;
    }

    genCuentaSilabas() {
        const count = this.currentSilabas.length;
        this.correctCount = count;

        this.elements.instruction.innerText = '¿Cuántas sílabas tiene?';

        let html = `<div class="animate-pop fullscreen-activity" style="display:flex; flex-direction:column; align-items:center; gap:2rem;">`;
        html += `<div class="image-card large-card">${this.currentEmoji}</div>`;
        html += `<div class="options-container">`;
        [1, 2, 3, 4].forEach(num => {
            // Check if correct
            const isCorrect = num === count; // Lógica para selectOption manejada genéricamente o específica?
            // selectOption usa 'this.correctInitial' o similar. Necesitamos adaptar selectOption o crear selectUnica.
            // Usaremos un hack en selectOption o una función inline.
            html += `<button class="option-btn large-btn" onclick="checkCount(${num})">${num}</button>`;
        });
        html += `</div></div>`;

        // Exponer checkCount
        window.checkCount = (num) => {
            if (num === this.correctCount) {
                this.handleSuccess();
            } else {
                this.playSound('error');
            }
        };

        this.elements.exerciseContainer.innerHTML = html;
        this.speakSyllabized(this.currentSilabas);
    }

    // Rimas estaba justo antes de ser llamada...
    genRimas() {
        const ending = this.currentWord.slice(-2);
        const rhymes = this.vocabulary[this.currentDifficulty]
            .filter(v => v.word !== this.currentWord && v.word.endsWith(ending))
            .slice(0, 1);

        if (rhymes.length === 0) {
            rhymes.push({ word: this.currentWord.slice(0, -1) + 'o', emoji: '✨' });
        }

        const distractors = this.vocabulary[this.currentDifficulty]
            .filter(v => v.word !== this.currentWord && !v.word.endsWith(ending))
            .slice(0, 3);

        const options = [...rhymes, ...distractors].sort(() => Math.random() - 0.5);
        this.correctRhyme = rhymes[0].word;

        const fontClass = this.getFontClass();
        const difficulty = this.currentDifficulty;
        const currentEmoji = this.vocabulary[this.currentDifficulty].find(v => v.word === this.currentWord)?.emoji || '🎵';

        this.elements.instruction.innerText = '¿Qué palabra rima?';

        let html = `<div class="animate-pop fullscreen-activity" style="display:flex; flex-direction:column; align-items:center; gap:2.5rem;">`;
        html += `<div class="word-card large-model ${fontClass}" style="cursor:default; font-size:3rem; padding: 2rem;">
            <div>${currentEmoji}</div>
            <div style="margin-top:0.5rem;">${this.formatWord(this.currentWord)}</div>
        </div>`;

        html += `<div class="options-container">`;
        options.forEach(opt => {
            let content = this.formatWord(opt.word);
            if (difficulty === 1) {
                content = `<span style="font-size:1.5rem; display:block; margin-bottom:0.2rem;">${opt.emoji}</span>` + content;
            }
            html += `<button class="option-btn large-btn ${fontClass}" onclick="selectOption('${opt.word}')" style="height:auto; padding:1rem;">${content}</button>`;
        });
        html += `</div></div>`;

        this.elements.exerciseContainer.innerHTML = html;
    }

    genBuscaSilaba() {
        const target = this.currentSilabas[0]; // Primera sílaba
        this.targetSyllable = target;

        const correctWords = this.vocabulary[this.currentDifficulty].filter(w => w.silabas.includes(target)).slice(0, 2);
        const distractorWords = this.vocabulary[this.currentDifficulty].filter(w => !w.silabas.includes(target)).slice(0, 2);

        const options = [...correctWords, ...distractorWords].sort(() => Math.random() - 0.5);

        this.elements.instruction.innerText = `Busca palabras con la sílaba "${target}"`;
        const fontClass = this.getFontClass();

        let html = `<div class="animate-pop fullscreen-activity" style="display:flex; flex-direction:column; align-items:center; gap:2rem;">`;
        html += `<div class="syllable-target large-card ${fontClass}">${target}</div>`;
        html += `<div class="options-container">`;
        options.forEach(w => {
            // onclick logic to define
            html += `<button class="option-btn large-btn ${fontClass}" onclick="checkBusca('${w.word}', ${w.silabas.includes(target)})">${this.formatWord(w.word)}</button>`;
        });
        html += `</div></div>`;

        window.checkBusca = (word, isCorrect) => {
            if (isCorrect) {
                this.handleSuccess();
            } else {
                this.playSound('error');
            }
        };

        this.elements.exerciseContainer.innerHTML = html;
    }

    genMemory() {
        // Placeholder Memory simple
        this.elements.instruction.innerText = 'Memory: Parejas';
        this.elements.exerciseContainer.innerHTML = '<div style="text-align:center;">Juego de Memory (Implementación restaurada pendiente de detalles)</div>';
        // TODO: Implementación completa de Memory si se requiere. Por ahora es un stub funcional para no crashear.
    }

    genAhorcado() {
        const displayWord = this.fontSettings.case === 'mayusculas'
            ? this.currentWord.toUpperCase()
            : this.currentWord.toLowerCase();
        this.hangmanWord = displayWord;
        this.hangmanGuessed = [];
        this.hangmanErrors = 0;

        this.elements.instruction.innerText = 'Adivina la palabra';
        this.renderAhorcado();
    }

    renderAhorcado() {
        const fontClass = this.getFontClass();

        let wordDisplay = this.hangmanWord.split('').map(letter =>
            this.hangmanGuessed.includes(letter.toUpperCase()) || this.hangmanGuessed.includes(letter.toLowerCase())
                ? letter
                : '_'
        ).join(' ');

        const alphabet = this.fontSettings.case === 'mayusculas'
            ? 'ABCDEFGHIJKLMNÑOPQRSTUVWXYZ'
            : 'abcdefghijklmnñopqrstuvwxyz';

        let html = `<div class="animate-pop fullscreen-activity" style="display:flex; flex-direction:column; align-items:center; gap:1.5rem;">`;

        // Ahorcado visual
        html += `<svg width="120" height="140" viewBox="0 0 100 120">
            <line x1="20" y1="110" x2="80" y2="110" stroke="#1e293b" stroke-width="3"/>
            <line x1="30" y1="110" x2="30" y2="20" stroke="#1e293b" stroke-width="3"/>
            <line x1="30" y1="20" x2="60" y2="20" stroke="#1e293b" stroke-width="3"/>
            <line x1="60" y1="20" x2="60" y2="30" stroke="#1e293b" stroke-width="2"/>
            ${this.hangmanErrors > 0 ? '<circle cx="60" cy="40" r="10" fill="none" stroke="#64748b" stroke-width="2"/>' : ''}
            ${this.hangmanErrors > 1 ? '<line x1="60" y1="50" x2="60" y2="75" stroke="#64748b" stroke-width="2"/>' : ''}
            ${this.hangmanErrors > 2 ? '<line x1="60" y1="55" x2="45" y2="65" stroke="#64748b" stroke-width="2"/>' : ''}
            ${this.hangmanErrors > 3 ? '<line x1="60" y1="55" x2="75" y2="65" stroke="#64748b" stroke-width="2"/>' : ''}
            ${this.hangmanErrors > 4 ? '<line x1="60" y1="75" x2="45" y2="95" stroke="#64748b" stroke-width="2"/>' : ''}
            ${this.hangmanErrors > 5 ? '<line x1="60" y1="75" x2="75" y2="95" stroke="#64748b" stroke-width="2"/>' : ''}
        </svg>`;

        html += `<div class="hangman-word ${fontClass}" style="font-size:2.5rem; font-weight:800; letter-spacing:0.5rem;">${wordDisplay}</div>`;
        html += `<div class="image-card" style="width:70px; height:70px; font-size:2.5rem;">${this.currentEmoji}</div>`;

        html += `<div class="letter-grid ahorcado-keyboard ${fontClass}" style="grid-template-columns: repeat(9, 1fr); gap:6px;">`;
        alphabet.split('').forEach(letter => {
            const guessedUpper = this.hangmanGuessed.includes(letter.toUpperCase());
            const guessedLower = this.hangmanGuessed.includes(letter.toLowerCase());
            const used = guessedUpper || guessedLower;
            const inWord = this.hangmanWord.toUpperCase().includes(letter.toUpperCase());
            const cls = used ? (inWord ? 'found' : 'used') : '';
            html += `<div class="letter-cell ${cls}" style="width:40px; height:40px; font-size:1.1rem;" onclick="guessLetter('${letter}')">${letter}</div>`;
        });
        html += `</div></div>`;

        this.elements.exerciseContainer.innerHTML = html;
    }

    guessLetter(letter) {
        if (this.roundFinished) return;

        const upperLetter = letter.toUpperCase();
        const lowerLetter = letter.toLowerCase();

        if (this.hangmanGuessed.includes(upperLetter) || this.hangmanGuessed.includes(lowerLetter)) return;

        this.hangmanGuessed.push(upperLetter);
        this.hangmanGuessed.push(lowerLetter);

        const inWord = this.hangmanWord.toUpperCase().includes(upperLetter);

        if (inWord) {
            this.playSound('success');
            const won = this.hangmanWord.split('').every(l =>
                this.hangmanGuessed.includes(l.toUpperCase()) || this.hangmanGuessed.includes(l.toLowerCase())
            );
            if (won) {
                // Pequeño retardo para ver la última letra (Fix solicitado)
                setTimeout(() => this.handleSuccess(), 800);
            }
        } else {
            this.hangmanErrors++;
            this.playSound('error');
            if (this.hangmanErrors >= 6) {
                this.elements.instruction.innerHTML = `<span class="feedback-error">¡Era: ${this.hangmanWord}!</span>`;
                this.roundFinished = true;
                setTimeout(() => this.showSuccessModal(), 1500);
            }
        }
        this.renderAhorcado();
    }





    genComprension() {
        const sentences = this.sentences[this.currentDifficulty] || this.sentences[1];
        const item = sentences[Math.floor(Math.random() * sentences.length)];
        this.comprensionCorrect = item.correct;

        const fontClass = this.getFontClass();
        this.elements.instruction.innerText = 'Lee y responde';

        let html = `<div class="animate-pop fullscreen-activity" style="display:flex; flex-direction:column; align-items:center; gap:2rem;">`;
        html += `<div class="reading-text large-reading ${fontClass}">${item.text}</div>`;
        html += `<div style="font-size:1.5rem; font-weight:700; color:var(--primary);">${item.question}</div>`;
        html += `<div class="options-container">`;
        item.options.forEach(opt => {
            html += `<button class="option-btn large-btn ${fontClass}" onclick="selectOption('${opt}')">${opt}</button>`;
        });
        html += `</div></div>`;

        this.elements.exerciseContainer.innerHTML = html;
    }

    // === ACTIVIDADES DE ESCRITURA ===

    // Genera sílabas con intrusas para niveles 2 y 3
    getSyllablesWithDistractors() {
        const correctSyllables = [...this.currentSilabas];
        let allSyllables = [...correctSyllables];

        // Añadir sílabas intrusas según el nivel
        if (this.currentDifficulty >= 2) {
            // 1 sílaba intrusa en N2
            const intrusa1 = this.getRandomDistractorSyllable(correctSyllables);
            if (intrusa1) allSyllables.push(intrusa1);
        }
        if (this.currentDifficulty >= 3) {
            // 2 sílabas intrusas en N3
            const intrusa2 = this.getRandomDistractorSyllable(allSyllables);
            if (intrusa2) allSyllables.push(intrusa2);
        }

        // Mezclar todas las sílabas
        return allSyllables.sort(() => Math.random() - 0.5);
    }

    getRandomDistractorSyllable(exclude) {
        const commonSyllables = ['pa', 'pe', 'pi', 'po', 'pu', 'ma', 'me', 'mi', 'mo', 'mu',
            'ta', 'te', 'ti', 'to', 'tu', 'la', 'le', 'li', 'lo', 'lu',
            'sa', 'se', 'si', 'so', 'su', 'na', 'ne', 'ni', 'no', 'nu',
            'ca', 'co', 'cu', 'ra', 're', 'ri', 'ro', 'ru', 'da', 'de', 'di', 'do', 'du',
            'ba', 'be', 'bi', 'bo', 'bu', 'ga', 'go', 'gu', 'fa', 'fe', 'fi', 'fo', 'fu',
            'bra', 'bre', 'bri', 'bro', 'bru', 'cla', 'cle', 'cli', 'clo', 'clu',
            'pla', 'ple', 'pli', 'plo', 'plu', 'tra', 'tre', 'tri', 'tro', 'tru'];

        const available = commonSyllables.filter(s => !exclude.includes(s));
        if (available.length === 0) return null;
        return available[Math.floor(Math.random() * available.length)];
    }

    // Estado para selección de sílabas en dictados
    setupDictadoSyllables() {
        this.dictadoSyllables = [...this.currentSilabas];
        this.dictadoSelectedSyllables = [];
        this.dictadoShuffledSyllables = this.getSyllablesWithDistractors();
    }

    renderDictadoSyllableSelector() {
        const fontClass = this.getFontClass();
        let html = `<div class="syllable-selector-section">`;
        html += `<p style="font-size:1rem; color:var(--neutral-600); margin-bottom:0.75rem; font-weight:700;">O selecciona las sílabas en orden:</p>`;
        html += `<div class="answer-zone dictado-answer-zone" id="dictado-answer-zone"></div>`;
        html += `<div class="syllable-container" id="dictado-syllable-container">`;
        this.dictadoShuffledSyllables.forEach((syl, i) => {
            html += `<div class="syllable-card ${fontClass}" onclick="selectDictadoSyllable('${syl}', this)" data-syl="${syl}" id="dsyl-${i}">${this.formatWord(syl)}</div>`;
        });
        html += `</div></div>`;
        return html;
    }

    genDictado() {
        // Seleccionar palabra según nivel de dificultad
        // N1: 2 sílabas, refuerzo visual + audio silabeado
        // N2: 3 sílabas, refuerzo visual + audio silabeado
        // N3: 3-5 sílabas, refuerzo visual siempre, audio silabeado opcional

        const vocab = this.getDictadoVocabulary();
        const randomItem = vocab[Math.floor(Math.random() * vocab.length)];
        this.currentWord = randomItem.word;
        this.currentEmoji = randomItem.emoji;
        this.currentSilabas = randomItem.silabas;

        this.setupDictadoSyllables();
        const fontClass = this.getFontClass();

        // Configurar refuerzo según nivel
        const showAudioByDefault = this.currentDifficulty <= 2;

        this.elements.instruction.innerText = 'Forma la palabra';

        let html = `<div class="animate-pop" style="display:flex; flex-direction:column; align-items:center; gap:1rem;">`;

        // Imagen siempre visible (refuerzo visual)
        html += `<div class="image-card" style="font-size:4rem; width:100px; height:100px;">${this.currentEmoji}</div>`;

        // Botones de refuerzo auditivo
        html += `<div class="audio-controls" style="display:flex; gap:0.75rem; flex-wrap:wrap; justify-content:center;">`;

        // Botón escuchar silabeado (siempre visible en N1-N2, opcional en N3)
        const syllabizedStyle = this.currentDifficulty <= 2 ? '' : 'opacity:0.7;';
        html += `<button class="audio-btn-small" onclick="speakSyllabizedWord()" style="${syllabizedStyle}" title="Escuchar por sílabas">
            🔊 <span style="font-size:0.8rem;">SI-LA-BA</span>
        </button>`;

        // Botón escuchar palabra completa
        html += `<button class="audio-btn-small" onclick="speakCurrentWord()" title="Escuchar palabra completa">
            🔊 <span style="font-size:0.8rem;">Palabra</span>
        </button>`;

        html += `</div>`;

        // Selector de sílabas
        html += this.renderDictadoSyllableSelector();

        html += `<p style="font-size:0.85rem; color:var(--neutral-400);">También puedes escribir en la pizarra →</p>`;
        html += `</div>`;

        this.elements.exerciseContainer.innerHTML = html;

        // Auto-reproducir silabeado en N1 y N2
        if (showAudioByDefault) {
            setTimeout(() => this.speakSyllabized(this.currentSilabas), 600);
        }
    }

    // Obtener vocabulario filtrado por nivel de dificultad para dictado
    getDictadoVocabulary() {
        const allWords = [
            ...this.vocabulary[1],
            ...this.vocabulary[2],
            ...this.vocabulary[3]
        ];

        switch (this.currentDifficulty) {
            case 1:
                // N1: Palabras de 1-2 sílabas
                return allWords.filter(w => w.silabas.length <= 2);
            case 2:
                // N2: Palabras de 3 sílabas
                return allWords.filter(w => w.silabas.length === 3);
            case 3:
                // N3: Palabras de 3-5 sílabas
                return allWords.filter(w => w.silabas.length >= 3);
            default:
                return allWords;
        }
    }

    speakSyllabizedWord() {
        this.speakSyllabized(this.currentSilabas);
    }

    genCopia() {
        this.setupDictadoSyllables();
        const fontClass = this.getFontClass();
        this.elements.instruction.innerText = 'Copia la palabra seleccionando las sílabas';

        let html = `<div class="animate-pop" style="display:flex; flex-direction:column; align-items:center; gap:1.5rem;">`;
        // Mostrar la palabra escrita con la fuente seleccionada (no el emoji)
        html += `<div class="model-word-large ${fontClass}">${this.formatWord(this.currentWord)}</div>`;
        html += this.renderDictadoSyllableSelector();
        html += `<p style="font-size:0.9rem; color:var(--neutral-400); margin-top:1rem;">También puedes escribir en la pizarra →</p>`;
        html += `</div>`;

        this.elements.exerciseContainer.innerHTML = html;
    }

    selectDictadoSyllable(syllable, element) {
        if (this.roundFinished) return;

        element.classList.add('selected-syllable');
        element.style.opacity = '0.4';
        element.style.pointerEvents = 'none';
        this.dictadoSelectedSyllables.push(syllable);

        const fontClass = this.getFontClass();
        const zone = document.getElementById('dictado-answer-zone');
        zone.innerHTML = this.dictadoSelectedSyllables.map(s =>
            `<div class="syllable-card ${fontClass}" style="cursor:default; background:var(--primary-light);">${this.formatWord(s)}</div>`
        ).join('');

        // Verificar si ha seleccionado suficientes sílabas
        if (this.dictadoSelectedSyllables.length === this.dictadoSyllables.length) {
            const formed = this.dictadoSelectedSyllables.join('');
            if (formed === this.currentWord) {
                this.handleSuccess();
            } else {
                zone.classList.add('shake');
                this.playSound('error');
                setTimeout(() => {
                    zone.classList.remove('shake');
                    this.dictadoSelectedSyllables = [];
                    zone.innerHTML = '';
                    // Resetear todas las sílabas
                    document.querySelectorAll('#dictado-syllable-container .syllable-card').forEach(c => {
                        c.classList.remove('selected-syllable');
                        c.style.opacity = '1';
                        c.style.pointerEvents = 'auto';
                    });
                }, 600);
            }
        }
    }

    genOraciones() {
        const sentences = [
            ['El', 'gato', 'come', 'pescado'],
            ['La', 'niña', 'juega', 'feliz'],
            ['El', 'perro', 'corre', 'rápido'],
            ['Mi', 'mamá', 'cocina', 'rico']
        ];

        const sentence = sentences[Math.floor(Math.random() * sentences.length)];
        this.targetSentence = sentence.join(' ');
        this.sentenceWords = sentence;
        this.selectedWords = [];

        const shuffled = [...sentence].sort(() => Math.random() - 0.5);
        const fontClass = this.getFontClass();

        this.elements.instruction.innerText = 'Ordena las palabras para formar una oración';

        let html = `<div class="animate-pop fullscreen-activity" style="display:flex; flex-direction:column; align-items:center; gap:2.5rem; width:100%;">`;
        html += `<div class="answer-zone large-zone" id="sentence-zone" style="min-width:80%;"></div>`;
        html += `<div style="display:flex; gap:1rem; flex-wrap:wrap; justify-content:center;">`;
        shuffled.forEach((word, i) => {
            html += `<div class="word-card large-card ${fontClass}" onclick="selectSyllable('${word}', this)" data-word="${word}">${this.formatWord(word)}</div>`;
        });
        html += `</div></div>`;

        this.elements.exerciseContainer.innerHTML = html;
    }

    // === CONCIENCIA FONOLÓGICA ===

    genInicial() {
        const letter = this.currentWord[0];
        const displayLetter = this.fontSettings.case === 'mayusculas' ? letter.toUpperCase() : letter.toLowerCase();

        // Opciones con acentos correctos
        const allLetters = this.fontSettings.case === 'mayusculas'
            ? 'ABCDEFGHIJKLMNÑOPQRSTUVWXYZ'
            : 'abcdefghijklmnñopqrstuvwxyz';

        const options = [displayLetter];
        while (options.length < 4) {
            const l = allLetters[Math.floor(Math.random() * allLetters.length)];
            if (!options.includes(l) && l.toLowerCase() !== letter.toLowerCase()) {
                options.push(l);
            }
        }
        options.sort(() => Math.random() - 0.5);
        this.correctInitial = displayLetter;

        const fontClass = this.getFontClass();
        this.elements.instruction.innerText = '¿Con qué letra empieza?';

        let html = `<div class="animate-pop fullscreen-activity" style="display:flex; flex-direction:column; align-items:center; gap:2.5rem;">`;
        html += `<div class="image-card large-card" style="font-size:5rem;">${this.currentEmoji}</div>`;
        html += `<div class="options-container">`;
        options.forEach(opt => {
            html += `<button class="option-btn letter-btn ${fontClass}" onclick="selectOption('${opt}')">${opt}</button>`;
        });
        html += `</div></div>`;

        this.elements.exerciseContainer.innerHTML = html;
    }

    genContarSilabas() {
        this.syllableCount = this.currentSilabas.length;
        this.currentCount = 0;

        const fontClass = this.getFontClass();
        this.elements.instruction.innerText = 'Toca una vez por cada sílaba';

        let html = `<div class="animate-pop fullscreen-activity" style="display:flex; flex-direction:column; align-items:center; gap:2.5rem;">`;
        html += `<div class="word-card large-model ${fontClass}" style="cursor:pointer;" onclick="speakCurrentWord()">${this.formatWord(this.currentWord)}</div>`;
        html += `<div class="image-card" style="font-size:4rem; cursor:pointer;" onclick="speakCurrentWord()">${this.currentEmoji}</div>`;
        html += `<div style="display:flex; gap:1rem;" id="count-circles">`;
        for (let i = 1; i <= 5; i++) {
            html += `<button class="count-btn large-count" onclick="countSyllable()">${i}</button>`;
        }
        html += `</div>`;
        html += `<button class="btn-game-action" onclick="checkSyllableCount()">COMPROBAR</button>`;
        html += `</div>`;

        this.elements.exerciseContainer.innerHTML = html;

        // DESACTIVADO: Lectura automática por petición del usuario
        // setTimeout(() => this.speakWord(this.currentWord), 300);
    }

    countSyllable() {
        this.currentCount++;
        const btns = document.querySelectorAll('.count-btn');
        if (this.currentCount <= btns.length) {
            btns[this.currentCount - 1].classList.add('active');
            this.playSound('tick');
        }
    }

    genRimas() {
        const ending = this.currentWord.slice(-2);
        const rhymes = this.vocabulary[this.currentDifficulty]
            .filter(v => v.word !== this.currentWord && v.word.endsWith(ending))
            .slice(0, 1);

        if (rhymes.length === 0) {
            rhymes.push({ word: this.currentWord.slice(0, -1) + 'o', emoji: '✨' });
        }

        const distractors = this.vocabulary[this.currentDifficulty]
            .filter(v => v.word !== this.currentWord && !v.word.endsWith(ending))
            .slice(0, 3);

        const options = [...rhymes, ...distractors].sort(() => Math.random() - 0.5);
        this.correctRhyme = rhymes[0].word;

        const fontClass = this.getFontClass();
        const difficulty = this.currentDifficulty;
        const currentEmoji = this.vocabulary[this.currentDifficulty].find(v => v.word === this.currentWord)?.emoji || '🎵';

        this.elements.instruction.innerText = '¿Qué palabra rima?';

        let html = `<div class="animate-pop fullscreen-activity" style="display:flex; flex-direction:column; align-items:center; gap:2.5rem;">`;
        html += `<div class="word-card large-model ${fontClass}" style="cursor:default; font-size:3rem; padding: 2rem;">
            <div>${currentEmoji}</div>
            <div style="margin-top:0.5rem;">${this.formatWord(this.currentWord)}</div>
        </div>`;

        html += `<div class="options-container">`;
        options.forEach(opt => {
            // Nivel 1: Mostrar emoji si disponible
            let content = this.formatWord(opt.word);
            if (difficulty === 1) {
                content = `<span style="font-size:1.5rem; display:block; margin-bottom:0.2rem;">${opt.emoji}</span>` + content;
            }

            html += `<button class="option-btn large-btn ${fontClass}" onclick="selectOption('${opt.word}')" style="height:auto; padding:1rem;">${content}</button>`;
        });
        html += `</div></div>`;

        this.elements.exerciseContainer.innerHTML = html;
    }

    genBuscaSilaba() {
        const targetSyllable = this.currentSilabas[0];
        const displaySyllable = this.fontSettings.case === 'mayusculas' ? targetSyllable.toUpperCase() : targetSyllable;
        this.targetSyllable = targetSyllable.toLowerCase();

        const matches = this.vocabulary[this.currentDifficulty]
            .filter(v => v.word.toLowerCase().includes(targetSyllable.toLowerCase()))
            .slice(0, 2);

        const nonMatches = this.vocabulary[this.currentDifficulty]
            .filter(v => !v.word.toLowerCase().includes(targetSyllable.toLowerCase()))
            .slice(0, 2);

        const options = [...matches, ...nonMatches].sort(() => Math.random() - 0.5);
        const fontClass = this.getFontClass();

        this.elements.instruction.innerText = 'Toca las palabras que tienen esta sílaba';

        let html = `<div class="animate-pop fullscreen-activity" style="display:flex; flex-direction:column; align-items:center; gap:2.5rem;">`;
        html += `<div class="syllable-card large-syllable ${fontClass}" style="cursor:default;">${displaySyllable}</div>`;
        html += `<div class="options-container">`;
        options.forEach(opt => {
            const hasIt = opt.word.toLowerCase().includes(targetSyllable.toLowerCase());
            html += `<button class="option-btn large-btn ${fontClass}" data-correct="${hasIt}" onclick="this.classList.add(this.dataset.correct === 'true' ? 'correct' : 'incorrect')">${this.formatWord(opt.word)}</button>`;
        });
        html += `</div></div>`;

        this.elements.exerciseContainer.innerHTML = html;
    }

    // === JUEGOS INTERACTIVOS ===

    genMemory() {
        const items = this.getRandomItems(4);
        this.memoryPairs = items;
        this.matchedPairs = 0;
        this.flippedCards = [];

        const cards = [];
        items.forEach((item, i) => {
            cards.push({ type: 'emoji', content: item.emoji, pairId: i });
            cards.push({ type: 'word', content: item.word, pairId: i });
        });

        this.memoryCards = cards.sort(() => Math.random() - 0.5);

        this.elements.instruction.innerText = 'Encuentra las parejas';
        this.renderMemory();
    }

    renderMemory() {
        const fontClass = this.getFontClass();
        let html = `<div class="memory-grid large-memory animate-pop">`;
        this.memoryCards.forEach((card, i) => {
            const flipped = this.flippedCards.includes(i) || card.matched;
            const matched = card.matched ? 'matched' : '';
            const content = flipped
                ? (card.type === 'emoji' ? card.content : `<span class="${fontClass}">${this.formatWord(card.content)}</span>`)
                : '?';
            html += `<div class="memory-card ${flipped ? 'flipped' : ''} ${matched}" onclick="flipCard(${i})">${content}</div>`;
        });
        html += `</div>`;
        this.elements.exerciseContainer.innerHTML = html;
    }

    flipCard(index) {
        if (this.roundFinished) return;
        if (this.flippedCards.length >= 2) return;
        if (this.flippedCards.includes(index)) return;
        if (this.memoryCards[index].matched) return;

        this.flippedCards.push(index);
        this.renderMemory();

        if (this.flippedCards.length === 2) {
            const [a, b] = this.flippedCards;
            if (this.memoryCards[a].pairId === this.memoryCards[b].pairId) {
                this.memoryCards[a].matched = true;
                this.memoryCards[b].matched = true;
                this.matchedPairs++;
                this.playSound('success');
                this.flippedCards = [];

                if (this.matchedPairs === this.memoryPairs.length) {
                    setTimeout(() => this.handleSuccess(), 500);
                }
            } else {
                this.playSound('error');
                setTimeout(() => {
                    this.flippedCards = [];
                    this.renderMemory();
                }, 1000);
            }
        }
    }

    genAhorcado() {
        const displayWord = this.fontSettings.case === 'mayusculas'
            ? this.currentWord.toUpperCase()
            : this.currentWord.toLowerCase();
        this.hangmanWord = displayWord;
        this.hangmanGuessed = [];
        this.hangmanErrors = 0;

        this.elements.instruction.innerText = 'Adivina la palabra';
        this.renderAhorcado();
    }

    renderAhorcado() {
        const fontClass = this.getFontClass();

        let wordDisplay = this.hangmanWord.split('').map(letter =>
            this.hangmanGuessed.includes(letter.toUpperCase()) || this.hangmanGuessed.includes(letter.toLowerCase())
                ? letter
                : '_'
        ).join(' ');

        const alphabet = this.fontSettings.case === 'mayusculas'
            ? 'ABCDEFGHIJKLMNÑOPQRSTUVWXYZ'
            : 'abcdefghijklmnñopqrstuvwxyz';

        let html = `<div class="animate-pop fullscreen-activity" style="display:flex; flex-direction:column; align-items:center; gap:1.5rem;">`;

        // Ahorcado visual
        html += `<svg width="120" height="140" viewBox="0 0 100 120">
            <line x1="20" y1="110" x2="80" y2="110" stroke="#1e293b" stroke-width="3"/>
            <line x1="30" y1="110" x2="30" y2="20" stroke="#1e293b" stroke-width="3"/>
            <line x1="30" y1="20" x2="60" y2="20" stroke="#1e293b" stroke-width="3"/>
            <line x1="60" y1="20" x2="60" y2="30" stroke="#1e293b" stroke-width="2"/>
            ${this.hangmanErrors > 0 ? '<circle cx="60" cy="40" r="10" fill="none" stroke="#64748b" stroke-width="2"/>' : ''}
            ${this.hangmanErrors > 1 ? '<line x1="60" y1="50" x2="60" y2="75" stroke="#64748b" stroke-width="2"/>' : ''}
            ${this.hangmanErrors > 2 ? '<line x1="60" y1="55" x2="45" y2="65" stroke="#64748b" stroke-width="2"/>' : ''}
            ${this.hangmanErrors > 3 ? '<line x1="60" y1="55" x2="75" y2="65" stroke="#64748b" stroke-width="2"/>' : ''}
            ${this.hangmanErrors > 4 ? '<line x1="60" y1="75" x2="45" y2="95" stroke="#64748b" stroke-width="2"/>' : ''}
            ${this.hangmanErrors > 5 ? '<line x1="60" y1="75" x2="75" y2="95" stroke="#64748b" stroke-width="2"/>' : ''}
        </svg>`;

        html += `<div class="hangman-word ${fontClass}" style="font-size:2.5rem; font-weight:800; letter-spacing:0.5rem;">${wordDisplay}</div>`;
        html += `<div class="image-card" style="width:70px; height:70px; font-size:2.5rem;">${this.currentEmoji}</div>`;

        html += `<div class="letter-grid ahorcado-keyboard ${fontClass}" style="grid-template-columns: repeat(9, 1fr); gap:6px;">`;
        alphabet.split('').forEach(letter => {
            const guessedUpper = this.hangmanGuessed.includes(letter.toUpperCase());
            const guessedLower = this.hangmanGuessed.includes(letter.toLowerCase());
            const used = guessedUpper || guessedLower;
            const inWord = this.hangmanWord.toUpperCase().includes(letter.toUpperCase());
            const cls = used ? (inWord ? 'found' : 'used') : '';
            html += `<div class="letter-cell ${cls}" style="width:40px; height:40px; font-size:1.1rem;" onclick="guessLetter('${letter}')">${letter}</div>`;
        });
        html += `</div></div>`;

        this.elements.exerciseContainer.innerHTML = html;
    }

    guessLetter(letter) {
        if (this.roundFinished) return;

        const upperLetter = letter.toUpperCase();
        const lowerLetter = letter.toLowerCase();

        if (this.hangmanGuessed.includes(upperLetter) || this.hangmanGuessed.includes(lowerLetter)) return;

        this.hangmanGuessed.push(upperLetter);
        this.hangmanGuessed.push(lowerLetter);

        const inWord = this.hangmanWord.toUpperCase().includes(upperLetter);

        if (inWord) {
            this.playSound('success');
            const won = this.hangmanWord.split('').every(l =>
                this.hangmanGuessed.includes(l.toUpperCase()) || this.hangmanGuessed.includes(l.toLowerCase())
            );
            if (won) {
                setTimeout(() => this.handleSuccess(), 300);
            }
        } else {
            this.hangmanErrors++;
            this.playSound('error');
            if (this.hangmanErrors >= 6) {
                this.elements.instruction.innerHTML = `<span class="feedback-error">¡Era: ${this.hangmanWord}!</span>`;
                this.roundFinished = true;
            }
        }

        this.renderAhorcado();
    }

    genClasificar() {
        const cat1 = 'animales';
        const cat2 = 'cosas';

        const words1 = this.categories[cat1].slice(0, 3);
        const words2 = this.categories[cat2].slice(0, 3);

        this.classifyWords = [...words1, ...words2].sort(() => Math.random() - 0.5);
        this.classifyCorrect = { [cat1]: words1, [cat2]: words2 };
        this.classified = { [cat1]: [], [cat2]: [] };
        this.selectedCategory = null;

        this.elements.instruction.innerText = 'Toca una categoría y luego arrastra las palabras';
        this.renderClasificar();
    }

    renderClasificar() {
        const fontClass = this.getFontClass();

        let html = `<div class="animate-pop fullscreen-activity" style="display:flex; flex-direction:column; align-items:center; gap:2rem; width:100%;">`;

        html += `<div style="display:flex; gap:1rem; flex-wrap:wrap; justify-content:center;">`;
        this.classifyWords.forEach(word => {
            if (!this.classified.animales.includes(word) && !this.classified.cosas.includes(word)) {
                html += `<div class="word-card ${fontClass}" onclick="selectWordForCategory('${word}')">${this.formatWord(word)}</div>`;
            }
        });
        html += `</div>`;

        html += `<div class="category-container">`;
        ['animales', 'cosas'].forEach(cat => {
            const isActive = this.selectedCategory === cat ? 'active' : '';
            html += `<div class="category-box category-${cat} ${isActive}" onclick="selectCategory('${cat}')">`;
            html += `<div class="category-title">${cat.toUpperCase()}</div>`;
            this.classified[cat].forEach(word => {
                html += `<div class="word-card ${fontClass}" style="font-size:1rem; padding:0.5rem;">${this.formatWord(word)}</div>`;
            });
            html += `</div>`;
        });
        html += `</div></div>`;

        this.elements.exerciseContainer.innerHTML = html;
    }

    selectCategory(category) {
        this.selectedCategory = category;
        this.renderClasificar();
    }

    selectWordForCategory(word) {
        if (!this.selectedCategory) {
            this.elements.instruction.innerText = '¡Primero toca una categoría!';
            return;
        }

        const correct = this.classifyCorrect[this.selectedCategory].includes(word);
        if (correct) {
            this.classified[this.selectedCategory].push(word);
            this.playSound('success');

            const total = this.classified.animales.length + this.classified.cosas.length;
            if (total === this.classifyWords.length) {
                setTimeout(() => this.handleSuccess(), 500);
            }
        } else {
            this.playSound('error');
            this.elements.instruction.innerHTML = `<span class="feedback-error">¡Esa palabra no va ahí!</span>`;
        }

        this.renderClasificar();
    }

    // === CARRERA DE SÍLABAS - MULTIJUGADOR ===

    genCarrera() {
        // Inicializar el modo carrera con 2 jugadores
        this.carreraPlayers = {
            1: { name: 'Jugador 1', score: 0, selectedSyllables: [], color: '#3b82f6' },
            2: { name: 'Jugador 2', score: 0, selectedSyllables: [], color: '#ec4899' }
        };
        this.carreraRound = 0;
        this.carreraMaxRounds = 5;
        this.carreraCurrentPlayer = null;
        this.carreraWinner = null;

        // Generar palabras para la carrera
        this.carreraWords = this.generateCarreraWords();

        this.elements.instruction.innerText = '🏁 ¡CARRERA DE SÍLABAS! - 2 Jugadores';
        this.renderCarreraStart();
    }

    generateCarreraWords() {
        const allWords = [
            ...this.vocabulary[1].filter(w => w.silabas.length >= 2),
            ...this.vocabulary[2]
        ];
        // Seleccionar palabras aleatorias para cada ronda
        const shuffled = allWords.sort(() => Math.random() - 0.5);
        return shuffled.slice(0, this.carreraMaxRounds);
    }

    renderCarreraStart() {
        let html = `<div class="animate-pop carrera-container">`;
        html += `<div class="carrera-title">🏁 CARRERA DE SÍLABAS 🏁</div>`;
        html += `<div class="carrera-subtitle">¡Forma la palabra antes que tu rival!</div>`;
        html += `<div class="carrera-players-preview">`;
        html += `<div class="carrera-player-preview p1">
            <span class="player-icon">👤</span>
            <span>JUGADOR 1</span>
        </div>`;
        html += `<div class="carrera-vs">VS</div>`;
        html += `<div class="carrera-player-preview p2">
            <span class="player-icon">👤</span>
            <span>JUGADOR 2</span>
        </div>`;
        html += `</div>`;
        html += `<button class="btn-start-race" onclick="startCarreraRound()">¡EMPEZAR!</button>`;
        html += `</div>`;

        this.elements.exerciseContainer.innerHTML = html;
    }

    startCarreraRound() {
        if (this.carreraRound >= this.carreraMaxRounds) {
            this.showCarreraResults();
            return;
        }

        const wordData = this.carreraWords[this.carreraRound];
        this.carreraCurrentWord = wordData.word;
        this.carreraCurrentSyllables = wordData.silabas;
        this.carreraCurrentEmoji = wordData.emoji;

        // Reset de sílabas seleccionadas
        this.carreraPlayers[1].selectedSyllables = [];
        this.carreraPlayers[2].selectedSyllables = [];

        // Generar sílabas mezcladas con intrusas
        const correctSylls = [...this.carreraCurrentSyllables];
        const distractors = this.getCarreraDistractors(correctSylls, 2);
        this.carreraAllSyllables = [...correctSylls, ...distractors].sort(() => Math.random() - 0.5);

        this.renderCarreraGame();
    }

    getCarreraDistractors(exclude, count) {
        const commonSyllables = ['pa', 'pe', 'pi', 'po', 'pu', 'ma', 'me', 'mi', 'mo', 'mu',
            'ta', 'te', 'ti', 'to', 'tu', 'la', 'le', 'li', 'lo', 'lu',
            'sa', 'se', 'si', 'so', 'su', 'na', 'ne', 'ni', 'no', 'nu',
            'ca', 'co', 'cu', 'ra', 're', 'ri', 'ro', 'ru'];
        const available = commonSyllables.filter(s => !exclude.includes(s));
        const shuffled = available.sort(() => Math.random() - 0.5);
        return shuffled.slice(0, count);
    }

    renderCarreraGame() {
        const fontClass = this.getFontClass();
        const round = this.carreraRound + 1;

        this.elements.instruction.innerHTML = `
            <span style="color:#3b82f6;">JUGADOR 1: ${this.carreraPlayers[1].score}</span>
            <span style="margin:0 1rem;">|</span>
            Ronda ${round}/${this.carreraMaxRounds}
            <span style="margin:0 1rem;">|</span>
            <span style="color:#ec4899;">JUGADOR 2: ${this.carreraPlayers[2].score}</span>
        `;

        let html = `<div class="carrera-split-screen">`;

        // Panel Jugador 1
        html += `<div class="carrera-panel player1-panel">`;
        html += `<div class="carrera-panel-header p1">JUGADOR 1 👤</div>`;
        html += `<div class="carrera-target">${this.carreraCurrentEmoji}</div>`;
        html += `<div class="carrera-answer-zone" id="carrera-zone-1">`;
        this.carreraPlayers[1].selectedSyllables.forEach(s => {
            html += `<span class="carrera-selected-syl ${fontClass}">${this.formatWord(s)}</span>`;
        });
        html += `</div>`;
        html += `<div class="carrera-syllables">`;
        this.carreraAllSyllables.forEach((syl, i) => {
            const used = this.carreraPlayers[1].selectedSyllables.includes(syl);
            const usedClass = used ? 'used' : '';
            html += `<button class="carrera-syl-btn ${fontClass} ${usedClass}" 
                onclick="selectCarreraSyllable(1, '${syl}')" 
                ${used ? 'disabled' : ''}>${this.formatWord(syl)}</button>`;
        });
        html += `</div>`;
        html += `</div>`;

        // Separador central
        html += `<div class="carrera-divider"><div class="carrera-divider-line"></div></div>`;

        // Panel Jugador 2
        html += `<div class="carrera-panel player2-panel">`;
        html += `<div class="carrera-panel-header p2">👤 JUGADOR 2</div>`;
        html += `<div class="carrera-target">${this.carreraCurrentEmoji}</div>`;
        html += `<div class="carrera-answer-zone" id="carrera-zone-2">`;
        this.carreraPlayers[2].selectedSyllables.forEach(s => {
            html += `<span class="carrera-selected-syl ${fontClass}">${this.formatWord(s)}</span>`;
        });
        html += `</div>`;
        html += `<div class="carrera-syllables">`;
        this.carreraAllSyllables.forEach((syl, i) => {
            const used = this.carreraPlayers[2].selectedSyllables.includes(syl);
            const usedClass = used ? 'used' : '';
            html += `<button class="carrera-syl-btn ${fontClass} ${usedClass}" 
                onclick="selectCarreraSyllable(2, '${syl}')" 
                ${used ? 'disabled' : ''}>${this.formatWord(syl)}</button>`;
        });
        html += `</div>`;
        html += `</div>`;

        html += `</div>`;

        this.elements.exerciseContainer.innerHTML = html;
    }

    selectCarreraSyllable(player, syllable) {
        if (this.carreraWinner) return;

        const playerData = this.carreraPlayers[player];

        // Verificar longitud para no exceder
        if (playerData.selectedSyllables.length >= this.carreraCurrentSyllables.length) return;

        playerData.selectedSyllables.push(syllable);

        // Renderizar siempre primero
        this.renderCarreraGame();

        // Verificar si completó la palabra
        if (playerData.selectedSyllables.length === this.carreraCurrentSyllables.length) {
            const formed = playerData.selectedSyllables.join('');
            if (formed === this.carreraCurrentWord) {
                // ¡Ganó esta ronda!
                this.carreraWinner = player;

                setTimeout(() => {
                    playerData.score++;
                    this.playSound('applause');

                    // Mostrar feedback de victoria
                    const panel = document.querySelector(`.player${player}-panel`);
                    if (panel) {
                        panel.classList.add('winner-flash');
                    }

                    setTimeout(() => {
                        this.carreraRound++;
                        this.carreraWinner = null;
                        this.startCarreraRound();
                    }, 1500);
                }, 500); // Retardo para ver la palabra completa

                return;
            } else {
                // Error, reset sílabas de este jugador tras retardo
                this.playSound('error');
                setTimeout(() => {
                    playerData.selectedSyllables = [];
                    this.renderCarreraGame();
                }, 500);
            }
        }
    }

    showCarreraResults() {
        const p1 = this.carreraPlayers[1];
        const p2 = this.carreraPlayers[2];

        let winner, message;
        if (p1.score > p2.score) {
            winner = 1;
            message = '🎉 ¡JUGADOR 1 GANA! 🎉';
        } else if (p2.score > p1.score) {
            winner = 2;
            message = '🎉 ¡JUGADOR 2 GANA! 🎉';
        } else {
            winner = 0;
            message = '🤝 ¡EMPATE! 🤝';
        }

        let html = `<div class="animate-pop carrera-results">`;
        html += `<div class="carrera-results-title">${message}</div>`;
        html += `<div class="carrera-final-scores">`;
        html += `<div class="carrera-score-card ${winner === 1 ? 'winner' : ''} p1">
            <div class="player-icon-big">👤</div>
            <div>JUGADOR 1</div>
            <div class="score-big">${p1.score}</div>
        </div>`;
        html += `<div class="carrera-score-card ${winner === 2 ? 'winner' : ''} p2">
            <div class="player-icon-big">👤</div>
            <div>JUGADOR 2</div>
            <div class="score-big">${p2.score}</div>
        </div>`;
        html += `</div>`;
        html += `<button class="btn-start-race" onclick="restartCarrera()">🔄 JUGAR DE NUEVO</button>`;
        html += `</div>`;

        this.elements.exerciseContainer.innerHTML = html;
    }

    restartCarrera() {
        this.genCarrera();
    }

    // === ADIVINANZAS (EDUCACIÓN LITERARIA) ===

    genAdivinanzas() {
        // Seleccionar adivinanza aleatoria
        const random = this.adivinanzas[Math.floor(Math.random() * this.adivinanzas.length)];
        this.currentAdivinanza = random;
        this.elements.instruction.innerText = 'Lee la adivinanza y toca la respuesta correcta';

        const fontClass = this.getFontClass();
        const difficulty = this.currentDifficulty;

        let html = `<div class="animate-pop" style="display:flex; flex-direction:column; align-items:center; gap:2rem; width:100%;">`;

        // Texto de la adivinanza
        html += `<div class="adivinanza-card ${fontClass}">
            <p style="white-space: pre-line; line-height: 1.6;">${random.texto}</p>
        </div>`;

        // Preparar opciones según nivel
        let currentOptions = JSON.parse(JSON.stringify(random.opciones)); // Deep copy para no mutar original

        // Nivel 3: Añadir un distractor extra
        if (difficulty === 3) {
            const pool = [...this.vocabulary[1], ...this.vocabulary[2]];
            let extraWord = pool[Math.floor(Math.random() * pool.length)].word;
            // Asegurar que no esté ya en las opciones
            while (currentOptions.some(o => o.texto === extraWord)) {
                extraWord = pool[Math.floor(Math.random() * pool.length)].word;
            }
            // Añadir como objeto
            currentOptions.push({ texto: extraWord, emoji: '❓' });
            // Mezclar
            currentOptions.sort(() => Math.random() - 0.5);
        }

        // Opciones HTML
        html += `<div style="display:flex; gap:1.5rem; justify-content:center; flex-wrap:wrap;">`;
        currentOptions.forEach(opt => {
            let emojiDisplay = '';

            // Nivel 1: Mostrar emoji siempre (ahora viene en los datos)
            if (difficulty === 1) {
                emojiDisplay = `<span style="font-size:2rem; margin-bottom:0.5rem;">${opt.emoji}</span>`;
            }

            html += `<div class="word-card ${fontClass}" onclick="selectAdivinanzaOption('${opt.texto}')" style="display:flex; flex-direction:column; align-items:center;">
                ${emojiDisplay}
                <span>${this.formatWord(opt.texto)}</span>
            </div>`;
        });
        html += `</div></div>`;

        this.elements.exerciseContainer.innerHTML = html;
    }

    selectAdivinanzaOption(option) {
        if (this.roundFinished) return;

        if (option === this.currentAdivinanza.respuesta) {
            this.speak(this.randomPraise());
            this.launchConfetti();
            this.roundFinished = true;
            setTimeout(() => this.showSuccessModal(), 1500);
        } else {
            this.speak('Inténtalo de nuevo');
            this.playSound('boing');
        }
    }

    // === ORDENA EL CUENTO (SECUENCIACIÓN NARRATIVA) ===

    genOrdenaCuento() {
        if (!this.currentCuentoIndex) this.currentCuentoIndex = 0;
        const index = this.currentCuentoIndex % this.cuentos.length;
        const randomCuento = this.cuentos[index];
        const difficulty = this.currentDifficulty;

        // Seleccionar partes según dificultad
        let partesOrigen = randomCuento.partes; // Default N1
        if (difficulty === 2 && randomCuento.partesN2) partesOrigen = randomCuento.partesN2;
        if (difficulty === 3 && randomCuento.partesN3) partesOrigen = randomCuento.partesN3;

        this.currentCuento = { ...randomCuento, partes: partesOrigen };
        this.cuentoPartes = [...this.currentCuento.partes].sort(() => Math.random() - 0.5);
        this.cuentoUserOrder = [];
        this.cuentoUserOrder = new Array(this.currentCuento.partes.length).fill(null);
        // Reset a array vacío para ir haciendo push en orden secuencial como estaba antes?
        // Revisando selectCuentoParte, usa push. Así que debe empezar vacío.
        this.cuentoUserOrder = []; // Correcto.

        this.elements.instruction.innerText = `Ordena la historia: "${this.currentCuento.titulo}"`;
        this.renderOrdenaCuento();
    }

    renderOrdenaCuento() {
        const fontClass = this.getFontClass();
        const difficulty = this.currentDifficulty;

        let html = `<div class="animate-pop" style="display:flex; flex-direction:column; align-items:center; gap:2rem; width:80%;">`;

        // Zona de orden (huecos)
        html += `<div style="display:flex; flex-direction:column; gap:1rem; width:100%;">`;
        this.currentCuento.partes.forEach((_, i) => {
            const placed = this.cuentoUserOrder[i];
            if (placed) {
                // Control de visualización de emoji según dificultad
                let emojiStyle = 'font-size:1.5rem; margin-right:1rem;';
                if (difficulty === 2) emojiStyle = 'font-size:1rem; margin-right:0.5rem;';
                if (difficulty === 3) emojiStyle = 'display:none;';

                html += `<div class="story-part placed">
                    <span class="story-num">${i + 1}</span>
                    <div class="story-content ${fontClass}">
                        <span style="${emojiStyle}">${placed.emoji}</span>
                        <span>${placed.texto}</span>
                    </div>
                </div>`;
            } else {
                html += `<div class="story-part empty">
                    <span class="story-num">${i + 1}</span>
                    <div class="story-placeholder">Toca una frase abajo</div>
                </div>`;
            }
        });
        html += `</div>`;

        // Opciones desordenadas
        html += `<div style="display:flex; flex-direction:column; gap:0.5rem; width:100%; margin-top:1rem;">`;
        this.cuentoPartes.forEach((part, i) => {
            // Solo mostrar si no ha sido seleccionada
            if (!this.cuentoUserOrder.includes(part)) {
                // Control de visualización de emoji
                let emojiStyle = 'font-size:1.5rem; margin-right:1rem;';
                if (difficulty === 2) emojiStyle = 'font-size:1rem; margin-right:0.5rem;';
                if (difficulty === 3) emojiStyle = 'display:none;';

                html += `<div class="story-option ${fontClass}" onclick="selectCuentoParte(${i})">
                    <span style="${emojiStyle}">${part.emoji}</span>
                    <span>${part.texto}</span>
                </div>`;
            }
        });
        html += `</div></div>`;

        this.elements.exerciseContainer.innerHTML = html;
    }

    selectCuentoParte(index) {
        if (this.roundFinished) return;

        const part = this.cuentoPartes[index];
        const currentStep = this.cuentoUserOrder.length;

        // Verificar si es la parte correcta para este paso (1, 2, 3)
        if (part.orden === currentStep + 1) {
            this.playSound('pop');
            this.cuentoUserOrder.push(part);

            if (this.cuentoUserOrder.length === this.currentCuento.partes.length) {
                this.playSound('success');
                setTimeout(() => {
                    this.elements.exerciseContainer.innerHTML = `
                        <div class="animate-pop" style="text-align:center;">
                            <h2 style="font-size:2rem; color:var(--primary);">¡Historia completada!</h2>
                            <button class="btn-start-race" onclick="nextCuento()" style="margin-top:2rem;">SIGUIENTE CUENTO ▶</button>
                        </div>
                    `;
                }, 1000);
            } else {
                this.renderOrdenaCuento();
            }
        } else {
            this.playSound('error');
            this.elements.instruction.innerHTML = `<span class="feedback-error">Esa parte no va ahí todavía...</span>`;
        }
    }

    nextCuento() {
        this.currentCuentoIndex++;
        this.genOrdenaCuento();
    }

    // === EQUIPO COLABORATIVO (2 JUGADORES) ===

    genEquipo() {
        this.equipoPlayers = {
            1: { color: '#3b82f6', syllables: [] },
            2: { color: '#ec4899', syllables: [] }
        };
        this.equipoCurrentWordObj = null;
        this.equipoTargetSyllables = [];
        this.equipoBuiltSyllables = [];

        // Seleccionar palabra larga (nivel 2 o 3)
        const pool = [...this.vocabulary[2], ...this.vocabulary[3]];
        this.equipoCurrentWordObj = pool[Math.floor(Math.random() * pool.length)];
        this.equipoTargetSyllables = this.equipoCurrentWordObj.silabas;

        // Repartir sílabas entre jugadores
        const allSylls = [...this.equipoTargetSyllables];
        // Añadir algunos distractores
        const distractors = this.getCarreraDistractors(allSylls, 2); // Reutilizamos función de carrera
        const poolToDistribute = [...allSylls, ...distractors].sort(() => Math.random() - 0.5);

        poolToDistribute.forEach((syl, i) => {
            // Reparto alterno
            const player = (i % 2) + 1;
            this.equipoPlayers[player].syllables.push({ text: syl, used: false });
        });

        this.elements.instruction.innerText = '¡Trabajo en equipo! Construid la palabra juntos.';
        this.renderEquipoGame();
    }

    renderEquipoGame() {
        const fontClass = this.getFontClass();

        let html = `<div class="carrera-split-screen">`;

        // Panel Jugador 1
        html += `<div class="carrera-panel player1-panel">`;
        html += `<div class="carrera-panel-header p1">JUGADOR 1</div>`;
        html += `<div class="carrera-syllables">`;
        this.equipoPlayers[1].syllables.forEach(s => {
            const style = s.used ? 'opacity:0.3; pointer-events:none;' : '';
            html += `<button class="carrera-syl-btn ${fontClass}" style="${style}" onclick="selectEquipoSyllable(1, '${s.text}')">${this.formatWord(s.text)}</button>`;
        });
        html += `</div>`;
        html += `</div>`;

        // Zona Central Compartida
        html += `<div class="equipo-center-zone" style="flex:1.5; display:flex; flex-direction:column; align-items:center; background:white; padding:1rem; border-left:4px solid #3b82f6; border-right:4px solid #ec4899; box-shadow: inset 0 0 20px rgba(0,0,0,0.05);">`;
        html += `<div style="font-size:5rem; margin-bottom:1rem;">${this.equipoCurrentWordObj.emoji}</div>`;

        // Zona de respuesta compartida
        html += `<div class="carrera-answer-zone" style="min-width:90%; min-height:80px; margin-bottom:1rem;">`;
        this.equipoBuiltSyllables.forEach(s => {
            const pColor = s.player === 1 ? '#3b82f6' : '#ec4899';
            const bg = s.player === 1 ? '#dbeafe' : '#fce7f3';
            html += `<span class="carrera-selected-syl ${fontClass}" style="border:2px solid ${pColor}; background:${bg};">${this.formatWord(s.text)}</span>`;
        });

        // Placeholder próxima sílaba
        if (this.equipoBuiltSyllables.length < this.equipoTargetSyllables.length) {
            html += `<div style="width:50px; height:50px; border:2px dashed #ccc; border-radius:8px; display:flex; align-items:center; justify-content:center; color:#ccc;">?</div>`;
        }

        html += `</div>`;

        // Mensaje de estado
        const nextIndex = this.equipoBuiltSyllables.length;
        if (nextIndex < this.equipoTargetSyllables.length) {
            // Buscar quién tiene la siguiente sílaba (solo para ayuda visual debug, pero en juego real no se dice)
            html += `<p style="color:#666;">Buscad: <strong>${this.equipoTargetSyllables[nextIndex].toUpperCase()}</strong></p>`;
        }

        html += `</div>`; // Fin center zone

        // Panel Jugador 2
        html += `<div class="carrera-panel player2-panel">`;
        html += `<div class="carrera-panel-header p2">JUGADOR 2</div>`;
        html += `<div class="carrera-syllables">`;
        this.equipoPlayers[2].syllables.forEach(s => {
            const style = s.used ? 'opacity:0.3; pointer-events:none;' : '';
            html += `<button class="carrera-syl-btn ${fontClass}" style="${style}" onclick="selectEquipoSyllable(2, '${s.text}')">${this.formatWord(s.text)}</button>`;
        });
        html += `</div>`;
        html += `</div>`;

        html += `</div>`;

        this.elements.exerciseContainer.innerHTML = html;
    }

    selectEquipoSyllable(player, syllable) {
        // Verificar si es la sílaba correcta en el orden correcto
        const currentIndex = this.equipoBuiltSyllables.length;
        const targetSyllable = this.equipoTargetSyllables[currentIndex];

        if (syllable === targetSyllable) {
            this.playSound('pop');
            this.equipoBuiltSyllables.push({ text: syllable, player: player });

            // Marcar sílaba como usada
            const pSylls = this.equipoPlayers[player].syllables;
            // Solo marcar la primera ocurrencia no usada
            const sIdx = pSylls.findIndex(s => s.text === syllable && !s.used);
            if (sIdx !== -1) pSylls[sIdx].used = true;

            // Renderizar siempre para ver la sílaba colocada
            this.renderEquipoGame();

            // Verificar victoria
            if (this.equipoBuiltSyllables.length === this.equipoTargetSyllables.length) {
                this.playSound('applause');
                // Retrasar feedback final para ver la palabra completa
                setTimeout(() => {
                    this.elements.instruction.innerHTML = `<span class="feedback-success">¡EQUIPO GANADOR! 🎉</span>`;
                    setTimeout(() => {
                        this.startEquipoRound(); // Inicia otra
                    }, 2000);
                }, 500);
            }
        } else {
            this.playSound('error');
            // Feedback visual simple
            const panel = document.querySelector(`.player${player}-panel`);
            if (panel) {
                panel.style.backgroundColor = '#fee2e2'; // Rojo suave momentáneo
                setTimeout(() => {
                    panel.style.backgroundColor = ''; // Volver al gradiente CSS (se perderá el inline style)
                    this.renderEquipoGame(); // Re-render para limpiar estilos
                }, 300);
            }
        }
    }

    startEquipoRound() {
        this.genEquipo();
    }

    restartEquipo() {
        this.genEquipo();
    }

    selectOption(option) {
        if (this.roundFinished) return;

        let correct = false;
        if (this.gameMode === 'comprension') {
            correct = option === this.comprensionCorrect;
        } else if (this.gameMode === 'inicial') {
            correct = option.toLowerCase() === this.correctInitial.toLowerCase();
        } else if (this.gameMode === 'rimas') {
            correct = option === this.correctRhyme;
        }

        const btns = document.querySelectorAll('.option-btn');
        btns.forEach(btn => {
            const btnText = btn.innerText.toLowerCase();
            const optText = option.toLowerCase();
            if (btnText === optText) {
                btn.classList.add(correct ? 'correct' : 'incorrect');
            }
        });

        if (correct) {
            this.handleSuccess();
        } else {
            this.playSound('error');
        }
    }

    handleSuccess() {
        this.roundFinished = true;
        this.score += 10;
        this.reportToPortal(true);
        this.elements.score.innerText = this.score;
        this.elements.instruction.innerHTML = `<span class="feedback-success">¡EXCELENTE! ⭐</span>`;
        this.playSound('applause');
    }

    checkWriting() {
        if (!this.hasDrawn) {
            this.elements.instruction.innerHTML = `<span class="feedback-error">¡Escribe algo primero!</span>`;
            this.playSound('error');
            this.reportToPortal(false);
            return;
        }

        this.elements.instruction.innerHTML = `<span class="feedback-success">¡Muy bien! La palabra era: ${this.formatWord(this.currentWord)}</span>`;
        this.score += 10;
        this.reportToPortal(true);
        this.elements.score.innerText = this.score;
        this.roundFinished = true;
        this.playSound('applause');
    }

    getRandomWords(count) {
        const vocab = this.vocabulary[this.currentDifficulty];
        const shuffled = [...vocab].sort(() => Math.random() - 0.5);
        return shuffled.slice(0, count).map(v => v.word);
    }

    getRandomItems(count) {
        const vocab = this.vocabulary[this.currentDifficulty];
        const shuffled = [...vocab].sort(() => Math.random() - 0.5);
        return shuffled.slice(0, count);
    }

    speakWord(word) {
        if (!word) return;
        if ('speechSynthesis' in window) {
            window.speechSynthesis.cancel();
            const utterance = new SpeechSynthesisUtterance(word);
            utterance.lang = 'es-ES';
            utterance.rate = 0.7;
            utterance.pitch = 1.1;
            window.speechSynthesis.speak(utterance);
        }
    }

    // Lectura silabeada con pausas entre sílabas
    speakSyllabized(syllables) {
        if (!syllables || syllables.length === 0) return;
        if (!('speechSynthesis' in window)) return;

        window.speechSynthesis.cancel();
        let delay = 0;

        syllables.forEach((syllable, index) => {
            setTimeout(() => {
                const utterance = new SpeechSynthesisUtterance(syllable);
                utterance.lang = 'es-ES';
                utterance.rate = 0.6;
                utterance.pitch = 1.2;
                window.speechSynthesis.speak(utterance);
            }, delay);
            delay += 700; // Pausa de 700ms entre sílabas
        });
    }

    playSound(type) {
        try {
            const audioContext = new (window.AudioContext || window.webkitAudioContext)();
            const oscillator = audioContext.createOscillator();
            const gainNode = audioContext.createGain();

            oscillator.connect(gainNode);
            gainNode.connect(audioContext.destination);

            if (type === 'success' || type === 'applause') {
                oscillator.frequency.value = 523.25;
                gainNode.gain.value = 0.1;
            } else if (type === 'error') {
                oscillator.frequency.value = 200;
                gainNode.gain.value = 0.1;
            } else {
                oscillator.frequency.value = 440;
                gainNode.gain.value = 0.05;
            }

            oscillator.start();
            setTimeout(() => {
                oscillator.stop();
                audioContext.close();
            }, type === 'applause' ? 300 : 150);
        } catch (e) {
            // Silenciar errores de audio
        }
    }

    // === CANVAS ===

    initCanvas() {
        const canvas = this.elements.canvas;
        if (!canvas) return;

        canvas.addEventListener('mousedown', (e) => this.startDrawing(e));
        canvas.addEventListener('mousemove', (e) => this.draw(e));
        canvas.addEventListener('mouseup', () => this.stopDrawing());
        canvas.addEventListener('mouseout', () => this.stopDrawing());

        // Touch events
        canvas.addEventListener('touchstart', (e) => {
            e.preventDefault();
            this.startDrawing(e.touches[0]);
        });
        canvas.addEventListener('touchmove', (e) => {
            e.preventDefault();
            this.draw(e.touches[0]);
        });
        canvas.addEventListener('touchend', () => this.stopDrawing());

        this.resizeCanvas();
    }

    resizeCanvas() {
        const canvas = this.elements.canvas;
        if (!canvas) return;

        const wrapper = canvas.parentElement;
        if (!wrapper) return;

        const rect = wrapper.getBoundingClientRect();
        canvas.width = rect.width;
        canvas.height = rect.height;

        const ctx = this.elements.ctx;
        if (ctx) {
            ctx.lineCap = 'round';
            ctx.lineJoin = 'round';
            ctx.lineWidth = 6;
            ctx.strokeStyle = this.penColor;
        }
    }

    startDrawing(e) {
        this.isDrawing = true;
        this.hasDrawn = true;
        const rect = this.elements.canvas.getBoundingClientRect();
        this.lastX = e.clientX - rect.left;
        this.lastY = e.clientY - rect.top;
    }

    draw(e) {
        if (!this.isDrawing) return;

        const ctx = this.elements.ctx;
        const rect = this.elements.canvas.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        ctx.beginPath();
        ctx.moveTo(this.lastX, this.lastY);
        ctx.lineTo(x, y);
        ctx.strokeStyle = this.penColor;
        ctx.stroke();

        this.lastX = x;
        this.lastY = y;
    }

    stopDrawing() {
        this.isDrawing = false;
    }

    clearCanvas() {
        const canvas = this.elements.canvas;
        const ctx = this.elements.ctx;
        if (canvas && ctx) {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
        }
        this.hasDrawn = false;
    }

    setPenColor(color) {
        this.penColor = color;
        document.querySelectorAll('.pen-btn').forEach(btn => btn.classList.remove('active'));
        if (color === '#1e293b') document.querySelector('.pen-black')?.classList.add('active');
        else if (color === '#3b82f6') document.querySelector('.pen-blue')?.classList.add('active');
        else if (color === '#ef4444') document.querySelector('.pen-red')?.classList.add('active');
    }
}

// Función para verificar conteo de sílabas
window.checkSyllableCount = function () {
    const app = window.app;
    if (app.currentCount === app.syllableCount) {
        app.handleSuccess();
    } else {
        app.playSound('error');
        app.elements.instruction.innerHTML = `<span class="feedback-error">Tiene ${app.syllableCount} sílaba${app.syllableCount > 1 ? 's' : ''}. ¡Inténtalo!</span>`;
        app.currentCount = 0;
        document.querySelectorAll('.count-btn').forEach(btn => btn.classList.remove('active'));
    }
};


// Inicializar aplicación
const app = new LectoApp();
window.app = app;
