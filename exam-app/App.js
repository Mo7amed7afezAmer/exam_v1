import { StatusBar } from 'expo-status-bar';
import { View } from 'react-native';

// hook [useContext]
import { AuthProvider } from "./src/context/AuthContext";
import { ExamProvider } from './src/context/ExamContext';

// routes
import Navigator from "./src/navigation";

export default function App() {
  return (
    <AuthProvider>
      <ExamProvider>
        <View style={{ flex: 1 }}>
          <Navigator />
          <StatusBar style="auto" />
        </View>
      </ExamProvider>
    </AuthProvider>
  );
}
