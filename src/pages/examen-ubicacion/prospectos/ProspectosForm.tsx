import React from 'react'
import * as yup from 'yup'
import IProspecto from '../../../interfaces/prospecto.interface'
import { useNavigate } from 'react-router-dom'
import { useStateContext } from '../../../contexts/ContextProvider'
import { useMask } from '@react-input/mask'
import { useFormik } from 'formik'
import { Box, Button, Grid, TextField, Typography } from '@mui/material'
import { MySelect, MySwitch } from '../../../components/MUI'
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import SaveIcon from '@mui/icons-material/Save';
import { changeDate } from '../../../services/util.service'

const msgReq = 'Campo requerido'
const msgDni = 'Campo de 8 caracteres'

let validationSchema = yup.object<IProspecto>({
    dni: yup.string().required(msgReq).trim().min(8,msgDni).max(8, msgDni),
    apellidos: yup.string().required(msgReq).trim(),
    nombres: yup.string().trim().required(msgReq),
    telefono: yup.string().trim().required(msgReq),
    facultad: yup.string().trim().required(msgReq),
    email: yup.string().email(),
    trabajador: yup.boolean().required()
})

type Props = {
    onSubmit(values:IProspecto) : void
    data?: IProspecto
}

export default function ProspectosForm({onSubmit, data=undefined}:Props) 
{
    //hooks ***************************************************************************
    const navigate = useNavigate()
    const { facultades } = useStateContext()

    const apellidoRef = useMask({ mask: '________________________________________', replacement: { _: /^[a-zA-Z \u00C0-\u00FF]*$/ } })
    const nombreRef = useMask({ mask: '________________________________________', replacement: { _: /^[a-zA-Z \u00C0-\u00FF]*$/ } })
    const telefonoRef = useMask({ mask: '___-___-___', replacement: { _: /\d/ } });
    const codigoRef = useMask({ mask: '__________', replacement: { _: /^[a-zA-Z0-9_]*$/ } });
    const dniRef = useMask({ mask: '________', replacement: { _: /\d/ } });

    const formik = useFormik<IProspecto>({
        initialValues:{
            dni: data?.dni ? data.dni : '',
            apellidos: data?.apellidos ? data.apellidos : '',
            nombres: data?.nombres ? data.nombres : '',
            telefono: data?.telefono ? data.telefono : '',
            facultad: data?.facultad ? data.facultad : 'PAR',
            email: data?.email ? data.email : '',
            codigo: data?.codigo ? data.codigo : '',
            trabajador: data?.trabajador ? data.trabajador : false
        },
        validationSchema,
        onSubmit: (values) =>{
            onSubmit(values)
        }
    })

    return (
        <React.Fragment>
            <Box sx={{p: 1, mt:2}} component='form' onSubmit={formik.handleSubmit}>
                    <Grid container spacing={2}>
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
                                inputRef={telefonoRef}
                                fullWidth
                                autoComplete='off'
                                error={formik.touched.telefono && Boolean(formik.errors.telefono)}
                                value={formik.values.telefono}
                                onChange={formik.handleChange}
                                name="telefono"
                                id="telefono"
                                label="Teléfono"
                                helperText={formik.touched.telefono && formik.errors.telefono}
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
                                error={formik.touched.email && Boolean(formik.errors.email)}
                                value={formik.values.email}
                                autoComplete='off'
                                onChange={formik.handleChange}
                                name="email"
                                label="Email"
                                helperText={formik.touched.email && formik.errors.email}
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
                        {
                            data && (<>
                                <Grid item xs={12} sm={6}>
                                    <Typography variant="overline" display="block" gutterBottom>
                                        Creado: {changeDate(data.creado)}
                                    </Typography>
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <Typography variant="overline" display="block" gutterBottom>
                                        Modificado: {changeDate(data.modificado)}
                                    </Typography>
                                </Grid>
                            </>)
                        }
                        
                        <Grid item xs={12} sm={6}>
                            <Button sx={{mr:1}} onClick={()=>navigate(-1)} variant="contained" color="secondary" startIcon={<ArrowBackIcon />}>
                                Atras
                            </Button>
                            <Button sx={{mr:1}} type="submit" variant="contained" color="success" endIcon={<SaveIcon />}>
                                Enviar
                            </Button>
                        </Grid>
                    </Grid>

                </Box>
        </React.Fragment>
    )
}
