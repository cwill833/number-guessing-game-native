import React, { useState } from 'react'
import { View, Text, StyleSheet, TextInput, Button, TouchableWithoutFeedback, Keyboard } from 'react-native'
import Card from '../components/Card'
import Colors from '../constants/colors'
import Input from '../components/Input'
const StartGameScreen = props => {

  const [enteredValue, setEnteredValue] = useState('')

  const numberInputHandler = textInput => {
    // this is how we validate and replace and value that is not a number between 0-9
    setEnteredValue(textInput.replace(/[^0-9]/g, ''))
  }
  return (
    //this is needed in order to click on the screen and dismiss the keyboard if one is up
    <TouchableWithoutFeedback onPress={()=> {Keyboard.dismiss()}}>
      <View style={styles.screen}>
        <Text style={styles.title}>Start a New Game!</Text>
        <Card style={styles.inputContainer}>
          <Text>Select a Number</Text>
          <Input value={enteredValue} onChangeText={numberInputHandler} style={styles.input} blurOnSubmit autoCapitalize='none' autoCorrect={false} keyboardType='number-pad' maxLength={2} />
          <View style={styles.buttonContainer}>
            <View style={styles.button}><Button color={Colors.primary} title="Reset" onPress={() => { }} /></View>
            <View style={styles.button}><Button color={Colors.accent} title="Confirm" onPress={() => { }} /></View>
          </View>
        </Card>
      </View>
    </TouchableWithoutFeedback>
  )
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: 10,
    alignItems: 'center',
  },
  title: {
    fontSize: 20,
    marginVertical: 10,
  },
  inputContainer: {
    width: 300,
    maxWidth: '80%',
    alignItems: 'center',
  },
  buttonContainer: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
    paddingHorizontal: 15
  },
  button: {
    width: 100
  },
  input: {
    width: 50,
    textAlign: 'center'
  }
})

export default StartGameScreen