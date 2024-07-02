import { Document, Page, Text } from '@react-pdf/renderer';
import { IRawMaterial } from '../../../../../types/User/rawMaterial.types';
import { stylesPDF } from '../../../../../helpers/StylesPDF/StylesPDF';

interface DownloadInventoryAssetsProps {
    data: IRawMaterial[];
}

function DownloadInventoryRawMaterials({ data }: DownloadInventoryAssetsProps) {
    return (
        <Document>
            <Page size="A4" style={stylesPDF.page}>
                <Text style={stylesPDF.title}>Inventario de Materias Primas</Text>
                {data.map((item, index) => (
                    <Text key={index} style={stylesPDF.text}>
                        Sede: {item.branchId}
                    </Text>
                ))}
            </Page>
        </Document>
    );
}

export default DownloadInventoryRawMaterials;