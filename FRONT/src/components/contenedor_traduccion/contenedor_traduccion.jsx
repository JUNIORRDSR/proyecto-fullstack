import { useState } from 'react';
import ContenedorCard from '../contenedor_card/contenedor_card.jsx';
import ContenedorBoton from '../contenedor_boton/contenedor_boton.jsx';
import { traducirTexto } from '../../services/traduccion.services.jsx';
import './contenedor_traduccion.css';

const ContenedorTraduccion = ({ español = true }) => {
    const [textoOrigen, setTextoOrigen] = useState('');
    const [textoTraducido, setTextoTraducido] = useState('');
    const [cargando, setCargando] = useState(false);

    const handleTraducir = async () => {
        console.log('=== INICIANDO TRADUCCIÓN ===');
        console.log('Texto a traducir:', textoOrigen);
        
        if (!textoOrigen.trim()) {
            console.log('❌ Texto vacío, cancelando traducción');
            return;
        }
        
        setCargando(true);
        try {
            const direction = español ? 'es-en' : 'en-es';
            console.log('Dirección de traducción:', direction);
            console.log('Llamando a la API...');
            
            const resultado = await traducirTexto(textoOrigen, direction);
            
            console.log('✅ Respuesta recibida:', resultado);
            const traduccion = resultado.translatedWord || resultado.traduccion || resultado.translation || '';
            console.log('Traducción extraída:', traduccion);
            
            setTextoTraducido(traduccion);
            console.log('=== TRADUCCIÓN COMPLETADA ===');
        } catch (error) {
            console.error('❌ ERROR AL TRADUCIR:', error);
            console.error('Detalles del error:', error.message);
            alert('Error al traducir el texto: ' + error.message);
        } finally {
            setCargando(false);
        }
    };

    const handleLimpiar = () => {
        setTextoOrigen('');
        setTextoTraducido('');
    };

    return (
        <div className="contenedor-traduccion">
            <ContenedorCard 
                español={español} 
                textoOrigen={textoOrigen}
                setTextoOrigen={setTextoOrigen}
                textoTraducido={textoTraducido}
                setTextoTraducido={setTextoTraducido}
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

export default ContenedorTraduccion;