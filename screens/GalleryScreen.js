import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { Image, Badge } from 'react-native-elements'

function GalleryScreen(props) {


  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        John's Gallery
      </Text>

      <View style={styles.item}>
        <Image style={styles.img}
          source={{ uri: '../assets/picture-1.jpg' }}
        />
        <View style={{ textAlign: 'center' }}>
          <Badge value="Homme" status="success" />
          <Badge value="70 ans" status="success" />
          <Badge value="Barbe" status="success" />
          <Badge value="joyeux" status="success" />
          <Badge value="cheveux gris" status="success" />
        </View>
      </View>
      
      <View style={styles.item}>
        <Image style={styles.img}
          source={{ uri: '../assets/picture-1.jpg' }}
        />
        <View style={{ textAlign: 'center' }}>
          <Badge value="Homme" status="success" />
          <Badge value="70 ans" status="success" />
          <Badge value="Barbe" status="success" />
          <Badge value="joyeux" status="success" />
          <Badge value="cheveux gris" status="success" />
        </View>
      </View>
    </View>

  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 50,
    flex: 1,
    alignItems: 'center',

  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#149588'
  },
  item: {
    marginBottom: 20,
  },
  img: {
    marginBottom: 20,
    width: 350,
    height: 200,
  }
});



export default GalleryScreen;