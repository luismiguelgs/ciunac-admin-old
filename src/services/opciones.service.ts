import { IBaseData, Icertificado, Isalon } from '../interfaces/types.interface';
import { firestore } from './firebase';
import { collection, getDocs, doc, updateDoc, serverTimestamp, addDoc, deleteDoc, getDoc} from 'firebase/firestore'
import { changeDate } from './util.service';

export enum Collection{
    Facultades = 'facultades',
    Cursos = 'cursos',
    Certificados = 'certificados',
    Salones = 'salones'
}

export class OpcionesService
{
    private static db(collectionName: Collection){
        return collection(firestore, collectionName)
    }

    public static async fetchItems<T extends IBaseData>(collectionName: Collection):Promise<T[]>
    {
        try{
            const snapShot = await getDocs(this.db(collectionName))
            const data = snapShot.docs.map((item)=>{
                return{
                    ...item.data(),
                    id: item.id,
                    creado: changeDate(item.data().creado)
                } as T
            })
            return data
        }
        catch(err:any){
            console.error('Error fetching items', err.message)
            throw err
        }
        
    }
    public static async newItem<T extends IBaseData>(collectionName: Collection, obj: T): Promise<string | undefined>
    {
        const data: any = {
            value:obj.value.toUpperCase(),
            label:obj.label.toUpperCase(),
            creado: serverTimestamp(),
            modificado: serverTimestamp()
        }
        //certificado
        if('precio' in obj){
            data.precio = (obj as Icertificado).precio
        }
        //salon
        if('capacidad' in obj){
            data.capacidad = (obj as Isalon).capacidad
        }

        let docRef = null
        try{
            docRef = await addDoc(this.db(collectionName), data)
            return docRef.id
        }catch(err:any){
            console.error(err.message);
        }
    }
    public static async selectItem<T extends IBaseData>(collectionName: Collection, id:string):Promise<T | undefined>
    {
        const docRef = doc(firestore, collectionName, id)
        const snapShot = await getDoc(docRef)
        return {
            ...snapShot.data(),
            id: snapShot.id
        } as T
    }
    public static async updateItem<T extends IBaseData>(collectionName: Collection, obj:T):Promise<void>
    {
        const dataToUpdate: any = {
            value:obj.value.toUpperCase(),
            label: obj.label.toUpperCase(),
            modificado: serverTimestamp()
        }
        //certificado
        if('precio' in obj){
            dataToUpdate.precio = (obj as Icertificado).precio
        }
        //salon
        if('capacidad' in obj){
            dataToUpdate.capacidad = (obj as Isalon).capacidad
        }

        let docRef = doc(firestore, collectionName, obj.id as string)

        try{
            await updateDoc(docRef, dataToUpdate)
            console.log('update', docRef.id);
        }catch(err:any){
            console.error(err.message)
        }
    }
    public static async deleteItem(collectionName: Collection, id:string)
    {
        try{
            await deleteDoc(doc(firestore, collectionName, id))
        }
        catch(err:any){
            console.error(err.message)
        }
    }
}