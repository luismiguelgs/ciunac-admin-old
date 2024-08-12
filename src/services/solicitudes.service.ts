import React from 'react';
import { Isolicitud } from '../interfaces/solicitud.interface';
import { firestore } from './firebase';
import { collection, doc, updateDoc, serverTimestamp, addDoc, deleteDoc, getDoc, onSnapshot, Timestamp, query, where, orderBy, Query, getDocs} from 'firebase/firestore'
import { changeDate, obtenerPeriodo } from './util.service';

export default class SolicitudesService
{
    private static dataCollection = 'solicitudes'
    private static db = collection(firestore, this.dataCollection);

    public static fetchItems(setData:React.Dispatch<React.SetStateAction<Isolicitud[]>>)
    {
        onSnapshot(this.db, (data)=>{
        setData(data.docs.map((item)=>{
            return { ...item.data(), id:item.id, creado:changeDate(item.data().creado,true)} as Isolicitud
        }));
        });
    }
    public static async fetchItemsWODate():Promise<Isolicitud[]>{
        const querySnapshot = await getDocs(this.db)
        const data = querySnapshot.docs.map((item)=>{
            //console.log(item.data());
            return { ...item.data(), id:item.id, creado: changeDate(item.data().creado,false)} as Isolicitud
        })
        
        return data
    }
  
