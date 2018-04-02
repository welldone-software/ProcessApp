import { TabNavigator, StackNavigator } from 'react-navigation'
import GoalsScreen from './GoalsScreen'
import AddNewGoal from './AddNewGoal'
import AddNewMemory from './AddNewMemory'
import MemoriesScreen from './MemoriesScreen'
import AboutScreen from './AboutScreen'
import AuthScreen from './AuthScreen'

const AppNavigator = StackNavigator({
  Tabs: {
    screen: TabNavigator({
      Goals: {
        screen: GoalsScreen,
        navigationOptions: { title: 'Goals List' },
      },
      Reminders: {
        screen: MemoriesScreen,
        navigationOptions: { title: 'Memories List' },
      },
    }),
  },
  AddNewGoal: {
    screen: AddNewGoal,
    navigationOptions: { title: 'Add New Goal' },
  },
  AddNewMemory: {
    screen: AddNewMemory,
    navigationOptions: { title: 'Add New Memory' },
  },
})

const ModalNavigator = StackNavigator(
  {
    App: {
      screen: AppNavigator,
    },
    About: {
      screen: AboutScreen,
    },
  },
  {
    mode: 'modal',
    headerMode: 'none',
    navigationOptions: {
      gesturesEnabled: false,
    },
  },
)

const RootNavigator = StackNavigator(
  {
    Auth: {
      screen: AuthScreen,
    },
    AppWithModal: {
      screen: ModalNavigator,
    },
  },
  {
    mode: 'modal',
    headerMode: 'none',
    navigationOptions: {
      gesturesEnabled: false,
    },
  },
)

export default RootNavigator
