#!/bin/bash

echo "=========================================="
echo "   SETUP BACKEND - Proyecto Fullstack"
echo "=========================================="
echo ""

# Colores para mensajes
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Verificar si existe MySQL
echo -e "${YELLOW}[1/6] Verificando MySQL...${NC}"
if ! command -v mysql &> /dev/null; then
    echo -e "${RED}✗ MySQL no está instalado${NC}"
    echo ""
    echo "Por favor, instala MySQL antes de continuar:"
    echo "  - Windows: https://dev.mysql.com/downloads/installer/"
    echo "  - macOS: brew install mysql"
    echo "  - Linux: sudo apt install mysql-server"
    exit 1
fi
echo -e "${GREEN}✓ MySQL instalado${NC}"

# Verificar si existe Node.js
echo -e "${YELLOW}[2/6] Verificando Node.js...${NC}"
if ! command -v node &> /dev/null; then
    echo -e "${RED}✗ Node.js no está instalado${NC}"
    echo "Por favor, instala Node.js desde: https://nodejs.org/"
    exit 1
fi
echo -e "${GREEN}✓ Node.js $(node -v) instalado${NC}"

# Verificar archivo .env
echo -e "${YELLOW}[3/6] Verificando archivo .env...${NC}"
if [ ! -f .env ]; then
    echo -e "${YELLOW}⚠ Archivo .env no encontrado${NC}"
    echo "Creando archivo .env desde .env.example..."
    cp .env.example .env
    echo -e "${GREEN}✓ Archivo .env creado${NC}"
    echo ""
    echo -e "${RED}IMPORTANTE: Edita el archivo .env con tus credenciales de MySQL${NC}"
    echo "Presiona Enter cuando hayas configurado el archivo .env..."
    read
else
    echo -e "${GREEN}✓ Archivo .env encontrado${NC}"
fi

# Instalar dependencias de Node.js
echo -e "${YELLOW}[4/6] Instalando dependencias de Node.js...${NC}"
npm install
if [ $? -eq 0 ]; then
    echo -e "${GREEN}✓ Dependencias instaladas correctamente${NC}"
else
    echo -e "${RED}✗ Error al instalar dependencias${NC}"
    exit 1
fi

# Crear base de datos
echo -e "${YELLOW}[5/6] Creando base de datos...${NC}"
echo "Ingresa tu contraseña de MySQL cuando se solicite:"
mysql -u root -p < database/create_dictionary_db.sql
if [ $? -eq 0 ]; then
    echo -e "${GREEN}✓ Base de datos creada correctamente${NC}"
else
    echo -e "${RED}✗ Error al crear la base de datos${NC}"
    echo "Verifica tus credenciales de MySQL e intenta nuevamente"
    exit 1
fi

# Cargar datos a la base de datos
echo -e "${YELLOW}[6/6] Cargando diccionario a la base de datos...${NC}"
npm run load-dictionary
if [ $? -eq 0 ]; then
    echo -e "${GREEN}✓ Diccionario cargado correctamente${NC}"
else
    echo -e "${RED}✗ Error al cargar el diccionario${NC}"
    exit 1
fi

echo ""
echo "=========================================="
echo -e "${GREEN}   ✓ SETUP COMPLETADO EXITOSAMENTE${NC}"
echo "=========================================="
echo ""
echo "Para iniciar el servidor ejecuta:"
echo "  node app.js"
echo ""
