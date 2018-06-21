import React from 'react'
import styled from 'styled-components/native'
import Icon from 'react-native-vector-icons/Entypo'

const Button = styled.TouchableOpacity``

const DeleteButton = ({ style, onPress }) => (
  <Button style={style} onPress={onPress}>
    <Icon name='edit' size={21} color='#DF8244' />
  </Button>
)

export default DeleteButton
