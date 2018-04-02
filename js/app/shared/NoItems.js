import React from 'react'
import styled from 'styled-components/native'
// import AddButton from './RightAddButton'
// import { Ionicons } from '@expo/vector-icons'
import { upperFirst } from 'lodash'

const Container = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
`

const Text = styled.Text`
  color: #555;
`

const Title = Text.extend`
  font-weight: bold;
  font-size: 18px;
`

export default (NoItems = ({ itemName, navigation }) => {
  //const pageName = `AddNew${upperFirst(itemName)}`
  return (
    <Container>
      <Title>No {itemName} items yet.</Title>
      <Text>Press the plus to add a new {itemName}.</Text>
    </Container>
  )
})
