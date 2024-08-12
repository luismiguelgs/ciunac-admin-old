import React from 'react'
import { firestore } from '../../services/firebase';
import { collection, onSnapshot, query, where} from 'firebase/firestore';
import I2010 from '../../interfaces/i2010.interface';
import DataTable, { Column } from '../MUI/DataTable';

type Props = {
    id:string
}

const columns: Column[] = [
    { id: 'anno', label: 'Año', minWidth: 60 },
    { id: 'ciclo', label: 'Ciclo', minWidth: 60 },
    { id: 'mes', label: 'Mes', minWidth: 50, align: 'right' },
    { id: 'profesor', label: 'Profesor', minWidth: 90, align: 'right' },
  ];

export default function Info2010({id}:Props) 
{
    const [data, setData] = React.useState<I2010[]>([])
    const collectionRef = collection(firestore,'solicitudes_2010')
    const itemQuery = query(collectionRef, where('documento',"==",id))

    React.useEffect(()=>{
        onSnapshot(itemQuery,(data)=>{
            setData(data.docs.map((item)=>{
                return { ...item.data(), id:item.id  } as I2010
            }));
        })
    },[])
    
    return (
        <React.Fragment>
            { data && <DataTable 
                rows={data} 
                columns={columns} 
                action={false}/>
            }
        </React.Fragment>
    )
}
