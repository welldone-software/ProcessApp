import React from 'react'
import styled from 'styled-components/native'
import { Ionicons } from '@expo/vector-icons'

const Button = styled.TouchableOpacity``

const DeleteButton = ({style, onPress}) => (
  <Button style={style} onPress={onPress}>
    <Ionicons name="ios-remove-circle" size={30} color="red"/>
  </Button>
)

export default DeleteButton
