import React from 'react'
import { View, Button } from 'react-native'
import { map, pick } from 'lodash'
import styled from 'styled-components/native'
import { connect } from 'react-redux'
import Container from '../shared/Container'
import FormItem from '../shared/FormItem'
import { addGoal } from '../store/actions'

const ValidationText = styled.Text`
  margin-left: 20;
  margin-top: 30;
  color: red;
`

class AddNewGoal extends React.Component {
  static navigationOptions = ({ navigation: { state: { params } } }) => ({
    headerRight: <Button title='Save' onPress={() => params && params.save()} />,
  })

  //   navigationOptions: {
  //     header: ({state}) => {
  //       console.log('state')
  //         // // get the "deepest" current params.
  //         // const currentParams = getCurrentParams(state);

  //         // const left = currentParams.left;
  //         // const right = currentParams.right;
  //         // const style = currentParams.style;
  //         // const tintColor = currentParams.tintColor;
  //         // return { left, right, style, tintColor };
  //     }
  //  }

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
    valid: true,
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
    this.setState({ valid: true }, () => this.props.addGoal({ ...goal, id, sliderValue: 0 }))
    this.backToList()
  }

  backToList = () => {
    this.props.navigation.goBack()
  }

  render() {
    const { goal, valid } = this.state
    return (
      <Container style={{ justifyContent: 'space-between' }}>
        <View>
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
        </View>
      </Container>
    )
  }
}

export default connect(undefined, { addGoal })(AddNewGoal)
