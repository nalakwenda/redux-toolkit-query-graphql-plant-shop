import React from 'react'
import { ActivityIndicator, Text, TouchableOpacity } from 'react-native'
import tw from 'twrnc'

type Props = {
    onPress: () => void;
  text: string
  disable?: boolean
  loader?: boolean
}

const ReusableButton = (props: Props) =>
{
    const { onPress, text, disable,loader} = props
  return (
      <TouchableOpacity disabled={disable?disable:false} onPress={onPress}style={tw.style(`mt-5 rounded-xl p-5 bg-green-600 justify-center items-center`)}>
      {loader ? <><ActivityIndicator /></> : <><Text>{text}</Text></>}  
   
    </TouchableOpacity>
  )
}

export default ReusableButton