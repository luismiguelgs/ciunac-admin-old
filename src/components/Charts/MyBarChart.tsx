import React from 'react'
import { Isolicitud } from '../../interfaces/solicitud.interface';
import { BarChart } from '@mui/x-charts/BarChart';
import { axisClasses } from '@mui/x-charts';


type Props = {
  horizontal: boolean
  data: Isolicitud[]
}

export default function MyBarChart({horizontal, data}:Props) 
{
    let series:any
    if(horizontal){
        const fcc = data.filter(objeto => objeto.facultad === 'FCC').length;
        const fpa = data.filter(objeto => objeto.facultad === 'FPA').length;
        const fce = data.filter(objeto => objeto.facultad === 'FCE').length;
        const fca = data.filter(objeto => objeto.facultad === 'FCA').length;
        const fnm = data.filter(objeto => objeto.facultad === 'FNM').length;
        const fme = data.filter(objeto => objeto.facultad === 'FME').length;
        const fee = data.filter(objeto => objeto.facultad === 'FEE').length;
        const fcs = data.filter(objeto => objeto.facultad === 'FCS').length;
        const far = data.filter(objeto => objeto.facultad === 'FAR').length;
        const fis = data.filter(objeto => objeto.facultad === 'FIS').length;
        const fiq = data.filter(objeto => objeto.facultad === 'FIQ').length;
        const par = data.filter(objeto => objeto.facultad === 'PAR').length;

        series = [
            { facultad: 'FCC', cantidad: fcc },
            { facultad: 'FPA', cantidad: fpa },
            { facultad: 'FCE', cantidad: fce },
            { facultad: 'FCA', cantidad: fca },
            { facultad: 'FNM', cantidad: fnm },
            { facultad: 'FME', cantidad: fme },
            { facultad: 'FEE', cantidad: fee },
            { facultad: 'FCS', cantidad: fcs },
            { facultad: 'FAR', cantidad: far },
            { facultad: 'FIIS', cantidad: fis },
            { facultad: 'FIQ', cantidad: fiq },
            { facultad: 'PAR', cantidad: par },
        ]
    }else{
        const nuevos = data.filter(objeto => objeto.estado === 'NUEVO').length;
        const elaborados = data.filter(objeto => objeto.estado === 'ELABORADO').length;
        const entregados = data.filter(objeto => objeto.estado === 'ENTREGADO').length;

        series = [
            { estado: 'Nuevos', cantidad: nuevos},
            { estado: 'Elaborados', cantidad: elaborados},
            { estado: 'Entregados', cantidad: entregados},
        ]
    }

    let chartSetting: any
    if(horizontal){
        chartSetting = {
            xAxis: [
                {
                  label: 'certificados (und)',
                },
              ],
              width: 500,
              height: 320,
        }
    }else{
        chartSetting = {
            yAxis: [
              {
                label: 'certificados',
              },
            ],
            width: 500,
            height: 320,
            sx: {
                [`.${axisClasses.left} .${axisClasses.label}`]: {
                    transform: 'translate(-20px, 0)',
                },
            },
        };
    }

    const valueFormatter = (value: number | null) => `${value} unidades`;
    
    return (
        <React.Fragment>
        {
            horizontal ? 
                (<BarChart
                    dataset={series}
                    yAxis={[{scaleType: 'band', dataKey: 'facultad'}]}
                    series={[{dataKey: 'cantidad', label: 'Certificados', valueFormatter}]}
                    layout='horizontal'
                    {...chartSetting}
                />) : 
                (<BarChart 
                    dataset={series}
                    xAxis={[{scaleType:'band', dataKey: 'estado'}]}
                    series={[
                        {dataKey: 'cantidad', label: 'Cantidad', valueFormatter}
                    ]}
                    {...chartSetting}
                />)
        }
        </React.Fragment>
    )
}
