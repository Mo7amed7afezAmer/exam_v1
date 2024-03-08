import { useState, useEffect, useContext } from 'react';
import { Text, View, SafeAreaView, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import axios from 'axios';
import { BASE_URL } from '../../../config';
import { AuthContext } from '../../context/AuthContext';

import COLORS from '../../constants/colors'; // for theme
import NotificationBox from '../../components/global/NotificationBox';


const LiveExamScreen = ({ navigation }) => {
    // hooks
    const [ data, setData ] = useState([]);
    const [ isLoading, setLoading ] = useState(false);
    const { userInfo } = useContext(AuthContext);

    // get Classes
    useEffect(() => {
        setLoading(true);

        // send request
        axios({
            method: "get",
            url: `${ BASE_URL }/student/get-live-exams`,
            headers: {
                "x-auth-token": userInfo.token
            }
        })
        .then(
            (res) => {
                res = res.data;
                if (res.ok) {
                    setLoading(false);
                    console.log(res);
                    setData(res);
                } else {
                    setLoading(false);
                    setData(res);
                }
            },
            (rej) => console.log(rej)
        ) 
    });

    return (
        <SafeAreaView style={{ marginVertical: 16, marginHorizontal: 16}}>
            <ScrollView>
                {data.ok ?
                    data.content.map((el) => (
                        <NotificationBox onPressAccept={ () => navigation.navigate("execution-exam", {examId: el.ex_id})} key={ el.id } name={ el.name } acceptTitle="start" cancelTitle="cancel" />
                    ))
                    :
                        <Text>Loading...</Text>
                }
            </ScrollView>
        </SafeAreaView>
    );
};

const Styles = StyleSheet.create({
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
    }
})

export default LiveExamScreen;
