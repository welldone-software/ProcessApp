import React from 'react'
import { View, Text, Button, Platform } from 'react-native'
import { connect } from 'react-redux'
import styled from 'styled-components/native'
import Icon from 'react-native-vector-icons/Entypo'
import Auth0 from 'react-native-auth0'
import { setUser } from '../store/actions'
import config from '../config'

const auth0 = new Auth0({ domain: config.auth0Domain, clientId: config.authClientId })
const StyledButton = styled.TouchableOpacity``

const CloseButton = ({ style, onPress }) => (
  <StyledButton style={style} onPress={onPress}>
    <Icon name='cross' size={30} color='#DF8244' />
  </StyledButton>
)

class ModalScreen extends React.Component {
  render() {
    return (
      <View style={{ flex: 1 }}>
        <View style={{ marginTop: 40, alignItems: 'flex-end', justifyContent: 'flex-end' }}>
          <CloseButton onPress={() => this.props.navigation.goBack()} />
        </View>
        <View style={{ flex: 1, alignItems: 'center' }}>
          <View style={{ alignItems: 'center', justifyContent: 'center', marginTop: 40 }}>
            <Text style={{ fontSize: 16 }}>Yonatan Primes'</Text>
            <Text style={{ fontSize: 26 }}>"Process Goal App"</Text>
          </View>
          <Text style={{ fontSize: 16, paddingTop: 20 }}>Logged in as {this.props.user}</Text>
          <Button
            style={{ fontSize: 16 }}
            onPress={async () => {
              if (Platform.OS === 'ios') {
                await auth0.webAuth.clearSession({})
              }
              this.props.setUser(null)
              this.props.navigation.navigate('Auth')
            }}
            title='Logout'
          />
        </View>
      </View>
    )
  }
}

export default connect(({ user }) => console.log({ user }) || { user }, { setUser })(ModalScreen)
