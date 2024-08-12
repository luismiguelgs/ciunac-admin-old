export interface ITexto{
    id?:string,
    titulo:string,
    texto:string,
    creado?:Date,
    Modificado?:Date
}
export interface IBaseData{
    id?:string,
    value:string,
    label:string
    creado?:string,
    modificado?:string,
    isNew?:boolean
}
export interface Icertificado extends IBaseData{  
    precio:number
}
export interface Isalon extends IBaseData{
    capacidad: number
}
  