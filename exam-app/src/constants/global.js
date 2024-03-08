import { StyleSheet, Dimensions } from "react-native";

import COLORS from "./colors";

const globalStyles = StyleSheet.create({
    container: {
        backgroundColor: "red"
    },
    notificationParentBox: {
        backgroundColor: COLORS.bgColor7,
        borderWidth: 1,
        borderColor: COLORS.bgColor5,
        borderRadius: 5,
        paddingVertical: 8,
        paddingHorizontal: 8,
        minHeight: 100,
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        marginBottom: 8,
        notifiyName: {
            color: COLORS.txtColor9,
            fontSize: 22,
            fontWeight: 600,
            textTransform: "capitalize",
        },
        notifiyButtons: {
            display: "flex",
            flexDirection: "row",
            gap: 5
        },
        acceptButton: {
            backgroundColor: COLORS.secondary,
            borderColor: COLORS.secondary,
            borderWidth: 1,
            paddingVertical: 5,
            paddingHorizontal: 12,
            borderRadius: 5,
        },
        cancelButton: {
            backgroundColor: COLORS.bgColor7,
            borderColor: COLORS.bgColor5,
            borderWidth: 1,
            paddingVertical: 5,
            paddingHorizontal: 9,
            borderRadius: 5,
        }
    },
    messageInfo: {
        backgroundColor: COLORS.black,
        color: COLORS.white,
        paddingVertical: 5,
        paddingHorizontal: 15,
        borderRadius: 5,
        position: "fixed",
        top: 100
    },
    parentBox: {
        backgroundColor: COLORS.white,
        minHeight: 100,
        // padding: 20,
        marginHorizontal: 16,
        marginVertical: 8,
        // borderRadius: 10,
        display: "flex",
        flexDirection: "row"
    },
    childBox: {
        width: 12
    },
    labelTitle: {
        fontSize: 16,
        fontWeight: 400,
        marginVertical: 8
    },
    inputBox: {
        backgroundColor: COLORS.white,
        width: "100%",
        height: 48,
        borderColor: COLORS.black,
        borderWidth: 1,
        borderRadius: 8,
        alignItems: "center",
        justifyContent: "center",
        padding: 10,
        
    },
    // grid system
    grid: {
        display: "flex",
        flexDirection: "row",
        flexWrap: "wrap"
    },
    col1: {
        width: Dimensions.get('window').width / 1 - 32 ,
        marginVertical: 8,
        marginHorizontal: 8,
    },
    col2: {
        width: Dimensions.get('window').width / 2 - 24 ,
        marginVertical: 8,
        marginHorizontal: 8,
    },
    col3: {
        width: Dimensions.get('window').width / 3 - 24 ,
        marginVertical: 8,
        marginHorizontal: 8,
    },
    selectBox: {
        borderColor: COLORS.secondary,
        borderWidth: 2
    }
    
});

export default globalStyles;

