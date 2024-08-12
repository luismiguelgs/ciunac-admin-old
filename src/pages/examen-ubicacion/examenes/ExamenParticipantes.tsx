import { Button } from '@mui/material'
import React from 'react'
import EditableDataGrid from '../../../components/MUI/EditableDataGrid'
import { MyDialog } from '../../../components/MUI'
import AddIcon from '@mui/icons-material/Add';
import { GridColDef, GridRowId, GridRowModel, GridRowModesModel } from '@mui/x-data-grid';
import { Collection, ExamenesService } from '../../../services/examenes.service';
import { IexamenNotas } from '../../../interfaces/examen.interface';
import DialogFull from '../../../components/Dialogs/DialogFull';
import SolicitudesParticipantes from './SolicitudesParticipantes';
import SolicitudesService from '../../../services/solicitudes.service';
import { CalificacionesService } from '../../../services/calificaciones.service';
import { IcalificacionDetalle } from '../../../interfaces/calificacion.interface';

const cols:GridColDef[] = [
    {field: 'dni', headerName: 'DNI', editable:false, width: 120},
    {field: 'apellidos', headerName: 'APELLIDOS', editable: false, width:150},
    {field: 'nombres', headerName: 'NOMBRES', editable: false, width:150},
    {field: 'nota', headerName: 'NOTA', editable: true, width:150},
    {field: 'ubicacion', headerName: 'UBICACIÓN', editable: false, width:200},
]

type Props = {
    id:string | undefined,
    calificacionesId: string | undefined
}

export default function ExamenParticipantes({id, calificacionesId}:Props) 
{
    const loadData = async (id:string | undefined) =>{
        const data = await ExamenesService.fetchItemsDetail(id as string)
        setRows(data)
        //cargar la matriz de ubicación
        const ubicacion = await CalificacionesService.fetchItemsDetail(calificacionesId as string)
        setUbication(ubicacion)
    }
    //hooks ****
    const [rows, setRows] = React.useState<IexamenNotas[]>([])
    const [ reload, setReload ] = React.useState<boolean>(false)
    const [ openDialog, setOpenDialog ] = React.useState<boolean>(false)
    const [ ubication, setUbication] = React.useState<IcalificacionDetalle[]>([])
    const [ openDialogFull, setOpenDialogFull ] = React.useState<boolean>(false)
    const [rowModesModel, setRowModesModel] = React.useState<GridRowModesModel>({});
    const [idToDelete, setIdToDelete] = React.useState<GridRowId | null>(null);

    React.useEffect(()=>{
        loadData(id)
    },[reload])

    //dialog ***
    const handleConfirmDelete = async () => {
        if (idToDelete) {
            //actualizar el estatus de la solicitud
            const solicitudId:string = rows.filter((row) => row.id === idToDelete)[0].solicitud_id
            await SolicitudesService.updateStatus(solicitudId, 'NUEVO')
            //borrar el registro asignado
            await ExamenesService.deleteItem(Collection.Examenes_notas, idToDelete as string)
            
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

    const obtenerResultado = (nota: number): string => {
        for (const calificacion of ubication) {
          const minimo = Number(calificacion.minimo)
          const maximo = Number(calificacion.maximo)
      
          if (nota >= minimo && nota <= maximo) {
            return calificacion.resultado as string;
          }
        }
        return "Nota fuera de rango";
    };

    const processRowUpdate = async(newRow: GridRowModel) => {
        //actualizar la ubicacion 
        newRow.ubicacion = obtenerResultado(newRow.nota)
        //actualizar la base de datos
        ExamenesService.updateItem(Collection.Examenes_notas, newRow as IexamenNotas)
        
        //actualizar la tabla
        const updatedRow:IexamenNotas = {
            id: newRow.id, 
            examen_id: newRow.examen_id,
            solicitud_id: newRow.solicitud_id,
            idioma:newRow.idioma, 
            nivel:newRow.nivel,
            dni: newRow.dni, 
            nombres : newRow.nombres,
            apellidos: newRow.apellidos,
            numero_voucher: newRow.numero_voucher,
            monto: newRow.monto,
            nota: newRow.nota,
            ubicacion: newRow.ubicacion
        };
        setRows(rows.map((row) => (row.id === newRow.id ? updatedRow : row)));
        return updatedRow;
    };

    const handleNewClick = () => {
        setOpenDialogFull(true)
    }

    return (
        <React.Fragment>
            <Button 
                disabled={id==='nuevo'}
                variant="contained" 
                endIcon={<AddIcon /> } 
                sx={{mb:1}} 
                onClick={()=>handleNewClick()}>
                    Asignar Participantes
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
            <DialogFull
                title='Solicitudes' 
                open={openDialogFull}
                setOpen={setOpenDialogFull}
                content={
                    <SolicitudesParticipantes 
                        examenId={id as string} 
                        setReload={setReload}
                        setOpenDialogFull={setOpenDialogFull}
                    />
                }
            />
        </React.Fragment>
    )
}
