import { View, Text, ScrollView, SafeAreaView, TouchableOpacity, StyleSheet, Dimensions } from "react-native";
import { useState, useEffect, useContext, useReducer } from "react";
import axios from 'axios';
import { BASE_URL } from '../../../config';
import { AuthContext } from '../../context/AuthContext';
import Spinner from 'react-native-loading-spinner-overlay';
import { ProgressChart } from "react-native-chart-kit";

// components exam info
import ExamInfoBox from "../../components/global/ExamInfoBox";
import NumberBox from "../../components/global/NumberBox";
import Button from "../../components/Button";
import COLORS from "../../constants/colors";

// reducer hooks config
const initialState = {};

const changeAction = (state, action) => {

    let grad = action.content === action.answer ? true : false;

    state[`question${ action.id }`] = { id: action.id, content: action.content, answer: grad };
    
    return state;
}

// const changeAction = (state, action) => {
//     switch (action.id) {
//         case action.id:
//             return state.map((el) => {
//                 if (el.id === action.id) {
//                     console.log(el);
//                     return { ...el, complete: "mohamed hafez" };
//                 } else {
//                     console.log(el);
//                     return { ...el, complete: false };
//                 }
//             });
//         default:
//             return state;
//     }
// };

const ExecutionExamScreen = ({ route, navigation }) => {
    const { examId } = route.params;
    const { userInfo } = useContext(AuthContext);

    // hooks
    const [ answerSheet, setAnswerSheet ] = useReducer(changeAction, initialState);
    const [ data, setData ] = useState([]);
    const [ isLoading, setLoading ] = useState(false);
    const [ selectData, setSelectData ] = useState("");

     // chart info
     const dataChart = {
        data: [ 0.78 ]
    };
    const chartConfig = {
        backgroundGradientFrom: "transparent",
        backgroundGradientFromOpacity: 0,
        backgroundGradientTo: "transparent",
        backgroundGradientToOpacity: 0,
        color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
    };

    // methods
    useEffect(() => {
        setLoading(true);

        // send request
        axios({
            method: "get",
            url: `${ BASE_URL }/teacher/get-exam-questions/${ examId }`,
            headers: {
                "x-auth-token": userInfo.token
            }
        })
        .then(
            (res) => {
                res = res.data;
                if (res.ok) {
                    setLoading(false);
                    setData(res);
                    console.log(res);
                } else {
                    setLoading(false);
                    setData(res);
                }
            },
            (rej) => console.log(rej)
        ) 
    }, []);

    // select answer
    function SelectAnswer(x) {
        let q = `question${ x }`;
        if ( typeof selectData[`question${ x }`] !== "undefined") {
            // console.log(answerSheet[q]["content"]);
            return selectData[q]["content"];
        } else {
            return ""
        }
    }

    // setAnswer
    function changeAnswer(id, option, answer) {
        setSelectData(answerSheet);
        setAnswerSheet({id: id, content: option, answer: answer})
    }

    console.log(data);

    // console.log(SelectAnswer(12));

    return (
        <SafeAreaView style={{ backgroundColor: COLORS.bgColor9 }}>
            <View style={ Styles.examInfoBox }>
                <View style={ Styles.examInfoBox.questionNumbers }>
                    {data.ok ?
                        data.questions.map((el) => (
                                <View key={ el.question_name } style={ Styles.examInfoBox.circuleShap }>{ el.question_number }</View>
                            
                            )):
                            [1, 2, 3, 4, 5, 6, 7, 8, 9].map((el) => <View key={ el } style={ Styles.examInfoBox.circuleShap }></View>)
                    }
                </View>
                <View style={ Styles.examInfoBox.questionDuration }>
                    <ProgressChart
                        style={{ backgroundColor: "#00f", display: "none"}}
                        data={dataChart}
                        width={"100%"}
                        height={100}
                        strokeWidth={7}
                        radius={30}
                        chartConfig={chartConfig}
                        hideLegend={true}
                    />
                </View>
            </View>
            <ScrollView>
                <Spinner visible={ isLoading } />
            {data.ok ?
                data.questions.map((el) => 
                (
                    <View style={ Styles.questionAnswerParent } key={ el.id }>
                        <View style={ Styles.questionBox }>
                            <NumberBox numberValue={ el.question_number } skinColor={ COLORS.secondary } />
                            <View style={ Styles.questionText }>
                                <Text> { el.question_name } </Text>
                            </View>
                        </View>
                        <View style={{ ...Styles.answerBox, ... SelectAnswer(el.id) === el.option1 ? Styles.chooseAnswer : "" }}>
                            <NumberBox style={{ width: 30, height: 30 }} numberValue="a" />
                            <TouchableOpacity onPress={ () => setAnswerSheet({id: el.id, content: el.option1, answer: el.answer}) }>
                                <Text> { el.option1 }</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={{ ...Styles.answerBox, ... SelectAnswer(el.id) === el.option2 ? Styles.chooseAnswer : "" }}>
                            <NumberBox style={{ width: 30, height: 30 }} numberValue="b" />
                            <TouchableOpacity onPress={ () => changeAnswer(el.id, el.option2, el.answer) }>
                                <Text> { el.option2 } </Text>
                            </TouchableOpacity>
                        </View>
                        <View style={{ ...Styles.answerBox, ... SelectAnswer(el.id) === el.option3 ? Styles.chooseAnswer : "" }}>
                            <NumberBox style={{ width: 30, height: 30 }} numberValue="d" />
                            <TouchableOpacity onPress={ () => setAnswerSheet({id: el.id, content: el.option3, answer: el.answer}) }>
                                <Text> { el.option3 } </Text>
                            </TouchableOpacity>
                        </View>
                        <View style={{ ...Styles.answerBox, ... SelectAnswer(el.id) === el.option4 ? Styles.chooseAnswer : "" }}>
                            <NumberBox style={{ width: 30, height: 30 }} numberValue="e" />
                            <TouchableOpacity onPress={ () => setAnswerSheet({id: el.id, content: el.option4, answer: el.answer}) }>
                                <Text> { el.option4 } </Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                )) :
                [1, 2, 3].map((el) => 
                (
                    <View style={ Styles.questionAnswerParent } key={ el }>
                        <View style={{ ...Styles.questionBox, ...Styles.questionBox.downloadBox }}></View>
                        <View style={{ ...Styles.answerBox, ...Styles.answerBox.downloadBox }}></View>
                        <View style={{ ...Styles.answerBox, ...Styles.answerBox.downloadBox }}></View>
                        <View style={{ ...Styles.answerBox, ...Styles.answerBox.downloadBox }}></View>
                        <View style={{ ...Styles.answerBox, ...Styles.answerBox.downloadBox }}></View>
                    </View>
                ))
            }
            <View style={{ ...{ marginVertical: 16, marginHorizontal: 8 }, ...isLoading ? { display: "none"} : { display: "block" }}}>
                <Button title="finish exam" filled onPress={ () => navigation.navigate("result-exam", {answers: answerSheet }) } />
            </View>
            </ScrollView>
        </SafeAreaView>
    )
}


