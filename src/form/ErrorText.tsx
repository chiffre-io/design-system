import React from 'react'
import Text from '@chakra-ui/core/dist/Text'
import { BoxProps } from '@chakra-ui/core/dist/Box'

export interface ErrorTextProps extends BoxProps {
  bold?: boolean
}

export const ErrorText: React.FC<ErrorTextProps> = ({
  bold = false,
  ...props
}) => {
  return (
    <Text
      fontSize="xs"
      fontWeight={bold ? 'semibold' : 'normal'}
      color="red.600"
      mb={2}
      {...props}
    />
  )
}
