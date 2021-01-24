import React from 'react'
import {View, Text, StyleSheet} from 'react-native'

const Card = props => {

  return (
    <View style={{...styles.card, ...props.style}}>{props.children}</View>
  )
}

const styles = StyleSheet.create({
  card: {
    // shadow properties only exist on IOS devises
    shadowColor: 'black',
    shadowOffset: { width: 0,height: 2},
    shadowRadius: 6,
    shadowOpacity: .26,

    // elevation is what we need to give the same effect on android
    elevation: 6,
    
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,}
})

export default Card