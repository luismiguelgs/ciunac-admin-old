import { getStorage, ref, deleteObject } from "firebase/storage";
import SolicitudesService from "./solicitudes.service";

export default class StorageService
{
    private static storage = getStorage();

    public static deleteImagen(url:string, id:string){
        // Create a reference to the file to delete
        const desertRef = ref(this.storage, url);
        deleteObject(desertRef).then(() => {
          SolicitudesService.updateImagen(id)
          console.log(url, 'eliminada');
        }).catch((error) => {
          console.log(error);
        });
    }
}