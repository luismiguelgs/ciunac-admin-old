import React from 'react'
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import EditNoteIcon from '@mui/icons-material/EditNote';
import SaveIcon from '@mui/icons-material/Save';
import PreviewIcon from '@mui/icons-material/Preview';
import { Button, FormControl, FormHelperText, Grid, InputLabel, MenuItem, Select, TextField } from '@mui/material'
import { ESTADO_EXAMEN, NIVEL } from '../../../services/constants.service'
import { MySelect } from '../../../components/MUI'
import { useFormik } from 'formik'
import * as yup from 'yup'
import { useNavigate } from 'react-router-dom';
import { DatePicker } from '@mui/x-date-pickers';
import dayjs from 'dayjs';
import 'dayjs/locale/es';
import localeData from 'dayjs/plugin/localeData';
import { Iexamen } from '../../../interfaces/examen.interface';
import {  Isalon } from '../../../interfaces/types.interface';
import { Iprofesor } from '../../../interfaces/profesores.interface';
import { useStateContext } from '../../../contexts/ContextProvider';
import { Icalificacion } from '../../../interfaces/calificacion.interface';

dayjs.extend(localeData)
dayjs.locale('es')

const msgReq = 'Campo requerido'

const validationSchema = yup.object<Iexamen>({
    fecha_examen: yup.date().required(msgReq),
    estado: yup.string().required(msgReq),
    fecha_final: yup.date().required(msgReq),
    salon: yup.string().required(msgReq).trim(),
    profesor_id: yup.string().trim().required(msgReq),
    idioma: yup.string().trim().required(msgReq),
    nivel: yup.string().trim().required(msgReq),
    calificacion_id: yup.string().trim().required(msgReq),
    codigo: yup.string().required(msgReq).trim(),
})

type Props = {
    ID: string | undefined,
    data?: Iexamen | undefined,
    handleClickActa: () => void,
    salones: Isalon[],
    profesores: Iprofesor[],
    calificaciones: Icalificacion[] | undefined,
    handleClickSave: (value:Iexamen) => void
}

