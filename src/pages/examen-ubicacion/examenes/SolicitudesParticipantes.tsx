import { Box, Button } from '@mui/material';
import { DataGrid, GridColDef, GridRowSelectionModel } from '@mui/x-data-grid';
import React from 'react'
import LanguageIcon from '@mui/icons-material/Language';
import KeyboardIcon from '@mui/icons-material/Keyboard';
import SolicitudesService from '../../../services/solicitudes.service';
import { Isolicitud } from '../../../interfaces/solicitud.interface';
import { useStateContext } from '../../../contexts/ContextProvider';
import { IexamenNotas } from '../../../interfaces/examen.interface';
import { Collection, ExamenesService } from '../../../services/examenes.service';

type Props = {
    examenId : string,
    setReload: React.Dispatch<React.SetStateAction<boolean>>,
    setOpenDialogFull : React.Dispatch<React.SetStateAction<boolean>>
}

export default function SolicitudesParticipantes({examenId, setReload, setOpenDialogFull}:Props) 
{
    const { cursos } = useStateContext()
    const [data, setData] = React.useState<Isolicitud[]>([]);
    const [selectionModel, setSelectionModel] = React.useState<GridRowSelectionModel>([]);

    React.useEffect(() => {
        SolicitudesService.fetchItemQuery(setData, 'NUEVO', false)
    }, []);

    const handleSaveSelection = async() => {
        const selectedItems = data.filter(item => selectionModel.includes(item.id as string));
        console.log('Selected Items:', selectedItems);
        selectedItems.forEach((element)=>{
            let item : IexamenNotas = {
                examen_id: examenId,
                solicitud_id: element.id as string,
                idioma: element.idioma,
                nivel: element.nivel,
                apellidos: element.apellidos as string,
                nombres: element.nombres as string,
                dni: element.dni as string,
                numero_voucher: element.numero_voucher as string,
                monto: +element.pago,
                nota: 0,
                ubicacion: ''
            }
            //asigna participante
            asignarExamen(item)
            //actuliza el estado de la solicitud
            SolicitudesService.updateStatus(element.id as string, 'ELABORADO')
        })
        //recarga tabla de notas
        setReload((oldValue)=> !oldValue)
        //actualizar el estado del examen
        ExamenesService.updateStatus(examenId, 'ASIGNADO')
        //cierra el dialogo
        setOpenDialogFull(false)
    };

    const asignarExamen = async(item:IexamenNotas) => {
        await ExamenesService.newItem(Collection.Examenes_notas, item)
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
        { 
            field: 'pago', 
            headerName: 'MONTO(S/)', 
            align: 'right',
            renderCell(params) {
                return (<span>{`S/${Number(params.value).toFixed(2)}`}</span>)
            },
        }
    ];

    return (
        <React.Fragment>
            <Box p={2}>
                <Box p={2} style={{ minHeight: 400, width: '100%' }}>
                    <DataGrid
                        rows={data}
                        columns={columns}
                        checkboxSelection
                        onRowSelectionModelChange={(newSelectionModel) => {
                            setSelectionModel(newSelectionModel);
                        }}
                        rowSelectionModel={selectionModel}
                    />
                </Box>
                <Button variant="contained" color="primary" onClick={handleSaveSelection}>
                    Asignar Participante (S)
                </Button>
            </Box>
        </React.Fragment>
    )
}
