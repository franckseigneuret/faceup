import React, { useState, useEffect } from 'react';
import { StyleSheet, ImageBackground } from 'react-native';
import { Button, Input, Text } from 'react-native-elements'
import Icon from 'react-native-vector-icons/FontAwesome';

function HomeScreen(props) {
  const [pseudo, setPseudo] = useState('');
  const [pseudoIsSubmited, setPseudoIsSubmited] = useState(false);

  useEffect(() => {
  }, []);

  var inputPseudo;
  if (!pseudoIsSubmited) {
    inputPseudo = <Input
      containerStyle={{ marginBottom: 25, width: '70%' }}
      inputStyle={{ marginLeft: 10 }}
      placeholder='John'
      leftIcon={
        <Icon
          name='user'
          size={24}
          color="#149588"
        />
      }
      onChangeText={(val) => setPseudo(val)}
    />
  } else {
    inputPseudo = <Text h4 style={{ marginBottom: 25, color: '#000' }}>Welcome back {pseudo}</Text>
  }

  return (
    <ImageBackground source={require('../assets/home.jpg')} style={styles.container}>

      {inputPseudo}

      <Button
        buttonStyle={styles.button}
        title="Go to Gallery"
        type="solid"
        onPress={() => {
          props.navigation.navigate('BottomNavigator', { screen: 'Gallery' });
        }}
      />

    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    backgroundColor: '#149588'
  }
});



export default HomeScreen;