import React, { useState, useRef, useEffect } from 'react'
import { View, Text, StyleSheet, Button, Alert, ScrollView } from 'react-native'
import Card from '../components/Card'
import NumberContainer from '../components/NumberContainer'

const generateRandomNum = (min, max, exclude) => {
  min = Math.ceil(min)
  max = Math.floor(max)
  const rndNum = Math.floor(Math.random() * (max - min)) + min
  if (rndNum === exclude) {
    return generateRandomNum(min, max, exclude)
  } else {
    return rndNum
  }
}

const GameScreen = ({ userChoice, onGameOver }) => {
  const initialGuess = generateRandomNum(1, 100, parseInt(userChoice))
  const [currentGuess, setCurrentGuess] = useState(initialGuess)
  const [pastGuesses, setPastGuesses] = useState([])

  const currentLow = useRef(1)
  const currentHigh = useRef(100)

  useEffect(() => {
    if (currentGuess === userChoice) {
      onGameOver(pastGuesses.length)
    }
  }, [currentGuess, userChoice, onGameOver])

  const nextGuessHandler = direction => {
    if ((direction === 'lower' && currentGuess < userChoice) || (direction === 'greater' && currentGuess > userChoice)) {
      Alert.alert('Dont lie!', 'You know that this is wrong...', [{ text: 'Sorry!', style: 'cancel' }])
      return
    }

    if (direction === 'lower') {
      currentHigh.current = currentGuess
    } else {
      currentLow.current = currentGuess + 1
    }
    const nextNumber = generateRandomNum(currentLow.current, currentHigh.current, currentGuess)
    setCurrentGuess(nextNumber)
    setPastGuesses(prevState => [nextNumber, ...prevState])
  }

  return (
    <View style={styles.screen}>
      <Text>Opponent's Guess</Text>
      <NumberContainer>{currentGuess}</NumberContainer>
      <Card style={styles.buttonContainer}>
        <Button title="LOWER" onPress={() => nextGuessHandler('lower')} />
        <Button title="GREATER" onPress={() => nextGuessHandler('greater')} />
      </Card>
      <View style={styles.listContainer}>
      {/* using a scroll view to output a list */}
      <ScrollView contentContainerStyle={styles.list}>
        {pastGuesses.map((guess, idx) => (
          <View key={guess} style={styles.listItem}>
            <Text>#{pastGuesses.length - idx}</Text>
            <Text>{guess}</Text>
          </View>
        ))}
      </ScrollView>
      </View>
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
  },
  listContainer:{
    width: '80%',
    flex:1
  },
  list:{
    //flexGrow is how you get the scroll view to stop bouncing
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'flex-end'
  },
  listItem: {
    borderColor: '#ccc',
    borderWidth: 1,
    padding: 15,
    marginVertical: 10,
    backgroundColor: 'white',
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '60%'
  }
})

export default GameScreen