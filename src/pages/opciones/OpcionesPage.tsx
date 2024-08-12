import React from 'react'
import { Typography, Box } from '@mui/material';
import OpcCertificados from './OpcCertificados';
import OpcTextos from './OpcTextos';
import OpcCursos from './OpcCursos';
import OpcFacultades from './OpcFacultades';
import MyTabs, { PanelTab } from '../../components/MUI/MyTabs';

export default function OpcionesPage() 
{
    const panels:PanelTab[] = [
        {
          label: 'Certificados',
          content: <OpcCertificados />
        },
        {
          label: 'Textos',
          content: <OpcTextos />
        },
        {
          label: 'Cursos',
          content: <OpcCursos />
        },
        {
          label: 'Facultades',
          content: <OpcFacultades />
        }
    ]

    return (
        <React.Fragment>
            <Box sx={{ width: '100%' }}>
                <Typography variant="h4" gutterBottom>Opciones</Typography>
                <MyTabs panels={panels} />
            </Box>
        </React.Fragment>
    )
}
