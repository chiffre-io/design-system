import React from 'react'
import FormHelperText from '@chakra-ui/core/dist/FormHelperText'
import { BoxProps } from '@chakra-ui/core/dist/Box'

export const FieldHelpText: React.FC<BoxProps> = ({ ...props }) => {
  return (
    <FormHelperText fontSize="sm" color="gray.600" m="0" mb={2} {...props} />
  )
}
