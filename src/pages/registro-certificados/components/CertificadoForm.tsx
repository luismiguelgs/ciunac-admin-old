import { Grid, TextField } from '@mui/material'
import { FormikProps } from 'formik'
import { Icertificado } from '../../../interfaces/certificado.interface'
import { IBaseData } from '../../../interfaces/types.interface'
import { MySelect } from '../../../components/MUI'
import { NIVEL } from '../../../services/constants.service'
import { DatePicker } from '@mui/x-date-pickers'
import dayjs from 'dayjs'

type Props = {
    formik: FormikProps<Icertificado>,
    cursos: IBaseData[],
    id: string
}

export default function CertificadoForm({formik, cursos, id}:Props) 
{
    return (
        <Grid container spacing={2} p={2} component='form' onSubmit={formik.handleSubmit}>
                <Grid item xs={12} md={6}>
                    <TextField
                        autoFocus
                        value={formik.values.alumno}
                        name='alumno'
                        label="Alumno"
                        error={formik.touched.alumno && Boolean(formik.errors.alumno)}
                        type="text"
                        fullWidth
                        disabled={id !== 'nuevo'}
                        variant="outlined"
                        onChange={formik.handleChange}
                        helperText={formik.touched.alumno && formik.errors.alumno}
                    />
                </Grid>
                <Grid item xs={12} md={3}>
                    <MySelect 
                        data={cursos}
                        handleChange={formik.handleChange}
                        error={formik.touched.idioma && Boolean(formik.errors.idioma)}
                        label='Idioma'
                        name='idioma'
                        value={formik.values.idioma}
                        helperText={formik.touched.idioma && formik.errors.idioma}
                    />
                </Grid>
                <Grid item xs={12} md={3}>
                    <MySelect 
                        data={NIVEL}
                        handleChange={formik.handleChange}
                        label='Nivel'
                        name='nivel'
                        error={formik.touched.nivel && Boolean(formik.errors.nivel)}
                        value={formik.values.nivel}
                        helperText={formik.touched.nivel && formik.errors.nivel}
                    />
                </Grid>
                <Grid item xs={12} md={3}>
                    <TextField
                        autoFocus
                        value={formik.values.horas}
                        name='horas'
                        label="Cantidad de Horas"
                        error={formik.touched.horas && Boolean(formik.errors.horas)}
                        type="number"
                        fullWidth
                        variant="outlined"
                        onChange={formik.handleChange}
                        helperText={formik.touched.horas && formik.errors.horas}
                    />
                </Grid>
                <Grid item xs={12} md={3}>
                    <DatePicker 
                        label="Fecha Emisión"
                        value={dayjs(formik.values.fecha_emision)} 
                        onChange={(date)=>formik.setFieldValue('fecha_emision',date)} 
                        maxDate={dayjs(new Date())}
                        slotProps={{
                            textField:{
                                fullWidth:true,
                                error: Boolean(formik.touched.fecha_emision) && Boolean(formik.errors.fecha_emision),
                                helperText: (formik.touched.fecha_emision && formik.errors.fecha_emision) as string
                            }
                        }}
                    />
                </Grid>
                <Grid item xs={12} md={3}>
                    <TextField
                        autoFocus
                        value={formik.values.numero_registro}
                        name='numero_registro'
                        label="Número de Registro"
                        error={formik.touched.numero_registro && Boolean(formik.errors.numero_registro)}
                        type="text"
                        fullWidth
                        variant="outlined"
                        onChange={formik.handleChange}
                        helperText={formik.touched.numero_registro && formik.errors.numero_registro}
                    />
                </Grid>
                <Grid item xs={12} md={3}>
                    <DatePicker 
                        label="Fecha Concluido"
                        value={dayjs(formik.values.fecha_conclusion)} 
                        onChange={(date)=>formik.setFieldValue('fecha_conclusion',dayjs(date))} 
                        maxDate={dayjs(new Date())}
                        slotProps={{
                            textField:{
                                fullWidth:true,
                                error: Boolean(formik.touched.fecha_conclusion) && Boolean(formik.errors.fecha_conclusion),
                                helperText: (formik.touched.fecha_conclusion && formik.errors.fecha_conclusion) as string
                            }
                        }}
                    />
                </Grid>
        </Grid>
    )
}
