import React from 'react'
import { Typography } from '@mui/material'
import ProspectosForm from './ProspectosForm'
import IProspecto from '../../../interfaces/prospecto.interface'
import ProspectosService from '../../../services/prospectos.service'
import { useNavigate } from 'react-router-dom'

export default function ProspectosNuevoPage() 
{
    //Hooks ******************************************************
    const navigation = useNavigate()
    //Functions **************************************************
    const onSubmit = async(values:IProspecto) =>{
        await ProspectosService.newItem(values)
        navigation(-1)
    }   

    return (
        <React.Fragment>
            <Typography variant="h5" gutterBottom>Examen de Ubicación - Nuevo Prospecto</Typography>
            <ProspectosForm onSubmit={onSubmit} />
        </React.Fragment>
    )
}
