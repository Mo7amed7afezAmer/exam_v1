import { View, SafeAreaView } from 'react-native';

// constants
import COLORS from '../../constants/colors'; // for theme
import globalStyles from "../../constants/global"; // for global styles
// import lang from '../../constants/english'; // for languages

// components
import TabLinkBox from '../../components/global/TabLinkBox';


const ExamTabScreen = ({ navigation }) => {
  return (
    <SafeAreaView style={{ marginVertical: 8, marginHorizontal: 8}}>
      <View style={ globalStyles.col1 }>
        <TabLinkBox onPress = {() => navigation.navigate("live-exam-screen")} icon style={{backgroundColor: COLORS.white }} title={ "live exams" } iconName={ "leftcircleo" } />
      </View>
    </SafeAreaView>
  );
};

export default ExamTabScreen;
