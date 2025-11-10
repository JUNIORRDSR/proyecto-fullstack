//import { useState } from 'react'
import ContenedorTraduccion from './components/contenedor_traduccion/contenedor_traduccion'
import './App.css'

function App() {

  return (
    <div className="app-container">
      <header className="app-header">
        <div className="app-logo"></div>
        <h1 className="app-title">QuickTranslate</h1>
      </header>
      <div className="app-content">
        <ContenedorTraduccion español={true} />
      </div>
    </div>
  )
}

export default App
