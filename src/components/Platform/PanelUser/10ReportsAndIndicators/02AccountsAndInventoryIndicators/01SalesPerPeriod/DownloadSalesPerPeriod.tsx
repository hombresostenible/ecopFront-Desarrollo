import React from 'react';
import { Document, Image, View, Page, Text, StyleSheet } from '@react-pdf/renderer';
// ELEMENTOS DEL COMPONENTE
import { IUser } from '../../../../../../types/User/user.types';
import { IAccountsBook } from "../../../../../../types/User/accountsBook.types";
import LogoEcopcion from '../../../../../../assets/Logo.png';

const stylesPDF = StyleSheet.create({
    container: {
        height: '1000px',
        width: '100%',
        margin: 'auto',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    container__Component: {
        width: '100%',
    },
    top: {
        width: '100%',
        display: 'flex',
        alignItems: 'flex-start',
        justifyContent: 'space-between',
        background: '#212529',
        padding: '10px',
    },
    title: {
        fontweight: '600',
        color: '#f8f9fa',
        letterspacing: '1px',
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
    container__Body: {
        padding: '20px',
    },
    container__Head: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        margin: '0 0 20px 0',
    },







    logo_Top_Drive: {
        border: '1px solid red',
        width: 200,
        height: 52,
    },
    container__Characteristics: {
        width: 450,
        margin: '10px auto 0 auto',
    },
    title__Characteristics: {
        fontSize: 16,
        marginBottom: 10,
        color: '#212322',
    },
    container__Propertie: {
        borderBottom: '1px solid #ced4da',
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 5,
    },
    title__Propertie: {
        width: 170,
        fontSize: 12,
        backgroundColor: '#f0f0f0',
        padding: '5px 10px',
    },
    value__Characteristics: {
        fontSize: 12,
        flex: 1,
        padding: '5px 10px',
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
});

// Definir la interfaz para las secciones
interface CharacteristicsSection {
    title: string;
    properties: {
        name: string;
        value: string | number | undefined;
    }[];
}

interface DownloadSalesPerPeriodProps {
    user: IUser | null,
    date: Date;
    data: IAccountsBook[];
    selectedBranch?: string;
}

function DownloadSalesPerPeriod({ user, date, data, selectedBranch }: DownloadSalesPerPeriodProps) {
    const renderCharacteristicsSections = () => {
        const characteristics: CharacteristicsSection[] = data.map((sale) => ({
            title: `Fecha: ${sale.transactionDate}`,
            properties: [
                { name: 'Tipo de Transacción', value: sale.transactionType },
                { name: 'Medio de Pago', value: sale.meanPayment || 'N/A' },
                { name: 'Valor Total', value: sale.totalValue },
                { name: 'Vendedor', value: sale.seller || 'N/A' },
            ],
        }));

        const pages = [
            {
                title: selectedBranch ? `Ventas en la Sede: ${selectedBranch}` : 'Ventas en todas las sedes',
                characteristicsSections: characteristics,
            }
        ];

        return pages;
    };

    const renderCharacteristicsSection = (section: CharacteristicsSection) => {
        return (
            <View style={stylesPDF.container__Characteristics} key={section.title}>
                <Text style={stylesPDF.title__Characteristics}>{section.title}</Text>
                {section.properties.map((property, propIndex) => (
                    <View key={`property-${propIndex}`} style={stylesPDF.container__Propertie}>
                        <Text style={stylesPDF.title__Propertie}>{property.name}</Text>
                        <Text style={stylesPDF.value__Characteristics}>
                            {property.value !== undefined ? property.value : 'N/A'}
                        </Text>
                    </View>
                ))}
            </View>
        );
    };

    return (
        <Document style={stylesPDF.container}>
            <Page size="A4" style={stylesPDF.container__Component} >
            {/* <Page size="A4" style={stylesPDF.container} wrap> */}
                <View style={stylesPDF.top}>
                    <Text style={stylesPDF.title}>VENTAS DEL PERIODO</Text>
                    <View style={stylesPDF.container__Generate__By}>
                        <Text style={stylesPDF.generate__By}>Generado por Ecopcion</Text>
                    </View>
                </View>

                <View style={stylesPDF.container__Body}>
                    <View style={stylesPDF.container__Head}>

                    </View>
                </View>

                <Image src={LogoEcopcion} style={stylesPDF.logo_Top_Drive} />
                <View style={stylesPDF.container__Head}>
                    <Text style={stylesPDF.title}>Reporte de Ventas</Text>
                    <Text style={stylesPDF.title}>Fecha de generación: {date.toDateString()}</Text>
                    <Text style={stylesPDF.title}>{user?.name ? `${user?.name} ${user?.lastName}` : user?.corporateName}</Text>
                    <Image src={user?.logo} style={stylesPDF.logo_Top_Drive} />
                </View>
                {renderCharacteristicsSections().map((page, index) => (
                    <React.Fragment key={`page-${index}`}>
                        <Text style={stylesPDF.title}>{page.title}</Text>
                        {page.characteristicsSections.map((section, index) => (
                            <div key={index}>
                               {renderCharacteristicsSection(section)}
                            </div>
                        ))}
                    </React.Fragment>
                ))}
                <Text style={stylesPDF.pageNumber} render={({ pageNumber, totalPages }) => (
                    `${pageNumber} / ${totalPages}`
                )} fixed />
            </Page>
        </Document>
    );
}

export default DownloadSalesPerPeriod;