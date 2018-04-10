import React from 'react'
import { Text } from 'react-native'
import styled from 'styled-components'

const ModifedTouchable = styled.TouchableOpacity`
  margin-right: 15px;
`

export default ({ title, ...rest }) => (
  <ModifedTouchable {...rest}><Text>{title}</Text></ModifedTouchable>
)
