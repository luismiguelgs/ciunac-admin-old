import { Button } from '@mui/material'
import { GridColDef, GridRowId, GridRowModel, GridRowModes, GridRowModesModel} from '@mui/x-data-grid'
import React from 'react'
import AddIcon from '@mui/icons-material/Add';
import { useStateContext } from '../../contexts/ContextProvider';
import { MyDialog } from '../../components/MUI';
import { IBaseData } from '../../interfaces/types.interface';
import EditableDataGrid from '../../components/MUI/EditableDataGrid';
import { Collection, OpcionesService } from '../../services/opciones.service';

export default function OpcFacultades() 
{
    const loadData = async () => {
        const data = await OpcionesService.fetchItems<IBaseData>(Collection.Facultades)
        setFacultades(data)
    }
    //Hooks *****************************************************************
    const { facultades , setFacultades } = useStateContext()
    const [ openDialog, setOpenDialog ] = React.useState<boolean>(false)
    const [rows, setRows] = React.useState<IBaseData[]>(facultades)
    const [rowModesModel, setRowModesModel] = React.useState<GridRowModesModel>({});
    const [idToDelete, setIdToDelete] = React.useState<GridRowId | null>(null);

    React.useEffect(()=>{
        loadData()
    },[rows])

    //Dialog ***************************************************************
    const handleConfirmDelete = async () => {
        if (idToDelete) {
            await OpcionesService.deleteItem(Collection.Facultades, idToDelete as string);
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
        //console.log(newRow);
        //New or Update in DB
        let id:string | undefined
        if(newRow.isNew){
            id = await OpcionesService.newItem(Collection.Facultades, newRow as IBaseData)
        }else{
            OpcionesService.updateItem(Collection.Facultades, newRow as IBaseData)
        }
        const updatedRow:IBaseData = {
            id:newRow.isNew ? id : newRow.id, 
            value:newRow.value, 
            label:newRow.label, 
            creado:newRow.creado,
            isNew: false 
        };
        setRows(rows.map((row) => (row.id === newRow.id ? updatedRow : row)));
        return updatedRow;
    };

    const handleNewClick = () => {
        const id = Math.floor(Math.random()*100).toString();
        setRows((oldRows) => [...oldRows, { id, value: '', label: '', isNew: true }]);
        setRowModesModel((oldModel) => ({
            ...oldModel,
            [id]: { mode: GridRowModes.Edit, fieldToFocus: 'value' },
        }));
    }

    const cols:GridColDef[] = [
        {field: 'value', headerName: 'VALOR', editable: true, width:120},
        {field: 'label', headerName: 'ETIQUETA', editable: true, width:340},
        {field: 'creado', headerName: 'CREADO', editable:false, width:160},
    ]
    
    return (
        <React.Fragment>
            <Button variant="contained" endIcon={<AddIcon /> } sx={{mb:1}} onClick={handleNewClick}>
                Nueva Facultad
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
