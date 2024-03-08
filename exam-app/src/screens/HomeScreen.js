// src/screens/HomeScreen.js
import { useContext, useState, useEffect } from 'react';
import { View, Text, Pressable, StatusBar, SafeAreaView, FlatList, Dimensions, StyleSheet } from 'react-native';
import { AuthContext } from '../context/AuthContext';
import { ProgressChart } from 'react-native-chart-kit'; 

// constants
import globalStyles from "../constants/global";

// components
import TabLinkBox from "../components/global/TabLinkBox";

const teacherLink = [
  {
    id: 1,
    name: "create exam",
    bgColor: "#e67e22",
    iconName: "leftcircleo",
    linkName: "exam"
  },
  {
    id: 1,
    name: "class & group",
    bgColor: "#f39c12",
    iconName: "leftcircleo",
    linkName: "group-screen"
  },
  {
    id: 1,
    name: "students",
    bgColor: "#1abc9c",
    iconName: "leftcircleo",
    linkName: "student-screen"
  },
  {
    id: 1,
    name: "start exam",
    bgColor: "#3498db",
    iconName: "leftcircleo",
    linkName: "start-exam-screen"
  },
  {
    id: 1,
    name: "reports",
    bgColor: "#e74c3c",
    iconName: "leftcircleo",
    linkName: "exam"
  },
];
const studentLink = [
  {
    id: 1,
    name: "exams",
    bgColor: "#e67e22",
    iconName: "leftcircleo",
    linkName: "exam-tab-screen"
  },
  {
    id: 1,
    name: "class & group",
    bgColor: "#f39c12",
    iconName: "leftcircleo",
    linkName: "group-screen"
  },
  {
    id: 1,
    name: "teachers",
    bgColor: "#1abc9c",
    iconName: "leftcircleo",
    linkName: "student-screen"
  },
  {
    id: 1,
    name: "reports",
    bgColor: "#e74c3c",
    iconName: "leftcircleo",
    linkName: "exam"
  },
];

const HomeScreen = ({ navigation }) => {
  // hooks
  const [tabLinkInfo, setTabLinkInfo ] = useState(teacherLink);

  // context
  const { logout, roleType } = useContext(AuthContext);
  console.log(roleType)
  const data = {
    data: [ 0.75 ]
  };
  const chartConfig = {
      backgroundGradientFrom: "transparent",
      backgroundGradientFromOpacity: 0,
      backgroundGradientTo: "transparent",
      backgroundGradientToOpacity: 0,
      color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
      // strokeWidth: 2, // optional, default 3
      // barPercentage: 0.5,
      // useShadowColorFromDataset: false // optional
  };

  useEffect(() => {
    // switch links data depends on role
    if (roleType === "teacher") {
      setTabLinkInfo(teacherLink);
    } else {
      setTabLinkInfo(studentLink);
    }
  }, []);

  return (
    <SafeAreaView style={ styles.container }>
      <View>
        <View style={{ ...globalStyles.col1, ...{ marginHorizontal: 16, height: 120, backgroundColor: "lightgrey", borderRadius: 7} }}>
          <Text>carousal images</Text>
        </View>
        <View style={{ marginHorizontal: 8}}>
          <FlatList
            data={tabLinkInfo}
            numColumns={ 2 }
            keyExtractor={(item, index) => String(index)}
            renderItem={({item}) => (
              <View style= { globalStyles.col2 }>
                <TabLinkBox onPress={ () => navigation.navigate(item.linkName) } filled icon col style={{backgroundColor: item.bgColor }} title={ item.name } iconName={ item.iconName } />
              </View>
            )}
            
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1, 
    // marginTop: StatusBar.currentHeight || 0,
  }
});

export default HomeScreen;
