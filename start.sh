#!/bin/bash

# Script de inicio completo para el proyecto QuickTranslate
# Este script configura la base de datos, instala dependencias y lanza backend y frontend

# Colores para mensajes
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
CYAN='\033[0;36m'
NC='\033[0m' # No Color

clear
echo "=========================================="
echo "   🚀 QuickTranslate - Inicio Completo"
echo "=========================================="
echo ""

# Función para manejar errores
handle_error() {
    echo -e "${RED}✗ Error: $1${NC}"
    exit 1
}

# Función para verificar comandos
check_command() {
    if ! command -v $1 &> /dev/null; then
        echo -e "${RED}✗ $1 no está instalado${NC}"
        echo "Por favor, instala $1 antes de continuar"
        exit 1
    fi
    echo -e "${GREEN}✓ $1 está disponible${NC}"
}

# 1. Verificar prerequisitos
echo -e "${CYAN}[PASO 1/6] Verificando prerequisitos...${NC}"
check_command "node"
check_command "npm"
check_command "mysql"
echo ""

# 2. Configurar Backend
echo -e "${CYAN}[PASO 2/6] Configurando Backend...${NC}"
cd BACK || handle_error "No se pudo acceder a la carpeta BACK"

# Verificar si las dependencias ya están instaladas
if [ ! -d "node_modules" ]; then
    echo -e "${YELLOW}Instalando dependencias del backend...${NC}"
    npm install || handle_error "Fallo al instalar dependencias del backend"
    echo -e "${GREEN}✓ Dependencias del backend instaladas${NC}"
else
    echo -e "${GREEN}✓ Dependencias del backend ya instaladas${NC}"
fi
echo ""

# 3. Ejecutar setup de base de datos
echo -e "${CYAN}[PASO 3/6] Ejecutando setup de base de datos...${NC}"
if [ -f "setup.sh" ]; then
    chmod +x setup.sh
    echo -e "${YELLOW}Ejecutando setup.sh...${NC}"
    ./setup.sh || handle_error "Fallo en la configuración de la base de datos"
else
    echo -e "${YELLOW}⚠ setup.sh no encontrado, saltando configuración de DB${NC}"
fi
echo ""

# 4. Configurar Frontend
echo -e "${CYAN}[PASO 4/6] Configurando Frontend...${NC}"
cd ../FRONT || handle_error "No se pudo acceder a la carpeta FRONT"

if [ ! -d "node_modules" ]; then
    echo -e "${YELLOW}Instalando dependencias del frontend...${NC}"
    npm install || handle_error "Fallo al instalar dependencias del frontend"
    echo -e "${GREEN}✓ Dependencias del frontend instaladas${NC}"
else
    echo -e "${GREEN}✓ Dependencias del frontend ya instaladas${NC}"
fi
echo ""

# Volver a la raíz
cd ..

# 5. Iniciar Backend
echo -e "${CYAN}[PASO 5/6] Iniciando servidor Backend...${NC}"
cd BACK
echo -e "${YELLOW}Lanzando backend en http://localhost:3000${NC}"
node app.js &
BACKEND_PID=$!
echo -e "${GREEN}✓ Backend iniciado (PID: $BACKEND_PID)${NC}"
sleep 3  # Esperar a que el backend se inicie
echo ""

# Verificar si el backend está corriendo
if ! ps -p $BACKEND_PID > /dev/null; then
    echo -e "${RED}✗ El backend no se pudo iniciar${NC}"
    exit 1
fi

# 6. Iniciar Frontend
echo -e "${CYAN}[PASO 6/6] Iniciando servidor Frontend...${NC}"
cd ../FRONT
echo -e "${YELLOW}Lanzando frontend en http://localhost:5173${NC}"
npm run dev &
FRONTEND_PID=$!
echo -e "${GREEN}✓ Frontend iniciado (PID: $FRONTEND_PID)${NC}"
echo ""

# Mensaje final
echo "=========================================="
echo -e "${GREEN}   ✓ APLICACIÓN INICIADA EXITOSAMENTE${NC}"
echo "=========================================="
echo ""
echo -e "${BLUE}📡 Backend:${NC}  http://localhost:3000"
echo -e "${BLUE}🌐 Frontend:${NC} http://localhost:5173"
echo ""
echo -e "${YELLOW}PIDs de los procesos:${NC}"
echo -e "  Backend:  $BACKEND_PID"
echo -e "  Frontend: $FRONTEND_PID"
echo ""
echo -e "${CYAN}Para detener los servidores:${NC}"
echo "  kill $BACKEND_PID $FRONTEND_PID"
echo ""
echo -e "${CYAN}O puedes usar Ctrl+C y luego ejecutar:${NC}"
echo "  ./stop-servers.sh"
echo ""
echo "Presiona Ctrl+C para detener los servidores..."
echo ""

# Esperar a que el usuario termine
wait
