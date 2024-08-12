import { Isolicitud } from '../../../../interfaces/solicitud.interface'
import { Card, CardContent, CardHeader, CardMedia, Grid, Link } from '@mui/material'
import pdfLogo from '../../../../assets/pdf.png'
import noImage from '../../../../assets/no_disponible.png'

type Props = {
    item: Isolicitud
}
type ObjImage = {
    title: string
    isPdf: boolean,
    hasImage: boolean
}

export default function InfoExtra({item}:Props) 
{
    console.log(item);
    
    const certificadoTrabajo:ObjImage =  {
        title : 'Certificado de Trabajo',
        isPdf : item.img_cert_trabajo?.split('?')[0].slice(-3) === 'pdf',
        hasImage : Boolean(item.img_cert_trabajo)
    }
    const certificadoEstudio: ObjImage = {
        title : 'Certificado de Estudio',
        isPdf : item.img_cert_estudio?.split('?')[0].slice(-3) === 'pdf',
        hasImage : Boolean(item.img_cert_estudio)
    }
    
    return (
        <Grid container spacing={2} p={1}>
            <Grid item xs={12} md={6} display='flex'>
                <Card sx={{p:2, width:'100%'}}>
                    <CardHeader title={certificadoTrabajo.title} />
                    <CardMedia 
                        component='img'
                        alt={certificadoTrabajo.title}
                        style={{maxHeight:'440px', width:'100%', margin:'0 auto'}}
                        image={
                            certificadoTrabajo.isPdf ? 
                                pdfLogo : 
                                certificadoTrabajo.hasImage ?
                                    item.img_cert_trabajo :
                                    noImage
                        }
                    />
                    <CardContent>
                    {   certificadoTrabajo.hasImage ?
                            (<Link href={item?.img_cert_trabajo} underline='always' target='_blank' rel="noopener">VER IMAGEN</Link>) 
                            :null
                    }
                    </CardContent>
                </Card>
            </Grid>
            <Grid item xs={12} md={6} display='flex'>
                <Card sx={{p:1, width:'100%'}}>
                    <CardHeader title={certificadoEstudio.title} />
                    <CardMedia 
                        component='img'
                        alt={certificadoEstudio.title}
                        style={{maxHeight:'440px', width:'100%', margin:'0 auto'}}
                        image={
                            certificadoEstudio.isPdf ? 
                                pdfLogo : 
                                certificadoEstudio.hasImage ?
                                    item.img_cert_estudio :
                                    noImage
                        }
                    />
                    <CardContent>
                    {   certificadoEstudio.hasImage ?
                            (<Link href={item?.img_cert_estudio} underline='always' target='_blank' rel="noopener">VER IMAGEN</Link>) 
                            :null
                    }
                    </CardContent>
                </Card>
            </Grid>
        </Grid>
    )
}