  public static async fetchItemQueryPeriod(mes:number, año:number): Promise<Isolicitud[]>{
    
    const primerDiaMes = new Date(año, mes,1)
    const primerDiaSiguienteMes = new Date(año, mes+1,1)
    const ultimoDiaMes = new Date(primerDiaSiguienteMes.getTime() - 1)

    const itemQuery = query(this.db, 
        where('creado',">=",new Date(primerDiaMes.toISOString().split('T')[0])),
        where('creado',"<=",new Date(ultimoDiaMes.toISOString().split('T')[0])), 
        orderBy('creado','asc'))
    
    try{
        const querySnapshot = await getDocs(itemQuery)
        const result: Isolicitud[] = []
        querySnapshot.forEach((doc)=>{
            result.push({...doc.data(), id:doc.id, creado: changeDate(doc.data().creado, true) } as Isolicitud)
        })
        return result
    } catch(error){
        console.error("Error al obtener documentos", error)
        throw error
    }
  }
    public static fetchItemQueryDate(setData:React.Dispatch<React.SetStateAction<Isolicitud[]>>,fechaInicial:string, fechaFinal:string,ubicacion=false)
    {
        let itemQuery: Query
        if(ubicacion){
            itemQuery = query(this.db, 
                where('solicitud',"==",'EXAMEN_DE_UBICACION'), 
                where('creado',">=",new Date(fechaInicial)),
                where('creado',"<=",new Date(fechaFinal)), 
                /*orderBy('creado','asc')*/
            )
        }else{
            itemQuery =  query(this.db, 
                where('solicitud',"!=",'EXAMEN_DE_UBICACION'),
                where('creado',">=",new Date(fechaInicial)),
                where('creado',"<=",new Date(fechaFinal))
            )
        }
    
        onSnapshot(itemQuery, (data)=>{
            setData(data.docs.map((item)=>{
                return { ...item.data(), id:item.id, creado:changeDate(item.data().creado,true) } as Isolicitud
            }));
        });
    }
    public static fetchItemQuery( setData:React.Dispatch<React.SetStateAction<Isolicitud[]>>, searchParams:string | null,  certificados=true)
    {
        let itemQuery: Query

        if(certificados){
            itemQuery =  query(
                this.db, 
                where('estado',"==",searchParams),
                where('solicitud',"!=",'EXAMEN_DE_UBICACION'),
                orderBy('creado','asc')
            )
            onSnapshot(itemQuery, (data)=>{
                setData(data.docs.map((item)=>{
                    return { ...item.data(), id:item.id, creado: changeDate(item.data().creado,true,true) } as Isolicitud
                }));
            });
        }else{
            if (searchParams){
                itemQuery =  query(
                    this.db, 
                    where('estado',"==",searchParams),
                    where('solicitud',"==",'EXAMEN_DE_UBICACION'),
                    orderBy('creado','asc')
                )
            }else{
                itemQuery =  query(
                    this.db, 
                    where('solicitud',"==",'EXAMEN_DE_UBICACION'),
                    orderBy('creado','asc')
                )
            }
            onSnapshot(itemQuery, (data)=>{
                setData(data.docs.map((item)=>{
                    return { ...item.data(), id:item.id, creado:new Date(changeDate(item.data().creado,false,true) as string) } as Isolicitud
                }));
            });
        }   
    }
    public static async newItem(obj:Isolicitud)
    {
        //console.log(obj.creado)
        if(obj.creado === '' || obj.creado === undefined){
            obj.creado = serverTimestamp()
        }else{
            obj.creado = this.dateToTimestamp(obj.creado)
        }

        const data = {
            ...obj,
            estado:'NUEVO',
            /*
            solicitud:obj.solicitud,
            apellidos:obj.apellidos,
            nombres:obj.nombres,
            celular:obj.celular,
            codigo:obj.codigo,
            dni:obj.dni,
            email:obj.email,
            idioma:obj.idioma,
            nivel:obj.nivel,
            numero_voucher:obj.numero_voucher,
            facultad:obj.facultad,
            fecha_pago:obj.fecha_pago,
            trabajador: obj.trabajador,
            */
            pago:+obj.pago,
            manual:true,
            periodo: obtenerPeriodo(),
            creado: obj.creado,
            modificado: serverTimestamp()
        }
    try{
      await addDoc(this.db, data)
    }catch(err:any){
      console.log(err.message);
    }
  }
  public static async getItem(id:string) 
  {
    const docRef = doc(firestore, this.dataCollection, id)
		const snapShot = await getDoc(docRef)
		return {
			...snapShot.data(),
			id: snapShot.id
		}
  }
  public static updateItem(obj:Isolicitud)
  {
    let dataToUpdate = doc(firestore, this.dataCollection, obj.id as string);
    delete obj.id
    updateDoc(dataToUpdate,{
      ...obj,
      /*
      estado:obj.estado,
      solicitud:obj.solicitud,
      apellidos:obj.apellidos,
      nombres:obj.nombres,
      celular:obj.celular,
      codigo:obj.codigo,
      dni:obj.dni,
      email:obj.email,
      idioma:obj.idioma,
      nivel:obj.nivel,
      numero_voucher:obj.numero_voucher,
      facultad:obj.facultad,
      fecha_pago:obj.fecha_pago,
      */
      pago:+obj.pago,
      modificado: serverTimestamp()
    }).then(()=>{console.log('update');}).catch((err)=>console.log(err.message));
  }
  public static async deleteItem (id:string | undefined)
  {
    try{
      await deleteDoc(doc(firestore,this.dataCollection,id as string));
    }
    catch(err:any){
      console.log(err.message);
    }
  }
  public static updateStatus = (id:string, status:string) =>{
    let dataToUpdate = doc(firestore, this.dataCollection, id);
    updateDoc(dataToUpdate,{
      estado:status,
      modificado: serverTimestamp()
    }).then(()=>{console.log('updateStatus');}).catch((err)=>console.log(err.message));  
  }
  public static updateImagen = (id:string) =>{
    let dataToUpdate = doc(firestore, this.dataCollection, id);
    updateDoc(dataToUpdate,{
      voucher: 'borrado',
      modificado: serverTimestamp()
    }).then(()=>{console.log('updateStatus');}).catch((err)=>console.log(err.message));  
  }
  private static dateToTimestamp(date:string)
  {
    const partesFecha = date.split("-");
    const anio = parseInt(partesFecha[0], 10);
    const mes = parseInt(partesFecha[1], 10) - 1; // Meses en JavaScript son de 0 a 11
    const dia = parseInt(partesFecha[2], 10);

    const fechaObj = new Date(anio,mes,dia)
    return Timestamp.fromDate(fechaObj)
  }
}









