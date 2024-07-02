import { Document, Page, Text } from '@react-pdf/renderer';
import { IAccountsBook } from "../../../../../types/User/accountsBook.types";
import { stylesPDF } from '../../../../../helpers/StylesPDF/StylesPDF';

interface DownloadAccountsReceivableProps {
    data: IAccountsBook[];
}

function DownloadAccountsReceivable({ data }: DownloadAccountsReceivableProps) {
    return (
        <Document>
            <Page size="A4" style={stylesPDF.page}>
                <Text style={stylesPDF.title}>Cuentas por Cobrar</Text>
                {data.map((item, index) => (
                    <Text key={index} style={stylesPDF.text}>
                        Sede: {item.branchId}
                    </Text>
                ))}
            </Page>
        </Document>
    );
}

export default DownloadAccountsReceivable;