import { Box, Button, Grid, TextField } from '@mui/material'
import { MySelect } from '../../../../components/MUI'
import { useStateContext } from '../../../../contexts/ContextProvider'
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import React from 'react'
import EditNoteIcon from '@mui/icons-material/EditNote';
import SaveIcon from '@mui/icons-material/Save';
import { NIVEL } from '../../../../services/constants.service';
import { Icalificacion } from '../../../../interfaces/calificacion.interface';
import * as yup from 'yup'
import { useFormik } from 'formik';
import { CalificacionesService, Collection } from '../../../../services/calificaciones.service';
import CalificacionesRangos from './CalificacionesRangos';

type Props = {
    id: string | null
    setOpen:React.Dispatch<React.SetStateAction<boolean>>
    setReload:React.Dispatch<React.SetStateAction<boolean>>
}

const msgReq = 'Campo requerido'

const validationSchema = yup.object<Icalificacion>({
    codigo: yup.string().required(msgReq).trim(),
    idioma: yup.string().trim().required(msgReq),
    nivel: yup.string().trim().required(msgReq)
})

export default function CalificacionesDetail({id, setOpen, setReload}:Props) 
{
    //hooks
    const {cursos} = useStateContext()
    const [ID, setID] = React.useState<string | null>(id)
    const [editar, setEditar] = React.useState<boolean>(false)

    const loadData = async (id:string | null) =>{
        const data = await CalificacionesService.selectItem(id as string)
        //setData(d)
        formik.setValues({
            codigo: data?.codigo || '',
            idioma: data?.idioma || '',
            nivel: data?.nivel || ''
        })
    }

    React.useEffect(()=>{
        id ? loadData(id) : null
    },[])

    const formik = useFormik<Icalificacion>({
        initialValues:{
            codigo: '' ,
            idioma: '' ,
            nivel:  ''
        },
        validationSchema,
        onSubmit: async(values) => {
            if(id === null){
                const id_nuevo = await CalificacionesService.newItem(Collection.Calificaciones,values)
                setID(id_nuevo as string)
            }
            else{
                await CalificacionesService.updateItem(Collection.Calificaciones, {id:id,...values})
                //setEditar(false)
            }
            setReload((oldValue)=>!oldValue)
            setEditar(false)
        }
    })

    // useEffect to update codigo when idioma or nivel changes
    React.useEffect(() => {
        if (formik.values.idioma && formik.values.nivel) {
            formik.setFieldValue('codigo', `EXAMEN-UBICACION-${formik.values.idioma}-${formik.values.nivel}`);
        }
    }, [formik.values.idioma, formik.values.nivel]);

    return (
        <Box>
            <Grid container spacing={2} p={3} component='form' onSubmit={formik.handleSubmit}>
                <Grid item xs={12} md={4}>
                    <TextField
                        autoFocus
                        value={formik.values.codigo}
                        name='codigo'
                        disabled={id !== null && !editar}
                        label="Código"
                        error={formik.touched.codigo && Boolean(formik.errors.codigo)}
                        type="text"
                        fullWidth
                        variant="outlined"
                        onChange={formik.handleChange}
                        helperText={formik.touched.codigo && formik.errors.codigo}
                    />
                </Grid>
                <Grid item xs={12} md={4}>
                    <MySelect 
                        data={cursos}
                        handleChange={formik.handleChange}
                        error={formik.touched.idioma && Boolean(formik.errors.idioma)}
                        label='Curso'
                        name='idioma'
                        disabled={id !== null && !editar}
                        value={formik.values.idioma}
                        helperText={formik.touched.idioma && formik.errors.idioma}
                    />
                </Grid>
                <Grid item xs={12} md={4}>
                    <MySelect 
                        data={NIVEL}
                        handleChange={formik.handleChange}
                        label='Nivel'
                        name='nivel'
                        disabled={id !== null && !editar}
                        error={formik.touched.nivel && Boolean(formik.errors.nivel)}
                        value={formik.values.nivel}
                        helperText={formik.touched.nivel && formik.errors.nivel}
                    />
                </Grid>
                <Grid item xs={12} md={4} display='flex' alignItems='center' justifyContent='center' alignContent='center'>
                    <Button 
                        sx={{color:'white'}} 
                        fullWidth 
                        onClick={()=>{setOpen(false)}} 
                        variant="contained" 
                        color="secondary" 
                        startIcon={<ArrowBackIcon />}>
                        Atras
                    </Button>
                </Grid>
                <Grid item xs={12} md={4} display='flex' alignItems='center' justifyContent='center' alignContent='center'>
                    <Button 
                        fullWidth 
                        disabled={id === null || editar}
                        onClick={()=>{setEditar(true)}} 
                        variant="contained" 
                        color="primary" 
                        startIcon={<EditNoteIcon />}>
                        Editar
                    </Button>
                </Grid>
                <Grid item xs={12} md={4} display='flex' alignItems='center' justifyContent='center' alignContent='center'>
                    <Button
                        fullWidth 
                        type='submit'
                        variant="contained" 
                        color="success" 
                        disabled={id !== null && !editar}
                        startIcon={<SaveIcon />}>
                        Guardar
                    </Button>
                </Grid>
                <Grid item xs={12} >
                    <CalificacionesRangos id={ID}/>                    
                </Grid>
            </Grid>
        </Box>
    )
}
