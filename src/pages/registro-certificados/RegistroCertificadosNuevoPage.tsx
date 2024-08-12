import { Box, Button, Grid, Typography } from '@mui/material'
import React from 'react'
import { Icertificado } from '../../interfaces/certificado.interface'
import { useFormik } from 'formik'
import dayjs from 'dayjs'
import 'dayjs/locale/es'
import localeData from 'dayjs/plugin/localeData'
import * as yup from 'yup'
import { MyDialog} from '../../components/MUI'
import { useStateContext } from '../../contexts/ContextProvider'
//import { NIVEL } from '../../services/constants.service'
import SaveIcon from '@mui/icons-material/Save';
//import { DatePicker } from '@mui/x-date-pickers'
import { useNavigate } from 'react-router-dom'

import AssignmentIcon from '@mui/icons-material/Assignment';
import PreviewIcon from '@mui/icons-material/Preview';
import CertificadoDetalle from './components/CertificadoDetalle'
import CertificadosService, { Collection } from '../../services/certificados.service'
import { PDFViewer } from '@react-pdf/renderer'
import FormatoCertificado from '../../components/FormatosPDF/FormatoCertificado'
import CertificadoForm from './components/CertificadoForm'
import ButtonBack from '../../components/MUI/ButtonBack'

dayjs.extend(localeData)
dayjs.locale('es')

const msgReq = 'Campo requerido'

const validationSchema = yup.object<Icertificado>({
    alumno: yup.string().required(msgReq),
    fecha_emision: yup.date().required(msgReq),
    fecha_conclusion: yup.date().required(msgReq),
    idioma: yup.string().trim().required(msgReq),
    nivel: yup.string().trim().required(msgReq),
    numero_registro: yup.string().trim().required(msgReq),
    horas: yup.number().required(msgReq).max(400).min(100),
})

export default function RegistroCertificadosNuevoPage() 
{
    const [id, setId] = React.useState<string>('nuevo')
    const [open, setOpen] = React.useState<boolean>(false)
    const navigate = useNavigate()
    const { cursos } = useStateContext()
    const formik = useFormik<Icertificado>({
        initialValues:{
            alumno: '',
            idioma: '',
            nivel : '',
            tipo: 'fisico',
            fecha_emision: new Date(),
            fecha_conclusion: new Date(),
            horas: 0,
            numero_registro: ''
        },
        validationSchema,
        onSubmit: async(values:Icertificado) =>{
            // Convert dayjs objects to JavaScript Date objects
            const formattedValues = {
                ...values,
                fecha_emision: dayjs(values.fecha_emision).toDate(),
                fecha_conclusion: dayjs(values.fecha_conclusion).toDate()
            };
            //alert(JSON.stringify(values,null, 2))
            const id = await CertificadosService.newItem(Collection.Certificados, formattedValues)
            setId(id as string)
            navigate(`./registro-certificados/${id}`)
        }
    })

    return (
        <Box>
            <Typography variant="h5" gutterBottom>Nuevo Certificado</Typography>
                <CertificadoForm cursos={cursos} formik={formik} id={id}/>
                <Grid container spacing={2} p={2}>
                    <Grid item xs={12} md={3} display='flex' alignItems='center' justifyContent='center' alignContent='center'>
                        <ButtonBack />
                    </Grid>
                    <Grid item xs={12} md={3} display='flex' alignItems='center' justifyContent='center' alignContent='center'>
                        <Button 
                            fullWidth 
                            onClick={()=>{alert('asignar certificado')}} 
                            variant="contained" 
                            color="primary" 
                            startIcon={<AssignmentIcon />}>
                            Asignar Solicitud
                        </Button>
                    </Grid>
                    <Grid item xs={12} md={3} display='flex' alignItems='center' justifyContent='center' alignContent='center'>
                        <Button
                            fullWidth
                            onClick={()=>formik.handleSubmit()}
                            variant="contained" 
                            color="success" 
                            startIcon={<SaveIcon />}>
                            Guardar
                        </Button>
                    </Grid>
                    <Grid item xs={12} md={3} display='flex' alignItems='center' justifyContent='center' alignContent='center'>
                        <Button
                            fullWidth 
                            onClick={()=>setOpen(true)}
                            variant="contained" 
                            color="error" 
                            disabled={id === 'nuevo'}
                            startIcon={<PreviewIcon />}>
                            Ver Certificado
                        </Button>
                    </Grid>
                    <Grid item xs={12}>
                        <CertificadoDetalle id_certificado={id} />
                    </Grid>
                </Grid>
                <MyDialog 
                    open={open}
                    type='SIMPLE'
                    title='ACTA DEL EXAMEN'
                    setOpen={setOpen}
                    content={<>
                        <PDFViewer width={800} height={500}>
				            <FormatoCertificado 
                                data={[]} 
                                fecha_emision={dayjs(formik.values.fecha_emision).format('D [de] MMMM [de] YYYY' )}
                                fecha_conclusion={dayjs(formik.values.fecha_conclusion).format('D [de] MMMM [de] YYYY' )} 
                                idioma={cursos.filter(item=>item.value === formik.values.idioma)[0]?.label}
                                nivel='BÁSICO' 
                                url={`https://ciunac.unac.edu.pe/validacion-certificado/?url=${id}`}
                                alumno={formik.values.alumno} 
                                horas={formik.values.horas}
                                numero_folio={formik.values.numero_registro}/>
			            </PDFViewer>
                </>}
            />
        </Box>
    )
}
