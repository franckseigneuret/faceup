import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text } from 'react-native';


function SnapScreen(props) {


  return (
    <View style={styles.container}>
      <Text>
        SnapScreen
      </Text>
    </View>
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



export default SnapScreen;