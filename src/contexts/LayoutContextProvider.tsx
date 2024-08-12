import React from "react";

type ContextValue = {
    sidebarCollapsed:boolean,
    setSidebarCollapsed: React.Dispatch<React.SetStateAction<boolean>>,
    sidebarToggled:boolean,
    setSidebarToggled: React.Dispatch<React.SetStateAction<boolean>>,
    broken: boolean,
    setBroken: React.Dispatch<React.SetStateAction<boolean>>,
    sidebarHasImage: boolean,
    setSidebarHasImage: React.Dispatch<React.SetStateAction<boolean>>,
}

const StateContext = React.createContext<ContextValue | undefined>(undefined)

export const LayoutContextProvider = ({children}:React.PropsWithChildren<{}>) => {

    const [sidebarCollapsed, setSidebarCollapsed] = React.useState<boolean>(false)
    const [sidebarToggled, setSidebarToggled] = React.useState<boolean>(false)
    const [broken, setBroken] = React.useState(window.matchMedia('(max-width: 800px)').matches);
    const [sidebarHasImage, setSidebarHasImage] = React.useState<boolean>(false);
    
    const contextValue: ContextValue = {
        sidebarCollapsed,
        setSidebarCollapsed,
        sidebarToggled,
        setSidebarToggled,
        broken,
        setBroken,
        sidebarHasImage,
        setSidebarHasImage,
    }

    return(
        <StateContext.Provider value={contextValue}>
            {children}
        </StateContext.Provider>
    )
}

export const useLayoutContext = ():ContextValue => {
    const context = React.useContext(StateContext)

    if(!context){
        throw new Error("useStateContext muy be uded within a ContextProvidewr")
    }
    return context;
}