import React from 'react'
import styled from 'styled-components/native'

const ContainerView = styled.View`
  position:absolute;
  top:0;
  right:0;
  bottom:0;
  left:0;
  padding-top:20px;
  padding-left: 5px;
  padding-right: 5px;
`

const Container = ({ style, children }) => (
  <ContainerView style={style}>
    {children}
  </ContainerView>
)

export default Container
