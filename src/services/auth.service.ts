import {getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut} from 'firebase/auth';
import { firestore } from './firebase';
import { addDoc, collection, deleteDoc, doc, getDocs, serverTimestamp, updateDoc } from 'firebase/firestore';
import { IUsuario } from '../interfaces/usuario.interface';
import React from 'react';

export default class AuthService
{
    private static dataCollection = 'usuarios'
    private static db = collection(firestore, this.dataCollection)

    public static logIn(email:string, password:string, setAuth:React.Dispatch<React.SetStateAction<boolean>>,
        setError:React.Dispatch<React.SetStateAction<string>>,setOpen:React.Dispatch<React.SetStateAction<boolean>>){
        const auth = getAuth()
        signInWithEmailAndPassword(auth, email, password)
            .then((response)=>{
                setOpen(false)
                console.log(response.user);
                setAuth(true)
            })
            .catch((err)=>{
                console.log(err.message);
                setError(err.message as string)
                setOpen(true)
            })
    }

    public static logOut(setAuth:React.Dispatch<React.SetStateAction<boolean>>)
    {
        const auth = getAuth();
        signOut(auth).then(() => {
            setAuth(false)
        }).catch((error) => {
            console.error(error);
        });

    }
    public static async createUser(email:string, password:string, data:IUsuario)
    {
        const auth = getAuth()
        createUserWithEmailAndPassword(auth, email, password)
            .then((response)=>{
                console.log(response.user);
                this.newItem(data, response.user.uid)
            })
            .catch((err)=>{
                alert(err.message);
            })
    }
    private static async newItem(obj:IUsuario, uid:string)
    {
        const data = {
            uid: uid,
            email: obj.email,
            nombre: obj.nombre,
            role: obj.role,
            creado: serverTimestamp(),
            modificado: serverTimestamp()
        }
        try{
            await addDoc(this.db, data)
        }catch(err:any){
            console.log(err.message);
        }
    }
    public static async fetchItems():Promise<IUsuario[]>
    {
        const snapShot = await getDocs(this.db)
        const data = snapShot.docs.map((item)=>{
            return {...item.data(), id: item.id} as IUsuario
        })
        return data
        /*
        onSnapshot(this.db, (data)=>{
            setData(data.docs.map((item)=>{
              return { ...item.data(), id:item.id } as IUsuario
            }));
        });
        */
    }
    public static updateItem(id:string, obj:IUsuario)
    {
        let dataToUpdate = doc(firestore, this.dataCollection, id);
        updateDoc(dataToUpdate,{
            nombre: obj.nombre,
            role: obj.role,
            modificado: serverTimestamp()
        }).then(()=>{console.log('update');}).catch((err)=>console.log(err.message));
    }
    public static async deleteItem(id:string | undefined)
    {
        try{
            await deleteDoc(doc(firestore,this.dataCollection,id as string));
        }
        catch(err:any){
            console.log(err.message);
        }
    }
}