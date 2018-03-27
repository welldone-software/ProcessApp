import React from 'react'
import { View } from 'react-native'
import { FormLabel, CheckBox } from 'react-native-elements'
import { upperFirst, uniqueId } from 'lodash'
import styled from 'styled-components/native'
import { connect } from 'react-redux'
import { Notifications } from 'expo'
import { addMemory } from '../store/actions'
import Container from '../shared/Container'
import DoneButton from '../shared/DoneButton'
import FormItem from '../shared/FormItem'

const ValidationText = styled.Text`
  margin-left: 20; 
  margin-top: 30; 
  color: red;
`

class AddNewMemory extends React.Component {

  state = {
    memory: 'test_memory',
    frequency: 'day',
    timestamp: new Date(),
    valid: true,
  }

  onPress = (val) => {
    this.setState({ frequency: val })
  }

  onChange = (newVal, key) => {
    const { text } = newVal.nativeEvent
    this.setState({ [key]: text })
  }

  validate = () => {
    const { memory, frequency, timestamp } = this.state
    if(memory === '') {
      this.setState({ valid: false })
      return
    }
    const id = uniqueId()
    this.setState({ valid: true },
      () => this.props.addMemory({ memory, frequency, timestamp, id }))
    this.backToList()
    this.schedulePushNotifications({ memory, frequency, timestamp, id })
  }

  schedulePushNotifications = (data) => {
    const localNotification = {
      title: 'Memory Reminder',
      body: data.memory,
      data,
      ios: {
        sound: true,
      },
      android:
        {
          sound: true,
          priority: 'high',
          sticky: false,
          vibrate: true,
        },
    }
    const t = new Date()
    t.setSeconds(t.getSeconds() + 10)
    const schedulingOptions = {
      time: t,
      repeat: 'day',
    }

    Notifications.scheduleLocalNotificationAsync(localNotification, schedulingOptions)
  }

  backToList = () => {
    this.props.navigation.goBack()
  }

  render() {
    const { memory, frequency, valid } = this.state
    const frequencies = ['day', 'week', 'month']
    return (
      <Container style={{ justifyContent: 'space-between' }}>
        <View>

          <FormItem
            label='Remember To'
            value={memory}
            onChange={this.onChange}
            onChangeKey='memory'
          />

          <FormLabel>How Often</FormLabel>
          {
            frequencies.map((freq) =>
              <CheckBox
                key={freq}
                title={upperFirst(freq)}
                checkedIcon='dot-circle-o'
                uncheckedIcon='circle-o'
                checked={frequency === freq}
                onPress={() => this.onPress(freq)}
                checkedColor='#F6C143'
              />)
          }

          {
            !valid &&
            <ValidationText>
              * All fields are mandatory
            </ValidationText>
          }
        </View>

        <DoneButton validate={this.validate}/>
      </Container>
    )
  }
}

export default connect(undefined, { addMemory })(AddNewMemory)

