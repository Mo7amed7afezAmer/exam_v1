import { TextInput, SafeAreaView, View, TouchableOpacity} from "react-native";
import { useState, useContext } from "react";
import axios from "axios";
import Spinner from 'react-native-loading-spinner-overlay';
import { AuthContext } from '../../context/AuthContext';
import { BASE_URL } from '../../../config';


// constants
import COLORS from '../../constants/colors'; // for theme
import globalStyles from "../../constants/global"; // for global styles
// import lang from '../../constants/english'; // for languages

// components
import Button from "../../components/Button";
import QuestionBox from "../../components/global/QuestionBox";
import AnswerBox from "../../components/global/AnswerBox";
import MessageText from "../../components/global/MessageBox";
import ExamInfoBox from "../../components/global/ExamInfoBox";

const AddQuestionScreen = ({ route, navigation }) => {
    // 2. get the params
    const { ename, ephase, eduration, enumber, examId, startQuestion } = route.params;

    // hooks
    const [ isDisplay, setDisplay ] = useState(false);
    const [ messageText, setMessageText ] = useState("The Name Of Allah");
    const [ isLoading, setLoading ] = useState(false);
    const { userInfo } = useContext(AuthContext);

    // hooks [router params]
    const [ examName, setExamName ] = useState(ename);
    const [ examTime, setExamTime ] = useState(eduration);
    const [ numQuestion, setNumber ] = useState(enumber);

    // collect data
    const [ questionName, setQuestionName ] = useState(null);
    const [ questionAnswer, setQuestionAnswer ] = useState(null);
    const [ option1, setOption1 ] = useState(null);
    const [ option2, setOption2 ] = useState(null);
    const [ option3, setOption3 ] = useState(null);
    const [ option4, setOption4 ] = useState(null);
    const [ eid, setExamId ] = useState(examId); // from router params
    const [ stQuestion, setStartQuestion ] = useState(1);

    // methods
    const selectAnswer = (answerValue) => {
        setQuestionAnswer(answerValue);
    }

    // let arr = [];
    // for (let i = 1; i <= enumber; i++) {
    //     arr.push(i)
    // }

    const addQuestion = (name, answer, op1, op2, op3, op4) => {

        // start loading
        setLoading(true);

        console.log(name);
        console.log(answer);
        console.log(op1);
        console.log(op2);
        console.log(op3);
        console.log(op4);
        console.log(stQuestion);
        console.log("answer =====", answer);

        // send request
        axios({
            method: "post",
            url: `${ BASE_URL }/teacher/add-question`,
            headers: {
                "x-auth-token": userInfo.token
            },
            data: {
                questionName: name,
                answer: answer,
                option1: op1,
                option2: op2,
                option3: op3,
                option4: op4,
                questionNumber: stQuestion,
                examId: eid
            }
        })
        .then(
            (res) => {
                res = res.data;
                console.log(res)
                if (res.ok) {
                    // 1. Navigate to the next question
                    navigation.navigate("add-question", {
                        startQuestion: stQuestion
                    });
                    // next question
                    if (numQuestion > stQuestion) {
                        setStartQuestion((el) => el += 1 );
                    }
                    setLoading(false);
                    // display and update message
                    setMessageText((el) => el = res.message);
                    setTimeout(() => setDisplay(true));
                } else {
                    setLoading(false);
                    // display and update message
                    setMessageText((el) => el = res.error);
                    setTimeout(() => setDisplay(true));
                }
                // hide message after 1 second
                setTimeout(() => setDisplay(false), 1000);
            },
            (rej) => console.log(rej)
        )
    }

    return (
        <SafeAreaView>
            <Spinner visible={ isLoading } />
            <MessageText showMessageBox={ isDisplay } messageText={ messageText } />
            <ExamInfoBox examName={ examName } examDuration={ examTime } questionNumbers={ numQuestion } skinColorValue={ stQuestion } />
            <View style={{ marginVertical: 16, marginHorizontal: 8}}>
                <QuestionBox nquestion={ stQuestion } inputValue={(text) => setQuestionName(text)} />
                <TouchableOpacity onPress={ () => selectAnswer(option1)}>
                    <AnswerBox inputValue={(text) => setOption1(text)} style={option1 === questionAnswer ? globalStyles.selectBox: ""} />
                </TouchableOpacity>
                <TouchableOpacity onPress={ () => selectAnswer(option2)}>
                    <AnswerBox inputValue={(text) => setOption2(text)} />
                </TouchableOpacity>
                <TouchableOpacity onPress={ () => selectAnswer(option3)}>
                    <AnswerBox inputValue={(text) => setOption3(text)} />
                </TouchableOpacity>
                <TouchableOpacity onPress={ () => selectAnswer(option4)}>
                    <AnswerBox inputValue={(text) => setOption4(text)} />
                </TouchableOpacity>
                
                <View style={ globalStyles.col1 }>
                    <Button filled title={ numQuestion > stQuestion ? "next" : "finish"} onPress={ () => addQuestion(questionName, questionAnswer, option1, option2, option3, option4) } />
                </View>
            </View>
        </SafeAreaView>
    )
}

export default AddQuestionScreen;