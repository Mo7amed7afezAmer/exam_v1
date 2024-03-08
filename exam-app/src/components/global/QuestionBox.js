import { View, Text, StyleSheet, Dimensions, TextInput } from "react-native";
import COLORS from "../../constants/colors";

const QuestionBox = (props) => {
    return (
        <View style={ Styles.question }>
            <View style={ Styles.numberBox}>
                <Text style={ Styles.text }> { props.nquestion } </Text>
            </View>
            <View style={{ flex: 1 }}>
                <TextInput
                    placeholder="enter question content .... "
                    placeholderTextColor={COLORS.black}
                    onChangeText={ props.inputValue }
                    keyboardType="default"
                    multiline
                    numberOfLines={3}
                    style={ Styles.input }
                />
            </View>
        </View>
    )
}

const Styles = StyleSheet.create({
    question: {
        width: Dimensions.get('window').width - 20 ,
        marginVertical: 8,
        marginHorizontal: 2,
        display: "flex",
        flexDirection: "row",
        flexWrap: "nowrap",
        justifyContent: "center",
        gap: 7,
    },
    numberBox: {
        backgroundColor: COLORS.secondary,
        padding: 5,
        width: 40,
        height: 40,
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
        height: 100,
        borderColor: COLORS.grey,
        borderWidth: 1,
        borderRadius: 5,
        // display: "flex",
        // alignItems: "flex-start",
        // justifyContent: "flex-start",
        padding: 10,
    }
})

export default QuestionBox;