export default function ExamenForm({ID, handleClickActa, salones, profesores, calificaciones, handleClickSave, data}:Props) 
{
    const navigate = useNavigate()
    const [editar, setEditar] = React.useState<boolean>(false)
    const { cursos } = useStateContext()

    const formik = useFormik<Iexamen>({
        initialValues:{
            estado: data?.estado || 'PROGRAMADO',
            fecha_examen: data?.fecha_examen ? dayjs(new Date(data.fecha_examen.seconds * 1000)) : dayjs(new Date()),
            fecha_final: data?.fecha_final ? dayjs(new Date(data.fecha_final.seconds * 1000)) : null,
            salon: data?.salon || '',
            profesor_id: data?.profesor_id || '',
            idioma: data?.idioma || '',
            nivel : data?.nivel || '',
            calificacion_id: data?.calificacion_id || '',
            codigo: data?.codigo || '',
        },
        validationSchema,
        onSubmit: (values) => {
            const { fecha_examen, fecha_final, profesor_id, profesor, ...rest} = values
            const examenData = {
                ...rest,
                profesor_id: profesor_id,
                profesor: profesores.filter(item => item.id === profesor_id)[0].apellidos,
                fecha_examen: fecha_examen ? new Date(fecha_examen) : null,
                fecha_final: fecha_final ? new Date(fecha_final) : null,
            };
            handleClickSave(examenData)
        }
    })

    // useEffect to update codigo when idioma or nivel changes
    React.useEffect(() => {
        if (formik.values.idioma && formik.values.nivel) {
            formik.setFieldValue('codigo', `UBICACION-${formik.values.idioma}-${formik.values.nivel}-${formik.values.salon}`);
        }
    }, [formik.values.idioma, formik.values.nivel]);

    return (
        <Grid container spacing={2} p={3} component='form' onSubmit={formik.handleSubmit}>
            <Grid item xs={12} md={4}>
                    <MySelect
                        data={ESTADO_EXAMEN}
                        handleChange={formik.handleChange}
                        error={formik.touched.estado && Boolean(formik.errors.estado)}
                        label='Extado'
                        name='estado'
                        disabled={!editar}
                        value={formik.values.estado}
                        helperText={formik.touched.estado && formik.errors.estado}
                    />
                </Grid>
                <Grid item xs={12} sm={4}>
                    <DatePicker 
                        label="Fecha de Examen"
                        name='fecha_examen'
                        disabled={ID !== 'nuevo' && !editar}
                        value={formik.values.fecha_examen} 
                        onChange={(date)=>formik.setFieldValue('fecha_examen',date)} 
                        minDate={dayjs(new Date())}
                        slotProps={{
                            textField:{
                                fullWidth:true,
                                error: Boolean(formik.touched.fecha_examen) && Boolean(formik.errors.fecha_examen),
                                helperText: (formik.touched.fecha_examen && formik.errors.fecha_examen) as string
                            }
                        }}
                    />
                </Grid>
                <Grid item xs={12} sm={4}>
                    <DatePicker 
                        label="Fecha Final"
                        name='fecha_final'
                        value={formik.values.fecha_final} 
                        onChange={(date)=>formik.setFieldValue('fecha_final',date)} 
                        maxDate={formik.values.fecha_examen}
                        minDate={dayjs(new Date())}
                        disabled={(ID !== 'nuevo' && !editar) || !formik.values.fecha_examen}
                        slotProps={{
                            textField:{
                                fullWidth:true,
                                error: Boolean(formik.touched.fecha_final) && Boolean(formik.errors.fecha_final),
                                helperText: (formik.touched.fecha_final && formik.errors.fecha_final) as string
                            }
                        }}
                    />
                </Grid>
                <Grid item xs={12} md={4}>
                    <MySelect 
                        data={salones}
                        handleChange={formik.handleChange}
                        error={formik.touched.salon && Boolean(formik.errors.salon)}
                        label='Salón'
                        name='salon'
                        disabled={ID !== 'nuevo' && !editar}
                        value={formik.values.salon}
                        helperText={formik.touched.salon && formik.errors.salon}
                    />
                </Grid>
                <Grid item xs={12} md={4}>
                    <FormControl 
                        sx={{minWidth: 120, width:'100%'}} 
                        disabled={ID !== 'nuevo' && !editar} 
                        error={formik.touched.profesor_id && Boolean(formik.errors.profesor_id)}>
                        <InputLabel>Profesor</InputLabel>
                        <Select
                            name='profesor_id'
                            onChange={formik.handleChange}
                            value={formik.values.profesor_id}
                            label='Profesor'>
                                {
                                    profesores.map((item,index)=>(
                                        <MenuItem key={index} value={item.id}>
                                            {`${item.nombres} ${item.apellidos}`}
                                        </MenuItem>
                                    ))
                                }
                        </Select>
                        <FormHelperText>{(formik.touched.profesor_id && formik.errors.profesor_id) as string}</FormHelperText>
                    </FormControl>
                </Grid>
                <Grid item xs={12} md={4}>
                    <MySelect 
                        data={cursos}
                        handleChange={formik.handleChange}
                        error={formik.touched.idioma && Boolean(formik.errors.idioma)}
                        label='Idioma'
                        name='idioma'
                        disabled={ID !== 'nuevo' && !editar}
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
                        disabled={ID !== 'nuevo' && !editar}
                        error={formik.touched.nivel && Boolean(formik.errors.nivel)}
                        value={formik.values.nivel}
                        helperText={formik.touched.nivel && formik.errors.nivel}
                    />
                </Grid>
                <Grid item xs={12} md={4}>
                    <FormControl 
                        sx={{minWidth: 120, width:'100%'}} 
                        disabled={ID !== 'nuevo' && !editar} 
                        error={formik.touched.calificacion_id && Boolean(formik.errors.calificacion_id)}>
                        <InputLabel>Calificaciones</InputLabel>
                        <Select
                            name='calificacion_id'
                            onChange={formik.handleChange}
                            value={formik.values.calificacion_id}
                            label='Calificaciones'>
                                {
                                    calificaciones?.map((item,index)=>(
                                        <MenuItem key={index} value={item.id}>
                                            {`${item.codigo}`}
                                        </MenuItem>
                                    ))
                                }
                        </Select>
                        <FormHelperText>{(formik.touched.calificacion_id && formik.errors.calificacion_id) as string}</FormHelperText>
                    </FormControl>
                </Grid>
                <Grid item xs={12} md={4}>
                    <TextField
                        autoFocus
                        value={formik.values.codigo}
                        name='codigo'
                        disabled
                        label="Código"
                        error={formik.touched.codigo && Boolean(formik.errors.codigo)}
                        type="text"
                        fullWidth
                        variant="outlined"
                        onChange={formik.handleChange}
                        helperText={formik.touched.codigo && formik.errors.codigo}
                    />
                </Grid>
                <Grid item xs={12} md={3} display='flex' alignItems='center' justifyContent='center' alignContent='center'>
                    <Button 
                        sx={{color:'white'}} 
                        fullWidth 
                        onClick={()=>{navigate(-1)}} 
                        variant="contained" 
                        color="secondary" 
                        startIcon={<ArrowBackIcon />}>
                        Atras
                    </Button>
                </Grid>
                <Grid item xs={12} md={3} display='flex' alignItems='center' justifyContent='center' alignContent='center'>
                    <Button 
                        fullWidth 
                        disabled={ID === 'nuevo' || editar}
                        onClick={()=>{setEditar(true)}} 
                        variant="contained" 
                        color="primary" 
                        startIcon={<EditNoteIcon />}>
                        Editar
                    </Button>
                </Grid>
                <Grid item xs={12} md={3} display='flex' alignItems='center' justifyContent='center' alignContent='center'>
                    <Button
                        fullWidth 
                        type='submit'
                        variant="contained" 
                        color="success" 
                        disabled={ID !== 'nuevo' && !editar}
                        startIcon={<SaveIcon />}>
                        Guardar
                    </Button>
                </Grid>
                <Grid item xs={12} md={3} display='flex' alignItems='center' justifyContent='center' alignContent='center'>
                    <Button
                        fullWidth 
                        onClick={handleClickActa}
                        variant="contained" 
                        color="error" 
                        disabled={ID === 'nuevo'} 
                        startIcon={<PreviewIcon />}>
                        Ver Acta
                    </Button>
                </Grid>
            </Grid>
  )
}
