import { useContext } from "react";
import Button from "../components/Button";
import { AuthContext } from "../context/AuthContext";
import { View } from "react-native";

const MoreScreen = () => {
  // context
  const { logout } = useContext(AuthContext);

  return (
    <View>
      <Button
        onPress={ () => logout() }
        > 
        logout
      </Button>
    </View>
  );
};

export default MoreScreen;
