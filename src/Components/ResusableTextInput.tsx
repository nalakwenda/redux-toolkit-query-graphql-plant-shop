import React, { useState } from 'react'
import { NativeSyntheticEvent, TextInput, TextInputFocusEventData } from 'react-native'
import { Formik } from 'formik';
import tw from 'twrnc'
import { GRAY } from '../colors';

type KEYBOARD_TYPE_OPTIONS = 'numeric' | 'email-address' | 'default';
type Props = {
  id: string;
  placeHolder: string;
  onChangeText: (content: string, id: string) => void;
  onBlur: (content:string, id: string) => void;
  value?: string | any;
  styles?: any;
  isEditable?: boolean;
  keyBoardType?: KEYBOARD_TYPE_OPTIONS;
  autoFocus?: boolean;
}

const ResusableTextInput = (props: Props) =>
{
  const {
    id,
    placeHolder,
    onChangeText,
    onBlur,
    value,
    styles,
    isEditable,
    keyBoardType,
    autoFocus,
  } = props;

  const [defaultValue, setDefaultValue] = useState(value);

  const handleChange = (content: string, id: string) =>
  {
    onChangeText(content, id);
    setDefaultValue(content);
  };
  const handleBlur = (content: string, id: string) =>
  {
    onBlur(content, id);
    setDefaultValue(content);
  };
  return (
    <TextInput
      style={tw.style(`rounded-xl  border-2 border-green-600 text-black pl-4`)}
      onChangeText={content => handleChange(content, id)}
      value={value}
      // onBlur={content => handleBlur(content, id) }
      placeholder={placeHolder}
      editable={isEditable}
      keyboardType={keyBoardType}
      autoFocus={autoFocus}
      placeholderTextColor={GRAY}
    />
  )
}

export default ResusableTextInput