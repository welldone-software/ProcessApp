import React from 'react'
import styled from 'styled-components/native'
import * as Animatable from 'react-native-animatable'
import { connect } from 'react-redux'
import Icon from 'react-native-vector-icons/Ionicons'
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

const AnimatableContent = Animatable.createAnimatableComponent(Content)

const CustomMenu = ({ style, children, ...other }) => (
  <AnimatableContent {...other} animation="bounceIn">
    {children}
  </AnimatableContent>
)

const SettingsMenu = ({setUser, navigation}) => (
  <MenuProvider style={{flexDirection: 'column', padding: 8}}>
    <Menu renderer={CustomMenu}>
      <MenuTrigger>
        <Icon name="ios-menu-outline" size={32}/>
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

export default connect(null, {setUser})(SettingsMenu)
