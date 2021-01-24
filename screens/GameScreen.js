import React, { useState, useRef, useEffect } from 'react'
import {View, Text, StyleSheet, Button, Alert} from 'react-native'
import Card from '../components/Card'
import NumberContainer from '../components/NumberContainer'

const generateRandomNum = (min, max, exclude) => {
  min = Math.ceil(min)
  max = Math.floor(max)
  const rndNum = Math.floor(Math.random() * (max - min)) + min
  if(rndNum === exclude){
    return generateRandomNum(min, max, exclude)
  } else {
    return rndNum
  }
}

const GameScreen = ({userChoice, onGameOver}) => {

  const [currentGuess, setCurrentGuess] = useState(generateRandomNum(1, 100, parseInt(userChoice)))
  const [rounds, setRounds] = useState(0)

  const currentLow = useRef(1)
  const currentHigh = useRef(100)

  useEffect(()=>{
    if(currentGuess === userChoice){
      onGameOver(rounds)
    }
  }, [currentGuess, userChoice, onGameOver])

  const nextGuessHandler = direction => {
    if((direction === 'lower' && currentGuess < userChoice)||(direction === 'greater' && currentGuess > userChoice) ){
      Alert.alert('Dont lie!', 'You know that this is wrong...', [{text : 'Sorry!', style: 'cancel'}])
      return
    }

    if(direction ==='lower'){
      currentHigh.current = currentGuess
    } else{
      currentLow.current = currentGuess
    }
    const nextNumber = generateRandomNum(currentLow.current, currentHigh.current, currentGuess)
    setCurrentGuess(nextNumber)
    setRounds(prevState => prevState + 1)
  }

  return(
    <View style={styles.screen}>
      <Text>Opponent's Guess</Text>
      <NumberContainer>{currentGuess}</NumberContainer>
      <Card style={styles.buttonContainer}>
        <Button title="LOWER" onPress={()=>nextGuessHandler('lower')}/>
        <Button title="GREATER" onPress={()=>nextGuessHandler('greater')}/>
      </Card>
    </View>
  )

}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: 10,
    alignItems: 'center'
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 20,
    width: 300,
    maxWidth: '80%'
  }
})

export default GameScreen