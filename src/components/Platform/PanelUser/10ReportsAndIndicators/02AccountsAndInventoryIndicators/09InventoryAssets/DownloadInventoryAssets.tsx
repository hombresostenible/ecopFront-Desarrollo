import { Document, Page, Text } from '@react-pdf/renderer';
import { IAssets } from '../../../../../../types/User/assets.types';
import { stylesPDF } from '../../../../../../helpers/StylesComponents/StylesPDF';

interface DownloadInventoryAssetsProps {
    data: IAssets[];
}

function DownloadInventoryAssets({ data }: DownloadInventoryAssetsProps) {
    return (
        <Document>
            <Page size="A4" style={stylesPDF.page}>
                <Text style={stylesPDF.title}>Inventario de activos</Text>
                {data.map((item, index) => (
                    <Text key={index} style={stylesPDF.text}>
                        Sede: {item.branchId}, Nombre: {item.nameItem}, Marca: {item.brandItem}, Condición: {item.conditionAssets}, Estado: {item.stateAssets}
                    </Text>
                ))}
            </Page>
        </Document>
    );
}

export default DownloadInventoryAssets;