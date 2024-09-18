import { Document, Page, Text } from '@react-pdf/renderer';
import { IProduct } from '../../../../../../types/User/products.types';
import { stylesPDF } from '../../../../../../helpers/StylesComponents/StylesPDF';

interface DownloadInventoryProductProps {
    data: IProduct[];
}

function DownloadInventoryProduct({ data }: DownloadInventoryProductProps) {
    return (
        <Document>
            <Page size="A4" style={stylesPDF.page}>
                <Text style={stylesPDF.title}>Inventario de productos</Text>
                {data.map((item, index) => (
                    <Text key={index} style={stylesPDF.text}>
                        Sede: {item.branchId}
                    </Text>
                ))}
            </Page>
        </Document>
    );
}

export default DownloadInventoryProduct;