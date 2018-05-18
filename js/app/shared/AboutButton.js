import React from 'react'
import styled from 'styled-components/native'
import Icon from 'react-native-vector-icons/Entypo'

const AddButton = styled.TouchableOpacity`
  height: 30;
  width: 30;
  margin-right: 10;
  align-items: center;
  justify-content: center;
`


export default AboutButton = ({ navigation }) => {
  return (
    <AddButton onPress={() => navigation.navigate('About')}>
      <Icon name='info' size={30} color='#DF8244' />
    </AddButton>
  )
}
