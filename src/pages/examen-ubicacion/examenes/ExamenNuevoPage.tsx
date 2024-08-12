import { Box, Typography } from '@mui/material'
import ExamenForm from './ExamenForm'
import React from 'react'
import ProfesoresService from '../../../services/profesores.service'
import { Collection, OpcionesService } from '../../../services/opciones.service'
import { Iprofesor } from '../../../interfaces/profesores.interface'
import { Isalon } from '../../../interfaces/types.interface'
import { Icalificacion } from '../../../interfaces/calificacion.interface'
import { CalificacionesService } from '../../../services/calificaciones.service'
import ExamenParticipantes from './ExamenParticipantes'
import { Iexamen } from '../../../interfaces/examen.interface'
import { ExamenesService, Collection as CollectionExam } from '../../../services/examenes.service'
import { useNavigate } from 'react-router-dom'

const ID = 'nuevo'

export default function ExamenNuevoPage() 
{   
    const navigate = useNavigate()
    const [profesores, setProfesores] = React.useState<Iprofesor[]>([])
    const [salones, setSalones] = React.useState<Isalon[]>([]) 
    const [calificaciones, setCalificaciones] = React.useState<Icalificacion[]>()
    const [calificacionesId, setCalificacionesId] = React.useState<string>('')
    React.useEffect(()=>{
        const loadData = async () =>{
            const dataProfesores = await ProfesoresService.fetchItems()
            const dataSalones = await OpcionesService.fetchItems<Isalon>(Collection.Salones)
            const dataCalificaciones = await CalificacionesService.fetchItems()
            setProfesores(dataProfesores)
            setSalones(dataSalones)
            setCalificaciones(dataCalificaciones)
        }
        loadData()
    },[])
    
    
    const handleClickActa = () => {
        //setOpen(true)
    }
    const handleClickSave = async(values:Iexamen) => {
        setCalificacionesId(values.calificacion_id)
        const id = await ExamenesService.newItem(CollectionExam.Examenes, values)
        navigate(`/examenes/${id}`)
        //alert(JSON.stringify(examenData, null, 2))
    }

    return (
        <Box>
            <Typography variant='h5' gutterBottom>Examen Nuevo</Typography>
            <ExamenForm 
                ID={ID}
                salones={salones}
                profesores={profesores}
                calificaciones={calificaciones}
                handleClickSave={handleClickSave}
                handleClickActa={handleClickActa} />
            <ExamenParticipantes id={ID} calificacionesId={calificacionesId}/>          
        </Box>
    )
}
