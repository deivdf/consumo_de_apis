import {useEffect} from 'react'
import styled from '@emotion/styled'
const ResultadoDiv = styled.div`
color: #ffffff;
font-family: 'Lato', sans-serif;
font-size: 20px;
margin-top: 2rem;
background-color: #04303b;
padding: 1rem;
border-radius: 0.8rem;
display: flex;
align-items: center;
gap: 1rem;
margin-top: 30px;
`
const Imagen = styled.img`
display: block;
width: 120%;
`
const Precio = styled.p`
font-size: 24px;
span {
  font-weight: bold;
}

`

const Resultado = ({resultado}) => {
    const {PRICE, HIGHDAY, LOWDAY, CHANGEPCT24HOUR, LASTUPDATE, IMAGEURL} = resultado
  return (
    <ResultadoDiv>
        <Imagen src={`https://cryptocompare.com/${IMAGEURL}`} alt="imagen cripto" />
        <div>
              <Precio>El precio es: <span>{PRICE}</span></Precio>
              <p>Precio mas alto del dia: <span>{HIGHDAY}</span></p>
              <p>Precio mas bajo del dia: <span>{LOWDAY}</span></p>
              <p>Variacion ultimas 24 horas: <span>{CHANGEPCT24HOUR}</span></p>
              <p>Ultima actualizacion: <span>{LASTUPDATE}</span></p>
        </div>
    </ResultadoDiv>
  )
}

export default Resultado
