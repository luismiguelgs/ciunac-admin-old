import React from "react";
import { Isolicitud } from "../../interfaces/solicitud.interface";
import DataTable, { Column } from "../MUI/DataTable";
import { useNavigate } from "react-router-dom";
import { Grid, Button, TextField, InputAdornment } from '@mui/material';
import SolicitudesService from "../../services/solicitudes.service";
import AddIcon from '@mui/icons-material/Add';
import SearchIcon from '@mui/icons-material/Search';
import { MyDialog } from "../MUI";

const columns: Column[] = [
  { id: 'solicitud', label: 'Solicitud', minWidth: 120 },
  { id: 'apellidos', label: 'Apellidos', minWidth: 150 },
  { id: 'nombres', label: 'Nombres', minWidth: 80, align: 'right' },
  { id: 'idioma', label: 'Idioma', minWidth: 40, align: 'right' },
  { id: 'nivel', label: 'Nivel', minWidth: 40, align: 'right' },
];

export default function Solicitudes()
{
    //dialog
    const [ID, setID] = React.useState<string| undefined>('');
    const [openD, setOpenD] = React.useState<boolean>(false);
    //navigation
    const navigate = useNavigate()
    //data y bd
    const [data, setData] = React.useState<Isolicitud[]>([]);

    //busqueda
    const [busqueda, setBusqueda] = React.useState<string>('')

    React.useEffect(()=>{
        if(busqueda === ''){
          SolicitudesService.fetchItems(setData)
        }
        else{
          SolicitudesService.fetchItemQuery(setData,busqueda,false)
        }
    },[busqueda]);

    const handleDelete = (id:string | undefined) =>{
      setID(id)
      setOpenD(true)
    }
    const handleEdit = (id:string | undefined) =>{
        navigate(`/solicitudes/${id}`)
    }
    const deleteFunc = () => {
      SolicitudesService.deleteItem(ID)
      setOpenD(false)
    }
    const handleNew = () =>{
      navigate(`/solicitud-nueva`)
    }

    return(
      <>
        <Grid container spacing={2} sx={{mb:1}}>
          <Grid item xs={12} sm={6}>
            <Button variant="contained" endIcon={<AddIcon /> } sx={{mb:1}} onClick={handleNew} size="large">
                Nueva Solicitud
            </Button>
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              name='buscar'
              value={busqueda}
              onChange={(e)=>setBusqueda(e.target.value)}
              label="Buscar"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start"><SearchIcon /></InputAdornment>
                ),
              }}
              variant="outlined"
              helperText={false && "Campo requerido, ingresar un email válido"}
            />
          </Grid>
        </Grid>
        <DataTable 
          rows={data} 
          columns={columns} 
          handleDelete={handleDelete} 
          handleEdit={handleEdit} 
          action={true}/>
        <MyDialog 
          type="ALERT" 
          title="Borrar Registro" 
          content="Confirma borrar el registro?" 
          setOpen={setOpenD} 
          open={openD} 
          actionFunc={deleteFunc} />
      </>
    )
}