import React from 'react'
import { useStateContext } from '../contexts/ContextProvider';
import { Collection, OpcionesService } from '../services/opciones.service';
import { IBaseData, Icertificado } from '../interfaces/types.interface';

export default function Preloader() 
{
    const {setCertificados, setCursos, setFacultades} = useStateContext()

    const cursos = async () => {
        const c =  await OpcionesService.fetchItems<IBaseData>(Collection.Cursos)
        setCursos(c)
    }
    const facultades = async ()=> {
        const f = await OpcionesService.fetchItems<IBaseData>(Collection.Facultades)
        setFacultades(f)
    }
    const certificados = async()=>{
        const c = await OpcionesService.fetchItems<Icertificado>(Collection.Certificados)
        setCertificados(c)
    }

    React.useEffect(()=>{
        certificados()
        cursos()
        facultades()
    },[]);

    return (
        <React.Fragment>
            {null}
        </React.Fragment>
    )
}
