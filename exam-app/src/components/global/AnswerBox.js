import { View, Text, StyleSheet, Dimensions, TextInput } from "react-native";
import COLORS from "../../constants/colors";

const AnswerBox = (props) => {
    return (
        <View style={ Styles.answer }>
            <View style={ Styles.numberBox}>
                <Text style={ Styles.text }> { "a" } </Text>
            </View>
            <View style={{ flex: 1 }}>
                <TextInput
                    placeholder="enter chooces"
                    placeholderTextColor={COLORS.black}
                    onChangeText={ props.inputValue }
                    keyboardType="default"
                    style={{
                        ...Styles.input,
                        ...props.style
                    }}
                    readOnly
                />
            </View>
        </View>
    )
}

const Styles = StyleSheet.create({
    answer: {
        maxWidth: Dimensions.get('window').width - 100 ,
        marginVertical: 4,
        marginHorizontal: 20,
        display: "flex",
        flexDirection: "row",
        flexWrap: "nowrap",
        justifyContent: "center",
        // alignItems: "center",
        gap: 5,
    },
    numberBox: {
        backgroundColor: COLORS.black,
        padding: 5,
        width: 30,
        height: 30,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 5
    },
    text: {
        color: COLORS.white,
        // fontSize: 24,
        // fontWeight: "blod"
    },
    input: {
        backgroundColor: COLORS.white,
        width: "100%",
        height: 48,
        borderColor: COLORS.grey,
        borderWidth: 1,
        borderRadius: 5,
        alignItems: "center",
        justifyContent: "center",
        padding: 10,
    },
    otherInput: {
        backgroundColor: COLORS.secondary,
        width: "100%",
        height: 48,
        borderColor: COLORS.grey,
        borderWidth: 1,
        borderRadius: 5,
        alignItems: "center",
        justifyContent: "center",
        padding: 10,
    }
})

export default AnswerBox;