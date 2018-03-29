import styled from 'styled-components/native'

export const ItemContainer = styled.View`
  border-bottom-width: 1;
  border-right-width: 1;
  border-left-width: 1;
  border-top-width: 1;
  margin-bottom: 10;
  justify-content: center;
  align-items: center;
  height:120px;
  padding: 10px;
  background-color: #fff;
`

export const List = styled.FlatList`
  width:90%;
`

export const ListText = styled.Text.attrs({numberOfLines: 2})`
  font-size:20;
`

