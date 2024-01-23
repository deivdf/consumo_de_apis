import { useState, useEffect } from 'react'
import styled from '@emotion/styled'
import ImagenCripto from '../src/img/imagen-criptos.png'
import Resultado from './components/Resultado'
import Formulario from './components/Formulario'
import Spiner from './components/Spiner'


const Heading = styled.h1`
font-family: 'Lato', sans-serif;
color: white;
text-align: center;
font-weight: 700;
margin-top: 80px;
margin-bottom: 50px;
font-size: 34px;
&::after {
  content: '';
  width: 100px;
  height: 6px;
  background-color: #66A2FE;
  display: block;
  margin: 0 auto;
}
`
const Contenedor = styled.div`
max-width: 900px;
margin: 0 auto;
width: 90%;
@media (min-width: 992px) {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  column-gap: 2rem;
}
`
const Imagen = styled.img`
max-width: 400px;
width: 80%;
margin-top: 100px auto 0 auto;
display: block;
`


function App() {
  const [monedas, setMonedas] = useState({})
  const [resultado, setResultado] = useState({})
  const [cargado, setCargado] = useState(false)
  useEffect(() => {
    if(Object.keys(monedas).length > 0){
      
      const cotizarCripto = async () => {
        setCargado(true)
        setResultado({})
        const {Moneda, CriptoMoneda} = monedas
        const url = `https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${CriptoMoneda}&tsyms=${Moneda}`
        const respuesta = await fetch(url)
        const resultado = await respuesta.json()
        setResultado(resultado.DISPLAY[CriptoMoneda][Moneda])
        setCargado(false)
      }
      cotizarCripto()
    }
  }, [monedas])
  console.log(resultado)
  return (
    <>
      <Contenedor>
        <Imagen src={ImagenCripto} alt="imagen cripto" />
        <div>
          <Heading>Cotiza Criptomonedas al Instante</Heading>
          <Formulario 
            setMonedas={setMonedas}
          />
          {cargado && <Spiner />}
         {resultado.PRICE && <Resultado resultado={resultado} />}
        </div>
      </Contenedor>
    </>
  )
}

export default App
