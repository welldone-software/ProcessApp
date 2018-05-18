import React from 'react'
import { View } from 'react-native'
import { FormLabel, CheckBox } from 'react-native-elements'
import { upperFirst } from 'lodash'
import { connect } from 'react-redux'
// import { Notifications } from 'expo'
import { addMemory } from '../store/actions'
import Container from '../shared/Container'
import FormItem from '../shared/FormItem'
import SaveButton from '../shared/SaveButton'


class AddNewMemory extends React.Component {

  static navigationOptions = ({ navigation: { state: { params } } }) => ({
    headerRight: <SaveButton title='Save' onPress={() => params && params.save()} />,
  })

  state = {
    memory: '',
    frequency: 'day',
    timestamp: new Date(),
  }

  onPress = (val) => {
    this.setState({ frequency: val })
  }

  onChange = (newVal, key) => {
    const { text } = newVal.nativeEvent
    this.setState({ [key]: text })
  }

  componentDidMount() {
    this.props.navigation.setParams({
      save: this.save,
    })
  }

  save = async () => {
    const { memory, frequency, timestamp } = this.state
    if (memory === '') {
      alert('All fields are required')
      return
    }
    const id = Math.random()
    const notificationId = await this.schedulePushNotifications({ memory, frequency, timestamp, id })
    this.props.addMemory({ memory, frequency, timestamp, id, notificationId })
    this.backToList()
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

    // return Notifications.scheduleLocalNotificationAsync(localNotification, schedulingOptions)
  }

  backToList = () => {
    this.props.navigation.goBack()
  }

  render() {
    const { memory, frequency } = this.state
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
        </View>
      </Container>
    )
  }
}

export default connect(undefined, { addMemory })(AddNewMemory)

