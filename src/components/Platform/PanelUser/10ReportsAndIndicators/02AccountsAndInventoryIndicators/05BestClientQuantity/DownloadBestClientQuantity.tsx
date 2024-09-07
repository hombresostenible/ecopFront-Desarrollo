import { Document, Page, Text } from '@react-pdf/renderer';
import { IBestClientQuantity } from "../../../../../../types/User/financialIndicators.types";
import { stylesPDF } from '../../../../../../helpers/StylesComponents/StylesPDF';

interface DownloadBestClientQuantityProps {
    data: IBestClientQuantity[];
}

function DownloadBestClientQuantity({ data }: DownloadBestClientQuantityProps) {
    return (
        <Document>
            <Page size="A4" style={stylesPDF.page}>
                <Text style={stylesPDF.title}>Mejores clientes por cantidad</Text>
                {data.map((item, index) => (
                    <Text key={index} style={stylesPDF.text}>
                        Sede: {item.branchId}
                    </Text>
                ))}
            </Page>
        </Document>
    );
}

export default DownloadBestClientQuantity;