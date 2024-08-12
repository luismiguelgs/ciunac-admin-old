export type ColumnTask = {
  id:string,
  title: string
}

export type Task = {
  id:string;
  columnId : string;
  nombre: string,
  nivel: string,
  idioma: string,
  solicitud: string,
}

export const defaultCols: ColumnTask[] = [
  {
    id: "NUEVO",
    title: "NUEVAS SOLICITUDES",
  },
  {
    id: "ELABORADO",
    title: "SOLICITUDES ELABORADAS",
  },
  {
    id: "ENTREGADO",
    title: "SOLICITUDES ENTREGADAS",
  },
];

export const defaultTasks: Task[] = [
  {
    id: "1",
    columnId: "NUEVO",
    nombre:'LEÓN SAUCEDO JAVIER EDUARDO',
    idioma: "PORTUGUEZ",
    nivel: "BASICO",
    solicitud: "CERTIFICADO_DE_ESTUDIO"
  },
  {
    id: "2",
    columnId: "ELABORADO",
    nombre:'LIPE MACHACA YOEL OSCAR',
    idioma: "PORTUGUEZ",
    nivel: "BASICO",
    solicitud: "CERTIFICADO_DE_ESTUDIO"
  },
  {
    id: "3",
    columnId: "ENTREGADO",
    nombre:'ECHENIQUE SEDANO IRIS FIORELA',
    idioma: "INGLES",
    nivel: "BASICO",
    solicitud: "CERTIFICADO_DE_ESTUDIO"
  },
  {
    id: "4",
    columnId: "NUEVO",
    nombre:'REYNALDE MARCELIANO TAMIA DE AZUCENA',
    idioma: "INGLES",
    nivel: "BASICO",
    solicitud: "CERTIFICADO_DE_ESTUDIO"
  },
  {
    id: "5",
    columnId: "ELABORADO",
    nombre:'HIDALGO ESTRELLA MARIPELY STHEFANNY',
    idioma: "INGLES",
    nivel: "BASICO",
    solicitud: "CERTIFICADO_DE_ESTUDIO"
  },
  {
    id: "6",
    columnId: "ENTREGADO",
    nombre:'FLORES MOLINA JOSUÉ DANIEL',
    idioma: "PORTUGUEZ",
    nivel: "INTERMEDIO",
    solicitud: "CERTIFICADO_DE_ESTUDIO"
  },
  {
    id: "7",
    columnId: "NUEVO",
    nombre:'TORRES CIEZA CLAUDIA FABIANA',
    idioma: "PORTUGUEZ",
    nivel: "BASICO",
    solicitud: "CERTIFICADO_DE_ESTUDIO"
  },
  {
    id: "8",
    columnId: "ELABORADO",
    nombre:'SALAZAR ESPINOZA FERNANDO',
    idioma: "PORTUGUEZ",
    nivel: "BASICO",
    solicitud: "CERTIFICADO_DE_ESTUDIO"
  },
  {
    id: "9",
    columnId: "ENTREGADO",
    nombre:'SALAZAR ESPINOZA FERNANDO',
    idioma: "PORTUGUEZ",
    nivel: "INTERMEDIO",
    solicitud: "CERTIFICADO_DE_ESTUDIO"
  },
  {
    id: "10",
    columnId: "NUEVO",
    nombre:'LEÓN SAUCEDO JAVIER EDUARDO',
    idioma: "PORTUGUEZ",
    nivel: "BASICO",
    solicitud: "CERTIFICADO_DE_ESTUDIO"
  },
  {
    id: "11",
    columnId: "ELABORADO",
    nombre:'MAYTA CASO MISAEL',
    idioma: "INGLES",
    nivel: "BASICO",
    solicitud: "CERTIFICADO_DE_ESTUDIO"
  },
  {
    id: "12",
    columnId: "ENTREGADO",
    nombre:'MAYTA CASO MISAEL',
    idioma: "INGLES",
    nivel: "INTERMEDIO",
    solicitud: "CERTIFICADO_DE_ESTUDIO"
  },
  {
    id: "13",
    columnId: "NUEVO",
    nombre:'GÁLVEZ LICAS FLORENCIA',
    idioma: "INGLES",
    nivel: "BASICO",
    solicitud: "CONSTANCIA_DE_NOTAS"
  },
];
