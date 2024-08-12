import React from 'react'
import * as yup from 'yup'
import { MySelect, MySwitch } from './MUI'
import { useMask } from '@react-input/mask'
import { useFormik } from 'formik'
import { Box, Button, Grid, InputAdornment, TextField } from '@mui/material'
import { DatePicker } from '@mui/x-date-pickers'
import { useStateContext } from '../contexts/ContextProvider'
import { useNavigate } from 'react-router-dom'
import { Isolicitud } from '../interfaces/solicitud.interface'
import { NIVEL } from '../services/constants.service'
import { obtenerPeriodo } from '../services/util.service'
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import SaveIcon from '@mui/icons-material/Save';
import dayjs from 'dayjs'

const msgReq = 'Campo requerido'
const msgDni = 'Campo de 8 caracteres'

let validationSchema = yup.object<Isolicitud>({
    apellidos: yup.string().required(msgReq).trim(),
    nombres: yup.string().trim().required(msgReq),
    solicitud: yup.string().trim().required(msgReq),
    celular: yup.string().trim().required(msgReq).min(11,'El campo requiere 9 caracteres'),
    dni: yup.string().trim().required(msgReq).min(8,msgDni),
    idioma: yup.string().trim().required(msgReq),
    nivel: yup.string().trim().default('BASICO'),
    trabajador: yup.boolean(),
    numero_voucher: yup.string().trim().when('trabajador',{
        is: true,
        then: (schema:yup.Schema) => schema.optional().nullable(),
        otherwise: (schema:yup.Schema)=> schema.required(msgReq),
    }),
    pago: yup.number().when('trabajador', {
        is: true,
        then: (schema:yup.Schema) => schema.optional().nullable(),
        otherwise: (schema: yup.Schema) => schema.required(msgReq)
    }),
    fecha_pago: yup.date().when('trabajador',{
        is:true,
        then: (schema:yup.Schema) => schema.optional().nullable(),
        otherwise: (schema:yup.Schema) => schema.required(msgReq)
    })
})

type Props = {
    onSubmit(values:Isolicitud) : void
    ubicacion?: boolean
}

