import { Grid, TextField, InputAdornment } from '@mui/material'
import { Isolicitud } from '../../interfaces/solicitud.interface'
import Link from '@mui/material/Link';
import pdfLogo from '../../assets/pdf.png'
import MySelect from '../MUI/MySelect';
import { useStateContext } from '../../contexts/ContextProvider';

type Props={
    item:Isolicitud
    handleChange(e:React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>):void
    edit:boolean,
}

export default function FinInfo({item,handleChange, edit}:Props)
{
    const { certificados } = useStateContext()

    const archivo = item.voucher?.split('?')[0].slice(-3);

    if (item.creado && item.creado.seconds) {
        const fechaC = new Date(item.creado.seconds * 1000 + (item.creado.nanoseconds || 0) / 1e6);
        item.creado = fechaC.toISOString().split('T')[0]
    }

    if (item.modificado && item.modificado.seconds) {
        const fechaM = new Date(item.modificado.seconds * 1000 + (item.modificado.nanoseconds || 0) / 1e6);
        item.modificado = fechaM.toLocaleString()
    }
    
    return(
        <Grid container spacing={2} sx={{p:1}}>
        { item && 
            <Grid item xs={12} sm={6}>
                <Grid item xs={12}>
                    <MySelect 
                        name='solicitud'
                        disabled={!edit}
                        sx={{mb:2}}
                        label='Tipo de Solicitud'
                        handleChange={handleChange}
                        value={item.solicitud}
                        data={certificados}
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        required
                        disabled={!edit}
                        sx={{width:'95%', mb:2}}
                        fullWidth
                        error={false}
                        value={item?.numero_voucher}
                        onChange={e=>handleChange(e)}
                        name="numero_voucher"
                        label="Número de voucher"
                        InputLabelProps={{shrink: true,}}
                        helperText={false && "Campo requerido, mínimo 8 dígitos"}
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        type='number'
                        sx={{mb:2, width:'95%'}}
                        required
                        disabled={!edit}
                        error={false}
                        label='Monto pagado'
                        value={item?.pago}
                        InputProps={{startAdornment: <InputAdornment position="start">S/</InputAdornment>,}}
                        onChange={e=>handleChange(e)}
                        name="pago"
                        helperText={false && "Ingrese monto válido"}
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        type='date'
                        sx={{mb:2, width:'95%'}}
                        required
                        disabled={!edit}
                        error={false}
                        label='Fecha de pago'
                        value={item?.fecha_pago}
                        onChange={e=>handleChange(e)}
                        name="fecha"
                        InputLabelProps={{shrink: true,}}
                        helperText={false && "Ingrese la fecha de pago válida"}
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        type='date'
                        sx={{mb:2, width:'95%'}}
                        required
                        disabled={true}
                        error={false}
                        label='Fecha creado'
                        value={item?.creado}
                        onChange={e=>handleChange(e)}
                        name="creado"
                        InputLabelProps={{shrink: true,}}
                        helperText={false && "Ingrese la fecha válida"}
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        sx={{mb:2, width:'95%'}}
                        disabled={true}
                        error={false}
                        label='Fecha modificado'
                        value={item?.modificado}
                        onChange={e=>handleChange(e)}
                        name="modificado"
                        InputLabelProps={{shrink: true,}}
                        helperText={false && "Ingrese la fecha de pago válida"}
                    />
                </Grid>
                <Grid item xs={12}>
                {   item.voucher !== '' ?
                        (<Link href={item?.voucher} underline='always' target='_blank' rel="noopener">VER VOUCHER</Link>) 
                    :null
                }
                </Grid>
            </Grid>
            }
            <Grid item xs={12} sm={6}>
            { 
                archivo=='pdf' || item.voucher === '' ? (<img src={pdfLogo} width={290}/>):(<img src={item?.voucher} width={290}/>)
            }
            </Grid>
        </Grid>
    )
}