import React, { useState, useEffect, useContext } from 'react'
import { View, Text, ScrollView, TouchableOpacity, Dimensions, StyleSheet, TextInput } from 'react-native';
import axios from 'axios';
import { BASE_URL } from '../../../config';
import { AuthContext } from '../../context/AuthContext';
import Spinner from 'react-native-loading-spinner-overlay';
import { AntDesign } from '@expo/vector-icons';
import SelectDropdown from 'react-native-select-dropdown';

// components
import COLORS from '../../constants/colors';
import globalStyle from "../../constants/global"

const {height, width} = Dimensions.get('window');

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

export default function GroupStudentScreen({ navigation }) {
    // params
    const { userInfo } = useContext(AuthContext);

    // hooks
    const [ data, setData ] = useState([]);
    const [ isLoading, setLoading ] = useState(false);
    const [ isOpen, setOpen ] = useState(false);
    const [ isUpdateScreen, setUpdateScreen ] = useState(false);

    // collect data to create class
    const [ groupData, setDataGroup ] = useState(null);
    // collect data to send request
    const [ classNumber, setClassNumber ] = useState(null);
    function joinGroup() {
        console.log(classNumber);
        // setLoading(true);
        // send request
        // axios({
        //     method: "post",
        //     url: `${ BASE_URL }/teacher/publish-exam/${ examNumber }/${ classNumber }`,
        //     headers: {
        //         "x-auth-token": userInfo.token
        //     }
        // })
        // .then(
        //     (res) => {
        //         res = res.data;
        //         if (res.ok) {
        //             console.log(res)
        //             setLoading(false);
        //         } else {
        //             console.log(res)
        //             setLoading(false);
        //         }
        //     },
        //     (rej) => console.log(rej)
        // )
        // setTimeout(() => setDisplay(true));
        // // hide message after 1 second
        // setTimeout(() => setDisplay(false), 1000);
    }

    /* ============= methods =============== */

    // get Classes
    useEffect(() => {
        setLoading(true);

        // send request
        axios({
            method: "get",
            url: `${ BASE_URL }/student/get-group`,
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

        // get classes in phase
        axios({
            method: "get",
            url: `${ BASE_URL }/student/get-group-in-phase`,
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
                <Text style={ Styles.iconPlus}>join</Text>
            </TouchableOpacity>
            <SelectExamBox publishExam={ joinGroup } xyz={setClassNumber} selectData={ groupData } isOpen={ isOpen } closeBox={ () => setOpen(false) } />
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
