import { Document, Page, Text, View } from '@react-pdf/renderer';
import { IAccountsBook } from "../../../../../types/User/accountsBook.types";
import { stylesPDF } from '../../../../../helpers/StylesComponents/StylesPDF';

interface DownloadSalesPerPeriodProps {
    data: IAccountsBook[];
}

function DownloadSalesPerPeriod({ data }: DownloadSalesPerPeriodProps) {
    
    return (
        <Document>
            <Page size="A4" style={stylesPDF.page}>
                <Text style={stylesPDF.title}>Ventas del Período</Text>
                {data.map((item, index) => (
                    <View key={index}>
                        <Text style={stylesPDF.text}>
                            Sede: {item.branchId}
                        </Text>
                        <Text style={stylesPDF.text}>
                            Fecha de registro: {item.transactionDate}
                        </Text>
                        {item.itemsSold && item.itemsSold.length > 0 && (
                            <View>
                                <Text>Items Vendidos:</Text>
                                {item.itemsSold.map((soldItem, soldIndex) => (
                                    <View key={soldIndex}>
                                        <Text style={stylesPDF.text}>Nombre: {soldItem.nameItem}</Text>
                                        <Text style={stylesPDF.text}>Tipo: {soldItem.type}</Text>
                                        <Text style={stylesPDF.text}>IVA: {soldItem.IVA}</Text>
                                        <Text style={stylesPDF.text}>Precio de Venta: $ {soldItem.sellingPrice}</Text>
                                        <Text style={stylesPDF.text}>Cantidad: {soldItem.quantity}</Text>
                                        <Text style={stylesPDF.text}>Valor Subtotal: $ {soldItem.subTotalValue}</Text>
                                    </View>
                                ))}
                            </View>
                        )}
                    </View>
                ))}
            </Page>
        </Document>
    );
}

export default DownloadSalesPerPeriod;
