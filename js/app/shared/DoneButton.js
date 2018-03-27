import React from 'react'
import { Button } from 'react-native-elements'

export default DoneButton = ({ validate }) => {
  return (
    <Button
      style={{ marginBottom: 5 }}
      title='Done'
      fontSize={20}
      buttonStyle={{ borderRadius: 15, height: 60, backgroundColor: '#F6C143' }}
      onPress={() => validate()}
    />
  )
}
