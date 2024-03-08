import { Text, View, ImageBackground, StyleSheet, Pressable } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import ayz from "../../../assets/imgs/a1.jpg"

const HomeItems = () => {
  const navigation = useNavigation();

  return (
    <Pressable
      onPress={() => navigation.navigate('category')}
      style={styles.containers}
    >
        <View style={ styles.container }>
            <ImageBackground source={ayz} style={ styles.image }>
                <Text>one</Text>
            </ImageBackground>
        </View>
        
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    // backgroundColor: 'orange',
    color: "white",
    height: 100,
    margin: 15,
    borderWidth: 2,
    borderColor: "#999",
    borderStyle: "solid",
  },
  image: {
    // display: "flex",
    width: "100%",
    height: "100%",
    // borderRadius: 30,
    // marginRight: 10,
  },
  content: {
    flex: 1,

    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: 'lightgray',
  },
  row: {
    flexDirection: 'row',
    marginBottom: 5,
  },
  name: {
    flex: 1,
  },
  subTitle: {
    color: 'gray',
  },
});

export default HomeItems;
