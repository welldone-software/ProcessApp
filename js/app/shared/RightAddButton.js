import React from 'react'
import styled from 'styled-components/native'
import { Platform } from 'react-native'

const AddButton = styled.TouchableOpacity`
  height: 30px;
  width: 30px;
  background-color: #df8244;
  margin-right: 10px;
  border-radius: 30px;
  align-items: center;
  justify-content: center;
`

const AddPlus = styled.Text`
  font-size: ${() => (Platform.OS === 'ios' ? 20 : 25)}px;
  line-height: ${() => (Platform.OS === 'ios' ? 20 : 30)}px;
  color: white;
`

export default (RightAddButton = ({ navigation, pageName }) => {
  return (
    <AddButton onPress={() => navigation.navigate(pageName)}>
      <AddPlus>+</AddPlus>
    </AddButton>
  )
})
