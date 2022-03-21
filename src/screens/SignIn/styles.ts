import { StyleSheet } from "react-native";
import { theme } from "../../global/styles/theme";


// expo splash screen -> pesquisar para fazer as próprias splashs

export const styles = StyleSheet.create({

    container: {
        flex: 1, // para ocupar toda a tela
        justifyContent: "center",
        alignItems: "center"
    },

    image: {
        width: "100%",
        height: 360   
        // resizeMode = "stretch" para garantir que vai ficar ajustada ao tamanho que foi definido
    },

    content:{
        marginTop: -40,
        paddingHorizontal: 50
    },

    title: {
        color: theme.colors.heading,
        textAlign: "center",
        fontSize: 40,
        marginBottom: 6,
        fontFamily: theme.fonts.title700,
        lineHeight: 40
    },

    subtitle: {
        color: theme.colors.heading,
        fontSize: 15,
        textAlign: "center",
        marginBottom: 64,
        fontFamily: theme.fonts.title500,
        lineHeight: 25
    }
})