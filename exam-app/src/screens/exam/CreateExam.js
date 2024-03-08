import { View, TextInput, SafeAreaView } from 'react-native';
import { useState, useContext } from 'react';
import axios from 'axios';
import Spinner from 'react-native-loading-spinner-overlay';
import { AuthContext } from '../../context/AuthContext';
import { BASE_URL } from '../../../config';

// constants
import COLORS from '../../constants/colors'; // for theme
import globalStyles from "../../constants/global"; // for global styles
// import lang from '../../constants/english'; // for languages

// components
import Button from '../../components/Button';

const CreateExam = ({ navigation }) => {
    // collect data
    const [ examName, setExamName ] = useState(null);
    const [ phase, setPhase ] = useState(null);
    const [ duration, setDuration ] = useState(null);
    const [ numb, setNumb ] = useState(null);

    // status
    const [ loading, setLoading ] = useState(false);
    const { userInfo } = useContext(AuthContext);

    // methods
    //create exam
    const createExam = (name, ph, d, n) => {
        setLoading(true);

        // 1. Navigate to the add question route with params
        // navigation.navigate("add-question", {
        //     ename: name,
        //     ephase: ph,
        //     eduration: d,
        //     enumber: n,
        // });
        
        // send request
        axios({
            method: "post",
            url: `${ BASE_URL }/teacher/create-exam`,
            headers: {
                "x-auth-token": userInfo.token
            },
            data: {
                name: name,
                duration: d,
                number: n,
                phaseId: ph
            }
        })
        .then(
            (res) => {
                res = res.data;
                console.log(res)
                if (res.ok) {
                    // 1. Navigate to the add question route with params
                    navigation.navigate("add-question", {
                        ename: name,
                        ephase: ph,
                        eduration: d,
                        enumber: n,
                        examId: res.data
                    });
                    setLoading(false);
                } else {
                    setLoading(false);
                }
            },
            (rej) => console.log(rej)
        )
    }

  return (
    <SafeAreaView style={{ marginVertical: 24, marginHorizontal: 8}}>
        <Spinner visible={ loading } />
        <View style={ globalStyles.grid }>
            <View style={ globalStyles.col1 }>
                <TextInput
                    placeholder="Enter Exam Name"
                    placeholderTextColor={COLORS.black}
                    keyboardType="default"
                    onChangeText={(text) => setExamName(text)}
                    style={ globalStyles.inputBox }
                />
            </View>
            <View style={ globalStyles.col1 }>
                <TextInput
                    placeholder="Enter Phase"
                    placeholderTextColor={COLORS.black}
                    onChangeText={(text) => setPhase(text)}
                    style={ globalStyles.inputBox }
                />
            </View>
            <View style={ globalStyles.col2 }>
                <TextInput
                    placeholder="duration"
                    placeholderTextColor={COLORS.black}
                    onChangeText={(text) => setDuration(text)}
                    style={ globalStyles.inputBox }
                />
            </View>
            <View style={ globalStyles.col2 }>
                <TextInput
                    placeholder="number"
                    placeholderTextColor={COLORS.black}
                    keyboardType="numeric"
                    onChangeText={(text) => setNumb(text)}
                    style={ globalStyles.inputBox }
                />
            </View>
            <View style={ globalStyles.col1 }>
                <Button filled title="create exam" onPress={ () => createExam(examName, phase, duration, numb) } />
            </View>
        </View>
    </SafeAreaView>
  );
};

export default CreateExam;
