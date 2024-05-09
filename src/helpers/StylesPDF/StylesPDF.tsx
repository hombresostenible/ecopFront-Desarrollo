import { StyleSheet } from '@react-pdf/renderer';

export const stylesPDF = StyleSheet.create({
    page: {
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: 30,
    },
    title: {
        fontSize: 24,
        marginBottom: 20,
    },
    text: {
        fontSize: 12,
        marginBottom: 10,
    },
});