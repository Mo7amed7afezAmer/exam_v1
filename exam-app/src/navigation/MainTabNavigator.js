import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

// icons
import { Ionicons, AntDesign , MaterialIcons } from '@expo/vector-icons';
import COLORS from '../constants/colors';

// screens
import HomeScreen from '../screens/HomeScreen';
import NotificationScreen from '../screens/NotificationScreen';
import MoreScreen from '../screens/MoreScreen';
import NotImplementedScreen from '../screens/NotImplementedScreen';

// create tab navigator object
const Tab = createBottomTabNavigator();

const MainTabNavigator = () => {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={{
        tabBarActiveTintColor: "orange",
        tabBarInactiveTintColor: COLORS.white,
        tabBarStyle: {
          backgroundColor: COLORS.secondary,
        },
        headerStyle: {
          backgroundColor: COLORS.secondary,
        },
        headerTintColor: COLORS.white,
        headerTitleAlign: 'center',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      }}  
      
    >
      <Tab.Screen
        name="Home"
        component={ HomeScreen }
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="home" size={size} color={ color } />
          ),
        }}
      />
      <Tab.Screen
        name="account"
        component={ NotImplementedScreen }
        options={{
          tabBarIcon: ({ color, size }) => (
            <AntDesign  name="user" size={size} color={color} />
          ),
          // headerShown: false
        }}
      />
      <Tab.Screen
        name="notification"
        component={ NotificationScreen }
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="notifications" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="more"
        component={MoreScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="more-horiz" size={size} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default MainTabNavigator;
