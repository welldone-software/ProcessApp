import React from 'react'
import { map, pick } from 'lodash'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { connect } from 'react-redux'
import FormItem from '../shared/FormItem'
import { addGoal, updateGoal } from '../store/actions'
import SaveButton from '../shared/SaveButton'

class AddNewGoal extends React.Component {
  static navigationOptions = ({
    navigation: {
      state: { params },
    },
  }) => ({
    headerRight: <SaveButton title='Save' onPress={() => params && params.save()} />,
  })

  constructor(props) {
    super(props)
    if (props.navigation.getParam('goal')) {
      this.state = {
        goal: props.navigation.getParam('goal'),
      }
    } else {
      this.state = {
        goal: {
          aspiration: '',
          value: '',
          barrier: '',
          whenIf: '',
          then: '',
          timestamp: new Date(),
        },
      }
    }
  }

  componentDidMount() {
    this.props.navigation.setParams({
      save: this.save,
    })
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
    if (!this.props.navigation.getParam('goal')) {
      const id = Math.random()
      this.props.addGoal({ ...goal, id, sliderValue: 0 })
    } else {
      this.props.updateGoal(goal)
    }

    this.backToList()
  }

  backToList = () => {
    this.props.navigation.goBack()
  }

  render() {
    const { goal } = this.state
    return (
      <KeyboardAwareScrollView
        contentContainerStyle={{
          justifyContent: 'space-between',
          paddingTop: 20,
          paddingLeft: 5,
          paddingRight: 5,
        }}
        enableOnAndroid
        keyboardShouldPersistTaps='handled'
      >
        {map(pick(goal, ['aspiration', 'barrier']), (value, key) => (
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
    )
  }
}

export default connect(undefined, { addGoal, updateGoal })(AddNewGoal)
