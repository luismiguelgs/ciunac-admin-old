import React from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import IProspecto from '../../../interfaces/prospecto.interface'
import ProspectosService from '../../../services/prospectos.service'
import ProspectosForm from './ProspectosForm'
import { Typography } from '@mui/material'

export default function ProspectosDetallePage() 
{
    //Hooks *********************************************************************
    let {id} = useParams()
    const navitage = useNavigate()
    const [data, setData] = React.useState<IProspecto>()

    React.useEffect(()=>{
        const getItem = async(id:string | undefined) => {
            const res = await ProspectosService.getItem(id as string)
            setData(res)
        }
        getItem(id)
    },[])

    //Functions ***************************************************************
    const onSubmit = async(values:IProspecto) =>{
        await ProspectosService.updateItem({id: id, ...values})
        navitage(-1)
    }   

    return (
        <React.Fragment>
            <Typography variant="h5" gutterBottom>Examen de Ubicación - Prospecto Detalles</Typography>
            {
                data && <ProspectosForm data={data} onSubmit={onSubmit}/>
            }
        </React.Fragment>
    )
}
