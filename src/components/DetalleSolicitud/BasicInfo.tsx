import { Isolicitud } from "../../interfaces/solicitud.interface"
import { Grid, TextField, Chip } from '@mui/material'
import { ESTADO, NIVEL } from "../../services/constants.service"
import FaceIcon from '@mui/icons-material/Face';
import MilitaryTechIcon from '@mui/icons-material/MilitaryTech';
import OnlinePredictionIcon from '@mui/icons-material/OnlinePrediction';
import PowerIcon from '@mui/icons-material/Power';
import TextSnippetIcon from '@mui/icons-material/TextSnippet';
import MySelect from "../MUI/MySelect"
import { useStateContext } from "../../contexts/ContextProvider"

type Props={
    item:Isolicitud
    handleChange(e:React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>):void
    edit:boolean,
}
export default function BasicInfo({item, handleChange, edit}:Props)
{
    const {cursos, facultades} = useStateContext()

    return(
        <Grid container spacing={2} >
            <Grid item xs={12}>
            {
                item.estado === 'NUEVO' ? 
                (<Chip icon={<MilitaryTechIcon />} label="Solicitud Nueva" sx={{m:1}} color="error"/>) : 
                item.estado === 'ELABORADO' ?
                (<Chip icon={<MilitaryTechIcon />} label="Solicitud Elaborada" sx={{m:1}} color="warning"/>) : 
                (<Chip icon={<MilitaryTechIcon />} label="Solicitud Terminada" sx={{m:1}} color="success"/>)
            }
            {
                item.facultad !== 'PAR' ? 
                (<Chip icon={<FaceIcon />} label="Alumno UNAC" sx={{m:1}} color="primary"/>) : 
                item.trabajador ? 
                (<Chip icon={<FaceIcon />} label="Trabajador UNAC" sx={{m:1}} color="primary" />) :
                (<Chip icon={<FaceIcon />} label="PARTICULAR" sx={{m:1}} color="primary"/>)
            }
            {
                item.antiguo ? 
                (<Chip icon={<TextSnippetIcon />} label="Matrícula Antigua" sx={{m:1}} color="secondary"/>) : 
                (<Chip icon={<TextSnippetIcon />} label="Matrícula en Sistema" sx={{m:1}} color="secondary"/>)
            }
            {
                item.manual === true ? 
                (<Chip icon={<PowerIcon />} label="Solicitud Manual" sx={{m:1}} />) : 
                (<Chip icon={<OnlinePredictionIcon />} label="Solicitud Online" sx={{m:1}} />)
            }
            </Grid>
            <Grid item xs={12} sm={6}>
                <MySelect 
                    disabled={!edit} 
                    data={ESTADO} 
                    name="estado" 
                    label="Estado" 
                    value={item?.estado} 
                    handleChange={handleChange}
                    helperText={true && "Seleccionar estado"}
                />
            </Grid>
            <Grid item xs={12} sm={6}>
                <TextField
                    required
                    disabled={!edit}
                    fullWidth
                    value={item?.dni}
                    onChange={e=>handleChange(e)}
                    name="dni"
                    label="DNI"
                    InputLabelProps={{shrink: true,}}
                    helperText={false && "Campo requerido, mínimo 8 dígitos"}
                />
            </Grid>
            <Grid item xs={12} sm={6}>
                <TextField
                    required
                    disabled={!edit}
                    fullWidth
                    value={item?.apellidos}
                    onChange={e=>handleChange(e)}
                    name="apellidos"
                    label="Apellidos"
                    InputLabelProps={{shrink: true,}}
                    helperText={false && "Campo requerido, mínimo 8 dígitos"}
                />
            </Grid>
            <Grid item xs={12} sm={6}>
                <TextField
                    required
                    disabled={!edit}
                    fullWidth
                    value={item?.nombres}
                    onChange={e=>handleChange(e)}
                    name="nombres"
                    label="Nombres"
                    InputLabelProps={{shrink: true,}}
                    helperText={false && "Campo requerido, mínimo 8 dígitos"}
                />
            </Grid>
            <Grid item xs={12} sm={6}>
                <TextField
                    required
                    disabled={!edit}
                    fullWidth
                    value={item?.celular}
                    onChange={e=>handleChange(e)}
                    name="celular"
                    label="Celular"
                    InputLabelProps={{shrink: true,}}
                    helperText={false && "Campo requerido, mínimo 8 dígitos"}
                />
            </Grid>
            <Grid item xs={12} sm={6}>
                <TextField
                    required
                    disabled={!edit}
                    fullWidth
                    value={item?.email}
                    onChange={e=>handleChange(e)}
                    name="email"
                    label="Email"
                    InputLabelProps={{shrink: true,}}
                    helperText={false && "Campo requerido, mínimo 8 dígitos"}
                />
            </Grid>
            <Grid item xs={12} sm={6}>
                <MySelect 
                    disabled={!edit} 
                    data={cursos} 
                    name="idioma" 
                    label="Idioma" 
                    value={item?.idioma} 
                    handleChange={handleChange}
                    helperText={true && "Seleccionar el idioma"}
                />
            </Grid>
            <Grid item xs={12} sm={6}>
                <MySelect 
                    disabled={!edit} 
                    data={NIVEL} 
                    name="nivel" 
                    label="Nivel" 
                    value={item?.nivel} 
                    handleChange={handleChange}
                    helperText={true && "Seleccionar el nivel"}
                />
            </Grid>
            <Grid item xs={12} sm={6}>
                <MySelect 
                    disabled={!edit} 
                    data={facultades} 
                    name="facultad" 
                    label="Facultad" 
                    value={item?.facultad} 
                    handleChange={handleChange}
                    helperText={true && "Seleccionar facultad"}
                />
            </Grid>
            <Grid item xs={12} sm={6}>
                <TextField
                    required
                    disabled={!edit}
                    fullWidth
                    value={item.codigo}
                    onChange={e=>handleChange(e)}
                    name="codigo"
                    label="Código de Alumno"
                    InputLabelProps={{ shrink: true, }}
                    helperText={false && "Campo requerido, mínimo 8 dígitos"}
                />
            </Grid>
        </Grid>
    )
}