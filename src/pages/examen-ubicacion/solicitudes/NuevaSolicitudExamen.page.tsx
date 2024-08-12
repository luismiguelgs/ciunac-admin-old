import { Typography } from '@mui/material'
import React from 'react'
import { MyDialog } from '../../../components/MUI'
import { Isolicitud } from '../../../interfaces/solicitud.interface'
import ProspectosService from '../../../services/prospectos.service'
import IProspecto from '../../../interfaces/prospecto.interface'
import SolicitudesService from '../../../services/solicitudes.service'
import FormNuevaSolicitud from '../../../components/FormNuevaSolicitud'


export default function NuevaSolicitudExamenPage() 
{
    //dialogo
    const [open, setOpen] = React.useState<boolean>(false)

    const onSubmit = async(values:any)=> {
        const prospecto:IProspecto = {
            dni: values.dni,
            nombres: values.nombres,
            apellidos: values.apellidos,
            telefono: values.celular as string,
            facultad: values.facultad as string,
            email: '',
            codigo: values.codigo,
            trabajador: values.trabajador,
        }
        const idProspecto = await ProspectosService.newItem(prospecto)

        const solicitud:Isolicitud = {
            solicitud: values.solicitud,
            apellidos: values.apellidos,
            dni: values.dni,
            nombres: values.nombres,
            periodo: values.periodo,
            numero_voucher: values.numero_voucher,
            pago: values.pago,
            idioma: values.idioma,
            nivel: values.nivel,
            fecha_pago: new Date(values.fecha_pago).toISOString().split('T')[0],
            trabajador: values.trabajador,
            alumno_id: idProspecto as string
        }
        await SolicitudesService.newItem(solicitud)
        setOpen(true)
    }

    return (
        <React.Fragment>
            <Typography variant="h5" gutterBottom>Examen de Ubicación - Nueva Solicitud</Typography>
            <FormNuevaSolicitud onSubmit={onSubmit}/>
            <MyDialog 
                open={open}  
                setOpen={setOpen} 
                content='Solicitud Guardada !'
                title='Nueva Solicitud' 
                type='SIMPLE' />
        </React.Fragment>
    )
}
