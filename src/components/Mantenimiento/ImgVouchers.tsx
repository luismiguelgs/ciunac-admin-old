import React from 'react'
import Imagenes from './Imagenes'
import { Column } from '../MUI/DataTable';

const columns: Column[] = [
    { id: 'apellidos', label: 'Apellidos', minWidth: 150 },
    { id: 'nombres', label: 'Nombres', minWidth: 120 },
    { id : 'creado', label: 'Fecha de Solicitud', minWidth: 80},
    { id: 'voucher', label: 'URL', minWidth: 100 },
    { id: 'estado', label: 'Estado', minWidth: 30 }
];
  
export default function ImgVouchers() {
  return (
    <React.Fragment>
        <Imagenes columns={columns} elementos='imágenes de vouchers' opcion={0}/>
    </React.Fragment>
  )
}
