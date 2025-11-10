import ContenedorCard from '../contenedor_card/contenedor_card.jsx';
import ContenedorBoton from '../contenedor_boton/contenedor_boton.jsx';
import './contenedor_traduccion.css';

const ContenedorTraduccion = ({ español = true }) => {
    return (
        <div className="contenedor-traduccion">
            <ContenedorCard español={español} />
            <ContenedorBoton español={español} />
        </div>
    )
}

export default ContenedorTraduccion;