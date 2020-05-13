import React from 'react'
import Input, { InputProps } from '@chakra-ui/core/dist/Input'
import Icon from '@chakra-ui/core/dist/Icon'
import InputGroup from '@chakra-ui/core/dist/InputGroup'
import { InputLeftElement } from '@chakra-ui/core/dist/InputElement'
import { ErrorMessage, useField, FieldMetaProps } from 'formik'
import { ErrorText } from './ErrorText'
import { formIconColors } from './formIconColors'

// --

const _getAtSignColor = (meta: FieldMetaProps<string>) => {
  if (!meta.touched) {
    if (meta.value.length === 0) {
      return formIconColors.gray.light
    }
    // There is some text
    if (!meta.error) {
      return formIconColors.green.light
    }
    // But it's not valid yet
    return formIconColors.gray.light
  }
  if (meta.error || meta.value.length === 0) {
    return formIconColors.red.light
  }
  return formIconColors.green.light
}

// --

export interface EmailFieldProps extends InputProps {
  colorValidation?: boolean
  name?: string
  getAtSignColor?: (meta: FieldMetaProps<string>) => string
}

export const EmailField: React.FC<EmailFieldProps> = ({
  colorValidation = false,
  name = 'email',
  getAtSignColor = _getAtSignColor,
  w,
  ...props
}) => {
  const [{ onBlur: _, ...field }, meta] = useField(name)
  const atSignColor = colorValidation
    ? getAtSignColor(meta)
    : formIconColors.gray.light

  return (
    <>
      <InputGroup w={w}>
        <InputLeftElement
          children={<Icon name="at-sign" color={atSignColor} />}
        />
        <Input
          id={name}
          type="email"
          placeholder="email address"
          mb={1}
          {...field}
          {...props}
        />
      </InputGroup>
      <ErrorMessage name={name} component={ErrorText} />
    </>
  )
}
