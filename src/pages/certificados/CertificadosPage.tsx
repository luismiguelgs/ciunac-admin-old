import React from "react";
import { Isolicitud } from "../../interfaces/solicitud.interface";
import { Link, useSearchParams } from "react-router-dom";
import { Box, Button, Grid, Portal, Typography } from "@mui/material";
import LanguageIcon from '@mui/icons-material/Language';
import KeyboardIcon from '@mui/icons-material/Keyboard';
import SolicitudesService from "../../services/solicitudes.service";
import DialogFull from "../../components/Dialogs/DialogFull";
import MyDialog from "../../components/MUI/MyDialog";
import { DataGrid, GridActionsCellItem, GridColDef, GridRowId, GridRowParams, GridToolbar, GridToolbarQuickFilter } from "@mui/x-data-grid";
import { useStateContext } from "../../contexts/ContextProvider";
import DeleteIcon from '@mui/icons-material/Delete';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { formatDate } from "../../services/util.service";
import DetalleSolicitud from "../../components/DetalleSolicitud/DetalleSolicitud";

function MyCustomToolbar(props: any){
    return(
        <React.Fragment>
            <Portal container={()=>document.getElementById('filter-panel')!}>
                <GridToolbarQuickFilter />
            </Portal>
            <GridToolbar {...props} />
        </React.Fragment>
    )
}

export default function CertificadosPage() 
{
    //HOOKS **************************************************
    const { certificados, cursos } = useStateContext()
    const [searchParams] = useSearchParams() //router

    const [ID, setID] = React.useState<string| undefined>(''); //Dialog
    const [openDialogDelete, setOpenDialogDelete] = React.useState<boolean>(false);
    const [openDialogFullDetail, setOpenDialogFullDetail] = React.useState<boolean>(false);

    const [data, setData] = React.useState<Isolicitud[]>([]);
    //const [dataTemp, setDataTemp] = React.useState<Isolicitud[]>([]);
    
    React.useEffect(()=>{
        SolicitudesService.fetchItemQuery(setData, searchParams.get('estado'))
    },[searchParams.get('estado')]);
    

    //FUNCTIONS ***********************************************
    const handleDelete = (id:GridRowId) =>{
        setID(id as string)
        setOpenDialogDelete(true)
    }
    const handleDetails = (id:GridRowId) =>{
        setOpenDialogFullDetail(true)
        setID(id as string)
    }
    const deleteFunc = () => {
        SolicitudesService.deleteItem(ID)
        setOpenDialogDelete(false)
    }

    const columns: GridColDef[] = [
        {
            field: 'manual',
            type: 'boolean',
            headerName: 'ONLINE',
                renderCell(params) {
                    if(params.value){
                        return <KeyboardIcon color="secondary"/>
                    }else{
                        return <LanguageIcon color="primary"/>
                    }
                }
        },
        { field: 'periodo', type: 'string', headerName: 'PERIODO' },
        { 
            field: 'solicitud', 
            type: 'singleSelect', 
            headerName: 'SOLICITUD',
            valueOptions: certificados,
            editable: false,
            width: 220
        },
        {
            field: 'creado',
            type: 'string',
            width: 160,
            renderHeader:() => (
                <strong>
                    {'FECHA '}
                    <span role='img' aria-label='date'>
                        📆
                    </span>
                </strong>
            ),
            valueFormatter: (value) => {
                formatDate(value)
            } 
        },
        { field: 'apellidos', type: 'string', headerName: 'APELLIDOS', width:160 },
        { field: 'nombres', type: 'string', headerName: 'NOMBRES', width:160 },
        { 
            field: 'idioma', 
            type: 'singleSelect', 
            headerName: 'IDIOMA',
            valueOptions: cursos,
            editable: false,
            //width: 150
        },
        { field: 'nivel', type: 'string', headerName: 'NIVEL', width: 150  },
        { 
            field: 'actions', 
            type: 'actions', 
            getActions: (params:GridRowParams) => [
                <GridActionsCellItem
                    icon={<VisibilityIcon />}
                    label='Detalles'
                    onClick={()=>handleDetails(params.id)}
                />,
                <GridActionsCellItem 
                    showInMenu
                    icon={<DeleteIcon />}
                    label='Borrar'
                    onClick={()=>handleDelete(params.id)}
                />
            ]
        }
    ]

    return (
        <>
        <Grid container spacing={2}>
            <Grid item xs={12} >
            {
                searchParams.get('estado') === 'NUEVO' ? (<Typography variant="h4" gutterBottom>SOLICITUDES NUEVAS</Typography>) :
                searchParams.get('estado') === 'ELABORADO' ? (<Typography variant="h4" gutterBottom>SOLICITUDES ELABORADAS</Typography>) :
                (<Typography variant="h5" gutterBottom>SOLICITUDES ENTREGADAS</Typography>) 
            }
            </Grid>
            <Grid item xs={12} md={6}>
                <Link to='/solicitud-nueva'>
                    <Button variant="contained">Nueva Solicitud</Button>
                </Link>
            </Grid>
            <Grid item xs={12} md={6} sx={{display:'flex', justifyContent:'flex-end'}}>
                <Box id='filter-panel' />
            </Grid>
            <Grid item minHeight={300} xs={12}>
                <DataGrid 
                        pageSizeOptions={[10,25,100]}
                        rows={data}
                        sx={{width:'98%', margin:'0 auto'}}
                        columns={columns}
                        disableColumnMenu
                        slots={{toolbar: MyCustomToolbar}}
                        initialState={{
                            filter:{
                                filterModel:{
                                    items: [],
                                    quickFilterExcludeHiddenColumns:true
                                }
                            }
                        }}
                        slotProps={{
                            columnsManagement:{
                                disableResetButton:true,
                                disableShowHideToggle: true
                            }
                        }}
                    />
            </Grid>
        </Grid>
        
        <DialogFull 
            open={openDialogFullDetail} 
            setOpen={setOpenDialogFullDetail}
            title="Detalle de Solicitud"
            content={<DetalleSolicitud 
                id={ID} 
                setOpen={setOpenDialogFullDetail}
            />}
        />
        <MyDialog
            type="ALERT"
            title="Borrar Registro"
            open={openDialogDelete}
            content='Confirma borrar el registro?'
            setOpen={setOpenDialogDelete}
            actionFunc={deleteFunc}
        />
        </>
    )
}
