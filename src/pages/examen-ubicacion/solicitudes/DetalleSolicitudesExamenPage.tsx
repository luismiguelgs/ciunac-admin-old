import React from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { MyDialog } from '../../../components/MUI'
import { Button, Chip, Grid, Typography } from '@mui/material'
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import SolicitudesService from '../../../services/solicitudes.service';
import { Isolicitud } from '../../../interfaces/solicitud.interface';
import ProspectosService from '../../../services/prospectos.service';
import IProspecto from '../../../interfaces/prospecto.interface';
import MyAccordion, { PanelData } from '../../../components/MUI/MyAccordion';
import MilitaryTechIcon from '@mui/icons-material/MilitaryTech';
import FaceIcon from '@mui/icons-material/Face';
import PowerIcon from '@mui/icons-material/Power';
import OnlinePredictionIcon from '@mui/icons-material/OnlinePrediction';
import BasicInfo from './detalle/BasicInfo';
import FinanceInfo from './detalle/FinanceInfo';
import InfoExtra from './detalle/InfoExtra';



export default function DetalleSolicitudesExamenPage() 
{
    //hooks
    let {id} = useParams()
    const navigate = useNavigate()
    const [openDialog, setOpenDialog] = React.useState<boolean>(false);
    const [solicitud, setSolicitud] = React.useState<Isolicitud>()
    const [prospecto, setProspecto] = React.useState<IProspecto>()

    React.useEffect(()=>{
        const getData = async(id :string) =>{
            try{
                const solicitud = await SolicitudesService.getItem(id) as Isolicitud
                setSolicitud(solicitud)
                const prospecto = await ProspectosService.getItem(solicitud.alumno_id as string)
                setProspecto(prospecto)
            }
            catch(err:any){
                console.error("Error al obtener data" , err)
            }
        }
        getData(id as string)
    },[])

    const saveItem = async (values:Isolicitud) =>{
        //alert(JSON.stringify({...values, fecha_pago: new Date(values.fecha_pago).toISOString().split('T')[0]},null, 2))
        SolicitudesService.updateItem({...values, id:id, fecha_pago: new Date(values.fecha_pago).toISOString().split('T')[0]})
        setOpenDialog(true)
    }

    const panels:PanelData[] = [
        {
            title: 'Información de solicitud',
            content: solicitud && (<FinanceInfo item={solicitud as Isolicitud} saveItem={saveItem}/>),
            disabled: false
        },
        {
            title: 'Información de Alumno',
            content: prospecto && (<BasicInfo item={prospecto as IProspecto} edit={false} imagen_dni={solicitud?.img_dni as string}/>),
            disabled: false
        },
        {
            title: 'Información Adicional',
            content: solicitud && (<InfoExtra item={solicitud}/>),
            disabled: false
        },

    ]
    

    return (
        <React.Fragment>
            <Typography variant="h5" gutterBottom>Examen de Ubicación - Detalle Solicitud</Typography>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                {
                    solicitud?.estado === 'NUEVO' ? 
                    (<Chip icon={<MilitaryTechIcon />} label="Solicitud Nueva" sx={{m:1}} color="error"/>) : 
                    solicitud?.estado === 'ELABORADO' ?
                    (<Chip icon={<MilitaryTechIcon />} label="Solicitud Elaborada" sx={{m:1}} color="warning"/>) : 
                    (<Chip icon={<MilitaryTechIcon />} label="Solicitud Terminada" sx={{m:1}} color="success"/>)
                }
                {
                    prospecto?.facultad !== 'PAR' ? 
                    (<Chip icon={<FaceIcon />} label="Alumno UNAC" sx={{m:1}} color="primary"/>) : 
                    solicitud?.trabajador ? 
                    (<Chip icon={<FaceIcon />} label="Trabajador UNAC" sx={{m:1}} color="primary" />) :
                    (<Chip icon={<FaceIcon />} label="PARTICULAR" sx={{m:1}} color="primary"/>)
                }
                {
                    solicitud?.manual === true ? 
                    (<Chip icon={<PowerIcon />} label="Solicitud Manual" sx={{m:1}} />) : 
                    (<Chip icon={<OnlinePredictionIcon />} label="Solicitud Online" sx={{m:1}} />)
                }
                </Grid>
                <Grid item xs={12}>
                    <MyAccordion panels={panels} />
                </Grid>
                <Grid item xs={12}>
                    <Button
                        onClick={()=>navigate(-1)} 
                        variant="contained" 
                        color="secondary" 
                        sx={{m:'0 auto', color:'white'}}
                        //fullWidth
                        startIcon={<ArrowBackIcon/>}>
                        Atras
                    </Button>
                </Grid>
            </Grid>
            <MyDialog 
                open={openDialog}  
                setOpen={setOpenDialog} 
                content='Solicitud Guardada !'
                title='Nueva Solicitud' 
                type='SIMPLE' />
        </React.Fragment>
    )
}
