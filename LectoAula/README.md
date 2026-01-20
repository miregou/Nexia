# 📚 LectoAula - Lectoescritura 1º Primaria

Módulo de lectoescritura interactiva para primer curso de educación primaria. Puede usarse de forma independiente o integrado en el NexiaPortal.

---

## 🎯 Actividades Disponibles

### Lectura
- **Sopa de Letras:** Búsqueda visual de letras en cuadrícula
- **Une Palabra:** Asociación imagen-palabra
- **Comprensión:** Lectura de frases y validación con imágenes  
- **Ordena Sílabas:** Construcción de palabras ordenando sílabas
- **Ordena Cuento:** Secuenciación de viñetas narrativas

### Escritura
- **Dictado:** Escucha y escritura de palabras en pizarra
- **Copia:** Reproducción de palabras modelo
- **Oraciones:** Construcción de frases con palabras desordenadas
- **Completa:** Completar palabras con sílabas faltantes

### Fonología
- **Letra Inicial:** Identificar la primera letra de una palabra
- **Contar Sílabas:** Segmentación silábica
- **Rimas:** Identificación de palabras que riman
- **Busca Sílaba:** Localizar palabras que contienen una sílaba concreta

### Juegos
- **Memory:** Memoria de parejas imagen-palabra
- **Ahorcado:** Adivinar palabras letra por letra
- **Clasificar:** Categorización semántica
- **Carrera 2P:** Competición de completar palabras (2 jugadores)
- **Equipo 2P:** Cooperativa para construir palabras (2 jugadores)
- **Adivinanzas:** Resolución de adivinanzas y escritura de respuestas

### Herramientas
- **Pizarra de Escritura:** Canvas con pautas Montessori, 3 colores de lápiz

---

## 🎓 Currículo LOMLOE

Competencias trabajadas:
- **Conciencia fonológica:** Sílabas, rimas, sonidos iniciales
- **Vocabulario:** Ampliación léxica por campos semánticos
- **Lectura:** Decodificación, comprensión lectora
- **Escritura:** Trazado, composición de palabras y frases
- **Expresión:** Comunicación escrita funcional

---

## 🎮 Características

- ✅ 3 niveles de dificultad por actividad
- ✅ Sistema de puntuación y feedback auditivo
- ✅ Pizarra táctil con pautas de escritura
- ✅ Configuración de tipo de letra (escolar, ligada, redonda, arial)
- ✅ Mayúsculas/minúsculas seleccionables
- ✅ Síntesis de voz para lectura de enunciados
- ✅ Responsive para tablets y pizarras digitales

---

## 📁 Estructura de Archivos

```
LectoAula/
├── index.html              # Página principal
├── js/
│   └── app.js              # Lógica de la aplicación
├── css/
│   ├── styles.css          # Estilos principales
│   └── responsive.css      # Adaptación a pizarras digitales
└── README.md               # Este archivo
```

---

## 🚀 Uso

### Modo Standalone
Abrir directamente `index.html` en un navegador web.

### Integrado en Portal
El módulo se carga dentro de un iframe desde NexiaPortal y comunica resultados via `postMessage`.

---

## 🎨 Configuración de Fuente

Los usuarios pueden elegir entre 4 tipos de letra:
- **Escolar:** Fuente educativa sin remates (Nunito)
- **Ligada:** Escritura cursiva (Playwrite ES)
- **Redonda:** Manuscrita informal (Caveat)
- **Arial:** Palo seco estándar

Además se puede alternar entre mayúsculas y minúsculas para todas las actividades.

---

## 🛠️ Desarrollo

### Añadir una Nueva Actividad

1. Añadir la tarjeta en el menú (HTML):
```html
<div class="menu-card" onclick="startActivity('nueva')">
    <span class="menu-title">Nueva Actividad</span>
</div>
```

2. Implementar la lógica en `js/app.js`:
```javascript
if (mode === 'nueva') {
    this.generateExerciseNueva();
}
```

3. Añadir al currículo LOMLOE si aplica

---

## 📄 Licencia

© 2026 Nexia Educación - Parte del proyecto CHUS
