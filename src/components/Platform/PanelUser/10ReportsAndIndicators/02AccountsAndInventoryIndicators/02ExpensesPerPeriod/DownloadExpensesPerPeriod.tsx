import { Document, Page, Text } from '@react-pdf/renderer';
import { IAccountsBook } from "../../../../../../types/User/accountsBook.types";
import { stylesPDF } from '../../../../../../helpers/StylesComponents/StylesPDF';

interface DownloadExpensesPerPeriodProps {
    data: IAccountsBook[];
}

function DownloadExpensesPerPeriod({ data }: DownloadExpensesPerPeriodProps) {
    return (
        <Document>
            <Page size="A4" style={stylesPDF.page}>
                <Text style={stylesPDF.title}>Gastos del Período</Text>
                {data.map((item, index) => (
                    <Text key={index} style={stylesPDF.text}>
                        Sede: {item.branchId}
                    </Text>
                ))}
            </Page>
        </Document>
    );
}

export default DownloadExpensesPerPeriod;