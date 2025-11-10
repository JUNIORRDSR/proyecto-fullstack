import Card from "../card/card.jsx";
import "./contenedor_card.css"

const ContenedorCard = ({ textoOrigen, setTextoOrigen, textoTraducido, setTextoTraducido, direccion = 'es-en', onSwap }) => {
    // Determinar qué idioma va a la izquierda y cuál a la derecha
    const isEsLeft = direccion === 'es-en';

    return (
        <div className="contenedor-cards-wrapper">
            <div className="contenedor-card">
                <h2>{isEsLeft ? "Spanish" : "English"}</h2>
                <Card 
                    español={isEsLeft} 
                    text={textoOrigen}
                    setText={setTextoOrigen}
                    readOnly={false}
                />
            </div>
            
            <div className="swap-icon" onClick={onSwap} style={{cursor: 'pointer'}}>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="17 1 21 5 17 9"></polyline>
                    <path d="M3 11V9a4 4 0 0 1 4-4h14"></path>
                    <polyline points="7 23 3 19 7 15"></polyline>
                    <path d="M21 13v2a4 4 0 0 1-4 4H3"></path>
                </svg>
            </div>
            
            <div className="contenedor-card">
                <h2>{isEsLeft ? "English" : "Spanish"}</h2>
                <Card 
                    español={!isEsLeft} 
                    text={textoTraducido}
                    setText={setTextoTraducido}
                    readOnly={true}
                />
            </div>
        </div>
    )
}

export default ContenedorCard;