import React from 'react'
import { View, Text, StyleSheet, Button, Image } from 'react-native'
import CustomButton from '../components/CustomButton'

const GameOverScreen = props => {

  return (
    <View style={styles.screen}>
      <Text>The Game Is Over!</Text>
      <View style={styles.imageContainer}>
        {/* this is how we load local images into a file */}
        <Image
          style={styles.image}
          source={require('../assets/success.png')}
          /**
          *
          * this is how you load an image from the web 
          * you can use an optional prop fadeDuration
          */
          // source={uri: 'url to image'}
          // fadeDuration={300}
        /**
         * 
         * these are the different setting on image tag, cover is default
         *  */
        // resizeMode='cover'
        // resizeMode='contain'
        // resizeMode='center'
        // resizeMode='repeat'
        // resizeMode='stretch'

        />
      </View>
      <Text>Number of rounds: {props.roundsNumber}</Text>
      <Text>Number was: {props.userNumber}</Text>
      <CustomButton onPress={props.onRestart}>New Game</CustomButton>
    </View>
  )
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  imageContainer: {
    width: 300,
    height: 300,
    borderRadius: 150,
    borderWidth: 3,
    borderColor: 'black',
    overflow: 'hidden',
    marginVertical: 20
  },
  image: {
    width: '100%',
    height: '100%'

  }
})

export default GameOverScreen