import { Timestamp } from "firebase/firestore";
import * as ExcelJS from 'exceljs';
import { Isolicitud } from "../interfaces/solicitud.interface";

export function formatDate(fecha:any, whours=false):string{
    const date = new Date(fecha)
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    const seconds = date.getSeconds().toString().padStart(2, '0');
    if(whours){
      return `${day}/${month}/${year} ${hours}:${minutes}:${seconds}`;
    }
    return `${day}/${month}/${year}`;  
    
}

export const changeDate = (date:Timestamp, hora=true, formato=false):string|undefined => {
    if(date === null) {
      console.log('hay una fecha nula');
      return
    }
    
    const fecha:Date  = date?.toDate()
    // Obtener diferentes partes de la fecha y hora
    const dia = fecha.getDate();
    const mes = fecha.getMonth() + 1; // Los meses comienzan desde 0, se suma 1
    const anio = fecha.getFullYear();
    const horas = fecha.getHours();
    const minutos = fecha.getMinutes();
    const segundos = fecha.getSeconds();
    // Formatear los valores para que tengan dos dígitos si es necesario
    
    const diaFormateado = String(dia).padStart(2, '0');
    const mesFormateado = String(mes).padStart(2, '0');
    if(hora){
      const horasFormateadas = String(horas).padStart(2, '0');
      const minutosFormateados = String(minutos).padStart(2, '0');
      const segundosFormateados = String(segundos).padStart(2, '0');
      // Generar la cadena con el formato deseado (por ejemplo, dd/mm/aaaa hh:mm:ss)
      const fechaFormateada = `${diaFormateado}/${mesFormateado}/${anio} ${horasFormateadas}:${minutosFormateados}:${segundosFormateados}`;
      return fechaFormateada
    }else{
      // Generar la cadena con el formato deseado (por ejemplo, dd/mm/aaaa hh:mm:ss)
      if(formato){
        const fechaFormateada = `${anio}-${mesFormateado}-${diaFormateado}`;
        return fechaFormateada
      }
      const fechaFormateada = `${diaFormateado}/${mesFormateado}/${anio}`;
      return fechaFormateada
    }
} 
  
export async function exportToExcel(data:Isolicitud[])
{
  const workbook = new ExcelJS.Workbook();
  const worksheet = workbook.addWorksheet('DataSheet');

  const dataF = formatearDatos(data)

  // Agregar datos a la hoja de cálculo
  dataF.forEach(row => {
    worksheet.addRow(row as any);
  });

  // Generar un blob a partir del libro de Excel
  const buffer = await workbook.xlsx.writeBuffer();
  // Crear un objeto Blob
  const blob = new Blob([buffer], {
    type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
  });
  // Crear un enlace de descarga
  const url = window.URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'datos.xlsx';

  // Agregar el enlace al documento y hacer clic para iniciar la descarga
  document.body.appendChild(a);
  a.click();

  // Limpiar el enlace después de la descarga
  document.body.removeChild(a);
  window.URL.revokeObjectURL(url);
}
const formatearDatos =(data:Isolicitud[]) =>{
  const excelData:any[] = [['Apellidos','Nombres','DNI','Idioma','Nivel','Pago','Recibo','Estado']]
  data.forEach((row)=>{
    excelData.push([
      row.apellidos?.toUpperCase(),row.nombres?.toUpperCase(), row.dni, row.idioma, row.nivel, +row.pago, row.numero_voucher, row.estado
    ])
  })
  return excelData
}

export function obtenerPeriodo()
{
    const fechaActual = new Date();
    const mes = fechaActual.getMonth() + 1; // Los meses en JavaScript van de 0 a 11, por lo que sumamos 1 para obtener el mes actual
    const año = fechaActual.getFullYear();

    // Formatear los valores para que tengan dos dígitos si es necesario
    const mesFormateado = String(mes).padStart(2, '0');

    return `${String(año)}${mesFormateado}`
}