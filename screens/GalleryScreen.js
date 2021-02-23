import React, { useState, useEffect } from 'react';
import { Image, StyleSheet, View, Text, ScrollView, Dimensions } from 'react-native';
import { Badge } from 'react-native-elements'

var width = Dimensions.get('window').width; //full width
var height = Dimensions.get('window').height; //full height

function GalleryScreen(props) {


  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <Text style={styles.title}>
          John's Gallery
        </Text>

        <View style={styles.item}>
          <Image style={styles.img}
            source={require('../assets/picture-1.jpg')}
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
            source={require('../assets/picture-2.jpg')}
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
            source={require('../assets/picture-3.jpg')}
          />
          <View style={{ textAlign: 'center' }}>
            <Badge value="Homme" status="success" />
            <Badge value="70 ans" status="success" />
            <Badge value="Barbe" status="success" />
            <Badge value="joyeux" status="success" />
            <Badge value="cheveux gris" status="success" />
          </View>
        </View>
      </ScrollView>
    </View>

  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 50,
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#f2f2f2',
  },
  scrollView: {
    width: width,
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  button: {
    backgroundColor: '#149588'
  },
  item: {
    backgroundColor: '#FFF',
    marginBottom: 20,
    paddingBottom: 10,
    margin: 10,
    borderColor: '#e5ebf0',
    borderStyle: 'solid',
    borderWidth: 2,
  },
  img: {
    marginBottom: 10,
    width: '100%',
    height: 200,
  },
});



export default GalleryScreen;