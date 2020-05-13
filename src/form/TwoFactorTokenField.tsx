import React from 'react'
import Input, { InputProps } from '@chakra-ui/core/dist/Input'
import { useTheme } from '@chakra-ui/core/dist/ThemeProvider'
import { useField, ErrorMessage } from 'formik'
import { ErrorText } from './ErrorText'

export interface TwoFactorTokenFieldProps extends InputProps {
  name: string
  autoFocus?: boolean
}

export const TwoFactorTokenField: React.FC<TwoFactorTokenFieldProps> = ({
  name,
  autoFocus = false,
  ...props
}) => {
  const theme = useTheme()
  const [{ onBlur, ...field }] = useField(name)
  const ref = React.useRef<HTMLInputElement>()

  React.useEffect(() => {
    if (autoFocus && ref.current) {
      ref.current.focus()
    }
  }, [])
  return (
    <>
      <Input
        id={name}
        type="text"
        placeholder="123456"
        mb={1}
        size="lg"
        maxW="9rem"
        inputMode="numeric" // Show numeric keyboard on mobile
        autoComplete="one-time-code"
        pattern="[0-9]{6}"
        textAlign="center"
        fontSize="1.6rem"
        fontFamily={theme.fonts.mono}
        ref={ref as any}
        {...field}
        {...props}
      />
      <ErrorMessage name={name} component={ErrorText} />
    </>
  )
}