const Styles = StyleSheet.create({
    examInfoBox: {
        width: "100%",
        minHeight: 100,
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        questionNumbers: {
            width: "75%",
            paddingHorizontal: 10,
            paddingVertical: 16,
            display: "flex",
            flexDirection: "row",
            flexWrap: "wrap",
            gap: 10
        },
        questionDuration: {
            // backgroundColor: "green",
            width: "25%",
        },
        circuleShap: {
            backgroundColor: COLORS.bgColor7,
            color: COLORS.txtColor9,
            width: 20,
            height: 20,
            padding: 20,
            borderWidth: 1,
            borderColor: COLORS.bgColor5,
            borderRadius: "50%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center"
        }
    },
    questionAnswerParent: {
        backgroundColor: COLORS.bgColor7,
        borderWidth: 1,
        borderColor: COLORS.bgColor5,
        borderRadius: 5,
        paddingVertical: 7,
        paddingHorizontal: 5,
        marginHorizontal: 10,
        marginBottom: 7
    },
    questionBox: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        gap: 10,
        marginHorizontal: 8,
        marginVertical: 8,
        downloadBox: {
            backgroundColor: COLORS.bgColor9,
            height: 60
        }
    },
    answerBox: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        gap: 10,
        marginHorizontal: 16,
        paddingVertical: 5,
        downloadBox: {
            backgroundColor: COLORS.bgColor9,
            height: 40,
            marginBottom: 5
        }
    },
    questionText: {

    },
    chooseAnswer: {
        backgroundColor: "#0525f5"
    }
})

export default ExecutionExamScreen;

