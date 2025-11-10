# Tutorial: QuickTranslate - Aplicación Full Stack de Traducción
## Español ↔ Inglés

---

## 📋 Tabla de Contenidos

1. Introducción
2. Arquitectura del Proyecto
3. Backend - Node.js & Express
4. Frontend - React & Vite
5. Configuración y Ejecución
6. Flujo de Traducción
7. Componentes Detallados
8. API Reference

---

## 1. Introducción

**QuickTranslate** es una aplicación web full-stack que permite traducir texto entre español e inglés de forma bidireccional. 

### Tecnologías Utilizadas

**Backend:**
- Node.js
- Express.js
- MySQL
- CORS

**Frontend:**
- React 18
- Vite
- CSS Modules
- Fetch API

---

## 2. Arquitectura del Proyecto

```
proyecto-fullstack/
├── BACK/
│   ├── app.js                          # Servidor Express
│   ├── database/
│   │   └── client.js                   # Conexión MySQL
│   ├── src/
│   │   ├── controllers/
│   │   │   └── traducir.controller.js  # Lógica de traducción
│   │   ├── routes/
│   │   │   └── traducir.router.js      # Rutas API
│   │   └── services/
│   │       └── traducir.services.js    # Servicios DB
│   └── package.json
│
└── FRONT/
    ├── index.html
    ├── src/
    │   ├── App.jsx                     # Componente principal
    │   ├── App.css                     # Estilos globales
    │   ├── main.jsx                    # Entry point
    │   ├── components/
    │   │   ├── boton/
    │   │   │   ├── boton.jsx           # Botón reutilizable
    │   │   │   └── boton.css
    │   │   ├── card/
    │   │   │   ├── card.jsx            # Textarea de traducción
    │   │   │   └── card.css
    │   │   ├── contenedor_boton/
    │   │   │   ├── contenedor_boton.jsx
    │   │   │   └── contenedor_boton.css
    │   │   ├── contenedor_card/
    │   │   │   ├── contenedor_card.jsx # Layout 2 columnas
    │   │   │   └── contenedor_card.css
    │   │   └── contenedor_traduccion/
    │   │       ├── contenedor_traduccion.jsx # Lógica principal
    │   │       └── contenedor_traduccion.css
    │   └── services/
    │       └── traduccion.services.jsx  # Cliente API
    └── package.json
```

---

## 3. Backend - Node.js & Express

### 3.1 Servidor Principal (app.js)

```javascript
const express = require('express');
const cors = require('cors');
const app = express();
const traducirRouter = require('./src/routes/traducir.router');

const port = 3000;

// Habilitar CORS para permitir peticiones desde el navegador
app.use(cors());
app.use(express.json());
app.use('/api', traducirRouter);

app.listen(port, () => {
  console.log(`Servidor escuchando en http://localhost:${port}`);
});
```

**Explicación:**
- `cors()`: Permite peticiones cross-origin desde el frontend (puerto 5173)
- `express.json()`: Parsea body de peticiones JSON
- Todas las rutas API tienen prefijo `/api`

### 3.2 Rutas (traducir.router.js)

```javascript
const express = require('express');
const router = express.Router();
const { traducir } = require('../controllers/traducir.controller');

// GET /api/traducir?word=carro&direction=es-en
router.get('/traducir', traducir);

module.exports = router;
```

### 3.3 Controlador (traducir.controller.js)

```javascript
const { getTranslation } = require('../services/traducir.services');