export default function FormNuevaSolicitud({onSubmit, ubicacion=true}:Props) 
{
    //hooks ***************************************************************************
    const navigate = useNavigate()
    const {certificados, cursos, facultades} = useStateContext()
    //Flag para guardar fecha de creacion
    const [fechaCreacion, setFechaCreacion] = React.useState(false)

    const apellidoRef = useMask({ mask: '________________________________________', replacement: { _: /^[a-zA-Z \u00C0-\u00FF]*$/ } })
    const nombreRef = useMask({ mask: '________________________________________', replacement: { _: /^[a-zA-Z \u00C0-\u00FF]*$/ } })
    const celularRef = useMask({ mask: '___-___-___', replacement: { _: /\d/ } });
    const codigoRef = useMask({ mask: '__________', replacement: { _: /^[a-zA-Z0-9_]*$/ } });
    const dniRef = useMask({ mask: '________', replacement: { _: /\d/ } });
    const voucherRef = useMask({ mask: '_______________', replacement: { _: /\d/ } });
    const pagoRef = useMask({ mask: '_____', replacement: { _: /^[0-9.]*$/ } });

    const formik = useFormik<Isolicitud>({
        initialValues:{
            solicitud: ubicacion ? 'EXAMEN_DE_UBICACION' : '',
            apellidos: '',
            nombres: '',
            celular: '',
            dni: '',
            periodo: obtenerPeriodo(),
            idioma: '',
            nivel: 'BASICO',
            facultad: 'PAR',
            codigo: '',
            numero_voucher: '',
            pago: '',
            fecha_pago: null, //dayjs(new Date()),
            trabajador: false,
            creado: null,
        },
        validationSchema,
        onSubmit: async(values, {resetForm}) => {
            //alert(JSON.stringify(values.creado,null, 2))
            onSubmit(values)
            resetForm()
        }
    })

    return (
        <React.Fragment>
        
        <Box sx={{p: 1}} component='form' onSubmit={formik.handleSubmit}>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <MySelect 
                        data={certificados}
                        disabled={ubicacion}
                        error={formik.touched.solicitud && Boolean(formik.errors.solicitud)}
                        name='solicitud'
                        label='Tipo de Solicitud'
                        value={formik.values.solicitud}
                        handleChange={formik.handleChange}
                        helperText={formik.touched.solicitud && formik.errors.solicitud}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        inputRef={apellidoRef}
                        fullWidth
                        autoComplete='off'
                        error={formik.touched.apellidos && Boolean(formik.errors.apellidos)}
                        value={formik.values.apellidos}
                        onChange={formik.handleChange}
                        name="apellidos"
                        id="apellidos"
                        label="Apellidos"
                        helperText={formik.touched.apellidos && formik.errors.apellidos}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        inputRef={nombreRef}
                        fullWidth
                        autoComplete='off'
                        error={formik.touched.nombres && Boolean(formik.errors.nombres)}
                        value={formik.values.nombres}
                        onChange={formik.handleChange}
                        name="nombres"
                        id="nombres"
                        label="Nombres"
                        helperText={formik.touched.nombres && formik.errors.nombres}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        inputRef={dniRef}
                        fullWidth
                        autoComplete='off'
                        error={formik.touched.dni && Boolean(formik.errors.dni)}
                        value={formik.values.dni}
                        onChange={formik.handleChange}
                        name="dni"
                        id="dni"
                        label="DNI"
                        helperText={formik.touched.dni && formik.errors.dni}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        inputRef={celularRef}
                        fullWidth
                        autoComplete='off'
                        error={formik.touched.celular && Boolean(formik.errors.celular)}
                        value={formik.values.celular}
                        onChange={formik.handleChange}
                        name="celular"
                        id="celular"
                        label="Celular"
                        helperText={formik.touched.celular && formik.errors.celular}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <MySelect 
                        data={cursos}
                        error={formik.touched.idioma && Boolean(formik.errors.idioma)}
                        name='idioma'
                        label='Idioma'
                        value={formik.values.idioma}
                        handleChange={formik.handleChange}
                        helperText={formik.touched.idioma && formik.errors.idioma}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <MySelect 
                        data={NIVEL}
                        error={formik.touched.nivel && Boolean(formik.errors.nivel)}
                        name='nivel'
                        label='Nivel'
                        value={formik.values.nivel}
                        handleChange={formik.handleChange}
                        helperText={formik.touched.nivel && formik.errors.nivel}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <MySelect 
                        data={facultades}
                        name='facultad'
                        label='Facultad'
                        value={formik.values.facultad}
                        handleChange={formik.handleChange}
                        helperText={formik.touched.facultad && formik.errors.facultad}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        fullWidth
                        value={formik.values.codigo}
                        error={formik.touched.codigo && Boolean(formik.errors.codigo)}
                        autoComplete='off'
                        inputRef={codigoRef}
                        onChange={formik.handleChange}
                        name="codigo"
                        label="Código de Alumno"
                        helperText={formik.touched.codigo && formik.errors.codigo}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        fullWidth
                        inputRef={voucherRef}
                        error={formik.touched.numero_voucher && Boolean(formik.errors.numero_voucher)}
                        value={formik.values.numero_voucher}
                        autoComplete='off'
                        onChange={formik.handleChange}
                        name="numero_voucher"
                        label="Número de voucher"
                        helperText={formik.touched.numero_voucher && formik.errors.numero_voucher}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        fullWidth
                        autoComplete='off'
                        inputRef={pagoRef}
                        label='Monto pagado'
                        error={formik.touched.pago && Boolean(formik.errors.pago)}
                        value={formik.values.pago}
                        InputProps={{ startAdornment: <InputAdornment position="start">S/</InputAdornment>,}}
                        onChange={formik.handleChange}
                        name="pago"
                        helperText={formik.touched.pago && formik.errors.pago}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <DatePicker 
                        label="Fecha de Pago"
                        value={formik.values.fecha_pago} 
                        onChange={(date)=>formik.setFieldValue('fecha_pago',date)} 
                        maxDate={dayjs(new Date())}
                        slotProps={{
                            textField:{
                                fullWidth:true,
                                error: Boolean(formik.touched.fecha_pago) && Boolean(formik.errors.fecha_pago),
                                //helperText: formik.touched.fecha_pago && formik.errors.fecha_pago
                            }
                        }}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <MySwitch 
                        label='Trabajador UNAC'
                        checked={formik.values.trabajador as boolean}
                        name='trabajador'
                        handleChange={formik.handleChange}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <DatePicker 
                        label="Fecha de Ingreso"
                        disabled={!fechaCreacion}
                        value={formik.values.creado} 
                        onChange={(date)=>formik.setFieldValue('creado',date)} 
                        maxDate={dayjs(new Date())}
                        slotProps={{
                            textField:{
                                fullWidth:true,
                                error: Boolean(formik.touched.creado) && Boolean(formik.errors.creado),
                                //helperText: formik.touched.creado && formik.errors.creado
                            }
                        }}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <MySwitch
                        label='Ingresar Fecha de solicitud'
                        checked={fechaCreacion}
                        name='fecha_creacion'
                        handleChange={()=> setFechaCreacion(!fechaCreacion)}
                    />
                </Grid>
            </Grid>
            <Box display='flex' m={2} alignContent='end'>
                <Button sx={{mr:1}} onClick={()=>{ ubicacion ? navigate(-1) : navigate('/')}} variant="contained" color="secondary" startIcon={<ArrowBackIcon />}>
                    Atras
                </Button>
                <Button sx={{mr:1}} type="submit" variant="contained" color="success" endIcon={<SaveIcon />}>
                    Enviar
                </Button>
            </Box>
        </Box>
    </React.Fragment>
    )
}
