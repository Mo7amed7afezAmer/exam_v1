import { Text, View, TouchableOpacity, StyleSheet, Dimensions } from "react-native";
import { AntDesign } from '@expo/vector-icons';
import COLORS from "../../constants/colors";

const TabLinkBox = (props) => {
    const filledBgColor = props.color || COLORS.primary;
    const bgColor = props.filled ? filledBgColor : COLORS.white;
    const textColor = props.filled ? COLORS.white : COLORS.black;

    const d = props.col ? "column" : "row";

    return (
        <View>
            <TouchableOpacity
                style={{
                    ...styles.container,
                    ...{ backgroundColor: bgColor },
                    ...props.style
                }}
                onPress={props.onPress}
            >   
                <View style={{
                    ...styles.buttonBox,
                    ...{flexDirection: d}
                
                }}>
                    {props.icon ?
                        <AntDesign style={ styles.icon } name={ props.iconName } size={24} color="black" />
                    :
                        <></>
                    }
                    <Text 
                        style={{ 
                            fontSize: 18,
                            ...{ color: textColor },
                            ...styles.text 
                        }}
                    >
                        {props.title}
                    </Text>
                </View>
            </TouchableOpacity>
        </View>
    )
}

// style
const styles = StyleSheet.create({
    container: {
        minHeight: Dimensions.get('window').width / 4 ,
        padding: 20,
        borderRadius: 7,
        display: "flex",
        justifyContent: "center",
        // borderWidth: 1,
        // borderColor: COLORS.bgColor5    
    },
    buttonBox: {
        display: "flex",
        flexDirection: "row",
        gap: 7,
        alignItems: "flex-start"
    },
    icon: {
        fontSize: 20,
        color: "red"
    },
    text: {
        textTransform: "capitalize"
    }
})

export default TabLinkBox;