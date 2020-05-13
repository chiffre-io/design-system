import React from 'react'
import Input, { InputProps } from '@chakra-ui/core/dist/Input'
import { ErrorMessage, useField } from 'formik'
import { ErrorText } from './ErrorText'

export interface InputFieldProps extends InputProps {
  name: string
}

export const InputField: React.FC<InputFieldProps> = ({ name, ...props }) => {
  const [{ onBlur: _, ...field }] = useField(name)
  return (
    <>
      <Input id={name} type="text" mb={1} {...field} {...props} />
      <ErrorMessage name={name} component={ErrorText} />
    </>
  )
}
