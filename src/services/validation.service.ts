import { IsolicitudVal } from "../interfaces/solicitudVal.interface";
import { Isolicitud } from "../interfaces/solicitud.interface";
import { IUsuario } from "../interfaces/usuario.interface";
import React from "react";

export default class Validation
{
    private static emailRegex =  /^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/ 

    public static validateUser(item:IUsuario, setVal:React.Dispatch<React.SetStateAction<any>>):boolean{
        let email:boolean
        let password:boolean
        let nombre:boolean
        
        if(item.email === '' || !this.emailRegex.test(item.email)){
            email = false
            setVal((prevBasicVal: any)=>({...prevBasicVal, email:true}))
        }else{
            email = true
            setVal((prevBasicVal: any)=>({...prevBasicVal, email:false}))
        }
        if(item.password === '' || item.password.length <  6){
            password = false
            setVal((prevBasicVal: any)=>({...prevBasicVal, password:true}))
        }else{
            password = true
            setVal((prevBasicVal: any)=>({...prevBasicVal, password:false}))
        }
        if(item.nombre === ''){
            nombre = false
            setVal((prevBasicVal: any)=>({...prevBasicVal, nombre:true}))
        }else{
            nombre = true
            setVal((prevBasicVal: any)=>({...prevBasicVal, nombre:false}))
        }

        return email && password && nombre
    }
}   


export function valNuevaSolicitud(data:Isolicitud,setVal:React.Dispatch<React.SetStateAction<IsolicitudVal>>){
    let solicitud:boolean
    let nombres:boolean    
    let apellidos:boolean
    let dni:boolean
    let celular:boolean
    let idioma:boolean
    let nivel:boolean
    let codigo: boolean
    

    if(data.solicitud === ''){
        solicitud = false
        setVal((prevBasicVal)=>({...prevBasicVal, solicitud:true}))
    }else{
        solicitud = true
        setVal((prevBasicVal)=>({...prevBasicVal, solicitud:false}))
    }
    
    if(data.nombres === ''){
        nombres = false
        setVal((prevBasicVal)=>({...prevBasicVal, nombres:true}))
    }else{
        nombres = true
        setVal((prevBasicVal)=>({...prevBasicVal, nombres:false}))
    }

    if(data.apellidos === ''){
        apellidos = false
        setVal((prevBasicVal)=>({...prevBasicVal, apellidos:true}))
    }else{
        apellidos = true
        setVal((prevBasicVal)=>({...prevBasicVal, apellidos:false}))
    }
    if(data.dni === '' || (data.dni as string).length < 8){
        dni = false
        setVal((prevBasicVal)=>({...prevBasicVal, dni:true}))
    }else{
        dni = true
        setVal((prevBasicVal)=>({...prevBasicVal, dni:false}))
    }
    if(data.celular === '' || (data.celular as string).length < 9){
        celular = false
        setVal((prevBasicVal)=>({...prevBasicVal, celular:true}))
    }else{
        celular = true
        setVal((prevBasicVal)=>({...prevBasicVal, celular:false}))
    }
    if(data.idioma === ''){
        idioma = false
        setVal((prevBasicVal)=>({...prevBasicVal, idioma:true}))
    }else{
        idioma = true
        setVal((prevBasicVal)=>({...prevBasicVal, idioma:false}))
    }
    if(data.nivel === ''){
        nivel = false
        setVal((prevBasicVal)=>({...prevBasicVal, nivel:true}))
    }else{
        nivel = true
        setVal((prevBasicVal)=>({...prevBasicVal, nivel:false}))
    }
    if(data.nivel === ''){
        nivel = false
        setVal((prevBasicVal)=>({...prevBasicVal, nivel:true}))
    }else{
        nivel = true
        setVal((prevBasicVal)=>({...prevBasicVal, nivel:false}))
    }
    //validar datos si no es trabajador (numero_voucher, pago, fecha_pago)
    if(!data.trabajador){
        let voucher: boolean
        let fecha: boolean
        let pago: boolean
        if(data.numero_voucher === ''){
            voucher = false
            setVal((prevBasicVal)=>({...prevBasicVal, numero_voucher:true}))
        }else{
            voucher = true
            setVal((prevBasicVal)=>({...prevBasicVal, numero_voucher:false}))
        }
        if(data.fecha_pago === ''){
            fecha = false
            setVal((prevBasicVal)=>({...prevBasicVal, fecha_pago:true}))
        }else{
            fecha = true
            setVal((prevBasicVal)=>({...prevBasicVal, fecha_pago:false}))
        }
        if(data.pago === '0' || data.pago === ''){
            pago = false
            setVal((prevBasicVal)=>({...prevBasicVal, pago:true}))
        }else{
            pago = true
            setVal((prevBasicVal)=>({...prevBasicVal, pago:false}))
        }
        return solicitud && nombres && apellidos && dni && celular && idioma && nivel && pago && fecha && voucher

    }else{
        setVal((prevBasicVal)=>({...prevBasicVal, pago:false}))
        setVal((prevBasicVal)=>({...prevBasicVal, fecha_pago:false}))
        setVal((prevBasicVal)=>({...prevBasicVal, numero_voucher:false}))
    }
    //validar codigo en caso facultad no sea particular
    if(data.facultad !== 'PAR'){
        if(data.codigo === ''){
            codigo = false
            setVal((prevBasicVal)=>({...prevBasicVal, codigo:true}))
        }else{
            codigo = true
            setVal((prevBasicVal)=>({...prevBasicVal, codigo:false}))
        }
        return solicitud && nombres && apellidos && dni && celular && idioma && nivel && codigo
    }
    
    return solicitud && nombres && apellidos && dni && celular && idioma && nivel
}
export function valEditarSolicitud(item:Isolicitud)
{
    if(item.manual === true){
        console.log(item);
        
        if(item.trabajador){
            if((item.estado===undefined || item.estado==='') || (item.dni==='') || (item.nombres==='') || (item.apellidos==='') || (item.celular==='')){
                return false
            }
            return true
        }else{
            if((item.estado===undefined || item.estado==='') || (item.dni==='') || (item.nombres==='') || (item.apellidos==='') || (item.celular==='')  || 
                (item.numero_voucher==='') || (item.fecha_pago==='')){
                return false
            }
            return true
        }
    }else{
        if(item.trabajador){
            if((item.estado===undefined || item.estado==='') || (item.dni==='') || (item.nombres==='') || (item.apellidos==='') || (item.celular==='') || 
                (item.email==='')){
                return false
            }
            return true
        }else{
            if((item.estado===undefined || item.estado==='') || (item.dni==='') || (item.nombres==='') || (item.apellidos==='') || (item.celular==='') || 
            (item.email==='') || (item.numero_voucher==='') || (item.fecha_pago==='')){
                return false
            }
            return true
        }
    }
}