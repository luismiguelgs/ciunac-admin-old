import { Button } from '@mui/material'
import React from 'react'
import { MyDialog } from '../../../components/MUI'
import PreviewIcon from '@mui/icons-material/Preview';
import { PDFViewer } from '@react-pdf/renderer';
import FormatoCertificado from '../../../components/FormatosPDF/FormatoCertificado';
import { FormikProps } from 'formik';
import { Icertificado, IcertificadoDetalle } from '../../../interfaces/certificado.interface';
import dayjs from 'dayjs';
import { useStateContext } from '../../../contexts/ContextProvider';

type Props = {
    id: string,
    formik: FormikProps<Icertificado>,
    data: IcertificadoDetalle[]
}

export default function ButtonSeeCertificate({id, formik, data}:Props) 
{
    const {cursos} = useStateContext()
    const [open, setOpen] = React.useState<boolean>(false)
    return (
        <React.Fragment>
            <Button
                fullWidth 
                onClick={()=>setOpen(true)}
                variant="contained" 
                color="error" 
                disabled={id === 'nuevo'}
                startIcon={<PreviewIcon />}>
                    Ver Certificado
            </Button>
            <MyDialog 
                open={open}
                type='SIMPLE'
                title='ACTA DEL EXAMEN'
                setOpen={setOpen}
                content={<>
                    <PDFViewer width={800} height={500}>
				        <FormatoCertificado
                            data={data} 
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
        </React.Fragment>
    )
}
