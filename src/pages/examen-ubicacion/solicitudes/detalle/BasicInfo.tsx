import { Grid, Link, TextField } from '@mui/material'
//import React from 'react'
import IProspecto from '../../../../interfaces/prospecto.interface'
import { useStateContext } from '../../../../contexts/ContextProvider'
import { MySelect } from '../../../../components/MUI'
import pdfLogo from '../../../../assets/pdf.png'
import noImage from '../../../../assets/no_disponible.png'

type Props = {
    item: IProspecto
    imagen_dni: string
    edit:boolean
}

export default function BasicInfo({item, edit, imagen_dni}:Props) 
{
    const {facultades} = useStateContext()
    const isPdf = imagen_dni?.split('?')[0].slice(-3) === 'pdf'
    const hasImage = Boolean(imagen_dni)

    return (
        <Grid container spacing={2} p={2}>
            <Grid container item spacing={2} xs={12} md={8}>
            <Grid item xs={12} sm={6}>
                <TextField
                        disabled={!edit}
                        fullWidth
                        value={item?.apellidos}
                        //onChange={e=>handleChange(e)}
                        name="apellidos"
                        label="Apellidos"
                        InputLabelProps={{shrink: true,}}
                        helperText={false && "Campo requerido, mínimo 8 dígitos"}
                />
            </Grid>
            <Grid item xs={12} sm={6}>
                <TextField
                    disabled={!edit}
                    fullWidth
                    value={item?.nombres}
                    //onChange={e=>handleChange(e)}
                    name="nombres"
                    label="Nombres"
                    InputLabelProps={{shrink: true,}}
                    helperText={false && "Campo requerido, mínimo 8 dígitos"}
                />
            </Grid>
            <Grid item xs={12} sm={6}>
                <TextField
                    //required
                    disabled={!edit}
                    fullWidth
                    value={item?.dni}
                    //onChange={e=>handleChange(e)}
                    name="dni"
                    label="DNI"
                    InputLabelProps={{shrink: true,}}
                    helperText={false && "Campo requerido, mínimo 8 dígitos"}
                />
            </Grid>
            <Grid item xs={12} sm={6}>
                <TextField
                    required
                    disabled={!edit}
                    fullWidth
                    value={item?.telefono}
                    //onChange={e=>handleChange(e)}
                    name="celular"
                    label="Celular"
                    InputLabelProps={{shrink: true,}}
                    helperText={false && "Campo requerido, mínimo 8 dígitos"}
                />
            </Grid>
            <Grid item xs={12} sm={6}>
                <MySelect 
                    disabled={!edit} 
                    data={facultades} 
                    name="facultad" 
                    label="Facultad" 
                    value={item?.facultad} 
                    handleChange={()=>{}}
                    //helperText={true && "Seleccionar facultad"}
                />
            </Grid>
            <Grid item xs={12} sm={6}>
                {
                    item && (
                        <TextField
                            //required
                            disabled={!edit}
                            fullWidth
                            value={item.codigo}
                            //onChange={e=>handleChange(e)}
                            name="codigo"
                            label="Código de Alumno"
                            InputLabelProps={{ shrink: true, }}
                            helperText={false && "Campo requerido, mínimo 8 dígitos"}
                        />
                    )
                }
            </Grid>
            <Grid item xs={12} sm={6}>
                <TextField
                    //required
                    disabled={!edit}
                    fullWidth
                    value={item?.email}
                    //onChange={e=>handleChange(e)}
                    name="email"
                    label="Email"
                    InputLabelProps={{shrink: true,}}
                    helperText={false && "Campo requerido, mínimo 8 dígitos"}
                />
            </Grid>
            <Grid item xs={12} sm={6} alignContent='center'>
                {   Boolean(imagen_dni) ?
                        (<Link href={imagen_dni} underline='always' target='_blank' rel="noopener">VER DNI</Link>) 
                    :null
                }
                </Grid>
            </Grid>
            <Grid container item spacing={1} xs={12} md={4}>
            { 
                isPdf ? 
                    (<img src={pdfLogo} width='100%' />):
                    hasImage ? 
                       (<img src={imagen_dni} width='100%'/>) :
                       (<img src={noImage} width='100%'/>)
            }
            </Grid>
            
        </Grid>
    )
}
