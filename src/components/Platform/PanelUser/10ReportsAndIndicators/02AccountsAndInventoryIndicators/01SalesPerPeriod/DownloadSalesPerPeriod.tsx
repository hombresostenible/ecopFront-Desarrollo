/* eslint-disable @typescript-eslint/no-explicit-any */
import { Document, Image, View, Page, Text, StyleSheet } from '@react-pdf/renderer';
// ELEMENTOS DEL COMPONENTE
import { IUser } from '../../../../../../types/User/user.types';
import { formatNumber } from '../../../../../../helpers/FormatNumber/FormatNumber';
import { formatDate } from '../../../../../../helpers/FormatDate/FormatDate';

const stylesPDF = StyleSheet.create({
    container__Component: {
        width: '100%',
    },
    top: {
        width: '100%',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'flex-start',
        justifyContent: 'space-between',
        backgroundColor: '#212529',
        padding: '10px',
    },
    title: {
        fontWeight: 'bold',
        color: '#f8f9fa',
        letterSpacing: '1px',
    },
    container__Generate__By: {
        padding: '0',
        display: 'flex',
        alignItems: 'flex-start',
        gap: '3px',
    },
    generate__By: {
        color: '#f8f9fa',
        fontSize: '10px',
    },
    generate__Date: {
        color: '#f8f9fa',
        fontSize: '10px',
    },
    container__Body: {
        padding: '20px',
    },
    container__Head: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        margin: '0 0 20px 0',
        padding: '0 0 5px 0',
    },
    container__Data_User: {
        height: '97px',
        width: '50%',
    },
    container__User_Logo: {
        height: '80px',
        width: '250px',
    },
    logo: {
        maxHeight: '75px',
        maxWidth: '230px',
    },
    container__User_Name: {
        fontWeight: 'bold',
        opacity: 0.75,
        fontSize: '16px',
        letterSpacing: '1px',
    },
    name: {
        fontSize: '14px',
        margin: '0',
    },
    container__User_Info: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        height: '97px',
        width: '50%',
        justifyContent: 'space-between',
    },
    container__User_Contact: {
        fontSize: '14px',
        opacity: 0.75,
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-end',
        justifyContent: 'flex-start',
    },
    user__Report: {
        width: '100%',
        fontSize: '12px',
        opacity: 0.75,
        display: 'flex',
        alignItems: 'flex-end',
        justifyContent: 'flex-end',
    },

    // TABLA
    branch: {
        fontSize: '14px',
        opacity: 0.75,
        padding: '0 0 10px 0',
    },
    table: {
        border: '1px solid #ced4da',
        opacity: 0.75,
        width: '100%',
    },
    tableHeader: {
        border: '1px solid #ced4da',
        display: 'flex',
        flexDirection: 'row',
    },
    tableRow: {
        borderBottom: '1px solid #ced4da',
        display: 'flex',
        flexDirection: 'row',
    },
    tableTitleCell: {
        border: '1px solid #ced4da',
        height: '40px',
        flex: 1,
        fontSize: 12,
        padding: '10px 5px 10px 5px',
        textAlign: 'center',
        fontWeight: 'bold',
    },
    tableCell: {
        border: '1px solid #ced4da',
        fontSize: 12,
        flex: 1,
        padding: 5,
        textAlign: 'center',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    tableCellTotal: {
        border: '1px solid #ced4da',
        fontSize: 12,
        flex: 1,
        padding: 5,
        textAlign: 'right',
    },
    pageNumber: {
        position: 'absolute',
        fontSize: 10,
        bottom: 10,
        left: 0,
        right: 0,
        textAlign: 'center',
        color: 'grey',
    },
    back: {
        background: '#212529',
        height: '10px',
        width: '100%',
    },
});

interface DownloadSalesPerPeriodProps {
    user: IUser | null,
    date: Date;
    data: any[];
    nameBranch: string;
}

