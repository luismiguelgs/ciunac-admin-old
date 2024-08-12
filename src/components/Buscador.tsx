import { Grid, IconButton, InputAdornment, Paper, TextField} from '@mui/material'
import React from 'react'
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import { Isolicitud } from '../interfaces/solicitud.interface';
import SearchIcon from '@mui/icons-material/Search';

type Props = {
    data: Isolicitud[],
    setData: React.Dispatch<React.SetStateAction<Isolicitud[]>>,
    aux: Isolicitud[]
}

export default function Buscador({data,setData,aux}:Props) 
{
    const [busqueda,setBusqueda] = React.useState<string>('')

    const handleChangeBusqueda = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setBusqueda(event.target.value);
    };
    React.useEffect(() => {
        // Filtrar los datos cuando cambia el término de búsqueda
        const filtered = data.filter(item => {
          // Puedes ajustar las propiedades que deseas incluir en la búsqueda
          return (
            item.nombres?.toLowerCase().includes(busqueda.toLowerCase()) ||
            item.apellidos?.toLowerCase().includes(busqueda.toLowerCase())
          );
        });
        
        if(busqueda === ''){
            resetFiltro()
        }else{
            setData(filtered);
        }
    }, [data, busqueda]);

    const resetFiltro = () =>{
        setData(aux)
        setBusqueda('')
    }
    
    return (
        <Grid container spacing={2} sx={{mb:2}}>
            <Grid item xs={12} sm={4}></Grid>
            <Grid item xs={12} sm={4}></Grid>
            <Grid item xs={12} sm={4}>
                <Paper sx={{ p: '15px 10px', display: 'flex', alignItems: 'center' }}>
                    <TextField
                        id="input-with-icon-textfield"
                        label="Buscar por apellido y/o nombre"
                        value={busqueda}
                        fullWidth
                        onChange={(e)=>handleChangeBusqueda(e)}
                        InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <SearchIcon />
                            </InputAdornment>
                            ),
                        }}
                        variant="outlined"
                    />
                    <IconButton size='large' color="primary" sx={{ p: '15px' }} aria-label="directions" onClick={()=>resetFiltro()}>
                        <RestartAltIcon />
                    </IconButton>
                </Paper>
            </Grid>
        </Grid>
    )
}
