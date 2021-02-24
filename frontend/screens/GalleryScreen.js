import React, { useState, useEffect } from 'react';
import { Image, StyleSheet, View, Text, ScrollView, Dimensions } from 'react-native';
import { Badge } from 'react-native-elements'

import { connect } from 'react-redux'

var width = Dimensions.get('window').width; //full width

function GalleryScreen(props) {

  const items = props.photosUrl.map((item, i) => {

    return (
      <View style={styles.item} key={i}>
        <Image style={styles.img}
          source={{ uri: item }}
        />
        <View style={{ textAlign: 'center' }}>
          <Badge value="Homme" status="success" />
          <Badge value="30 ans" status="success" />
          <Badge value="Barbe" status="success" />
          <Badge value="joyeux" status="success" />
          <Badge value="cheveux gris" status="success" />
        </View>
      </View>
    )
  })

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <Text style={styles.title}>
          John's Gallery
        </Text>

        {items}

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



function mapStateToProps(state) {
  return {
    photosUrl: state.photosUrl,
  }
}

export default connect(
  mapStateToProps,
  null
)(GalleryScreen)
