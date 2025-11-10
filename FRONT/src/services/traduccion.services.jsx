const API_BASE_URL = 'http://localhost:3000/api';

/**
 * Traduce una palabra o texto usando la API del backend
 * @param {string} word - La palabra o texto a traducir
 * @param {string} direction - Dirección de traducción: 'es-en' o 'en-es'
 * @returns {Promise<Object>} - Respuesta de la API con la traducción
 */
export const traducirTexto = async (word, direction = 'es-en') => {
    try {
        const url = `${API_BASE_URL}/traducir?word=${encodeURIComponent(word)}&direction=${direction}`;
        console.log('📡 URL de la API:', url);
        console.log('📤 Enviando petición...');
        
        const response = await fetch(url);
        
        console.log('📥 Respuesta recibida');
        console.log('Status:', response.status);
        console.log('Status Text:', response.statusText);

        if (!response.ok) {
            throw new Error(`Error en la traducción: ${response.status} ${response.statusText}`);
        }

        const data = await response.json();
        console.log('📦 Datos parseados:', data);
        return data;
    } catch (error) {
        console.error('❌ Error en traducirTexto:', error);
        console.error('Tipo de error:', error.name);
        console.error('Mensaje:', error.message);
        throw error;
    }
};

/**
 * Traduce de español a inglés
 * @param {string} word - La palabra o texto a traducir
 * @returns {Promise<Object>} - Respuesta de la API
 */
export const traducirEspañolIngles = (word) => {
    return traducirTexto(word, 'es-en');
};

/**
 * Traduce de inglés a español
 * @param {string} word - La palabra o texto a traducir
 * @returns {Promise<Object>} - Respuesta de la API
 */
export const traducirInglesEspañol = (word) => {
    return traducirTexto(word, 'en-es');
};

/**
 * Función de prueba para verificar la conexión con la API
 * Ejecuta en la consola: testConexionAPI()
 */
export const testConexionAPI = async () => {
    console.log('🧪 ====== INICIANDO TEST DE CONEXIÓN ======');
    
    try {
        // Test 1: Traducir "carro" de español a inglés
        console.log('\n📝 Test 1: Traduciendo "carro" (es-en)');
        const test1 = await traducirTexto('carro', 'es-en');
        console.log('✅ Test 1 exitoso:', test1);
        
        // Test 2: Traducir "car" de inglés a español
        console.log('\n📝 Test 2: Traduciendo "car" (en-es)');
        const test2 = await traducirTexto('car', 'en-es');
        console.log('✅ Test 2 exitoso:', test2);
        
        // Test 3: Verificar conectividad básica
        console.log('\n📝 Test 3: Verificando conectividad');
        const response = await fetch(`${API_BASE_URL}/traducir?word=hello&direction=en-es`);
        console.log('Status:', response.status);
        console.log('Headers:', Object.fromEntries(response.headers.entries()));
        
        console.log('\n✅ ====== TODOS LOS TESTS PASARON ======');
        return { success: true, tests: [test1, test2] };
        
    } catch (error) {
        console.error('\n❌ ====== TEST FALLÓ ======');
        console.error('Error completo:', error);
        console.error('Stack:', error.stack);
        
        // Diagnóstico adicional
        console.log('\n🔍 Diagnóstico:');
        console.log('- ¿El backend está corriendo en http://localhost:3000?');
        console.log('- ¿CORS está habilitado en el backend?');
        console.log('- ¿Hay algún firewall bloqueando la conexión?');
        
        return { success: false, error: error.message };
    }
};

// Hacer la función disponible globalmente para testing en consola
if (typeof window !== 'undefined') {
    window.testConexionAPI = testConexionAPI;
    console.log('💡 Función de test disponible. Ejecuta en consola: testConexionAPI()');
}
