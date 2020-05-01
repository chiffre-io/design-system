import React from 'react'
import FormLabel from '@chakra-ui/core/dist/FormLabel'
import Flex, { FlexProps } from '@chakra-ui/core/dist/Flex'
import Text from '@chakra-ui/core/dist/Text'
import { BoxProps } from '@chakra-ui/core/dist/Box'
import { FormLabelProps } from '@chakra-ui/core/dist/FormLabel'

const LabelAside: React.FC<BoxProps> = ({ children, ...props }) => (
  <Text
    as="aside"
    display="block"
    fontSize="xs"
    fontWeight="normal"
    color="gray.600"
    {...props}
  >
    {children}
  </Text>
)

export interface LabelWithAsideProps extends FlexProps {
  htmlFor: string
  aside: () => string | React.ReactElement
  asideLeft?: boolean
}

export const LabelWithAside = React.forwardRef<any, LabelWithAsideProps>(
  ({ children, aside, asideLeft = false, htmlFor, ...props }, ref) => (
    <Flex
      justifyContent={asideLeft ? 'flex-start' : 'space-between'}
      alignItems="baseline"
      ref={ref}
      {...props}
    >
      <Label htmlFor={htmlFor} mb={0}>
        {children}
      </Label>
      <LabelAside ml={asideLeft ? -1 : 0}>{aside()}</LabelAside>
    </Flex>
  )
)

export const Label: React.FC<FormLabelProps> = ({ ...props }) => (
  <FormLabel
    as="label"
    fontWeight="semibold"
    display="inline-flex"
    {...props}
  />
)
