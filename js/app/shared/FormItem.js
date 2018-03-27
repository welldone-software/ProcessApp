import React from 'react'
import { View } from 'react-native'
import { FormInput, FormLabel } from 'react-native-elements'
import { upperFirst } from 'lodash'

export default FormItem = ({
  label, value, onChange, onChangeKey,
}) => {
  return (
    <View>
      <FormLabel>{upperFirst(label)}</FormLabel>
      <FormInput
        multiline
        value={value}
        onChange={(newVal) => onChange(newVal, onChangeKey || label)}
      />
    </View>
  )
}
