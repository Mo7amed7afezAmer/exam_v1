import React, { useState } from 'react'
import {View, Text, StyleSheet } from "react-native";
import COLORS from '../../constants/colors';
import NumberBox from './NumberBox';

function ExamInfoBox(props) {
    let [ arrs, setArr ] = useState([]);
    let numbers = props.questionNumbers || 5;
    let arr = [];
    for (let i = 1; i <= numbers; i++) {
        // setArr([
        //     ...arrs,
        //     i
        // ]);
        arr.push(i)
    }
    // setArr(arr);
    

    // let x = Array.apply(null, Array(numbers));

    return (
        <View style={ Styles.parentBox }>
            <Text style={ Styles.examName }> { props.examName } </Text>
            <Text style={ Styles.examDuration }> { props.examDuration } </Text>
            <View style={ Styles.numberBox }>
                { arr.map((el) => <NumberBox key={ el } numberValue={el} skinColor={ props.skinColorValue === el ? COLORS.secondary : COLORS.white } />) }
            </View>
        </View>
    )
}

const Styles = StyleSheet.create({
    parentBox: {
        backgroundColor: COLORS.white,
        padding: 15
    },
    examName: {
        paddingBottom: 7
    },
    examDuration: {
        paddingBottom: 12
    },
    numberBox: {
        display: "flex",
        flexDirection: "row",
        gap: 15,
        overflow: "auto",
        // overflowX: "auto",
        // overflowY: "hidden",
    },
})

export default ExamInfoBox
