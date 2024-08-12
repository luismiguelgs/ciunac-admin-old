import { GridColDef, GridRowId, GridRowModel, GridRowModes, GridRowModesModel } from '@mui/x-data-grid'
import React from 'react'
import ProfesoresService from '../../../services/profesores.service'
import { Iprofesor } from '../../../interfaces/profesores.interface'
import AddIcon from '@mui/icons-material/Add';
import { Button } from '@mui/material';
import EditableDataGrid from '../../../components/MUI/EditableDataGrid';
import { MyDialog } from '../../../components/MUI';
import { GENERO } from '../../../services/constants.service';


export default function Profesores() 
{
    const loadData = async () =>{
        const data = await ProfesoresService.fetchItems()
        setRows(data) 
    }

    //hooks ****
    const [rows, setRows] = React.useState<Iprofesor[]>([])
    const [ openDialog, setOpenDialog ] = React.useState<boolean>(false)
    const [rowModesModel, setRowModesModel] = React.useState<GridRowModesModel>({});
    const [idToDelete, setIdToDelete] = React.useState<GridRowId | null>(null);
    
    React.useEffect(()=>{
        loadData()
    },[])

    //dialog ***
    const handleConfirmDelete = async () => {
        if (idToDelete) {
            await ProfesoresService.deleteItem(idToDelete as string)
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
        let id:string | undefined | void
        if(newRow.isNew){
            id = await ProfesoresService.newItem(newRow as Iprofesor)
        }else{
            await ProfesoresService.updateItem(newRow as Iprofesor)
        }
        console.log(newRow);
        
        const updatedRow:Iprofesor = {
            id:newRow.isNew ? id : newRow.id, 
            nombres: newRow.nombres,
            apellidos: newRow.apellidos,
            genero: newRow.genero,
            email: newRow.email,
            telefono: newRow.telefono,
            fecha_nacimiento: newRow.fecha_nacimiento,
            isNew: false 
        };
        setRows(rows.map((row) => (row.id === newRow.id ? updatedRow : row)));
        console.log(updatedRow);
        return updatedRow;
    };
    const handleNewClick = () => {
        const id = Math.floor(Math.random()*100).toString();
        setRows((oldRows) => [...oldRows, {
            id, 
            nombres: '', 
            apellidos: '', 
            genero: 'M', 
            email: '',
            telefono: '',
            fecha_nacimiento: '',
            isNew: true 
        }]);
        setRowModesModel((oldModel) => ({
            ...oldModel,
            [id]: { mode: GridRowModes.Edit, fieldToFocus: 'nombres' },
        }));
    }

    const cols:GridColDef[] = [
        {field: 'nombres', headerName: 'NOMBRES',type:'string' , editable: true, width:200},
        {field: 'apellidos', headerName: 'APELLIDOS', type:'string' ,editable: true, width:200},
        {
            field: 'genero', 
            type: 'singleSelect', 
            headerName: 'GÉNERO',
            valueOptions: GENERO,
            editable: true,
            width: 140
        },
        {
            field: 'fecha_nacimiento', 
            headerName: 'F.NACIMIENTO', 
            type:'date',
            editable:true, 
            width:140,
            valueFormatter: (value) => {
                return new Date(value).toLocaleDateString()
            } 
        },
        {field: 'telefono', headerName: 'TELÉFONO', editable:true, width:120},
        {field: 'email', headerName: 'EMAIL', editable:true, width:180},
    ]
    

    return (
        <React.Fragment>
            <Button variant="contained" endIcon={<AddIcon /> } sx={{mb:1}} onClick={handleNewClick}>
                Nuevo Profesor
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
