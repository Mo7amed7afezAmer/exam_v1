import { View, Text, StyleSheet } from "react-native-web"

const DisPlayItemBox = (props) => {
  return (
    <View style={styles.container}>
      <Text>
        item { props.itemNumber }
      </Text>
    </View>
  )
}

// style
const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
  //   alignItems: 'center',
  //   justifyContent: 'center',
    padding: 15,
    width: "100%",
    marginBottom: 15
  }
  });

export default DisPlayItemBox;
