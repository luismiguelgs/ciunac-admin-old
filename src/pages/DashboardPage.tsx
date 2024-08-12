import React from 'react'
import {Grid} from '@mui/material';
import ChartDonut from '../components/Charts/ChartDonut';
import ChartLine from '../components/Charts/ChartLine';
import CardChart from '../components/Charts/CardChart';
import BarChart from '../components/Charts/MyBarChart';
import { Isolicitud } from '../interfaces/solicitud.interface';
import SolicitudesService from '../services/solicitudes.service';
import Loading from '../components/Loading';

export default function DashboardPage() 
{
    const [data, setData] = React.useState<Isolicitud[]>([]);
    const [loading, setLoading] = React.useState<boolean>(true)
    
    React.useEffect(()=>{
      const fetchAndSetData = async ()=>{
            const d = await SolicitudesService.fetchItemsWODate()
            setData(d)
            setLoading(false)
      }
      fetchAndSetData()      
    },[])    

    if(loading){
        return <Loading />
    }

    return (
        <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
                <CardChart title='Solicitudes por Idioma'>
                    <ChartDonut data={data}/>
                </CardChart>
            </Grid>
            <Grid item xs={12} sm={6}>
                <CardChart title='Solicitudes por mes'>
                    <ChartLine data={data}/>
                </CardChart>
            </Grid>
            <Grid item xs={12} sm={6}>
                <CardChart title='Solicitudes por Facultad'>
                    <BarChart data={data} horizontal={true}/>
                </CardChart>
            </Grid>
            <Grid item xs={12} sm={6}>
                <CardChart title='Solicitudes por estado'>
                    <BarChart data={data} horizontal={false}/>
                </CardChart>
            </Grid>
        </Grid>   
    )
}
