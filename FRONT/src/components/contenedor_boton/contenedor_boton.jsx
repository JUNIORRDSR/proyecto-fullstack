import Boton from "../boton/boton.jsx";
import './contenedor_boton.css';

const ContenedorBoton = ({español=true, onTraducir, onLimpiar, cargando=false})=>{

    return (
        <div className="contenedor-boton">
            <Boton 
                texto={español == true ? "Translate" : "Traducir"} 
                tipo="primary" 
                onClick={onTraducir}
                disabled={cargando}
            />
            <Boton 
                texto={español == true ? "Clear" : "Limpiar"} 
                tipo="secondary" 
                onClick={onLimpiar}
                disabled={cargando}
            />
        </div>
    )
}

export default ContenedorBoton;