import React from 'react'
import { Alert } from 'react-native'
import styled from 'styled-components/native'
import Icon from 'react-native-vector-icons/Entypo'

const Button = styled.TouchableOpacity``

const confirmed = onPress => () =>
  Alert.alert(
    'Remove',
    'Are you sure you want to remove this item?',
    [
      { text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel' },
      { text: 'Yes', onPress: () => onPress() },
    ],
    { cancelable: false },
  )

const DeleteButton = ({ style, onPress }) => (
  <Button style={style} onPress={confirmed(onPress)}>
    <Icon name='cross' size={30} color='#DF8244' />
  </Button>
)

export default DeleteButton
