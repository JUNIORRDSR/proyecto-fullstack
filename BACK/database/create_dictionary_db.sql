-- Script para crear base de datos de diccionario Inglés-Español

-- Crear la base de datos
CREATE DATABASE IF NOT EXISTS dictionary_db;

-- Usar la base de datos
USE dictionary_db;

-- Crear tabla de palabras
CREATE TABLE IF NOT EXISTS words (
    id INT AUTO_INCREMENT PRIMARY KEY,
    english VARCHAR(255) NOT NULL,
    spanish VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    INDEX idx_english (english),
    INDEX idx_spanish (spanish)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Mostrar estructura de la tabla
DESCRIBE words;

-- Mostrar mensaje de éxito
SELECT 'Base de datos y tabla creadas exitosamente' AS mensaje;
