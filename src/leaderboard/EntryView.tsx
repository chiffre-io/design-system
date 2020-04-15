import React from 'react'
import Text from '@chakra-ui/core/dist/Text'
import Progress from '@chakra-ui/core/dist/Progress'
import Flex from '@chakra-ui/core/dist/Flex'

export interface LeaderboardEntryViewProps {
  score: number
  scorePercent: number
  scoreString: string
  label: string
  showPercent: boolean
  onClick: () => void
  fontFamily?: string
  flexRatio?: number
}

export const LeaderboardEntryView: React.FC<LeaderboardEntryViewProps> = ({
  label,
  score,
  scorePercent,
  scoreString,
  showPercent,
  onClick,
  flexRatio = 1,
  fontFamily = 'body'
}) => {
  return (
    <Flex alignItems="center">
      <Flex
        position="relative"
        flex={1}
        h={4}
        mr={2}
        alignItems="center"
        justifyContent="flex-end"
        cursor="pointer"
        onClick={onClick}
      >
        <Progress
          position="absolute"
          borderRadius={2}
          w="100%"
          h="100%"
          value={showPercent ? scorePercent : score}
          opacity={0.2}
        />
        <Text fontSize="sm" pr={1}>
          {showPercent ? `${scorePercent.toFixed()} %` : `${scoreString}`}
        </Text>
      </Flex>
      <Text
        flex={flexRatio}
        fontFamily={fontFamily}
        fontSize={fontFamily === 'mono' ? ['xs', 'sm'] : 'sm'}
        color="gray.800"
      >
        {label}
      </Text>
    </Flex>
  )
}
