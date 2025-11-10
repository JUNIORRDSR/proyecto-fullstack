import Boton from "../boton/boton.jsx";
import './contenedor_boton.css';

const ContenedorBoton = ({español=true})=>{

    return (
        <div className="contenedor-boton">
            <Boton texto={español == true ? "Translate" : "Traducir"} tipo="primary" />
            <Boton texto={español == true ? "Clear" : "Limpiar"} tipo="secondary" />
        </div>
    )
}

export default ContenedorBoton;