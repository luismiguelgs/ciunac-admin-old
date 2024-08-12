import { Button } from '@mui/material'
import React from 'react'
import AddIcon from '@mui/icons-material/Add';
import EditableDataGrid from '../../../../components/MUI/EditableDataGrid';
import { MyDialog } from '../../../../components/MUI';
import { GridColDef, GridRowId, GridRowModel, GridRowModes, GridRowModesModel } from '@mui/x-data-grid';
import { IcalificacionDetalle } from '../../../../interfaces/calificacion.interface';
import { CalificacionesService, Collection } from '../../../../services/calificaciones.service';

const cols:GridColDef[] = [
    {field: 'minimo', headerName: 'NOTA MÍNIMA', editable: true, width:150},
    {field: 'maximo', headerName: 'NOTA MÁXIMA', editable: true, width:150},
    {field: 'resultado', headerName: 'RESULTADO', editable: true, width:200},
]

type Props = {
    id: string | null
}

export default function CalificacionesRangos({id}:Props) 
{
    const loadData = async (id:string | null) =>{
        const data = await CalificacionesService.fetchItemsDetail(id as string)
        setRows(data)
    }
    //hooks ****
    const [rows, setRows] = React.useState<IcalificacionDetalle[]>([])
    const [ openDialog, setOpenDialog ] = React.useState<boolean>(false)
    const [rowModesModel, setRowModesModel] = React.useState<GridRowModesModel>({});
    const [idToDelete, setIdToDelete] = React.useState<GridRowId | null>(null);

    React.useEffect(()=>{
        loadData(id)
    },[])

    //dialog ***
    const handleConfirmDelete = async () => {
        if (idToDelete) {
            await CalificacionesService.deleteItem(Collection.Calificaciones_Detalle, idToDelete as string)
            setRows(rows.filter((row) => row.id !== idToDelete));
            setIdToDelete(null);
            setOpenDialog(false);
        }
    }; 
    //datagrid ***
    const handleDeleteClick = (id: GridRowId) => () => {    
        setIdToDelete(id)
        setOpenDialog(true)
    };
    const processRowUpdate = async(newRow: GridRowModel) => {
        //New or Update in DB
        let id:string | undefined
        if(newRow.isNew){
            id = await CalificacionesService.newItem(Collection.Calificaciones_Detalle,newRow as IcalificacionDetalle)
        }else{+
            CalificacionesService.updateItem(Collection.Calificaciones_Detalle, newRow as IcalificacionDetalle)
        }
        const updatedRow:IcalificacionDetalle = {
            id:newRow.isNew ? id : newRow.id, 
            id_calificacion: newRow.id_calificacion,
            minimo:newRow.minimo, 
            maximo:newRow.maximo,
            resultado: newRow.resultado,
            isNew: false 
        };
        setRows(rows.map((row) => (row.id === newRow.id ? updatedRow : row)));
        return updatedRow;
    };
    const handleNewClick = (id_calificacion:string) => {
        const id = Math.floor(Math.random()*100).toString();
        setRows((oldRows) => [...oldRows, { id, id_calificacion: id_calificacion, minimo: 0, maximo: 0, resultado: '', isNew: true }]);
        setRowModesModel((oldModel) => ({
            ...oldModel,
            [id]: { mode: GridRowModes.Edit, fieldToFocus: 'minimo' },
        }));
    }
    return (
        <React.Fragment>
            <Button 
                disabled={id===null}
                variant="contained" 
                endIcon={<AddIcon /> } 
                sx={{mb:1}} 
                onClick={()=>handleNewClick(id as string)}>
                    Nuevo Rango
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
