import { View, Text, StyleSheet } from "react-native";
import COLORS from "../../constants/colors";

const NumberBox = (props) => {
    return (
        <View style={{
            ...Styles.numberBox,
            ...{ backgroundColor: props.skinColor },
            ...props.style
        }}>
            
            <Text style={ Styles.text }> { props.numberValue } </Text>
        </View>
    )
}

const Styles = StyleSheet.create({
    numberBox: {
        backgroundColor: COLORS.white,
        borderWidth: 1,
        borderColor: COLORS.grey,
        padding: 5,
        width: 40,
        height: 40,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 7
    },
    text: {
        color: COLORS.black,
        fontSize: 20
    }
})

export default NumberBox;