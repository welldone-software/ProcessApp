import React from 'react'
import styled from 'styled-components/native'
import * as Animatable from 'react-native-animatable'
import { connect } from 'react-redux'
import Icon from 'react-native-vector-icons/Ionicons'
import { Menu, MenuProvider, MenuOptions, MenuOption, MenuTrigger } from 'react-native-popup-menu'
import Auth0 from 'react-native-auth0'
import config from '../config'

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

const auth0 = new Auth0({ domain: config.auth0Domain, clientId: config.authClientId })

const CustomMenu = ({ style, children, ...other }) => (
  <AnimatableContent {...other} animation='bounceIn'>
    {children}
  </AnimatableContent>
)

const SettingsMenu = ({ setUser, navigation }) => (
  <MenuProvider style={{ flexDirection: 'column', padding: 8 }}>
    <Menu renderer={CustomMenu}>
      <MenuTrigger>
        <Icon name='ios-menu-outline' size={32} />
      </MenuTrigger>
      <MenuOptions customStyles={{ width: 100, marginTop: 5 }}>
        <MenuOption
          text='Logout'
          onSelect={async () => {
            await auth0.webAuth.clearSession({})
            setUser(null)
            navigation.navigate('Auth')
          }}
        />
      </MenuOptions>
    </Menu>
  </MenuProvider>
)

export default connect(null, { setUser })(SettingsMenu)
