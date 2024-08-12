import { TextField } from '@mui/material'
import React from 'react'

type Props = {
    certificado?:boolean,
    opt:string,
    item:any,
    setItem:React.Dispatch<React.SetStateAction<any>>,
}

export default function FormDialog({certificado=false, item, setItem, opt}:Props) 
{
    const handleChange = (event:React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>{
        const {name, value} = event.target
        setItem((prevFormData:any)=>({...prevFormData, [name]:value}))
    }
    return (
        <React.Fragment>
            {
                opt === 'NUEVO' ? (
                    <TextField
                        autoFocus
                        value={item.value}
                        margin="dense"
                        name="value"
                        label="Valor"
                        onChange={(e)=>handleChange(e)}
                        type="text"
                        fullWidth
                        variant="standard"
                    />
                ) : null
            }
            <TextField
                margin="dense"
                name="label"
                value={item.label}
                label="Etiqueta"
                onChange={(e)=>handleChange(e)}
                type="text"
                fullWidth
                variant="standard"
            />
            {
                certificado && 
                    <TextField
                        margin="dense"
                        name="precio"
                        value={item?.precio}
                        label="Precio"
                        onChange={(e)=>handleChange(e)}
                        type="number"
                        fullWidth
                        variant="standard"
                    />
            }   
        </React.Fragment>
    )
}
