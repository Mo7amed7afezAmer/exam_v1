import { View, SafeAreaView } from 'react-native';

// constants
import COLORS from '../../constants/colors'; // for theme
import globalStyles from "../../constants/global"; // for global styles
// import lang from '../../constants/english'; // for languages

// components
import TabLinkBox from '../../components/global/TabLinkBox';


const ExamScreen = ({ navigation }) => {
  return (
    <SafeAreaView style={{ marginVertical: 8, marginHorizontal: 8}}>
      <View style={ globalStyles.col1 }>
        <TabLinkBox onPress = {() => navigation.navigate("create-exam")} icon style={{backgroundColor: COLORS.white }} title={ "create an exam" } iconName={ "leftcircleo" } />
      </View>
      <View style={ globalStyles.col1 }>
        <TabLinkBox onPress = {() => navigation.navigate("start-exam-screen")} icon style={{backgroundColor: COLORS.white }} title={ "start the exam" } iconName={ "leftcircleo" } />
      </View>
    </SafeAreaView>
  );
};

export default ExamScreen;
