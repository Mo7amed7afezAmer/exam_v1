import React, {useContext} from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// import context
import { AuthContext } from '../context/AuthContext';
import COLORS from '../constants/colors';

// screens
import MainTabNavigator from './MainTabNavigator';
import Welcome from "../screens/WelcomeScreen";
import LoginScreen from "../screens/LoginScreen";
import Signup from '../screens/SignupScreen';
import SplashScreen from "../screens/SplashScreen";
import { ExamScreen, CreateExam, AddQuestionScreen, StartExamScreen, ExamListScreen, ExecutionExamScreen, ResultExamScreen } from "../screens/exam/index";
import { GroupScreen } from "../screens/group/index";
import { StudentScreen } from '../screens/students';

// ------------------ role student screen ----
import { GroupStudentScreen, ExamTabScreen, LiveExamScreen } from '../screens/student-role';

const Stack = createNativeStackNavigator();

const Navigator = () => {
  // use context hook
  const {userInfo, splashLoading, roleType} = useContext(AuthContext);

  return (
    <NavigationContainer>
      <Stack.Navigator 
        // initialRouteName='result-exam'
        initialRouteName='login'
        screenOptions={{
          headerStyle: {
            backgroundColor: COLORS.secondary,
          },
          headerTitleAlign: "center",
          headerTintColor: COLORS.white,
          headerTitleStyle: {
            fontWeight: 'bold',
          }
        }}
        
      >
        {splashLoading ? (
          <Stack.Screen name="Splash Screen" component={SplashScreen} options={{headerShown: false}} />
        ) : userInfo.ok && roleType === "teacher" ? (
            <>
              <Stack.Screen name="Homes" component={ MainTabNavigator } options={{ headerShown: false }} />
              <Stack.Screen name="exam" component={ ExamScreen } />
              <Stack.Screen name="create-exam" component={ CreateExam } />
              <Stack.Screen name="add-question" component={ AddQuestionScreen } />
              <Stack.Screen name="start-exam-screen" component={ StartExamScreen } />
              <Stack.Screen name="execution-exam" component={ ExecutionExamScreen } />
              <Stack.Screen name="result-exam" component={ ResultExamScreen } options={{headerShown: false}} />
              <Stack.Screen name="exam-list-screen" component={ ExamListScreen } />
              <Stack.Screen name="group-screen" component={ GroupScreen } />
              <Stack.Screen name="student-screen" component={ StudentScreen } />
            </>
        ) : userInfo.ok && roleType === "student" ? (
            <>
              <Stack.Screen name="Homes" component={ MainTabNavigator } options={{ headerShown: false }} />
              <Stack.Screen name="group-screen" component={ GroupStudentScreen } />
              <Stack.Screen name="exam-tab-screen" component={ ExamTabScreen } />
              <Stack.Screen name="live-exam-screen" component={ LiveExamScreen } />
              <Stack.Screen name="execution-exam" component={ ExecutionExamScreen } />
              <Stack.Screen name="result-exam" component={ ResultExamScreen } options={{headerShown: false}} />
            </>
        ) : (
          <>
            <Stack.Screen name="welcome" component={ Welcome } options={{ headerShown: false }} />
            <Stack.Screen name="login" component={ LoginScreen } options={{ headerShown: false }} />
            <Stack.Screen name="signup" component={ Signup } options={{ headerShown: false }} />
            <Stack.Screen name="result-exam" component={ ResultExamScreen } options={{headerShown: false}} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );

  
};

export default Navigator;
