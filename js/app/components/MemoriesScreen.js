import React from 'react'
import { connect } from 'react-redux'
import { upperFirst } from 'lodash'
import { Ionicons } from '@expo/vector-icons'
import styled from 'styled-components/native'
import Container from '../shared/Container'
import RightAddButton from '../shared/RightAddButton'
import { ItemContainer, List, ListText } from '../shared/style'

const StyledListText = ListText.extend.attrs({ numberOfLines: 3 })``

const FrequencyText = styled.Text`
  font-size: 12;
  margin-top: 5;
`

class MemoriesScreen extends React.Component {

  static navigationOptions = ({ navigation, screenProps }) => ({
    headerRight: <RightAddButton navigation={navigation} pageName='AddNewMemory'/>,
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

  renderMemory = ({ item }) => {
    return (
      <ItemContainer>
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
        <List
          data={memoriesList}
          keyExtractor={(item) => item.id}
          renderItem={this.renderMemory}
        />
      </Container>
    )
  }
}
export default connect(({ memories }) => ({
  memories,
}), {})(MemoriesScreen)
