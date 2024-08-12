import { Box, Button, Grid, Typography } from '@mui/material'
import React from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useStateContext } from '../../contexts/ContextProvider'
import dayjs, { localeData } from 'dayjs'
import * as yup from 'yup'
import { useFormik } from 'formik'
import CertificadosService, { Collection } from '../../services/certificados.service'
import { Icertificado, IcertificadoDetalle } from '../../interfaces/certificado.interface'
import CertificadoForm from './components/CertificadoForm'
import ButtonBack from '../../components/MUI/ButtonBack'
import AssignmentIcon from '@mui/icons-material/Assignment';
import SaveIcon from '@mui/icons-material/Save';
import CertificadoDetalle from './components/CertificadoDetalle'
import ButtonSeeCertificate from './components/ButtonSeeCertificate'

dayjs.extend(localeData)
dayjs.locale('es')

const msgReq = 'Campo requerido'

const validationSchema = yup.object<Icertificado>({
    fecha_emision: yup.date().required(msgReq),
    fecha_conclusion: yup.date().required(msgReq),
    alumno: yup.string().required(msgReq).trim(),
    nivel: yup.string().required(msgReq).trim(),
    idioma: yup.string().trim().required(msgReq),
    horas: yup.number().required(msgReq),
    numero_registro: yup.string().required(msgReq).trim(),
})
const initialValues:Icertificado ={
    alumno: '',
    idioma: '',
    nivel : '',
    tipo: 'fisico',
    fecha_emision: new Date(),
    fecha_conclusion: new Date(),
    horas: 0,
    numero_registro: ''
}

export default function RegistroCertificadosDetallePage() 
{
    let {id} = useParams()
    const navigate = useNavigate()
    const { cursos } = useStateContext()
    const [detalle, setDetalle] = React.useState<IcertificadoDetalle[]>([])

    React.useEffect(()=>{
        const loadData = async (id:string|undefined) =>{
            const data = await CertificadosService.selectItem(id as string)
            
            formik.setValues({
                alumno: data?.alumno || initialValues.alumno,
                idioma: data?.idioma || initialValues.idioma,
                nivel : data?.nivel || initialValues.nivel,
                tipo: data?.tipo || initialValues.tipo,
                fecha_emision: data?.fecha_emision || initialValues.fecha_emision,
                fecha_conclusion: data?.fecha_conclusion || initialValues.fecha_conclusion,
                horas: data?.horas || initialValues.horas,
                numero_registro: data?.numero_registro || initialValues.numero_registro
            })
        }
        loadData(id)
    },[])

    const formik = useFormik<Icertificado>({
        initialValues,
        validationSchema,
        onSubmit: async(values:Icertificado) =>{
            // Convert dayjs objects to JavaScript Date objects
            const formattedValues = {
                ...values,
                id,
                fecha_emision: dayjs(values.fecha_emision).toDate(),
                fecha_conclusion: dayjs(values.fecha_conclusion).toDate()
            };
            console.log(formattedValues);
            
            await CertificadosService.updateItem(Collection.Certificados, formattedValues)
            navigate(-1)
        }
    })

    return (
        <Box>
            <Typography variant="h5" gutterBottom>{`Certificado Detalle (${id})` }</Typography>
            <CertificadoForm cursos={cursos} formik={formik} id={id as string}/>
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
                            onClick={()=>{
                                formik.submitForm()
                            }}
                            variant="contained" 
                            color="success" 
                            startIcon={<SaveIcon />}>
                            Guardar
                        </Button>
                    </Grid>
                    <Grid item xs={12} md={3} display='flex' alignItems='center' justifyContent='center' alignContent='center'>
                        <ButtonSeeCertificate formik={formik} id={id as string} data={detalle}/>
                    </Grid>
                    <Grid item xs={12}>
                        <CertificadoDetalle id_certificado={id as string} setData={setDetalle}/>
                    </Grid>
                </Grid>
        </Box>
    )
}
