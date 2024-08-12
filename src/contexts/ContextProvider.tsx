import React from "react";
import { IBaseData, ITexto, Icertificado } from "../interfaces/types.interface";

type ContextValue = {
    certificados:Icertificado[],
    setCertificados: React.Dispatch<React.SetStateAction<Icertificado[]>>,
    textos: ITexto[],
    setTextos: React.Dispatch<React.SetStateAction<ITexto[]>>,
    facultades: IBaseData[],
    setFacultades: React.Dispatch<React.SetStateAction<IBaseData[]>>,
    cursos: IBaseData[],
    setCursos: React.Dispatch<React.SetStateAction<IBaseData[]>>,
    auth: boolean,
    setAuth: React.Dispatch<React.SetStateAction<boolean>>,
}

const StateContext = React.createContext<ContextValue | undefined>(undefined)

export const ContextProvider = ({children}:React.PropsWithChildren<{}>) => {

    const [certificados, setCertificados] = React.useState<Icertificado[]>([]);
    const [textos, setTextos] = React.useState<ITexto[]>([])
    const [facultades, setFacultades] = React.useState<IBaseData[]>([])
    const [cursos, setCursos] = React.useState<IBaseData[]>([])
    const [auth, setAuth] = React.useState<boolean>(false)
    
    const contextValue: ContextValue = {
        certificados,
        setCertificados,
        textos,
        setTextos,
        facultades,
        setFacultades,
        cursos,
        setCursos,
        auth,
        setAuth
    }

    return(
        <StateContext.Provider value={contextValue}>
            {children}
        </StateContext.Provider>
    )
}

export const useStateContext = ():ContextValue => {
    const context = React.useContext(StateContext)

    if(!context){
        throw new Error("useStateContext muy be uded within a ContextProvidewr")
    }
    return context;
}