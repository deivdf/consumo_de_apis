import {useEffect, useState} from 'react'
import styled from '@emotion/styled'
import useSelectMonedas from '../hooks/useSelectMonedas'
import Error from './Error'
// las {} son para destructuring porque es un objeto
import {Monedas} from '../data/Monedas'

const InputSubmit = styled.input`
margin-top: 20px;
font-weight: bold;
font-size: 20px;
padding: 10px;
background-color: #9497ff;
border: none;
width: 100%;
border-radius: 10px;
color: white;
transition: background-color .3s ease;
&:hover {
  background-color: #326AC0;
  cursor: pointer;
}
`
const Formulario = ({setMonedas}) => {
// se le puede cambiar el nombre a la constante porque es un objeto y me devuelve el indice 
// y el objeto completo por eso se le puede cambiar el nombre a la constante
  const [criptos, setCriptos] = useState([])
  const [Moneda, SelectMonedas] = useSelectMonedas("Elige tu moneda:", Monedas)
  const [CriptoMoneda, SelectCriotomoneda ] = useSelectMonedas("Elige tu Cripto:", criptos)
  const [error, setError] = useState(false)
  // consulta a la api
  useEffect(() => {
      const consultarAPI = async ( ) => {
        const url = 'https://min-api.cryptocompare.com/data/top/mktcapfull?limit=10&tsym=USD'
        const respuesta = await fetch(url)
        const resultado = await respuesta.json()
        //consulta la informacion tradia de la api 
        const arrayCriptos = resultado.Data.map(cripto => {
          // muestra el filtro de la api por acronimo y nombre completo
          const objeto = {
            id: cripto.CoinInfo.Name,
            nombre: cripto.CoinInfo.FullName
          }
          return objeto
        })
        setCriptos(arrayCriptos)

      }
      consultarAPI()
  }, [])
  const handleSubmit = e => {
    e.preventDefault()
    //validar si ambos campos estan llenos
    //otra forma de hacerlo es con un if  [Moneda, CriptoMoneda].includes('')
    if(Moneda === '' || CriptoMoneda === '') {
      setError(true)
      setTimeout(() => {
        setError(false)
      },2000);
      return
    }
    setError(false)
    //{} son porque es un objeto asi que hay que eneviarlo como objeto con {} para que reciba los dos parametros
    setMonedas({Moneda, CriptoMoneda})
    //{Moneda} guarda el valor de la moneda en el state de app.js
  }
  return (
    <>
    {error && <Error>todos los campos son obligatorios</Error>}
          <form 
      onSubmit={handleSubmit}
        >
         <SelectMonedas 
         />
          <SelectCriotomoneda/>
          
        <InputSubmit type='submit' value='cotizar' />   
    </form>
    </>
  )
}

export default Formulario
