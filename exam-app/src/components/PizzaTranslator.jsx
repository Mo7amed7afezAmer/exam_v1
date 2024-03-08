import React, {useState} from 'react';
import {Text, TextInput, View, StyleSheet} from 'react-native';

const PizzaTranslator = () => {
  const [text, setText] = useState('');

  return (
    <View style={{padding: 10}}>
      <TextInput
        placeholder="Type here to translate!"
      />
      <Text style={{padding: 10, fontSize: 42}}>
        {text
          .split(' ')
          .map(word => word && '🍕')
          .join(' ')}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
    input: {
        backgroundColor: "#999"
    }
})

export default PizzaTranslator;