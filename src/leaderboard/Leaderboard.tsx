import React from 'react'
import Text from '@chakra-ui/core/dist/Text'
import Flex from '@chakra-ui/core/dist/Flex'
import Box from '@chakra-ui/core/dist/Box'
import { defaultTheme as theme } from '@47ng/chakra-next'
import { LeaderboardEntry } from '@chiffre/analytics-processing'
import { PieDatum } from '@nivo/pie'
import { LeaderboardEntryView } from './EntryView'
import { PieChart } from './PieChart'

export * from './EntryView'
export * from './PieChart'

export interface LeadeboardProps {
  entries: Readonly<LeaderboardEntry[]>
  limit?: number
  flexRatio?: number
  formatScore?: (score: number) => string
  fontFamily?: 'mono' | 'body'
  showPie?: boolean
  showPercentByDefault?: boolean
  pieData?: PieDatum[]
}

export const Leaderboard: React.FC<LeadeboardProps> = ({
  entries,
  limit = 10,
  flexRatio = 4,
  formatScore = score => score.toFixed(),
  fontFamily = 'body',
  showPie = false,
  showPercentByDefault = false,
  pieData
}) => {
  const [showPercent, setShowPercent] = React.useState(showPercentByDefault)

  const data = React.useMemo(() => {
    if (!limit || limit >= entries.length) {
      return entries
    }
    const omittedLength = entries.length - limit
    const key = `${omittedLength} other${omittedLength > 1 ? 's' : ''}`
    return [
      ...entries.slice(0, limit),
      entries.slice(limit).reduce(
        (acc, entry) => ({
          key,
          percent: acc.percent + entry.percent,
          score: acc.score + entry.score
        }),
        {
          key,
          percent: 0,
          score: 0
        }
      )
    ]
  }, [entries, limit])

  const scoreScale = React.useMemo(() => {
    const max = data.reduce((max, entry) => Math.max(max, entry.score), 0)
    return 75 / max
  }, [data])

  const _pieData = React.useMemo(() => {
    if (!showPercent) {
      return (
        pieData ||
        data.map(entry => ({
          id: entry.key,
          label: entry.key,
          value: entry.score
        }))
      ).sort((a, b) => a.value - b.value)
    }
    if (pieData) {
      const sum = pieData.reduce((sum, d) => sum + d.value, 0)
      return pieData
        .map(d => ({
          ...d,
          value: (100 * d.value) / sum
        }))
        .sort((a, b) => a.value - b.value)
    }
    return data
      .map(entry => ({
        id: entry.key,
        label: entry.key,
        value: entry.percent
      }))
      .sort((a, b) => a.value - b.value)
  }, [pieData, data, showPercent])

  if (data.length === 0) {
    return (
      <Text textAlign="center" my={4} fontSize="sm" color="gray.600">
        No data
      </Text>
    )
  }

  return (
    <Flex>
      <Box flex={1}>
        {data.map((entry, index) => (
          <LeaderboardEntryView
            key={entry.key}
            label={entry.key}
            showPercent={showPercent}
            score={entry.score * scoreScale}
            scoreString={formatScore(entry.score)}
            scorePercent={entry.percent}
            onClick={() => setShowPercent(state => !state)}
            flexRatio={flexRatio}
            fontFamily={
              index !== limit && fontFamily === 'mono'
                ? theme.fonts.mono
                : theme.fonts.body
            }
          />
        ))}
      </Box>
      {showPie && data.length > 5 && (
        <Box flex={1} display={['none', 'none', 'block']}>
          <PieChart data={_pieData} showPercent={showPercent} />
        </Box>
      )}
    </Flex>
  )
}

export default Leaderboard
