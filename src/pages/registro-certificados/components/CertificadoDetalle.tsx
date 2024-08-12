import { Button } from '@mui/material'
import React from 'react'
import AddIcon from '@mui/icons-material/Add';
import { MyDialog } from '../../../components/MUI';
import EditableDataGrid from '../../../components/MUI/EditableDataGrid';
import { IcertificadoDetalle } from '../../../interfaces/certificado.interface';
import CertificadosService, { Collection } from '../../../services/certificados.service';
import { GridColDef, GridRowId, GridRowModel, GridRowModes, GridRowModesModel } from '@mui/x-data-grid';


const cols:GridColDef[] = [
    {field: 'curso', headerName: 'CURSO', editable: true, width:220},
    {field: 'ciclo', headerName: 'CICLO', editable: true, width:280},
    {field: 'modalidad', headerName: 'MODALIDAD', editable: true},
    {field: 'nota', headerName: 'NOTA', editable: true, type:'number'}
]

type Props = {
    id_certificado: string,
    setData?: React.Dispatch<React.SetStateAction<IcertificadoDetalle[]>>
}

export default function CertificadoDetalle({id_certificado, setData}:Props) 
{
    const loadData = async (id:string | undefined) =>{
        const data = await CertificadosService.fetchItemsDetail(id as string)
        setRows(data)
        setData ? setData(data) : null
    }
    //hooks ****
    const [rows, setRows] = React.useState<IcertificadoDetalle[]>([])
    //const [ reload, setReload ] = React.useState<boolean>(false)
    const [ openDialog, setOpenDialog ] = React.useState<boolean>(false)
    const [rowModesModel, setRowModesModel] = React.useState<GridRowModesModel>({});
    const [idToDelete, setIdToDelete] = React.useState<GridRowId | null>(null);

    React.useEffect(()=>{
        if(id_certificado !== 'nuevo') loadData(id_certificado)
    },[id_certificado])

    //dialog ***
    const handleConfirmDelete = async () => {
        if (idToDelete) {
            await CertificadosService.deleteItem(Collection.CertificadosDetalle, idToDelete as string)
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
            id = await CertificadosService.newItem(Collection.CertificadosDetalle,newRow as IcertificadoDetalle)
        }else{
            CertificadosService.updateItem(Collection.CertificadosDetalle, newRow as IcertificadoDetalle)
        }
        const updatedRow:IcertificadoDetalle = {
            id:newRow.isNew ? id : newRow.id, 
            id_certificado: id_certificado, 
            curso:newRow.curso, 
            ciclo: newRow.ciclo,
            modalidad:newRow.modalidad,
            nota: newRow.nota,
            isNew: false 
        };
        setRows(rows.map((row) => (row.id === newRow.id ? updatedRow : row)));
        return updatedRow;
    };
    const handleNewClick = () => {
        const id = Math.floor(Math.random()*100).toString();
        console.log(id);
        
        setRows((oldRows) => [...oldRows, { id,id_certificado:id_certificado, curso: '', ciclo: '', modalidad: '',nota: 0, isNew: true }]);
        setRowModesModel((oldModel) => ({
            ...oldModel,
            [id]: { mode: GridRowModes.Edit, fieldToFocus: 'curso' },
        }));
    }

    return (
        <React.Fragment>
            <Button 
                disabled={id_certificado==='nuevo'}
                variant="contained" 
                endIcon={<AddIcon /> } 
                sx={{mb:1}} 
                onClick={handleNewClick}>
                    Asignar Nota(s)
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
