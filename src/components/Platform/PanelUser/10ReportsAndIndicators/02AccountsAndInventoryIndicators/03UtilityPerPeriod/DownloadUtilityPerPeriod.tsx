import { Document, Page, Text } from '@react-pdf/renderer';
import { IAccountsBook } from "../../../../../../types/User/accountsBook.types";
import { stylesPDF } from '../../../../../../helpers/StylesComponents/StylesPDF';

interface DownloadUtilityPerPeriodProps {
    data: IAccountsBook[];
}

function DownloadUtilityPerPeriod({ data }: DownloadUtilityPerPeriodProps) {
    return (
        <Document>
            <Page size="A4" style={stylesPDF.page}>
                <Text style={stylesPDF.title}>Utilidad del Período</Text>
                {data.map((item, index) => (
                    <Text key={index} style={stylesPDF.text}>
                        Sede: {item.branchId}
                    </Text>
                ))}
            </Page>
        </Document>
    );
}

export default DownloadUtilityPerPeriod;