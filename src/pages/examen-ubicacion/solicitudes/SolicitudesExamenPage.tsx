import React from "react";
import SolicitudesService from "../../../services/solicitudes.service";
import { Isolicitud } from "../../../interfaces/solicitud.interface";
import { Box, Button, Chip, Grid } from "@mui/material";
import { GridColDef, GridRowId } from "@mui/x-data-grid";
import LanguageIcon from '@mui/icons-material/Language';
import KeyboardIcon from '@mui/icons-material/Keyboard';
import { Link, useNavigate } from "react-router-dom";
import { useStateContext } from "../../../contexts/ContextProvider";
import { MyDialog } from "../../../components/MUI";
import MyDataGrid from "../../../components/MUI/MyDataGrid";

export default function SolicitudesExamenPage() 
{
    //Hooks *****************************************************************
    const { cursos } = useStateContext()
    const navigate = useNavigate()
    const [ open, setOpen ] = React.useState<boolean>(false)
    const [data, setData] = React.useState<Isolicitud[]>([])
    const [idToDelete, setIdToDelete] = React.useState<GridRowId | null>(null);

    React.useEffect(()=>{
        SolicitudesService.fetchItemQuery(setData, null, false)
    },[]);

    //Functions**************************************************************
    //Dialog
    const handleConfirmDelete = async () => {
        if (idToDelete) {
            await SolicitudesService.deleteItem(idToDelete as string);
            setData(data.filter((row) => row.id !== idToDelete));
            setIdToDelete(null);
            setOpen(false);
        }
    };
    const handleDetails = (id:GridRowId) => {
        navigate(`./${id}`)
    }
    const handleDelete = async (id:GridRowId) => {
        setIdToDelete(id)
        setOpen(true)
    }
    

    const columns: GridColDef[] = [
        {
            field: 'manual',
            type: 'boolean',
            headerName: '',
            renderCell(params) {
                if(params.value){
                    return <KeyboardIcon color="secondary"/>
                }else{
                    return <LanguageIcon color="primary"/>
                }
            },
        },
        { 
            field: 'estado', 
            headerName: 'ESTADO' ,
            width: 130,
            renderCell: (params) =>{
                switch(params.value){
                    case 'NUEVO':
                        return <Chip label={params.value} color="error" />
                    case 'ELABORADO':
                        return <Chip label='ASIGNADO' color="primary" />
                    default:
                        return <Chip label='TERMINADO' />
                }
                
            }
        },
        {
            field: 'creado',
            type: 'date',
            renderHeader:() => (
                <strong>
                    {'FECHA '}
                    <span role='img' aria-label='date'>
                        📆
                    </span>
                </strong>
            ) 
        },
        { field: 'apellidos', type: 'string', headerName: 'APELLIDOS', width:200 },
        { field: 'nombres', type: 'string', headerName: 'NOMBRES', width:200 },
        { 
            field: 'idioma', 
            type: 'singleSelect', 
            headerName: 'IDIOMA',
            valueOptions: cursos,
            editable: false,
            width: 150
        },
        { field: 'nivel', type: 'string', headerName: 'NIVEL'  },
    ]
    
    return (
        <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
                <Link to='./nueva'>
                    <Button variant="contained">Nueva Solicitud</Button>
                </Link>
            </Grid>
            <Grid item xs={12} md={6} sx={{display:'flex', justifyContent:'flex-end'}}>
                <Box id='filter-panel' />
            </Grid>
            
            <Grid item minHeight={300} xs={12}>
                <MyDataGrid 
                    data={data} 
                    cols={columns}
                    handleDetails={handleDetails} 
                    handleDelete={handleDelete}/>
            </Grid>
            <MyDialog
                type='ALERT'
                title='Borrar Registro'
                content="Confirma borrar el registro?"
                open={open}
                setOpen={setOpen}
                actionFunc={handleConfirmDelete}
            /> 
        </Grid>
    )
}
