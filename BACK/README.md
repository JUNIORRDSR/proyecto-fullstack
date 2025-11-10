# Backend - Proyecto Fullstack Diccionario

API REST para traducción de palabras Inglés-Español usando MySQL.

## 📋 Requisitos Previos

Antes de ejecutar el proyecto, asegúrate de tener instalado:

1. **Node.js** (v14 o superior)
   - Descarga: https://nodejs.org/

2. **MySQL** (v8.0 o superior)
   - Windows: https://dev.mysql.com/downloads/installer/
   - macOS: `brew install mysql`
   - Linux: `sudo apt install mysql-server`

3. **Git Bash** (para Windows)
   - Incluido con Git: https://git-scm.com/downloads

## 🚀 Instalación Automática

### Opción 1: Usar script setup.sh (Recomendado)

```bash
# Dar permisos de ejecución (Linux/macOS)
chmod +x setup.sh

# Ejecutar script
./setup.sh
```

El script realizará automáticamente:
- ✓ Verificación de MySQL y Node.js
- ✓ Creación del archivo .env
- ✓ Instalación de dependencias npm
- ✓ Creación de la base de datos
- ✓ Carga del diccionario (14,996 palabras)

## 🛠️ Instalación Manual

### 1. Configurar variables de entorno

Crea un archivo `.env` en la raíz del proyecto BACK:

```env
HOST=localhost
USER=root
PASSWORD=tu_contraseña_mysql
DATABASE=dictionary_db
PORT=3306
```

### 2. Instalar dependencias

```bash
npm install
```

### 3. Crear base de datos

```bash
mysql -u root -p < database/create_dictionary_db.sql
```

### 4. Cargar diccionario

```bash
npm run load-dictionary
```

## ▶️ Ejecutar el servidor

```bash
node app.js
```

El servidor estará disponible en: `http://localhost:3000`

## 📁 Estructura del Proyecto

```
BACK/
├── app.js                      # Servidor Express
├── .env                        # Variables de entorno (no incluir en Git)
├── .env.example               # Ejemplo de variables de entorno
├── setup.sh                   # Script de instalación automática
├── package.json               # Dependencias del proyecto
├── dictionary.txt             # Diccionario original
├── dictionary.json            # Diccionario en formato JSON
├── database/
│   ├── client.js             # Conexión a MySQL
│   ├── create_dictionary_db.sql  # Script SQL
│   └── README.md             # Documentación de BD
├── scripts/
│   ├── dictionary_to_json.py    # Convierte .txt a .json
│   └── load_dictionary.js       # Carga JSON a MySQL
└── src/
    ├── controllers/
    ├── routes/
    └── services/
```

## 🗄️ Base de Datos

### Tabla: `words`

| Campo      | Tipo         | Descripción                    |
|------------|--------------|--------------------------------|
| id         | INT          | ID autoincremental (PK)        |
| english    | VARCHAR(255) | Palabra/frase en inglés        |
| spanish    | VARCHAR(255) | Traducción al español          |
| created_at | TIMESTAMP    | Fecha de creación              |

### Consultas SQL de ejemplo

```sql
-- Buscar por palabra en inglés
SELECT * FROM words WHERE english = 'dance';

-- Buscar palabras que contengan un texto
SELECT * FROM words WHERE english LIKE '%play%';

-- Buscar por traducción en español
SELECT * FROM words WHERE spanish = 'bailar';

-- Contar total de palabras
SELECT COUNT(*) FROM words;
```

## 📦 Scripts NPM

| Comando                | Descripción                           |
|------------------------|---------------------------------------|
| `npm run load-dictionary` | Carga el diccionario a la base de datos |

## 🔧 Dependencias

- **express**: Framework web para Node.js
- **mysql2**: Cliente MySQL con soporte para Promises
- **dotenv**: Manejo de variables de entorno

## ⚠️ Solución de Problemas

### Error: "ER_ACCESS_DENIED_ERROR"
- Verifica las credenciales en el archivo `.env`
- Asegúrate de que el usuario MySQL tenga permisos

### Error: "ER_BAD_DB_ERROR"
- La base de datos no existe, ejecuta el script SQL:
  ```bash
  mysql -u root -p < database/create_dictionary_db.sql
  ```

### Error: "Cannot find module 'dotenv'"
- Instala las dependencias:
  ```bash
  npm install
  ```

## 📝 Notas

- El archivo `.env` NO debe incluirse en el repositorio (está en .gitignore)
- Usa `.env.example` como plantilla para crear tu `.env`
- La base de datos contiene 14,996 palabras/frases del diccionario

## 🤝 Contribuir

1. Crea un fork del proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request
