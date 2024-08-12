import MyTabs, { PanelTab } from '../../components/MUI/MyTabs'
import Salones from './configuracion/Salones'
import Calificaciones from './configuracion/Calificaciones'
import { Box, Typography } from '@mui/material'
import Profesores from './configuracion/Profesores'

export default function ConfiguracionPage() 
{
    const panels:PanelTab[] = [
        {
          label: 'Salas de Examen',
          content: <Salones />
        },
        {
          label: 'Calificaciones',
          content: <Calificaciones />
        },
        {
          label: 'Profesores',
          content: <Profesores />
        },
    ]

    return (
        <Box sx={{ width: '100%' }}>
            <Typography variant="h5" gutterBottom>Configuración</Typography>
            <MyTabs panels={panels} />
        </Box>
    )
}
