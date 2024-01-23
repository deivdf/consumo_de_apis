import {useState} from 'react'
import styled from '@emotion/styled'
const Label = styled.label`
color: aliceblue;
font-family: 'Lato', sans-serif;
display: block;
font-size: 2rem;
font-weight: 700;
`
const Select = styled.select`
width: 100%;
font-size: 18px;
padding: 0.5rem;
border-radius: 0.7rem;
margin-bottom: 1rem;
margin-top: 1rem;
`
const useSelectMonedas = (label, Opciones) => {
    // State del custom hook
    const[state, setState] = useState('')
    const SelectMonedas = () => (
        <>
             <Label>{label}</Label>
             <Select
                value={state}
                onChange={e=>setState(e.target.value)}
             >
                <option value="">- Seleccione -</option>
                {
                    Opciones.map(opcion=>(
                        <option
                         key={opcion.id}
                         value={opcion.id}
                         >
                                {opcion.nombre}
                         </option>
                    ))
                }
             </Select>
        </>
    )
    return [state, SelectMonedas]
}

export default useSelectMonedas
