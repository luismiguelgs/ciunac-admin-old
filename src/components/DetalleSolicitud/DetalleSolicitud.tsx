import React from 'react'
import { Isolicitud } from '../../interfaces/solicitud.interface';
import SolicitudesService from '../../services/solicitudes.service';
import { valEditarSolicitud } from '../../services/validation.service';
import { Button, Grid, Link } from '@mui/material';
import BasicInfo from './BasicInfo';
import FinInfo from './FinInfo';
import Info2010 from './Info2010';
import MyAccordion, { PanelData } from '../MUI/MyAccordion';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import EditNoteIcon from '@mui/icons-material/EditNote';
import SaveIcon from '@mui/icons-material/Save';
import { MyDialog, MySnackBar } from '../MUI';

type IWProps = {item:Isolicitud}
function InfoWorker({item}:IWProps){
    return(
        <React.Fragment>
            <img src={item?.certificado_trabajo} width={280}/>
            <br />
        {   item.certificado_trabajo !== '' ?
            (<Link href={item?.certificado_trabajo} underline='always' target='_blank' rel="noopener">VER ARCHIVO</Link>) 
        :null
        }
        </React.Fragment>
    )   
}

type Props = {
    id:string | undefined,
    setOpen:React.Dispatch<React.SetStateAction<boolean>>
}

export default function DetalleSolicitud({id, setOpen}:Props) 
{
    
    //manejo de snackbar
    const [openS, setOpenS] = React.useState<boolean>(false); 
    
    //manejo de dialogo
    const [openD, setOpenD] = React.useState<boolean>(false);

    //datos de solicitud
    const [item, setItem] = React.useState<Isolicitud>({id:'', solicitud:'', antiguo:false, apellidos:'', nombres:'', celular:'', certificado_trabajo:'',
     codigo:'', dni:'', email:'', idioma:'', nivel:'', numero_voucher:'', facultad:'', fecha_pago:'', trabajador:false, voucher:'', estado:'', pago:'',
     modificado:'', periodo:''})
    
    React.useEffect(()=>{
        const getItem = async(id :string) =>{
            let solicitud = await SolicitudesService.getItem(id) as Isolicitud
            setItem(solicitud)
        }
        getItem(id as string)
    },[])

    //manejar edicion
    const [edit, setEdit] = React.useState<boolean>(false)

    //manejar guardar
    const handleClickSave = () =>{
        if(valEditarSolicitud(item)){
             setOpenD(true)
        }else{
            setOpenS(true)
        }
    }
    //guardar en la bd
    const saveItem = ():void => {
        delete item.creado
        alert(JSON.stringify(item))
        SolicitudesService.updateItem(item)
        setEdit(false)
        setOpenD(false)
    }
    const handleChange = (event:React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>{
        const {name, value} = event.target
        setItem((prevFormData)=>({...prevFormData, [name]:value}))
    }

    const panels:PanelData[] = [
        {
            title: 'Información de Alumno',
            content: <BasicInfo item={item} handleChange={handleChange} edit={edit} />,
            disabled: false
        },
        {
            title: 'Información de solicitud',
            content: <FinInfo item={item} handleChange={handleChange} edit={edit} />,
            disabled: false
        },
        {
            title: 'Información de trabajador',
            content: <InfoWorker item={item} />,
            disabled: !item.trabajador
        },
        {
            title: 'Información de cursos anteriores al 2009',
            content: <Info2010 id={item.id as string}/>,
            disabled: !item.antiguo
        }
    ]

    return (
        <React.Fragment>
            {
                item ? (
                <Grid container spacing={2} sx={{p:2}}>
                    <Grid item xs={12}>
                        <MyAccordion panels={panels} />
                    </Grid>
                    <Grid item xs={12}>
                        <Button 
                            onClick={()=>setOpen(false)} 
                            variant="contained" 
                            color="secondary" 
                            sx={{ml:2}}
                            startIcon={<ArrowBackIcon/>}>
                            Atras
                        </Button>
                        <Button 
                            variant="contained" 
                            color="primary" 
                            sx={{ml:2}} 
                            onClick={()=>setEdit(true)} 
                            endIcon={<EditNoteIcon />}
                            disabled={edit}>
                            Editar
                        </Button>
                        <Button 
                            variant="contained" 
                            color="success" 
                            onClick={handleClickSave}
                            sx={{ml:2}} 
                            endIcon={<SaveIcon />}
                            disabled={!edit}>
                            Guardar
                        </Button>
                    </Grid>
                </Grid>
                ):(<div>Loading...</div>)
            }
            <MySnackBar open={openS} setOpen={setOpenS} content='Verificar que todos los datos esten ingresados' />
            <MyDialog 
                type='ALERT' 
                title='Guardar Registro' 
                content='Confirma guardar los datos actuales?' 
                open={openD} 
                setOpen={setOpenD} 
                actionFunc={saveItem} />
        </React.Fragment>
    )
}
