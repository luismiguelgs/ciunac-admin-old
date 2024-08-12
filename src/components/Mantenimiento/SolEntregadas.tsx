import React from 'react'
import Imagenes from './Imagenes'
import { Column } from '../MUI/DataTable';

const columns: Column[] = [
    { id: 'solicitud', label: 'Solicitud', minWidth: 150 },
    { id: 'apellidos', label: 'Apellidos', minWidth: 150 },
    { id: 'nombres', label: 'Nombres', minWidth: 120 },
    { id : 'creado', label: 'Fecha de Solicitud', minWidth: 80},
    { id: 'estado', label: 'Estado', minWidth: 30 }
];
  

export default function SolEntregadas() 
{
  return (
    <React.Fragment>
        <Imagenes columns={columns} elementos='solicitudes' opcion={2}/>
    </React.Fragment>
  )
}
