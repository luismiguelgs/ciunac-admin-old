import packageJson from '../../package.json';

export const VERSION = packageJson.version
export const DRAWER_WIDTH = 240

export const ESTADO = [
    {value:'NUEVO',label:'Nuevo'},
    {value:'ELABORADO',label:'Elaborado'},
    {value:'ENTREGADO',label:'Entregado'},
]
export const ESTADO_EXAMEN = [
    {value:'PROGRAMADO',label:'Programado'},
    {value:'ASIGNADO',label:'Asignado'},
    {value:'TERMINADO',label:'Terminado'},
]
export const NIVEL = [
    {value:'BASICO',label:'BÁSICO'},
    {value:'INTERMEDIO',label:'INTERMEDIO'},
    {value:'AVANZADO',label:'AVANZADO'},
]

export const GENERO = [
    {value: 'M', label: 'MASCULINO'},
    {value: 'F', label: 'FEMENINO'},
]