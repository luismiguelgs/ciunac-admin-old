export interface IUsuario{
    id?: string,
    uid?: string,
    email: string,
    nombre: string
    password: string,
    role: 'ADMIN' | 'USER',
    isNew?: boolean,
    creado?: any
    modificado?:any
}