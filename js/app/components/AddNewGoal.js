import React from 'react'
import { View } from 'react-native'
import { map, pick, uniqueId } from 'lodash'
import styled from 'styled-components/native'
import { connect } from 'react-redux'
import Container from '../shared/Container'
import DoneButton from '../shared/DoneButton'
import FormItem from '../shared/FormItem'
import { addGoal } from '../store/actions'

const ValidationText = styled.Text`
  margin-left: 20; 
  margin-top: 30; 
  color: red;
`

class AddNewGoal extends React.Component {

  state = {
    goal: {
      aspiration: 'test_aspiration',
      value: 'test_value',
      barrier: 'test_barrier',
      whenIf: 'test_whenIf',
      then: 'test_then',
      timestamp: new Date(),
    },
    valid: true,
  }

  onChange = (newVal, key) => {
    const { text } = newVal.nativeEvent
    const { goal } = this.state
    this.setState({ goal: { ...goal, [key]: text } })
  }

  validate = () => {
    const { goal } = this.state
    const values = Object.values(goal)
    for (let i = 0; i < values.length; i++) {
      if (values[i] === '') {
        this.setState({ valid: false })
        return
      }
    }
    const id = uniqueId()
    this.setState({ valid: true }, () =>
      this.props.addGoal({ ...goal, id, sliderValue: 0 }))
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
          {
            map(
              pick(goal, ['aspiration', 'value', 'barrier']),
              (value, key) => (
                <FormItem key={key} label={key} value={value} onChange={this.onChange}/>
              ),
              )
          }

          <FormItem
            label='Implementation plan When/If'
            value={goal.whenIf}
            onChange={this.onChange}
            onChangeKey='whenIf'
          />

          <FormItem
            label='Then'
            value={goal.then}
            onChange={this.onChange}
            onChangeKey='then'
          />

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

export default connect(undefined, { addGoal })(AddNewGoal)
