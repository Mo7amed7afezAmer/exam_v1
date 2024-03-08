import { View, SafeAreaView } from 'react-native';

// constants
import COLORS from '../../constants/colors'; // for theme
import globalStyles from "../../constants/global"; // for global styles
// import lang from '../../constants/english'; // for languages

// components
import TabLinkBox from '../../components/global/TabLinkBox';

const StartExamScreen = ({ navigation }) => {

    // methods
    const getExamList = (ph) => {
        // 1. Navigate to the exam list screen
        navigation.navigate("exam-list-screen", {
            phId: ph
        });
    }

    return (
        <SafeAreaView style={{ marginVertical: 8, marginHorizontal: 8}}>
        <View style={{ ...globalStyles.col1, ...{ borderWidth: 2, borderColor: COLORS.bgColor5 }}}>
            <TabLinkBox onPress={ () => getExamList(1) } icon style={{backgroundColor: COLORS.white }} title={ "the fristly phase" } iconName={ "leftcircleo" } />
        </View>
        <View style={{ ...globalStyles.col1, ...{ borderWidth: 2, borderColor: COLORS.bgColor5 }}}>
            <TabLinkBox onPress={ () => getExamList(2) } icon style={{backgroundColor: COLORS.white }} title={ "the second phase" } iconName={ "leftcircleo" } />
        </View>
        <View style={{ ...globalStyles.col1, ...{ borderWidth: 2, borderColor: COLORS.bgColor5 }}}>
            <TabLinkBox onPress={ () => getExamList(3) } icon style={{backgroundColor: COLORS.white }} title={ "the third phase" } iconName={ "leftcircleo" } />
        </View>
        </SafeAreaView>
    );
};

export default StartExamScreen;
