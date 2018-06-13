import React from 'react'
import { Alert } from 'react-native'
import { Slider } from 'react-native-elements'
import Icon from 'react-native-vector-icons/Ionicons'
import { connect } from 'react-redux'
import styled from 'styled-components/native'
import NoItems from '../shared/NoItems'
import Container from '../shared/Container'
import RightAddButton from '../shared/RightAddButton'
import AboutButton from '../shared/AboutButton'
import DeleteButtonBase from '../shared/DeleteButton'
import { ItemContainer, List, ListText } from '../shared/style'
import { removeGoal, updateGoal } from '../store/actions'

const SliderValue = styled.Text`
  margin-bottom: 5;
`

const DeleteButton = styled(DeleteButtonBase)`
  position: absolute;
  top: -1px;
  right: 1px;
`

class GoalsScreen extends React.Component {
  static navigationOptions = ({ navigation, screenProps }) => ({
    headerRight: <RightAddButton navigation={navigation} pageName='AddNewGoal' />,
    headerLeft: <AboutButton navigation={navigation} />,
    tabBarIcon: ({ focused, tintColor }) => (
      <Icon name='ios-list-box-outline' size={32} color={focused ? tintColor : 'black'} />
    ),
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

  onSliderValueChange = (newVal, item) => {
    const { sliderValue, id } = item
    const newArr = [...this.state.goalsList]
    newArr.map(goal => {
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
      <DeleteButton onPress={() => this.props.removeGoal(item)} />
      <ListText onPress={() => this.props.navigation.navigate('AddNewGoal', { goal: item })}>
        {item.aspiration}
      </ListText>

      <Slider
        value={item.sliderValue || 0}
        onValueChange={newVal => this.onSliderValueChange(newVal, item)}
        minimumValue={0}
        maximumValue={20}
        onSlidingStart={() => {
          this.setState({ scrollEnabled: false, [item.id]: item.sliderValue })
        }}
        onSlidingComplete={() => {
          this.setState({ scrollEnabled: true })
          if (this.state[item.id] < 10 && item.sliderValue >= 10) {
            Alert.alert(
              'Excelent!',
              'You are half way through, want to text your trainer to brag?',
              [
                { text: 'No', onPress: () => console.log('Cancel Pressed'), style: 'cancel' },
                { text: 'Yes', onPress: () => console.log('OK Pressed') },
              ],
              { cancelable: false },
            )
          }
          this.props.updateGoal(item)
        }}
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
        {goalsList.length ? (
          <List
            data={goalsList}
            keyExtractor={item => item.id}
            scrollEnabled={scrollEnabled}
            renderItem={this.renderGoal}
          />
        ) : (
          <NoItems itemName='goal' />
        )}
      </Container>
    )
  }
}

// export default connect(state => console.log(state) || ({
//   goals: state.goals
// }), {})(GoalsScreen)
export default connect(
  ({ goals }) => ({
    goals,
  }),
  { removeGoal, updateGoal },
)(GoalsScreen)
