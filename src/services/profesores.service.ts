import { Iprofesor } from '../interfaces/profesores.interface';
import { firestore } from './firebase';
import { collection, doc, updateDoc, serverTimestamp, addDoc, deleteDoc, getDocs, getDoc, Timestamp} from 'firebase/firestore'

export default class ProfesoresService
{
    private static dataCollection = 'profesores'
    private static db = collection(firestore, this.dataCollection)

    public static async fetchItems(): Promise<Iprofesor[]>{
        const snapShot = await getDocs(this.db)
        const data = snapShot.docs.map((item)=>{
            const firebaseTimestamp: Timestamp = item.data().fecha_nacimiento
            return {...item.data(), id: item.id, fecha_nacimiento: firebaseTimestamp.toDate() } as Iprofesor
        })
        return data
    }
    public static async getItem(id:string):Promise<Iprofesor>{
        const docRef = doc(firestore, this.dataCollection, id)
        const snapShot = await getDoc(docRef)

        return {
            ...snapShot.data(),
            id: snapShot.id
        } as Iprofesor
    }
    public static async newItem(obj:Iprofesor) :Promise<void | string>{ 
        //delete obj.isNew
        //delete obj.id
        const { id, isNew, ...rest } = obj
        const data = {
            ...rest,
            creado: serverTimestamp(),
            modificado: serverTimestamp()
        }
        let docRef = null
        try{
            docRef = await addDoc(this.db, data)
            console.log('Elemento creado correctamente', docRef.id)
            return docRef.id
        }catch(err:any){
            console.log(err.message);
        }
    }
    public static async updateItem(obj: Iprofesor): Promise<void> {
        delete obj.isNew
        const dataToUpdate = doc(firestore, this.dataCollection, obj.id as string);
      
        try {
            await updateDoc(dataToUpdate, {
                ...obj,
                modificado: serverTimestamp(),
            });
            console.log('Elemento actualizado correctamente');
        } catch (err:any) {
            console.error('Error al actualizar el elemento:', err.message);
        }
    }
    public static async deleteItem(id:string | undefined) : Promise<void>{
        try{
            await deleteDoc(
                doc(firestore,this.dataCollection,id as string)
            );
            console.log('registro borrado', id)
        }
        catch(err:any){
            console.error(err.message);
        }
    }
}