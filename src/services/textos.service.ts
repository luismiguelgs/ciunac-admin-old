import React from 'react';
import { ITexto } from '../interfaces/types.interface';
import { firestore } from './firebase';
import { collection, doc, updateDoc, serverTimestamp, onSnapshot } from 'firebase/firestore'

export default class TextosService
{
  private static dataCollection = 'textos'
  private static db = collection(firestore, this.dataCollection);

  public static getItems(setData:React.Dispatch<React.SetStateAction<ITexto[]>>){
    onSnapshot(this.db, (data)=>{
      setData(data.docs.map((item)=>{
        return { ...item.data(), id:item.id  } as ITexto
      }));
    });
  }
  public static updateItem(obj:ITexto){
    let dataToUpdate = doc(firestore, this.dataCollection, obj.id as string);
    updateDoc(dataToUpdate,{
        texto: obj.texto,
        modificado: serverTimestamp()
    }).then(()=>{console.log('update');}).catch((err)=>console.log(err.message));
  }
}