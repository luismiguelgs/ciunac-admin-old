import React from 'react'
import MyTabs, { PanelTab } from '../../components/MUI/MyTabs';
import ReportesCertificados from './ReporteCertificados';
import ReporteUbicacion from './ReporteUbicacion';
import { Box, Typography } from '@mui/material';


export default function ReportesPage() 
{
    const panels:PanelTab[] = [
        {
            label: 'Certificados',
            content: <ReportesCertificados />
        },
        {
            label: 'Examen de Ubicación',
            content: <ReporteUbicacion />
        }
    ]
    return (
        <React.Fragment>
            <Box sx={{ width: '100%' }}>
                <Typography variant="h4" gutterBottom>Reportes</Typography>
                <MyTabs panels={panels} />
            </Box>
        </React.Fragment>
    )
}
