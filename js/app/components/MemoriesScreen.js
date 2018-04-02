import React from 'react'
import { connect } from 'react-redux'
import { upperFirst } from 'lodash'
import { Ionicons } from '@expo/vector-icons'
import AboutButton from '../shared/AboutButton'
import styled from 'styled-components/native'
import { Notifications } from 'expo'
import Container from '../shared/Container'
import RightAddButton from '../shared/RightAddButton'
import NoItems from '../shared/NoItems'
import DeleteButtonBase from '../shared/DeleteButton'
import { ItemContainer, List, ListText } from '../shared/style'
import { removeMemory } from '../store/actions'

const StyledListText = ListText.extend.attrs({ numberOfLines: 3 })``

const FrequencyText = styled.Text`
  font-size: 12;
  margin-top: 5;
`

const DeleteButton = styled(DeleteButtonBase)`
  position: absolute;
  top: -1px;
  right: 1px;
`

class MemoriesScreen extends React.Component {

  static navigationOptions = ({ navigation, screenProps }) => ({
    headerRight: <RightAddButton navigation={navigation} pageName='AddNewMemory'/>,
    headerLeft: <AboutButton navigation={navigation}/>,
    tabBarIcon: ({focused, tintColor}) => <Ionicons name="ios-bookmark-outline" size={32} color={focused ? tintColor : 'black'}/>
  })

  state = {
    memoriesList: [],
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.memories !== nextProps.memories) {
      this.setState({ memoriesList: nextProps.memories })
    }
  }

  componentDidMount() {
    this.setState({ memoriesList: this.props.memories })
  }

  renderMemory = ({ item }) => {
    return (
      <ItemContainer>
        <DeleteButton onPress={() => {
          Notifications.dismissNotificationAsync(item.notificationId)
          this.props.removeMemory(item)
        }}/>
        <StyledListText>
          {item.memory}
        </StyledListText>

        <FrequencyText>
          Frequency: {upperFirst(item.frequency)}
        </FrequencyText>
      </ItemContainer>
    )
  }

  render() {
    const { memoriesList } = this.state

    return (
      <Container style={{ alignItems: 'center' }}>
        { memoriesList.length ?
        <List
          data={memoriesList}
          keyExtractor={(item) => item.id}
          renderItem={this.renderMemory}
        /> : <NoItems itemName="memory"/> }
      </Container>
    )
  }
}
export default connect(({ memories }) => ({
  memories,
}), {removeMemory})(MemoriesScreen)
