import { Document, Page, Text } from '@react-pdf/renderer';
import { IMerchandise } from '../../../../../types/User/merchandise.types';
import { stylesPDF } from '../../../../../helpers/StylesPDF/StylesPDF';

interface DownloadInventoryMerchandisesProps {
    data: IMerchandise[];
}

function DownloadInventoryMerchandises({ data }: DownloadInventoryMerchandisesProps) {
    return (
        <Document>
            <Page size="A4" style={stylesPDF.page}>
                <Text style={stylesPDF.title}>Inventario de Mercancías</Text>
                {data.map((item, index) => (
                    <Text key={index} style={stylesPDF.text}>
                        Sede: {item.branchId}
                    </Text>
                ))}
            </Page>
        </Document>
    );
}

export default DownloadInventoryMerchandises;