import React, { useState, useEffect, useContext } from 'react'
import { View, Text, ScrollView, TouchableOpacity, Dimensions, StyleSheet, TextInput } from 'react-native';
import axios from 'axios';
import { BASE_URL } from '../../../config';
import { AuthContext } from '../../context/AuthContext';
import Spinner from 'react-native-loading-spinner-overlay';
import { AntDesign } from '@expo/vector-icons';

// components
import COLORS from '../../constants/colors';
import globalStyle from "../../constants/global"

const {height, width} = Dimensions.get('window');

export default function GroupScreen({ navigation }) {
    // params
    const { userInfo } = useContext(AuthContext);

    // hooks
    const [ data, setData ] = useState([]);
    const [ isLoading, setLoading ] = useState(false);
    const [ isOpen, setOpen ] = useState(false);
    const [ isUpdateScreen, setUpdateScreen ] = useState(false);

    // collect data to create class
    const [ groupName, setGroupName ] = useState(null);
    const [ groupPhase, setGroupPhase ] = useState(null);

    /* ============= methods =============== */
    // add class
    function createClass() {
        setLoading(true);
        axios({
            method: "post",
            url: `${ BASE_URL }/teacher/create-group`,
            headers: {
                "x-auth-token": userInfo.token
            },
            data: {
                name: groupName,
                phaseId: groupPhase
            }
        })
        .then(
            (res) => {
                res = res.data;
                console.log(res);
                if (res.ok) {
                    setLoading(false);
                    setUpdateScreen(!isUpdateScreen);
                    // close 
                    setOpen(false);
                    setGroupName("");
                    setGroupPhase(null);
                } else {
                    setLoading(false);
                }
            },
            (rej) => console.log(rej)
        ) 
    }

    // get Classes
    useEffect(() => {
        setLoading(true);

        // send request
        axios({
            method: "get",
            url: `${ BASE_URL }/teacher/get-teacher-class`,
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
        ) 
    }, [ isUpdateScreen ]);

    return (
        <View style={{marginHorizontal: 8, marginVertical: 8}}>
            <Spinner visible={ isLoading } />
            <ScrollView>
                { data.ok ?
                        data.content.map((el) => (
                            <View style={ Styles.listItemsBox }  key={ el.id }>
                                <View style={ Styles.nameButton }>
                                    <View style={ Styles.imageName }>
                                        <View style={ Styles.imageGroup } ></View>
                                        <Text style={ Styles.name }> { el.name } </Text>
                                    </View>
                                    <View style={ Styles.buttonPart }>
                                        <TouchableOpacity style={ Styles.button }>
                                            <Text>view</Text>
                                        </TouchableOpacity>
                                        <TouchableOpacity style={ Styles.button }>
                                            <Text>start</Text>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            </View>
                        ))
                    :
                        <Text style={{ flex: 1 }}> { data.error } </Text>
                }
            </ScrollView>
            <TouchableOpacity style={ Styles.buttonPlus} onPress={ () => setOpen(!isOpen)}>
                <Text style={ Styles.iconPlus}>plus</Text>
            </TouchableOpacity>
            <View style={{ ...Styles.addGroupBox, ...isOpen ? { display: "block"} : {display: "none"} }}>
                <View style={ Styles.titleBox }>
                    <Text>addGroupBox</Text>
                    <AntDesign onPress={ () => setOpen(!isOpen)} name="close" size={20} color={ COLORS.grey } />
                </View>
                <View style={{ ...Styles.innerBox }}>
                    <Text style={{ color: COLORS.bgColor9, display: "none" }}>group name: </Text>
                    <View style={{ width: "100%"}}>
                        <TextInput
                            placeholder="group name"
                            onChangeText={(text) => setGroupName(text)}
                            style={{ ...globalStyle.TextInput, ...{paddingVertical: 8, paddingHorizontal: 4, borderWidth: 1, borderColor: COLORS.bgColor7, color: COLORS.bgColor9, borderRadius: 7 } }} />
                    </View>
                </View>
                <View style={{ ...Styles.innerBox }}>
                    <Text style={{ color: COLORS.bgColor9, display: "none" }}>group name: </Text>
                    <View style={{ width: "100%"}}>
                        <TextInput 
                            placeholder="enter phase"
                            onChangeText={(text) => setGroupPhase(text)}
                            style={{ ...globalStyle.TextInput, ...{paddingVertical: 8, paddingHorizontal: 4, borderWidth: 1, borderColor: COLORS.bgColor7, color: COLORS.bgColor9, borderRadius: 7 } }} />
                    </View>
                </View>
                <View style={ Styles.footerPanel }>
                    <TouchableOpacity onPress={ createClass } style={ Styles.footerButton }>
                        <Text>add</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    )
}

const Styles = StyleSheet.create({
    listItemsBox: {
        paddingVertical: 15,
        borderBottomWidth: 1,
        borderBottomColor: "#fff"
    },
    nameButton: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "flex-start"
    },
    imageName: {
        display: "flex",
        flexDirection: "row",
        gap: 5
    },
    imageGroup: {
        backgroundColor: "#999",
        width: 40,
        height: 40,

    },
    name: {
        display: "flex",
        color: COLORS.black,
        fontSize: 17,
        fontWeight: 600,
        textTransform: "capitalize"
    },
    buttonPart: {
        display: "none",
        // display: "flex",
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
    buttonPlus: {
        backgroundColor: COLORS.secondary,
        position: "fixed",
        right: 30,
        bottom: 50,
        paddingHorizontal: 15,
        paddingVertical: 15,
        borderRadius: "50%"
    },
    iconPlus: {
        color: COLORS.white,
        fontWeight: 600
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
