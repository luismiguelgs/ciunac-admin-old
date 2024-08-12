import React from 'react'
import { Typography, Box } from '@mui/material';
import ImgTrabajador from '../components/Mantenimiento/ImgTrabajador';
import SolEntregadas from '../components/Mantenimiento/SolEntregadas';
import ImgVouchers from '../components/Mantenimiento/ImgVouchers';
import Solicitudes from '../components/Mantenimiento/Solicitudes';
import MyTabs, { PanelTab } from '../components/MUI/MyTabs';

export default function MantenimientoPage() 
{

    const panels:PanelTab[] = [
        {
            label: "Imágenes de Vouchers",
            content: <ImgVouchers />
        },
        {
            label: 'Imágenes de Cert.Trabajador"',
            content: <ImgTrabajador />
        },
        {
            label: 'Solicitudes Entregadas',
            content: <SolEntregadas />
        },
        {
            label: "Solicitudes",
            content: <Solicitudes />
        }
    ]
    return (
        <React.Fragment>
            <Box sx={{ width: '100%' }}>
                <Typography variant="h4" gutterBottom>Mantenimiento</Typography>
                <MyTabs panels={panels} />
            </Box>
        </React.Fragment>
    )
}
