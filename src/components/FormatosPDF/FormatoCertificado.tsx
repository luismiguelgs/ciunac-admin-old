import { StyleSheet, Document, Page, View, Text, Font, Image } from '@react-pdf/renderer'
import QRCode from 'qrcode'
import selloDirector from '../../assets/director.jpg'
import selloCoordinadora from '../../assets/coordinadora.jpg'
import selloElaborador  from '../../assets/elaborador.jpg'
import PinyonScript from '../../assets/PinyonScript-Regular.ttf'

Font.register({family:'Roboto', src:'http://fonts.gstatic.com/s/roboto/v16/zN7GBFwfMP4uA6AR0HCoLQ.ttf'})
Font.register({family: 'PinyonScript', src:PinyonScript})

export const generateSessionPDFQrCode = async (
    baseUrl: string,
  ): Promise<string> => {
    return await QRCode.toDataURL(
      baseUrl
    )
}

const styles = StyleSheet.create({
	page:{
		paddingTop: 45,
    	paddingBottom: 65,
    	paddingHorizontal: 45,
	},
	title:{
		fontSize: 45,
		textAlign: 'center',
		fontFamily: 'PinyonScript',
		//textDecoration: 'underline'
	},
	alumno:{
		fontSize: 20,
		//textAlign: 'center',
		fontFamily: 'PinyonScript',
		textDecoration: 'underline'
	},
	subtitle:{
		marginTop: 10,
		fontSize: 18,
		textAlign: 'center',
		fontFamily: 'Roboto',
		textDecoration: 'underline'
	},
	profesor:{
		marginTop: 10,
		fontSize: 14,
		textAlign: 'left',
		fontFamily: 'Roboto',
		textDecoration: 'underline'
	},
	section:{
		margin: 10,
		padding: 10,
		flexGrow: 1,
		fontFamily: 'Roboto',
        backgroundColor: 'white',
        color: 'black'
	},
	image:{
		marginBottom: 10,
		marginHorizontal: 10,
		width: 200,
	},
	imageSello:{
		width: 160
	},
	header: {
		fontSize: 14,
		marginBottom: 10,
		textAlign: 'center',
		color: 'grey',
		fontFamily: 'PinyonScript',
	},
	table: {
		//display: 'table',
		width: 'auto',
		borderStyle: 'solid',
		borderWidth: 1,
		borderColor: '#bfbfbf',
		margin: '15px 0',
	},
	tableRow: {
		flexDirection: 'row',
	},
	tableColHeader: {
		width: '33.33%',
		borderStyle: 'solid',
		borderWidth: 1,
		borderColor: '#bfbfbf',
		backgroundColor: '#e0e0e0',
		padding: 5,
	},
	tableCol: {
		width: '33.33%',
		borderStyle: 'solid',
		borderWidth: 1,
		borderColor: '#bfbfbf',
		padding: 5,
	},
	tableCellHeader: {
		margin: 'auto',
		marginTop: 5,
		fontSize: 12,
		fontWeight: 'bold',
	},
	tableCell: {
		margin: 'auto',
		marginTop: 5,
		fontSize: 10,
	},
	firma:{
		position: 'absolute',
		width:'30%',
		borderTopWidth: 1,
		borderTopColor: 'grey',
		textAlign: 'center',
		fontSize: 12,
		bottom: 30,
		left:'38%',
		right:0,
		padding: 10,
		color: 'grey'
	},
})

type Props = {
    url: string,
    idioma: string,
    fecha_emision: string,
    fecha_conclusion: string,
    nivel: string,
    alumno: string,
    horas: number,
    numero_folio: string
    data: any[]
}

export default function FormatoCertificado({url, idioma, nivel, fecha_emision, fecha_conclusion, alumno, horas, data=[], numero_folio}:Props) 
{
    const QRCode = generateSessionPDFQrCode(url)
    return (
        <Document>
			<Page size="A4" style={styles.page}>
                
				<Text style={styles.header} fixed>El director del Centro de Idiomas</Text>
				<Text style={styles.title} fixed>Certifica</Text>
				<Text>
                    Que <Text style={styles.alumno}>{alumno}</Text> ha concluido satisfactoriamente el nivel {nivel} del idioma {idioma}, en nuestra casa
                    Superior de Estudios con un total de  {horas}.
                    Se le expide el presente, a solicitud de la parte interesada para los fines pertinentes.
                </Text>
				<View>
					<Image style={{ width: 120 }} src={QRCode} />
				</View>
                <View>
					<Text>
						Callao, {fecha_emision}
					</Text>
					<Image style={styles.image} src={selloDirector}/>
				</View>
                
                <Text>
                    N° de Registro: {numero_folio}
                </Text>
                
			</Page>
            <Page size="A4" style={styles.page}>
				<Text>NIVEL {nivel}</Text>
                <View style={styles.table}>
					<View style={styles.tableRow}>
						<View style={[styles.tableColHeader]}>
							<Text style={styles.tableCellHeader}>CURSO</Text>
						</View>
						<View style={[styles.tableColHeader]}>
							<Text style={styles.tableCellHeader}>CICLO</Text>
						</View>
						<View style={[styles.tableColHeader]}>
							<Text style={styles.tableCellHeader}>NOTAS</Text>
						</View>
					</View>
                </View>
				<View>
					{data.map((item, index)=>(
						<View style={styles.tableRow} key={index}>
							<View style={[styles.tableCol]}>
								<Text style={styles.tableCell}>{item.curso}</Text>
							</View>
							<View style={[styles.tableCol]}>
								<Text style={styles.tableCell}>{`${item.ciclo} (${item.modalidad})`}</Text>
							</View>
							<View style={[styles.tableCol]}>
								<Text style={styles.tableCell}>{item.nota}</Text>
							</View>
						</View>
					))}
				</View>
				<Text>Curso Concluido : {fecha_conclusion}</Text>
				<View style={styles.table}>
					<View style={styles.tableRow}>
						<View style={[styles.tableCol]}>
							<Image style={styles.imageSello} src={selloElaborador}/>
						</View>
						<View style={[styles.tableCol]}>
							<Image style={styles.imageSello} src={selloCoordinadora}/>
						</View>
						<View style={[styles.tableCol]}>
							<Image style={styles.imageSello} src={selloDirector}/>
						</View>
					</View>
				</View>
				<Text>Importante:</Text>
				<Text>La nota minimia aprobatoria es de 75 puntos</Text>
				<View>
					<Text>*EX.U. EXAMEN DE UBICACIÓN.</Text>
					<Text>*C.I. CICLO INTENSIVO.</Text>
					<Text>*C.I. CICLO REGULAR.</Text>
				</View>
				<View>
					<Text>Registrado en el libro de Certificados</Text>
					<Text>Nivel {nivel} basjo el N° {numero_folio}</Text>
					<Text>Callao, {fecha_emision}</Text>
				</View>
            </Page>
		</Document>
    )
}