import React from 'react'
import Input, { InputProps } from '@chakra-ui/core/dist/Input'
import { useTheme } from '@chakra-ui/core/dist/ThemeProvider'
import { useField, ErrorMessage } from 'formik'
import { ErrorText } from './ErrorText'

export interface TwoFactorTokenFieldProps extends InputProps {
  name: string
}

export const TwoFactorTokenField: React.FC<TwoFactorTokenFieldProps> = ({
  name,
  ...props
}) => {
  const theme = useTheme()
  const [field] = useField(name)
  return (
    <>
      <Input
        id={name}
        name={name}
        type="text"
        placeholder="123456"
        mb={1}
        size="lg"
        inputMode="numeric" // Show numeric keyboard on mobile
        autoComplete="one-time-code"
        pattern="[0-9]{6}"
        textAlign="center"
        fontSize="1.8rem"
        fontFamily={theme.fonts.mono}
        {...field}
        {...props}
      />
      <ErrorMessage name={name} component={ErrorText} />
    </>
  )
}
