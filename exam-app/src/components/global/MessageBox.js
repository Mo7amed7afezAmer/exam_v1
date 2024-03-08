import { View, Text, StyleSheet } from "react-native";
import COLORS from "../../constants/colors";
import { useState } from "react";

const MessageText = (props) => {
    const displayValue = props.showMessageBox ? "block" : "none"
    return (
        <View style={{
            ...Styles.messageBox,
            ...{ display: displayValue}
        }}>
            <Text style={ Styles.text }> { props.messageText } </Text>
        </View>
    )
}

const Styles = StyleSheet.create({
    messageBox: {
        backgroundColor: "#00f",
        padding: 15,
        textAlign: "center"
    },
    text: {
        color: COLORS.white,
        fontSize: 24
    }
})

export default MessageText;