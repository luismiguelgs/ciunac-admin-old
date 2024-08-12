export interface Iexamen{
    id?:string,
    salon: string,
    codigo: string,
    fecha_examen: any,
    fecha_final: any,
    idioma: string,
    nivel: string,
    profesor_id: string,
    profesor?: string,
    estado: string,
    hora_inicial?: any,
    hora_final?: any,
    calificacion_id: string,
    creado?: any,
    modificado?: any
}
export interface IexamenNotas{
    id?: string,
    examen_id: string,
    solicitud_id:string,
    idioma: string,
    nivel: string,
    apellidos: string,
    nombres: string,
    dni: string,
    numero_voucher: string,
    monto: number,
    nota: number,
    ubicacion: string
}