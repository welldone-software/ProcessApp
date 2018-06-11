import React from 'react'
import { map, pick } from 'lodash'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { connect } from 'react-redux'
import Container from '../shared/Container'
import FormItem from '../shared/FormItem'
import { addGoal } from '../store/actions'
import SaveButton from '../shared/SaveButton'

class AddNewGoal extends React.Component {
  static navigationOptions = ({
    navigation: {
      state: { params },
    },
  }) => ({
    headerRight: <SaveButton title='Save' onPress={() => params && params.save()} />,
  })

  componentDidMount() {
    this.props.navigation.setParams({
      save: this.save,
    })
  }

  state = {
    goal: {
      aspiration: '',
      value: '',
      barrier: '',
      whenIf: '',
      then: '',
      timestamp: new Date(),
    },
  }

  onChange = (newVal, key) => {
    const { text } = newVal.nativeEvent
    const { goal } = this.state
    this.setState({ goal: { ...goal, [key]: text } })
  }

  save = () => {
    const { goal } = this.state
    const values = Object.values(goal)
    if (values.findIndex(v => v === '') !== -1) {
      alert('All fields are required')
      return
    }
    const id = Math.random()
    this.props.addGoal({ ...goal, id, sliderValue: 0 })
    this.backToList()
  }

  backToList = () => {
    this.props.navigation.goBack()
  }

  render() {
    const { goal } = this.state
    return (
      <Container style={{ justifyContent: 'space-between' }}>
        <KeyboardAwareScrollView>
          {map(pick(goal, ['aspiration', 'value', 'barrier']), (value, key) => (
            <FormItem key={key} label={key} value={value} onChange={this.onChange} />
          ))}

          <FormItem
            label='Implementation plan When/If'
            value={goal.whenIf}
            onChange={this.onChange}
            onChangeKey='whenIf'
          />

          <FormItem label='Then' value={goal.then} onChange={this.onChange} onChangeKey='then' />
        </KeyboardAwareScrollView>
      </Container>
    )
  }
}

export default connect(undefined, { addGoal })(AddNewGoal)
