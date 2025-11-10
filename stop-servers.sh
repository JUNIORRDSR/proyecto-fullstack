#!/bin/bash

# Script para detener los servidores Backend y Frontend

# Colores
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m'

echo "=========================================="
echo "   🛑 Deteniendo Servidores"
echo "=========================================="
echo ""

# Función para detener procesos por puerto
kill_by_port() {
    PORT=$1
    NAME=$2
    
    if command -v lsof &> /dev/null; then
        PID=$(lsof -ti:$PORT)
    elif command -v netstat &> /dev/null; then
        # Para Git Bash en Windows
        PID=$(netstat -ano | grep ":$PORT" | awk '{print $5}' | head -1)
    fi
    
    if [ -n "$PID" ]; then
        echo -e "${YELLOW}Deteniendo $NAME (PID: $PID, Puerto: $PORT)...${NC}"
        kill -9 $PID 2>/dev/null || taskkill //PID $PID //F 2>/dev/null
        echo -e "${GREEN}✓ $NAME detenido${NC}"
    else
        echo -e "${YELLOW}⚠ $NAME no está corriendo en puerto $PORT${NC}"
    fi
}

# Detener Backend (puerto 3000)
kill_by_port 3000 "Backend"

# Detener Frontend (puerto 5173)
kill_by_port 5173 "Frontend"

# También intentar detener procesos por nombre
echo ""
echo -e "${YELLOW}Buscando procesos de Node.js relacionados...${NC}"

if [[ "$OSTYPE" == "msys" || "$OSTYPE" == "win32" ]]; then
    # Windows (Git Bash)
    taskkill //IM node.exe //F 2>/dev/null
else
    # Linux/Mac
    pkill -f "node app.js" 2>/dev/null
    pkill -f "vite" 2>/dev/null
fi

echo ""
echo "=========================================="
echo -e "${GREEN}   ✓ Servidores detenidos${NC}"
echo "=========================================="
echo ""
