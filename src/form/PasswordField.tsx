import React from 'react'
import Input, { InputProps } from '@chakra-ui/core/dist/Input'
import Icon from '@chakra-ui/core/dist/Icon'
import IconButton from '@chakra-ui/core/dist/IconButton'
import InputGroup from '@chakra-ui/core/dist/InputGroup'
import {
  InputLeftElement,
  InputRightElement
} from '@chakra-ui/core/dist/InputElement'
import { useTheme } from '@chakra-ui/core/dist/ThemeProvider'
import { useField, ErrorMessage } from 'formik'
import { ErrorText } from './ErrorText'
import { formIconColors } from './formIconColors'

// --

export interface PasswordFieldProps extends InputProps {
  name: string
  lockColor?: keyof typeof formIconColors
}

export interface ControlledPasswordFieldProps extends PasswordFieldProps {
  revealed: boolean
  onRevealedChanged: (revealed: boolean) => void
}

/**
 * Password input with external state
 * for the clear text reveal feature.
 */
export const ControlledPasswordField: React.FC<ControlledPasswordFieldProps> = ({
  lockColor = 'gray',
  revealed = false,
  onRevealedChanged,
  children,
  name,
  ...props
}) => {
  const theme = useTheme()
  const [{ onBlur: _, ...field }] = useField(name)
  return (
    <>
      <InputGroup>
        <InputLeftElement
          children={
            <Icon name="lock" color={formIconColors[lockColor].light} />
          }
        />
        <Input
          id={field.name}
          fontFamily={
            revealed && field.value.length > 0 ? theme.fonts.mono : 'inherit'
          }
          transition="border 0.2s ease"
          type={revealed ? 'text' : 'password'}
          placeholder="password"
          pr={8}
          mb={2}
          {...field}
          {...props}
        />
        <InputRightElement
          children={
            <IconButton
              aria-label={revealed ? 'Hide password' : 'Show password'}
              icon={revealed ? 'view-off' : 'view'}
              variant="ghost"
              _hover={{
                color: 'gray.600',
                // color: dark ? 'gray.500' : 'gray.600',
                backgroundColor: 'transparent'
              }}
              _pressed={{
                color: 'gray.700',
                // color: dark ? 'gray.400' : 'gray.700',
                backgroundColor: 'transparent'
              }}
              _active={{
                color: 'gray.700',
                // color: dark ? 'gray.400' : 'gray.700',
                backgroundColor: 'transparent'
              }}
              color="gray.500"
              // color={dark ? 'gray.600' : 'gray.500'}
              onClick={() => onRevealedChanged(!revealed)}
            />
          }
        />
      </InputGroup>
      {children}
      <ErrorMessage component={ErrorText} name={field.name} />
    </>
  )
}

/**
 * Password input with internal state
 * for the clear text reveal feature.
 */
export const PasswordField: React.FC<PasswordFieldProps> = ({ ...props }) => {
  const [revealed, setRevealed] = React.useState(false)
  return (
    <ControlledPasswordField
      revealed={revealed}
      onRevealedChanged={setRevealed}
      {...props}
    />
  )
}
