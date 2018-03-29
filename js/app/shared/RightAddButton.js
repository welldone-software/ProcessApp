import React from 'react'
import styled from 'styled-components/native'

const AddButton = styled.TouchableOpacity`
  height: 30;
  width: 30;
  background-color: #DF8244;
  margin-right: 10;
  border-radius: 30;
  align-items: center;
  justify-content: center;
`

const AddPlus = styled.Text`
  font-size: 20;
  line-height: 20;
  color: white;
`

export default RightAddButton = ({ navigation, pageName }) => {
  return (
    <AddButton onPress={() => navigation.navigate(pageName)}>
      <AddPlus>
        +
      </AddPlus>
    </AddButton>
  )
}
