import React from 'react'
import { GridColDef, GridRowId } from '@mui/x-data-grid';
import { Box, Button, Chip, Grid } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { Iexamen } from '../../interfaces/examen.interface';
import { Collection, ExamenesService } from '../../services/examenes.service';
import { useNavigate } from 'react-router-dom';
import MyDataGrid from '../../components/MUI/MyDataGrid';
import { MyDialog } from '../../components/MUI';


export default function ExamenesPage() 
{
    //Hooks ************
    const navigate = useNavigate()
    const [ openDialog, setOpenDialog ] = React.useState<boolean>(false)
    const [rows, setRows] = React.useState<Iexamen[]>([])
    const [ID, setID] = React.useState<GridRowId | null>(null);

    const loadData = async () =>{
        const data = await ExamenesService.fetchItems()
        setRows(data)
    }
    React.useEffect(()=> {
        loadData()
    },[])

    //Funcions ***************
    const handleConfirmDelete = async () => {
        if (ID) {
            //borrar su detalle
            const data = await ExamenesService.fetchItemsDetail(ID as string)
            for(const element of data){
                await ExamenesService.deleteItem(Collection.Examenes_notas, element.id as string)
            }
            //borrar el item
            await ExamenesService.deleteItem(Collection.Examenes,ID as string);
            setRows(rows.filter((row) => row.id !== ID));
            setID(null);
            setOpenDialog(false);
        }
    };
    const handleDetails = (id:GridRowId) => {
        setID(id)
        navigate(`./${id}`)
    }
    const handleDelete = async (id:GridRowId) => {
        setID(id)
        setOpenDialog(true)
    }
    
    const handleNewClick = () => {
        setID(null)
        navigate(`./nuevo`)
    }

    //Columnas ***************
    const columns: GridColDef[] = [
        {
            field: 'codigo',
            headerName: 'CÓDIGO',
            width: 150
        },
        {
            field: 'estado',
            headerName: 'ESTADO',
            width: 150,
            renderCell: (params) =>{
                switch(params.value){
                    case 'PROGRAMADO':
                        return <Chip label={params.value} color="error" />
                    case 'ASIGNADO':
                        return <Chip label={params.value} color="primary" />
                    default:
                        return <Chip label={params.value} />
                }
                
            }
        },
        { 
            field: 'fecha_examen', 
            type: 'dateTime', 
            width: 150,
            editable: false,
            renderHeader:() => (
                <strong>
                    {'Fecha Examen '}
                    <span role='img' aria-label='date'>
                        📆
                    </span>
                </strong>
            ), 
            renderCell: (params) => (
                <strong>{new Date(params.value).toLocaleDateString()}</strong>
            )
        },
        { field: 'fecha_final', headerName: 'Fecha Final', type: 'date', width: 120 },
        { field: 'idioma', headerName: 'Idioma', type: 'string', width: 120 },
        { field: 'nivel', headerName: 'NIVEL', width:100},
        { field: 'profesor', headerName: 'Profesor', type: 'string', width: 180 },
        { field: 'salon', headerName: 'Salón', type: 'string', width: 100 },
    ];
    
    return (
        <Grid container spacing={2} p={1}>
            <Grid item xs={12}  md={6}>
                <Button variant="contained" endIcon={<AddIcon /> } sx={{mb:1}} onClick={handleNewClick}>
                    Nuevo Examen
                </Button>
            </Grid>
            <Grid item xs={12} md={6} sx={{display:'flex', justifyContent:'flex-end'}}>
                <Box id='filter-panel' />
            </Grid>
            <Grid item minHeight={300} xs={12}>
                <MyDataGrid 
                    data={rows} 
                    cols={columns}
                    handleDetails={handleDetails} 
                    handleDelete={handleDelete}/>
            </Grid>
            <MyDialog
                type='ALERT'
                title='Borrar Registro'
                content="Confirma borrar el registro?"
                open={openDialog}
                setOpen={setOpenDialog}
                actionFunc={handleConfirmDelete}
            /> 
        </Grid>
    )
}
