import { Box, Button, Chip, Grid } from '@mui/material';
import { GridColDef, GridRowId  } from '@mui/x-data-grid';
import React from 'react'
import AddIcon from '@mui/icons-material/Add';
import { Icertificado } from '../../interfaces/certificado.interface';
import { useStateContext } from '../../contexts/ContextProvider';
import { MyDialog } from '../../components/MUI';
import MyDataGrid from '../../components/MUI/MyDataGrid';
import { useNavigate } from 'react-router-dom';
import CertificadosService, { Collection } from '../../services/certificados.service';
import { NIVEL } from '../../services/constants.service';

export default function RegistroCertificadosPage() 
{
    
    //Hooks ************
    const {cursos} = useStateContext()
    const navigate = useNavigate()
    const [ openDialog, setOpenDialog ] = React.useState<boolean>(false)
    const [rows, setRows] = React.useState<Icertificado[]>([])
    const [ID, setID] = React.useState<GridRowId | null>(null);

    const loadData = async () =>{
        const data = await CertificadosService.fetchItems()
        setRows(data)
    }
    React.useEffect(()=> {
        loadData()
    },[])

    //Funcions ***************
    const handleConfirmDelete = async () => {
        if (ID) {
            //borrar su detalle
            const data = await CertificadosService.fetchItemsDetail(ID as string)
            for(const element of data){
                await CertificadosService.deleteItem(Collection.CertificadosDetalle, element.id as string)
            }
            //borrar el item
            await CertificadosService.deleteItem(Collection.Certificados,ID as string);
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
        { field: 'numero_registro', headerName: 'N°REGISTRO', width: 150 },
        {
            field: 'tipo',
            headerName: 'MODALIDAD',
            width: 150,
            renderCell: (params) =>{
                switch(params.value){
                    case 'virtual':
                        return <Chip label='VIRTUAL' color="error" />
                    case 'fisico':
                        return <Chip label='FISICO' color="primary" />
                    default:
                        return <Chip label={params.value} />
                }
                
            }
        },
        { field: 'alumno', headerName: 'ALUMNO', width: 220 },
        { field: 'fecha_emision', headerName: 'FECHA EMISIÓN', type: 'date', width: 150 },
        { field: 'idioma', headerName: 'IDIOMA', type: 'singleSelect', valueOptions: cursos, width: 150 },
        { field: 'nivel', headerName: 'NIVEL', type: 'singleSelect', valueOptions: NIVEL, width:150},
    ]

    return (
        <Grid container spacing={2} p={1}>
            <Grid item xs={12}  md={6}>
                <Button variant="contained" endIcon={<AddIcon /> } sx={{mb:1}} onClick={handleNewClick}>
                    Nuevo Certificado
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
