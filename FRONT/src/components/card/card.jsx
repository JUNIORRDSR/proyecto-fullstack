import './card.css';

const Card = ({español=true, text='', setText, readOnly=false})=>{
    const maxLength = 5000;

    const handleCopy = () => {
        if (text) {
            navigator.clipboard.writeText(text);
        }
    };

    return (
        <div className="card-wrapper">
            <textarea 
                className="card-textarea"
                value={text}
                onChange={(e) => setText(e.target.value)}
                maxLength={maxLength}
                readOnly={readOnly}
                {...(español == true ? {placeholder:"Enter text to translate"} : {placeholder:"Translation will appear here..."})}
            />
            <div className="card-footer">
                <span className="card-counter">{text.length} / {maxLength}</span>
                <button className="card-copy-btn" title="Copy" onClick={handleCopy}>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
                        <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
                    </svg>
                </button>
            </div>
        </div>
    )
}

export default Card;