exports.traducir = async (req, res) => {
  try {
    const { word, direction } = req.query;
    
    if (!word || !direction) {
      return res.status(400).json({ 
        error: 'Faltan parámetros: word y direction son requeridos' 
      });
    }

    const translatedWord = await getTranslation(word, direction);
    
    if (!translatedWord) {
      return res.status(404).json({ 
        error: 'Traducción no encontrada' 
      });
    }

    res.json({ translatedWord });
  } catch (error) {
    console.error('Error en traducción:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};
```

**Explicación:**
- Valida parámetros `word` y `direction`
- Llama al servicio de base de datos
- Retorna JSON: `{ translatedWord: "car" }`
- Maneja errores 400, 404, 500

### 3.4 Servicio de Base de Datos (traducir.services.js)

```javascript
const db = require('../../database/client');

exports.getTranslation = async (word, direction) => {
  const [langFrom, langTo] = direction.split('-');
  
  const query = `
    SELECT ${langTo} as translation 
    FROM dictionary 
    WHERE LOWER(${langFrom}) = LOWER(?)
  `;
  
  const [rows] = await db.query(query, [word]);
  return rows[0]?.translation;
};
```

**Explicación:**
- Divide direction: `"es-en"` → [`"es"`, `"en"`]
- Query dinámico según idioma
- Case-insensitive con `LOWER()`

---

## 4. Frontend - React & Vite

### 4.1 Punto de Entrada (main.jsx)

```javascript
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
```

### 4.2 Componente Principal (App.jsx)

```javascript
import ContenedorTraduccion from './components/contenedor_traduccion/contenedor_traduccion'
import './App.css'

function App() {
  return (
    <div className="app-container">
      <header className="app-header">
        <div className="app-logo"></div>
        <h1 className="app-title">QuickTranslate</h1>
      </header>
      <div className="app-content">
        <ContenedorTraduccion español={true} />
      </div>
    </div>
  )
}

export default App
```

**Explicación:**
- Header con logo y título
- `español={true}`: Prop inicial (no usado actualmente)
- Layout responsivo centrado

### 4.3 Servicio de API (traduccion.services.jsx)

```javascript
const API_BASE_URL = 'http://localhost:3000/api';

export const traducirTexto = async (word, direction = 'es-en') => {
    try {
        const url = `${API_BASE_URL}/traducir?word=${encodeURIComponent(word)}&direction=${direction}`;
        console.log('📡 URL de la API:', url);
        
        const response = await fetch(url);
        
        if (!response.ok) {
            throw new Error(`Error: ${response.status} ${response.statusText}`);
        }

        const data = await response.json();
        console.log('📦 Datos recibidos:', data);
        return data;
    } catch (error) {
        console.error('❌ Error:', error);
        throw error;
    }
};

export const traducirEspañolIngles = (word) => {
    return traducirTexto(word, 'es-en');
};

export const traducirInglesEspañol = (word) => {
    return traducirTexto(word, 'en-es');
};
```

**Explicación:**
- `encodeURIComponent()`: Escapa caracteres especiales en URL
- Logs para debugging
- Funciones helpers para cada dirección

---

## 5. Flujo de Traducción

### Diagrama de Flujo

```
Usuario escribe texto
        ↓
Presiona "Translate"
        ↓
handleTraducir() se ejecuta
        ↓
traducirTexto(palabra, dirección)
        ↓
fetch() → GET /api/traducir?word=...&direction=...
        ↓
Backend: Router → Controller → Service → MySQL
        ↓
Respuesta: { translatedWord: "..." }
        ↓
setTextoTraducido(resultado)
        ↓
Card muestra traducción
```

### 5.1 Código del Manejador Principal

```javascript
const handleTraducir = async () => {
    console.log('=== INICIANDO TRADUCCIÓN ===');
    
    if (!textoOrigen.trim()) {
        console.log('❌ Texto vacío');
        return;
    }
    
    setCargando(true);
    try {
        const resultado = await traducirTexto(textoOrigen, direccion);
        
        const traduccion = resultado.translatedWord || 
                          resultado.traduccion || 
                          resultado.translation || '';
        
        setTextoTraducido(traduccion);
        console.log('✅ Traducción completada');
    } catch (error) {
        console.error('❌ ERROR:', error);
        alert('Error al traducir: ' + error.message);
    } finally {
        setCargando(false);
    }
};
```

**Explicación:**
- Validación de texto vacío
- Estado `cargando` para deshabilitar botones
- Múltiples fallbacks para diferentes formatos de respuesta
- Manejo de errores con `try-catch-finally`

---

## 6. Componentes Detallados

### 6.1 ContenedorTraduccion (Componente Padre)

```javascript
import { useState } from 'react';
import ContenedorCard from '../contenedor_card/contenedor_card.jsx';
import ContenedorBoton from '../contenedor_boton/contenedor_boton.jsx';
import { traducirTexto } from '../../services/traduccion.services.jsx';

const ContenedorTraduccion = ({ español = true }) => {
    const [textoOrigen, setTextoOrigen] = useState('');
    const [textoTraducido, setTextoTraducido] = useState('');
    const [cargando, setCargando] = useState(false);
    const [direccion, setDireccion] = useState('es-en');

    const handleSwap = () => {
        setDireccion(direccion === 'es-en' ? 'en-es' : 'es-en');
        setTextoOrigen(textoTraducido);
        setTextoTraducido(textoOrigen);
    };

    // ... handleTraducir y handleLimpiar ...

    return (
        <div className="contenedor-traduccion">
            <ContenedorCard 
                textoOrigen={textoOrigen}
                setTextoOrigen={setTextoOrigen}
                textoTraducido={textoTraducido}
                setTextoTraducido={setTextoTraducido}
                direccion={direccion}
                onSwap={handleSwap}
            />
            <ContenedorBoton 
                español={español} 
                onTraducir={handleTraducir}
                onLimpiar={handleLimpiar}
                cargando={cargando}
            />
        </div>
    )
}
```

**Estado:**
- `textoOrigen`: Texto a traducir
- `textoTraducido`: Resultado de la traducción
- `cargando`: Indica petición en curso
- `direccion`: 'es-en' o 'en-es'

**Funciones:**
- `handleTraducir`: Llama a la API
- `handleLimpiar`: Reset de campos
- `handleSwap`: Intercambia idiomas

### 6.2 ContenedorCard (Layout)

```javascript
const ContenedorCard = ({ 
    textoOrigen, 
    setTextoOrigen, 
    textoTraducido, 
    setTextoTraducido, 
    direccion = 'es-en', 
    onSwap 
}) => {
    const isEsLeft = direccion === 'es-en';

    return (
        <div className="contenedor-cards-wrapper">
            <div className="contenedor-card">
                <h2>{isEsLeft ? "Spanish" : "English"}</h2>
                <Card 
                    español={isEsLeft} 
                    text={textoOrigen}
                    setText={setTextoOrigen}
                    readOnly={false}
                />
            </div>
            
            <div className="swap-icon" onClick={onSwap}>
                <svg><!-- Icono de intercambio --></svg>
            </div>
            
            <div className="contenedor-card">
                <h2>{isEsLeft ? "English" : "Spanish"}</h2>
                <Card 
                    español={!isEsLeft} 
                    text={textoTraducido}
                    setText={setTextoTraducido}
                    readOnly={true}
                />
            </div>
        </div>
    )
}
```

**Características:**
- Grid de 3 columnas: Card | Icono | Card
- Títulos dinámicos según dirección
- Icono swap clickeable

### 6.3 Card (Textarea)

```javascript
import './card.css';

const Card = ({ español=true, text='', setText, readOnly=false }) => {
    const maxLength = 5000;

    const handleCopy = () => {
        if (text) {
            navigator.clipboard.writeText(text);
        }
    };

    return (
        <div className="card-wrapper">
            <textarea 
                className="card-textarea"
                value={text}
                onChange={(e) => setText(e.target.value)}
                maxLength={maxLength}
                readOnly={readOnly}
                placeholder={español ? 
                    "Enter text to translate" : 
                    "Translation will appear here..."}
            />
            <div className="card-footer">
                <span className="card-counter">
                    {text.length} / {maxLength}
                </span>
                <button className="card-copy-btn" onClick={handleCopy}>
                    <svg><!-- Icono copiar --></svg>
                </button>
            </div>
        </div>
    )
}
```

**Props:**
- `text`: Valor del textarea
- `setText`: Setter del estado
- `readOnly`: true para traducción (no editable)
- `español`: Define placeholder

**Características:**
- Contador de caracteres (0 / 5000)
- Botón copiar al portapapeles
- Límite de 5000 caracteres

### 6.4 Boton

```javascript
const Boton = ({ texto="Enviar", tipo="primary", onClick, disabled=false }) => {
    const iconTranslate = (
        <svg><!-- Icono flecha --></svg>
    );

    const iconClear = (
        <svg><!-- Icono papelera --></svg>
    );

    return (
        <button 
            className={`boton boton-${tipo}`} 
            onClick={onClick}
            disabled={disabled}
        >
            {tipo === "primary" && iconTranslate}
            {tipo === "secondary" && iconClear}
            {texto}
        </button>
    )
}
```

**Tipos:**
- `primary`: Botón azul "Translate"
- `secondary`: Botón blanco "Clear"

---

## 7. CSS y Estilos

### 7.1 Paleta de Colores

```css
/* Colores principales */
--background: #f5f5f5;
--white: #ffffff;
--text-primary: #333333;
--text-secondary: #666666;
--text-muted: #999999;
--border: #e0e0e0;
--primary-blue: #4a90e2;
--primary-blue-dark: #357abd;
```

### 7.2 Layout Principal (App.css)

```css
.app-container {
  min-height: 100vh;
  background-color: #f5f5f5;
  padding: 20px;
}

.app-header {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 20px 40px;
  background-color: white;
  border-bottom: 1px solid #e0e0e0;
}

.app-logo {
  width: 24px;
  height: 24px;
  background: linear-gradient(135deg, #4a90e2 0%, #357abd 100%);
  transform: rotate(45deg);
  border-radius: 4px;
}
```

### 7.3 Grid de Cards

```css
.contenedor-cards-wrapper {
  display: grid;
  grid-template-columns: 1fr auto 1fr;
  gap: 20px;
  align-items: start;
}

.swap-icon {
  width: 40px;
  height: 40px;
  background-color: white;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s ease;
  margin-top: 35px;
}

.swap-icon:hover {
  background-color: #f5f5f5;
  border-color: #4a90e2;
}
```

### 7.4 Estilos de Textarea

```css
.card-textarea {
  width: 100%;
  min-height: 200px;
  padding: 16px;
  font-size: 15px;
  background-color: white;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  resize: vertical;
  transition: all 0.2s ease;
}

.card-textarea:focus {
  outline: none;
  border-color: #4a90e2;
  box-shadow: 0 0 0 3px rgba(74, 144, 226, 0.1);
}
```

---

## 8. API Reference

### Endpoint: Traducir Palabra

**Request:**
```
GET /api/traducir?word={palabra}&direction={direccion}
```

**Parámetros Query:**
- `word` (string, requerido): Palabra a traducir
- `direction` (string, requerido): Dirección de traducción
  - `"es-en"`: Español → Inglés
  - `"en-es"`: Inglés → Español

**Response Exitoso (200):**
```json
{
  "translatedWord": "car"
}
```

**Errores:**

```json
// 400 Bad Request
{
  "error": "Faltan parámetros: word y direction son requeridos"
}

// 404 Not Found
{
  "error": "Traducción no encontrada"
}

// 500 Internal Server Error
{
  "error": "Error interno del servidor"
}
```

**Ejemplos de Uso:**

```bash
# Traducir "carro" de español a inglés
curl "http://localhost:3000/api/traducir?word=carro&direction=es-en"
# → {"translatedWord":"car"}

# Traducir "hello" de inglés a español
curl "http://localhost:3000/api/traducir?word=hello&direction=en-es"
# → {"translatedWord":"hola"}
```

---

## 9. Configuración y Ejecución

### 9.1 Requisitos Previos

- Node.js (v16+)
- MySQL (v8+)
- npm o yarn

### 9.2 Instalación Backend

```bash
cd BACK
npm install
```

**Dependencias principales:**
- express
- mysql2
- cors

### 9.3 Configuración Base de Datos

```sql
CREATE DATABASE translator;

USE translator;

CREATE TABLE dictionary (
  id INT AUTO_INCREMENT PRIMARY KEY,
  es VARCHAR(255),
  en VARCHAR(255),
  INDEX idx_es (es),
  INDEX idx_en (en)
);

INSERT INTO dictionary (es, en) VALUES
  ('carro', 'car'),
  ('casa', 'house'),
  ('perro', 'dog'),
  ('gato', 'cat');
```

### 9.4 Ejecutar Backend

```bash
cd BACK
node app.js
# → Servidor escuchando en http://localhost:3000
```

### 9.5 Instalación Frontend

```bash
cd FRONT
npm install
```

**Dependencias principales:**
- react
- react-dom
- vite

### 9.6 Ejecutar Frontend

```bash
cd FRONT
npm run dev
# → http://localhost:5173
```

---

## 10. Solución de Problemas

### Problema: "Failed to fetch"

**Causa:** CORS no habilitado en backend

**Solución:**
```javascript
// BACK/app.js
const cors = require('cors');
app.use(cors());
```

### Problema: "Traducción no encontrada"

**Causa:** Palabra no existe en base de datos

**Solución:** Agregar más palabras al diccionario

### Problema: Puerto en uso

```bash
# Encontrar proceso en puerto 3000
lsof -i :3000
# o en Windows
netstat -ano | findstr :3000

# Matar proceso
kill -9 <PID>
```

---

## 11. Mejoras Futuras

1. **Autenticación de usuarios**
2. **Historial de traducciones**
3. **API externa** (Google Translate, DeepL)
4. **Soporte para más idiomas**
5. **Traducción en tiempo real**
6. **Guardar traducciones favoritas**
7. **Dark mode**
8. **Progressive Web App (PWA)**
9. **Tests unitarios y E2E**
10. **Deploy en producción**

---

## 12. Conclusión

QuickTranslate demuestra:
- ✅ Arquitectura full-stack completa
- ✅ Comunicación cliente-servidor con REST API
- ✅ Manejo de estado en React
- ✅ CRUD básico con MySQL
- ✅ UI/UX moderna y responsiva
- ✅ Manejo de errores robusto

**Stack completo:** React + Vite + Express + MySQL

---

# Capturas

Vista principal de la aplicación
![!\[alt text\](image.png)](img/image.png)
---

Traduciendo "carro" a "car"
![!\[alt text\](image-1.png)](img/image-1.png)
---

Traduciendo "plane" a "avión"
![!\[alt text\](image-2.png)](img/image-2.png)
# Autor
## JORGE JUNIOR SOLANO ROMERO
**Proyecto desarrollado para aprendizaje de desarrollo full-stack**

Repository: https://github.com/JUNIORRDSR/proyecto-fullstack

---
Taller de Desarrollo Full Stack


