//import Chart from 'react-apexcharts';
import React from 'react'
import { Isolicitud } from '../../interfaces/solicitud.interface';
import { LineChart } from '@mui/x-charts';

type Props = {
  data: Isolicitud[]
}
  
export default function ChartLine({data}:Props) 
{
   
    //filtrar por el año actual
    const añoActual = new Date().getFullYear();
    const objetosConAñoActual = data.filter(objeto => parseInt((objeto.creado as string).split('/')[2]) === añoActual);

    const mes = []

    for (let index = 0; index < 12; index++) {
      mes[index] = objetosConAñoActual.filter(objeto => parseInt((objeto.creado as string).split('/')[1]) === index + 1)
    }

    // Datos para el gráfico de líneas

    const info = [
        mes[0].length, 
        mes[1].length, 
        mes[2].length, 
        mes[3].length, 
        mes[4].length, 
        mes[5].length,
        mes[6].length, 
        mes[7].length, 
        mes[8].length,
        mes[9].length,
        mes[10].length,
        mes[11].length,
    ]

    return (
      <React.Fragment>
          <LineChart 
            xAxis={[{data:[1, 2, 3, 4, 5, 6, 7, 8, 9,10,11,12]}]}
            series={[
                {
                    data: info,
                    area: true
                },
            ]}
            width={500}
            height={250}
          />
      </React.Fragment>
    )
}
