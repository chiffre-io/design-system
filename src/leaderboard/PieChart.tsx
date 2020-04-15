import React from 'react'
import { defaultTheme as theme } from '@47ng/chakra-next'
import { ResponsivePie, PieDatum } from '@nivo/pie'

export interface PieChartProps {
  showPercent: boolean
  data: PieDatum[]
}

export const PieChart: React.FC<PieChartProps> = ({ data, showPercent }) => {
  return (
    <ResponsivePie
      colors={[
        theme.colors.blue['300'],
        theme.colors.cyan['300'],
        theme.colors.teal['300'],
        theme.colors.green['300'],
        theme.colors.indigo['300'],
        theme.colors.purple['300'],
        theme.colors.pink['300'],
        theme.colors.red['300'],
        theme.colors.orange['300'],
        theme.colors.yellow['300']
      ]}
      padAngle={0.75}
      cornerRadius={2}
      innerRadius={0.5}
      radialLabelsSkipAngle={20}
      slicesLabelsSkipAngle={20}
      radialLabelsLinkOffset={0}
      radialLabelsLinkDiagonalLength={0}
      radialLabelsLinkHorizontalLength={12}
      radialLabelsTextColor={theme.colors.gray['700']}
      radialLabelsLinkColor={theme.colors.gray['400']}
      margin={{
        top: 10,
        bottom: 10,
        left: 30,
        right: 30
      }}
      sortByValue
      data={data}
      sliceLabel={d => (showPercent ? `${d.value.toFixed()}%` : `${d.value}`)}
    />
  )
}
