import { Text, View, TouchableOpacity } from "react-native";
import globalStyle from "../../constants/global";
import COLORS from "../../constants/colors";


const NotificationBox = (props) => {
    return (
        <View style={ globalStyle.notificationParentBox }>
            <Text style={ globalStyle.notificationParentBox.notifiyName }>{ props.name }</Text>
            <View style={ globalStyle.notificationParentBox.notifiyButtons }>
                <TouchableOpacity style={ globalStyle.notificationParentBox.acceptButton } onPress={ props.onPressAccept }>
                    <Text style={{ color: COLORS.bgColor7, fontSize: 18 }}>{ props.acceptTitle }</Text>
                </TouchableOpacity>
                <TouchableOpacity style={ globalStyle.notificationParentBox.cancelButton }>
                    <Text style={{ color: COLORS.txtColor9, fontSize: 18 }}>{ props.cancelTitle }</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
};

export default NotificationBox;