import React from 'react'
import Imagenes from './Imagenes'
import { Column } from '../MUI/DataTable';

const columns: Column[] = [
    { id: 'apellidos', label: 'Apellidos', minWidth: 150 },
    { id: 'nombres', label: 'Nombres', minWidth: 120 },
    { id : 'creado', label: 'Fecha de Solicitud', minWidth: 80},
    { id: 'certificado_trabajo', label: 'URL', minWidth: 100 },
    { id: 'estado', label: 'Estado', minWidth: 30 }
  ];
  

export default function ImgTrabajador() {
  return (
    <React.Fragment>
        <Imagenes columns={columns} elementos='imágenes de certificados' opcion={1}/>
    </React.Fragment>
  )
}
