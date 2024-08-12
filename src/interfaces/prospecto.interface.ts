export default interface IProspecto {
    id?: string,
    dni: string,
    nombres: string,
    apellidos: string,
    telefono: string,
    facultad: string,
    email?: string,
    codigo?: string
    trabajador : boolean,
    creado?: any,
    modificado?: any
}