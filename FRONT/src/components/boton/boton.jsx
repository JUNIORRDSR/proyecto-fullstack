import './boton.css';

const Boton = ({texto="Enviar", tipo="primary"})=>{

    const iconTranslate = (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="17 8 21 12 17 16"></polyline>
            <line x1="3" y1="12" x2="21" y2="12"></line>
        </svg>
    );

    const iconClear = (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="3 6 5 6 21 6"></polyline>
            <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
        </svg>
    );

    return (
        <button className={`boton boton-${tipo}`}>
            {tipo === "primary" && iconTranslate}
            {tipo === "secondary" && iconClear}
            {texto}
        </button>
    )
}

export default Boton;