function DownloadSalesPerPeriod({ user, date, data, nameBranch }: DownloadSalesPerPeriodProps) {
    const renderItemsSold = () => {

        return (
            <View>
                <Text style={stylesPDF.branch}>Sede: {nameBranch === 'Sede no encontrada' ? 'Todas' : nameBranch}</Text>
                <View style={stylesPDF.table}>
                    <View style={stylesPDF.tableHeader}>
                        <Text style={stylesPDF.tableTitleCell}>Fecha</Text>
                        <Text style={stylesPDF.tableTitleCell}>Sede</Text>
                        <Text style={stylesPDF.tableTitleCell}>Cliente</Text>
                        {/* <Text style={stylesPDF.tableTitleCell}>Vendedor</Text>
                        <Text style={stylesPDF.tableTitleCell}>Registrador</Text> */}
                        <Text style={stylesPDF.tableTitleCell}>Contado/crédito</Text>
                        <Text style={stylesPDF.tableTitleCell}>Medio de Pago</Text>
                        <Text style={stylesPDF.tableTitleCell}>Valor Total</Text>
                    </View>
                    {data.map((sale, index) => (
                        <View key={index} style={stylesPDF.tableRow}>
                            <Text style={stylesPDF.tableCell}>{formatDate(sale.transactionDate)}</Text>
                            <Text style={stylesPDF.tableCell}>{sale.nameBranch}</Text>
                            <Text style={stylesPDF.tableCell}>{sale.transactionCounterpartId || 'N/A'}</Text>
                            {/* <Text style={stylesPDF.tableCell}>{sale.seller || 'N/A'}</Text>
                            <Text style={stylesPDF.tableCell}>{sale.userRegister || 'N/A'}</Text> */}
                            <Text style={stylesPDF.tableCell}>{sale.creditCash || 'N/A'}</Text>
                            <Text style={stylesPDF.tableCell}>{sale.meanPayment || 'N/A'}</Text>
                            <Text style={stylesPDF.tableCellTotal}>$ {formatNumber(sale.totalValue)}</Text>
                        </View>
                    ))}
                </View>
            </View>
        );
    };

    return (
        <Document>
            {/* <Page size="A4" style={stylesPDF.container__Component}> */}
            <Page size="A4" orientation="landscape" style={stylesPDF.container__Component}> {/* orientation="landscape" es para generar el PDF en horizontal*/}
                <View style={stylesPDF.top}>
                    <View>
                        <Text style={stylesPDF.title}>VENTAS DEL PERIODO</Text>
                        <Text style={stylesPDF.generate__Date}>Reporte al día: {date.toDateString()}</Text>
                    </View>
                    <View style={stylesPDF.container__Generate__By}>
                        <Text style={stylesPDF.generate__By}>Generado por Ecopcion</Text>
                    </View>
                </View>

                <View style={stylesPDF.container__Body}>
                    <View style={stylesPDF.container__Head}>
                        <View style={stylesPDF.container__Data_User}>
                            <View style={stylesPDF.container__User_Logo}>
                                <Image src={user?.logo} style={stylesPDF.logo} />
                            </View>
                            <View style={stylesPDF.container__User_Name}>
                                <Text style={stylesPDF.name}>
                                    Empresario: {user?.name && user?.lastName ? `${user.name} ${user.lastName}` : user?.corporateName || 'Nombre no disponible'}
                                </Text>
                            </View>
                        </View>
                        <View style={stylesPDF.container__User_Info}>
                            <View style={stylesPDF.container__User_Contact}>
                                <Text>Correo: <Text>{user?.email}</Text></Text>
                                <Text>Teléfono: <Text>{user?.phone}</Text></Text>
                                <Text>Dirección: <Text>{user?.address}</Text></Text>
                            </View>
                            <View style={stylesPDF.user__Report}>
                                <Text>Reporte generado por: {user?.name && user?.lastName ? `${user.name} ${user.lastName}` : user?.corporateName || 'Nombre no disponible'}</Text>
                            </View>
                        </View>
                    </View>

                    {renderItemsSold()}
                </View>
                <View style={stylesPDF.back}></View>
            </Page>
        </Document>
    );
}

export default DownloadSalesPerPeriod;