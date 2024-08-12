import { Button } from '@mui/material'
import { GridColDef, GridRowId, GridRowModel, GridRowModes, GridRowModesModel} from '@mui/x-data-grid'
import React from 'react'
import AddIcon from '@mui/icons-material/Add';
import { useStateContext } from '../../contexts/ContextProvider';
import { MyDialog } from '../../components/MUI';
import { Icertificado } from '../../interfaces/types.interface';
import EditableDataGrid from '../../components/MUI/EditableDataGrid';
import { Collection, OpcionesService } from '../../services/opciones.service';

const cols:GridColDef[] = [
    {field: 'value', headerName: 'VALOR', editable: true, width:220},
    {field: 'label', headerName: 'ETIQUETA', editable: true, width:280},
    {field: 'precio', headerName: 'PRECIO S/', editable: true},
    {field: 'creado', headerName: 'CREADO', editable:false, width:160},
]

export default function OpcCertificados() 
{
    const loadData = async () => {
        const data = await OpcionesService.fetchItems<Icertificado>(Collection.Certificados)
        setCertificados(data)
    }
    //Hooks *****************************************************************
    const { certificados , setCertificados } = useStateContext()
    const [ openDialog, setOpenDialog ] = React.useState<boolean>(false)
    const [rows, setRows] = React.useState<Icertificado[]>(certificados)
    const [rowModesModel, setRowModesModel] = React.useState<GridRowModesModel>({});
    const [idToDelete, setIdToDelete] = React.useState<GridRowId | null>(null);

    React.useEffect(()=>{
        loadData()
    },[rows])

    //Dialog ***************************************************************
    const handleConfirmDelete = async () => {
        if (idToDelete) {
            await OpcionesService.deleteItem(Collection.Certificados, idToDelete as string)
            setRows(rows.filter((row) => row.id !== idToDelete));
            setIdToDelete(null);
            setOpenDialog(false);
        }
    };

    //DataGrid **************************************************************
    const handleDeleteClick = (id: GridRowId) => () => {    
        setIdToDelete(id)
        setOpenDialog(true)
    };

    const processRowUpdate = async(newRow: GridRowModel) => {
        //New or Update in DB
        let id:string | undefined
        if(newRow.isNew){
            id = await OpcionesService.newItem<Icertificado>(Collection.Certificados,newRow as Icertificado)
        }else{
            OpcionesService.updateItem<Icertificado>(Collection.Certificados, newRow as Icertificado)
        }
        const updatedRow:Icertificado = {
            id:newRow.isNew ? id : newRow.id, 
            value:newRow.value, 
            label:newRow.label, 
            precio: newRow.precio,
            creado:newRow.creado,
            isNew: false 
        };
        setRows(rows.map((row) => (row.id === newRow.id ? updatedRow : row)));
        return updatedRow;
    };

    const handleNewClick = () => {
        const id = Math.floor(Math.random()*100).toString();
        setRows((oldRows) => [...oldRows, { id, value: '', label: '', precio: 0, isNew: true }]);
        setRowModesModel((oldModel) => ({
            ...oldModel,
            [id]: { mode: GridRowModes.Edit, fieldToFocus: 'value' },
        }));
    }
    return (
        <React.Fragment>
            <Button variant="contained" endIcon={<AddIcon /> } sx={{mb:1}} onClick={handleNewClick}>
                Nuevo Documento
            </Button>
            <EditableDataGrid 
                columns={cols}
                rows={rows}
                setRows={setRows} 
                rowModesModel={rowModesModel}
                setRowModesModel={setRowModesModel}
                handleDeleteClick={handleDeleteClick}
                processRowUpdate={processRowUpdate}
            />
            
            <MyDialog 
                type='ALERT'
                title='Borrar Registro'
                content="Confirma borrar el registro?"
                open={openDialog}
                setOpen={setOpenDialog}
                actionFunc={handleConfirmDelete} 
            /> 
        </React.Fragment>
    )
}
