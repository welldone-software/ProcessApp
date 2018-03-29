import React from 'react'
import { Slider } from 'react-native-elements'
import { connect } from 'react-redux'
import styled from 'styled-components/native'
import { Ionicons } from '@expo/vector-icons'
import Container from '../shared/Container'
import RightAddButton from '../shared/RightAddButton'
import SettingsMenu from '../shared/SettingsMenu'
import { ItemContainer, List, ListText } from '../shared/style'

const SliderValue = styled.Text`
  margin-bottom:5;
`

class GoalsScreen extends React.Component {
  static navigationOptions = ({ navigation, screenProps }) => ({
    headerRight: <RightAddButton navigation={navigation} pageName='AddNewGoal'/>,
    headerLeft: <SettingsMenu navigation={navigation}/>,
    tabBarIcon: ({focused, tintColor}) => <Ionicons name="ios-list-box-outline" size={32} color={focused ? tintColor : 'black'}/>
  })

  state = {
    goalsList: [],
    scrollEnabled: true,
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.goals !== nextProps.goals) {
      this.setState({ goalsList: nextProps.goals })
    }
  }

  componentDidMount() {
    this.setState({ goalsList: this.props.goals })
  }

  onSliderValueChange = (newVal, currentVal, id) => {
    const newArr = [...this.state.goalsList]
    newArr.map((goal) => {
      if (goal.id === id) {
        goal.sliderValue = newVal
      }
    })
    if (newArr !== this.state.goalsList) {
      this.setState({ goalsList: newArr })
    }
  }

  renderGoal = ({ item }) => (
    <ItemContainer>
      <ListText>
        {item.aspiration}
      </ListText>

      <Slider
        value={0}
        onValueChange={(newVal) => this.onSliderValueChange(newVal, item.value, item.id)}
        minimumValue={0}
        maximumValue={20}
        onSlidingStart={() => this.setState({ scrollEnabled: false })}
        onSlidingComplete={() => this.setState({ scrollEnabled: true })}
        step={1}
        thumbTintColor='#DF8244'
        style={{ width: '90%' }}
      />
      <SliderValue>Value: {item.sliderValue}</SliderValue>
    </ItemContainer>
  )

  render() {
    const { goalsList, scrollEnabled } = this.state

    return (
    <Container style={{ alignItems: 'center' }}>
      <List
        data={goalsList}
        keyExtractor={item => item.id}
        scrollEnabled={scrollEnabled}
        renderItem={this.renderGoal}
      />
    </Container>
    )
  }
}

// export default connect(state => console.log(state) || ({
//   goals: state.goals
// }), {})(GoalsScreen)
export default connect(({ goals }) => ({
  goals,
}), {})(GoalsScreen)
