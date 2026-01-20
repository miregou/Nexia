# 🎓 CHUS - Nexia Educación

**Plataforma educativa integral para 1º de Primaria**

Sistema completo de aprendizaje de matemáticas y lectoescritura diseñado para entornos educativos, compatible con pizarras digitales, tablets y ordenadores.

---

## 📦 Contenido del Proyecto

Este proyecto contiene tres módulos principales:

### 🏫 **NexiaPortal**
Portal principal que integra los módulos de MateAula y LectoAula. Incluye:
- Sistema de gestión de alumnos
- Seguimiento de progreso y evolución
- Ranking y gamificación
- Generador de fichas PDF
- Configuración de accesibilidad

### 🔢 **MateAula**
Aplicación de matemáticas con 12 actividades interactivas:
- Operaciones: Sumas, Restas, Comparar
- Numeración: Lectura de números, Bloques base 10, Anterior/Posterior
- Lógica: Vecinos, Puzzle, Camino
- Representación: Batido de números, Reloj
- Pizarra mágica interactiva con apoyo visual

### 📚 **LectoAula**
Aplicación de lectoescritura con 15 actividades:
- Lectura: Sopa de letras, Une palabra, Comprensión
- Escritura: Dictado, Copia, Oraciones
- Fonología: Letra inicial, Contar sílabas, Rimas, Busca sílaba
- Juegos: Memory, Ahorcado, Clasificar, Carrera 2P
- Actividades avanzadas: Adivinanzas, Ordenar cuento, Equipo 2P

---

## 🚀 Cómo Usar

### En Windows
```bash
# Doble clic en el lanzador de Windows
Lanzador_Windows.bat
```

### En Mac
```bash
# Doble clic en el lanzador de Mac
Lanzador_Mac.command
```

### En Linux
```bash
# Ejecutar el script de Linux
./Lanzador_Linux.sh
```

### En Pizarra Digital / Android
Si la pizarra bloquea la navegación local (común en Chromium):
1. Abrir el explorador de archivos del USB
2. Navegar a la carpeta deseada: `MateAula/` o `LectoAula/`
3. Abrir directamente el archivo `index.html`

**Alternativa:** Usar Firefox si está disponible (menos restrictivo con archivos locales)

Para más información, consulta [INSTRUCCIONES.txt](INSTRUCCIONES.txt)

---

## 📁 Estructura del Proyecto

```
CHUS/
├── README.md                    # Este archivo
├── INSTRUCCIONES.txt            # Guía de uso para USB
├── NexiaPortal/                 # Portal principal
│   ├── index.html               # Punto de entrada
│   ├── img/                     # Logos y recursos
│   ├── MateAula/                # Módulo de matemáticas
│   └── LectoAula/               # Módulo de lectoescritura
├── MateAula/                    # Versión standalone de MateAula
│   ├── index.html
│   ├── js/app.js                # Lógica de la aplicación
│   └── css/                     # Estilos
├── LectoAula/                   # Versión standalone de LectoAula
│   ├── index.html
│   ├── js/app.js
│   └── css/
├── img/                         # Recursos compartidos
└── _backups/                    # Copias de seguridad (no usar)
```

---

## 🎯 Características Principales

### ✅ Cumplimiento Curricular
- Alineado con el currículo LOMLOE para 1º de Primaria
- Competencias de matemáticas y lengua castellana
- Progresión didáctica por niveles de dificultad

### ♿ Accesibilidad
- Barrido visual para navegación sin ratón
- Síntesis de voz integrada
- Interfaz táctil optimizada para pizarras digitales
- Soporte multi-idioma (español)

### 📊 Seguimiento Educativo
- Registro detallado de sesiones por alumno
- Cálculo automático del ritmo de evolución
- Informes de competencias LOMLOE
- Historial de actividades recientes

### 🎮 Gamificación
- Sistema de puntuación y recompensas
- Colección de pegatinas desbloqueables
- Ranking entre alumnos
- Feedback visual y auditivo

### 🖨️ Generador de Fichas
- Creación de ejercicios imprimibles en PDF
- Configuración personalizada por competencia
- Operaciones con soporte decimal y llevadas

---

## 🛠️ Tecnologías

- **Frontend:** HTML5, CSS3, JavaScript (vanilla)
- **Gráficos:** Canvas API para pizarra interactiva
- **Almacenamiento:** LocalStorage para persistencia de datos
- **Compatibilidad:** Cross-browser (Chrome, Firefox, Safari, Edge)

---

## 📝 Notas para Desarrolladores

### Módulos Independientes
Cada módulo (MateAula, LectoAula) puede funcionar de forma autónoma o integrada en el NexiaPortal mediante iframes.

### Comunicación entre Módulos
Los módulos usan `postMessage` para enviar datos de progreso al portal principal:
```javascript
window.parent.postMessage({
    type: 'activity-result',
    hits: aciertos,
    attempts: intentos,
    activity: nombreActividad
}, '*');
```

### Sistema de Configuración
Cada actividad puede tener configuración avanzada (accesible via botón ⚙️):
- Rango de números
- Tipo de operaciones
- Opciones específicas por actividad

---

## 📄 Licencia

© 2026 Nexia Educación - Todos los derechos reservados

---

## 🆘 Soporte

Para asistencia técnica o consultas sobre el proyecto, contacta con Nexia Educación.
