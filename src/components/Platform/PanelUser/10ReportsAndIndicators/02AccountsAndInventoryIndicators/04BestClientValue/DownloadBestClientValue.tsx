import { Document, Page, Text } from '@react-pdf/renderer';
import { IBestClientValue } from "../../../../../../types/User/financialIndicators.types";
import { stylesPDF } from '../../../../../../helpers/StylesComponents/StylesPDF';

interface DownloadBestClientValueProps {
    data: IBestClientValue[];
}

function DownloadBestClientValue({ data }: DownloadBestClientValueProps) {
    return (
        <Document>
            <Page size="A4" style={stylesPDF.page}>
                <Text style={stylesPDF.title}>Mejores clientes por valor</Text>
                {data.map((item, index) => (
                    <Text key={index} style={stylesPDF.text}>
                        Sede: {item.branchId}
                    </Text>
                ))}
            </Page>
        </Document>
    );
}

export default DownloadBestClientValue;