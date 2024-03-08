import { Text, View, TouchableOpacity, Dimensions, StyleSheet } from "react-native";
import { ProgressChart } from "react-native-chart-kit";
import { AntDesign } from '@expo/vector-icons';

import Button from "../../components/Button";
import COLORS from "../../constants/colors";
import i18n from "../../constants/languages/i182-config";

const ResultExamScreen = ({ route, navigation }) => {
    // 2. params
    const { answers } = route.params;
    let correctAnswer = 0,
        wrongAnswer = 0;

    for (let k in answers) {
        answers[k]["answer"] === true ? correctAnswer++ : wrongAnswer++;
    }

    // chart info
    const dataChart = {
        data: [ correctAnswer / (correctAnswer + wrongAnswer) ]
    };
    const chartConfig = {
        backgroundGradientFrom: "transparent",
        backgroundGradientFromOpacity: 0,
        backgroundGradientTo: "transparent",
        backgroundGradientToOpacity: 0,
        color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
        // strokeWidth: 2, // optional, default 3
        // barPercentage: 0.5,
        // useShadowColorFromDataset: false // optional
    };

    // ------------------ methods ----------
    // calculate answers
    function calculateAnswers() {
        
        for (let k in answers) {
            answers[k]["answer"] === true ? correctAnswer++ : wrongAnswer++;
        }
        
        console.log("correct: ", correctAnswer);
        console.log("wrong: ", wrongAnswer);
        // return correctAnswer / answers;
    }

    // calculateAnswers();

    return (
        <View>
            <View style={ Styles.parentBox }>
                <ProgressChart
                    data={dataChart}
                    width={Dimensions.get("window").width}
                    height={120}
                    strokeWidth={7}
                    radius={45}
                    chartConfig={chartConfig}
                    hideLegend={true}
                />
                <View style={ Styles.resultInfo }>
                    <Text style={{ textTransform: "capitalize", color: COLORS.black, fontWeight: 600 }}>awosme</Text>
                    <Text style={{ textTransform: "capitalize", color: COLORS.grey }}> { i18n.t("good") } very !</Text>
                </View>
                <View style={ Styles.correctWrong }>
                    <View style={{ ...Styles.resultInfo, ...{width: Dimensions.get("window").width / 3 }}}>
                        <Text style={{ textTransform: "capitalize", color: COLORS.black, fontWeight: 600 }}><AntDesign style={{ paddingHorizontal: 4 }} name="closecircleo" size={12} color="green" />{ correctAnswer }</Text>
                        <Text style={{ textTransform: "capitalize", color: COLORS.grey }}>correct answer</Text>
                    </View>
                    <View style={{ ...Styles.resultInfo, ...{width: Dimensions.get("window").width / 3 }}}>
                        <Text style={{ textTransform: "capitalize", color: COLORS.black, fontWeight: 600 }}><AntDesign style={{ paddingHorizontal: 4}} name="closecircleo" size={12} color="red" />{ wrongAnswer }</Text>
                        <Text style={{ textTransform: "capitalize", color: COLORS.grey }}>wrong answer</Text>
                    </View>
                </View>
            </View>
            <View style={{ marginHorizontal: 15, marginTop: 70}}>
                <Button filled title="see answer sheet" />
            </View>
            <TouchableOpacity style={ Styles.closeScreen } onPress={ () => navigation.navigate("Homes")}>
                <AntDesign name="close" size={34} color={ COLORS.grey } />
            </TouchableOpacity>
        </View>
    )
}

const Styles = StyleSheet.create({
    parentBox: {
        // backgroundColor: "red",
        // height: Dimensions.get("screen").height,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: 25,
        marginTop: Dimensions.get("window").height / 5
    },
    resultInfo: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
    },
    correctWrong: {
        display: "flex",
        // alignItems: "center",
        justifyContent: "space-between",
        flexDirection: "row"

    },
    closeScreen: {
        position: "absolute",
        top: 50,
        right: 25
    }
})

export default ResultExamScreen;