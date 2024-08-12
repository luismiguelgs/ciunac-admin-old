import React from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Iprofesor } from '../../../interfaces/profesores.interface'
import ProfesoresService from '../../../services/profesores.service'
import { Collection, OpcionesService } from '../../../services/opciones.service'
import { Isalon } from '../../../interfaces/types.interface'
import { CalificacionesService } from '../../../services/calificaciones.service'
import { Iexamen, IexamenNotas } from '../../../interfaces/examen.interface'
import { Icalificacion } from '../../../interfaces/calificacion.interface'
import { ExamenesService, Collection as CollectionExam } from '../../../services/examenes.service'
import { Box, Typography } from '@mui/material'
import ExamenForm from './ExamenForm'
import ExamenParticipantes from './ExamenParticipantes'
import { MyDialog } from '../../../components/MUI'
import { PDFViewer } from '@react-pdf/renderer'
import FormatoActa from '../../../components/examenUbicacion/FormatoActa'
import dayjs from 'dayjs'
import { useStateContext } from '../../../contexts/ContextProvider'

export default function ExamenDetailPage() 
{
    let {id} = useParams()
    const navigate = useNavigate()
    const { cursos } = useStateContext()

    const [profesores, setProfesores] = React.useState<Iprofesor[]>([])
    const [salones, setSalones] = React.useState<Isalon[]>([])
    const [calificaciones, setCalificaciones] = React.useState<Icalificacion[]>()
    const [participantes, setParticipantes] = React.useState<IexamenNotas[]>([])
    const [data, setData] = React.useState<Iexamen | undefined>()
    const [open, setOpen] = React.useState<boolean>(false)
    const [calificacionesId, setCalificacionesId] = React.useState<string>('')
    const [profesor, setProfesor] = React.useState<string>('')

    React.useEffect(()=>{
        const loadData = async (id:string|undefined) =>{
            const dataProfesores = await ProfesoresService.fetchItems()
            const dataSalones = await OpcionesService.fetchItems<Isalon>(Collection.Salones)
            const dataCalificaciones = await CalificacionesService.fetchItems()
            setProfesores(dataProfesores)
            setSalones(dataSalones)
            setCalificaciones(dataCalificaciones)
            const data = await ExamenesService.selectItem(id as string)
            setData(data)
            const participantes = await ExamenesService.fetchItemsDetail(id as string)
            setParticipantes(participantes)
        }
        loadData(id)
    },[])

    const handleClickActa = () => {
        const item = profesores.filter(item => item.id === data?.profesor_id)[0]
        setProfesor(`${item.nombres} ${item.apellidos}`)
        setOpen(true)
    }
    const handleClickSave = async(values:Iexamen) => {
        setCalificacionesId(values.calificacion_id)
        await ExamenesService.updateItem(CollectionExam.Examenes, {...values, id:id})
        navigate(-1)
    }


    return (
        <Box>
            <Typography variant='h5' gutterBottom>Examen Detalle ({id})</Typography>
            {
                data ? 
                <ExamenForm 
                    ID={id}
                    salones={salones}
                    profesores={profesores}
                    data={data}
                    calificaciones={calificaciones}
                    handleClickActa={handleClickActa}
                    handleClickSave={handleClickSave}
                /> : <Typography variant='h6' gutterBottom>Loading...</Typography>
            }
            <ExamenParticipantes id={id} calificacionesId={calificacionesId}/>  
            <MyDialog 
                open={open}
                type='SIMPLE'
                title='ACTA DEL EXAMEN'
                setOpen={setOpen}
                content={<>
                    <PDFViewer width={800} height={500}>
				        <FormatoActa 
                            data={participantes} 
                            fecha={dayjs(new Date(data?.fecha_examen.seconds * 1000)).format('D [de] MMMM [de] YYYY' )} 
                            idioma={cursos.filter(item=>item.value === data?.idioma)[0]?.label} 
                            profesor={profesor} />
			        </PDFViewer>
                </>}
            />
        </Box>
    )
}
