import React from 'react'
import { View } from 'react-native'
import { FormInput, FormLabel } from 'react-native-elements'
import { upperFirst } from 'lodash'
import styled from 'styled-components'

const ModifedFormItem = styled(FormInput).attrs({
  containerStyle: {
    borderBottomWidth: 1,
    borderBottomColor: 'gray',
  },
  inputStyle: { width: '100%' },
})``

export default FormItem = ({
  label, value, onChange, onChangeKey,
}) => {
  return (
    <View>
      <FormLabel>{upperFirst(label)}</FormLabel>
      <ModifedFormItem
        multiline
        blurOnSubmit={false}
        value={value}
        underlineColorAndroid={0}
        onChange={(newVal) => onChange(newVal, onChangeKey || label)}
      />
    </View>
  )
}

