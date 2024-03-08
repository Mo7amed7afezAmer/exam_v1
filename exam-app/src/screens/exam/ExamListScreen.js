import React, { useState, useEffect, useContext } from 'react'
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, Dimensions, TextInput } from 'react-native';
import axios from 'axios';
import { BASE_URL, data } from '../../../config';
import { AuthContext } from '../../context/AuthContext';
import Spinner from 'react-native-loading-spinner-overlay';
import SelectDropdown from "react-native-select-dropdown";
import { AntDesign } from '@expo/vector-icons';

// components
import COLORS from '../../constants/colors';
import globalStyles from '../../constants/global';
const { height, width } = Dimensions.get('window');


const countries = ["Egypt", "Canada", "Australia", "Ireland"]

const SelectExamBox = (props) => {
    return (
        <View style={{ ...Styles.addGroupBox, ...props.isOpen ? { display: "block"} : {display: "none"} }}>
            <View style={ Styles.titleBox }>
                <Text>addGroupBox</Text>
                <AntDesign onPress={ props.closeBox } name="close" size={20} color={ COLORS.grey } />
            </View>
            <View style={ Styles.innerBox }>
            <SelectDropdown
                data={ props.selectData }
                onSelect={(selectedItem, index) => {
                    props.xyz(selectedItem.id);
                }}
                buttonTextAfterSelection={(selectedItem, index) => {
                    // text represented after item is selected
                    // if data array is an array of objects then return selectedItem.property to render after item is selected
                    // console.log(selectedItem, index)
                    return selectedItem.name
                }}
                rowTextForSelection={(item, index) => {
                    // text represented for each item in dropdown
                    // if data array is an array of objects then return item.property to represent item in dropdown
                    // console.log(item, index)
                    return item.name
                }}
            />
            </View>
            <View style={ Styles.footerPanel }>
                <TouchableOpacity onPress={ props.publishExam } style={ Styles.footerButton }>
                    <Text>add</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

// message info
const MessageInfo = (props) => {
    return (
        <View style={{ ...globalStyles.messageInfo, ...props.isDisplay ? { display: "block"} : {display: "none"} }}>
            <Text style={{ color: "#fff" }}>{ props.messageContent }</Text>
        </View>
    )
}

export default function ExamListScreen({ route, navigation }) {
    // params
    const { phId } = route.params;
    const { userInfo } = useContext(AuthContext);

    // hooks
    const [ data, setData ] = useState([]);
    const [ dataGroup, setDataGroup ] = useState([]);
    const [ isLoading, setLoading ] = useState(false);
    const [ isOpen, setOpen ] = useState(false);
    // message hooks
    const [ isDisplay, setDisplay ] = useState(false);
    const [ messageContent, setMessageContent ] = useState("The Name Of Allah");

    // collect data to send request
    const [ classNumber, setClassNumber ] = useState(null);
    const [ examNumber, setExamNumber ] = useState(null);

    function showBox(n) {
        setExamNumber(n);
        setOpen(true);
    }
    function publishExam() {
        console.log(examNumber, classNumber);
        setLoading(true);
        // send request
        axios({
            method: "post",
            url: `${ BASE_URL }/teacher/publish-exam/${ examNumber }/${ classNumber }`,
            headers: {
                "x-auth-token": userInfo.token
            }
        })
        .then(
            (res) => {
                res = res.data;
                if (res.ok) {
                    console.log(res)
                    setLoading(false);
                } else {
                    console.log(res)
                    setLoading(false);
                }
            },
            (rej) => console.log(rej)
        )
        setTimeout(() => setDisplay(true));
        // hide message after 1 second
        setTimeout(() => setDisplay(false), 1000);
    }

    // methods
    useEffect(() => {
        setLoading(true);

        // send request
        axios({
            method: "get",
            url: `${ BASE_URL }/teacher/get-teacher-classs-in-phase/${ phId }`,
            headers: {
                "x-auth-token": userInfo.token
            }
        })
        .then(
            (res) => {
                res = res.data;
                if (res.ok) {
                    setDataGroup(res.content);
                } else {
                    setDataGroup([{id: 0, name: "not found class", ph_id: 0}]);
                }
            },
            (rej) => console.log(rej)
        );

        axios({
            method: "get",
            url: `${ BASE_URL }/teacher/get-exam-phase/${ phId }`,
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
                } else {
                    setLoading(false);
                    setData(res);
                }
            },
            (rej) => console.log(rej)
        );

        // select group get-teacher-classs-in-phase
        // const fetchGroupInPhase = async (e) => {
        //     const result = await axios({
        //         method: `get`,
        //         url: `${ BASE_URL }/teacher/get-teacher-classs-in-phase/${ phId }`,
        //         headers: {
        //             "x-auth-token": userInfo.token
        //         }
        //     });
        //     // setData(result.data);
        //     console.log(result.data);
        // }
          
        // fetchGroupInPhase();
    }, []);

    return (
        <View style={{marginHorizontal: 8, marginVertical: 8}}>
            <Spinner visible={ isLoading } />
            <ScrollView>
                { data.ok ?
                        data.content.map((el) => (
                            <View style={ Styles.listItemsBox }  key={ el.id }>
                                <View style={ Styles.nameButton }>
                                    <Text style={ Styles.name }> { el.name } </Text>
                                    <View style={ Styles.buttonPart }>
                                        <TouchableOpacity onPress={ () => navigation.navigate("execution-exam", { examId: el.id })} style={ Styles.button }>
                                            <Text>view</Text>
                                        </TouchableOpacity>
                                        <TouchableOpacity onPress={ () => showBox(el.id) } style={ Styles.button }>
                                            <Text>start</Text>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                                <View style={ Styles.infoPart }>
                                    <Text>duration:</Text>
                                    <Text> { el.duration } </Text>
                                    <Text>numbers:</Text>
                                    <Text> { el.duration } </Text>
                                </View>
                            </View>
                        ))
                    :
                        <Text style={{ flex: 1 }}> { data.error } </Text>
                }
            </ScrollView>
            <SelectExamBox publishExam={ publishExam } xyz={setClassNumber} selectData={ dataGroup } isOpen={ isOpen } closeBox={ () => setOpen(false) } />
            <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
                <MessageInfo isDisplay={ isDisplay } messageContent={ messageContent } />
            </View>
        </View>
    )
}

const Styles = StyleSheet.create({
    listItemsBox: {
        display: "flex",
        justifyContent: "space-between",
        paddingVertical: 5,
        // borderWidth: 1,
        borderBottomWidth: 1,
        borderBottomColor: "#fff"
    },
    nameButton: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between"
    },
    name: {
        display: "flex",
        color: COLORS.black,
        fontSize: 17,
        fontWeight: 600,
        textTransform: "capitalize"
    },
    buttonPart: {
        display: "flex",
        flexDirection: "row",
        alignContent: "space-between",
        gap: 3
    },
    button: {
        paddingBottom: 3,
        paddingHorizontal: 3,
        borderColor: COLORS.primary,
        borderWidth: .5,
        borderRadius: 2,
        alignItems: 'center',
        justifyContent: 'center'
    },
    infoPart: {
        display: "flex",
        flexDirection: "row",
    },
    addGroupBox: {
        // display: "none",
        backgroundColor: COLORS.secondary,
        width: width * 2 / 3,
        minHeight: 150,
        maxHeight: 250,
        // transform: translate(calc("50vw" - "50%"), calc("50vh "- "100%")), width / 2 - (width * 2 / 3) / 2
        position: "absolute",
        transform: [
            { translateX: width / 6 },
            { translateY: height / 2 - 200 },
            // { scaleX: 1.25 }
        ]
    },
    titleBox: {
        backgroundColor: COLORS.white,
        width: "98%",
        paddingVertical: 8,
        paddingHorizontal: 8,
        marginBottom: 16,
        marginTop: 3,
        marginHorizontal: "1%",
        display: "flex",
        justifyContent: "space-between",
        flexDirection: "row"
    },
    innerBox: {
        width: "100%",
        marginVertical: 12,
        paddingHorizontal: 16,
        display: "flex",
        gap: 7
    },
    footerPanel: {
        borderTopColor: COLORS.bgColor5,
        borderTopWidth: 1,
        paddingVertical: 8,
        display: "flex",
        flexDirection: "row-reverse"
    },
    footerButton: {
        backgroundColor: COLORS.bgColor9,
        color: COLORS.skinColor,
        borderColor: COLORS.bgColor5,
        borderWidth: 1,
        borderRadius: 7,
        width: "fit-content",
        paddingVertical: 7,
        paddingHorizontal: 15,
        marginHorizontal: 3,
        textTransform: "capitalize"
    }
})
