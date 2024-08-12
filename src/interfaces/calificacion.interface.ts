export interface Icalificacion{
    id?: string
    codigo: string,
    idioma: string,
    nivel: string,
    creado?: any,
    modificado?: any
}
export interface IcalificacionDetalle{
    id?: string,
    id_calificacion?: string,
    minimo: number,
    maximo: number,
    resultado?: string
    isNew?: boolean
}