import React from 'react'
import styled from 'styled-components/native'
import { connect } from 'react-redux'
import { Ionicons } from '@expo/vector-icons'
import {
  Menu,
  MenuProvider,
  MenuOptions,
  MenuOption,
  MenuTrigger
} from 'react-native-popup-menu'
import { setUser } from '../store/actions'

const Content = styled.View`
  position: absolute;
  top: 40px;
  left: 5px;
  width: 100px;
  padding: 5px;
  background-color: #fff;
`

const CustomMenu = ({ style, children, ...other }) => (
  <Content {...other}>
    {children}
  </Content>
)

const SettingsMenu = ({setUser, navigation}) => (
  <MenuProvider style={{flexDirection: 'column', padding: 8}}>
    <Menu renderer={CustomMenu}>
      <MenuTrigger>
        <Ionicons name="ios-menu-outline" size={32}/>
      </MenuTrigger>
      <MenuOptions customStyles={{width: 100, marginTop: 5}}>
        <MenuOption
          text='Logout'
          onSelect={() => {
            setUser(null)
            navigation.navigate('Auth')
          }}
        />
      </MenuOptions>
    </Menu>
  </MenuProvider>
)

const enhace = connect(null, {setUser})

export default enhace(SettingsMenu)
