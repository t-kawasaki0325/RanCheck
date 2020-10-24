import React, { useContext } from 'react'
import { recharts } from '../localModules'
import { store } from '../store/store'
import { range } from '../utils'

const { LineChart, Line, CartesianGrid, XAxis, YAxis } = recharts

const Y_AXIS = [
  {
    max: 10,
    ticks: range(5).map(v => (v + 1) * 2),
  },
  {
    max: 20,
    ticks: range(4).map(v => (v + 1) * 5),
  },
  {
    max: 50,
    ticks: range(5).map(v => (v + 1) * 10),
  },
  {
    max: 100,
    ticks: range(5).map(v => (v + 1) * 20),
  },
]

const Chart: React.FC = () => {
  const {
    rancheck: { selectedSetting },
  } = useContext(store)
  const data = selectedSetting.gRank

  const yAxis =
    Y_AXIS.find(yAxis => selectedSetting.maxRank() <= yAxis.max) ||
    Y_AXIS.slice(-1)[0]

  return (
    // FIXME: rechartsはy軸を逆転すると最小値が消えるため対応
    // https://github.com/recharts/recharts/issues/2175
    <div style={{ position: 'relative' }}>
      <div
        style={{
          position: 'absolute',
          left: '50px',
          top: '-3px',
          fontSize: 12,
        }}>
        1
      </div>
      <LineChart width={760} height={160} data={data}>
        <Line type="monotone" dataKey="rank" stroke="#8884d8" />
        <CartesianGrid stroke="#ccc" />
        <XAxis dataKey="date" tick={{ fontSize: 14 }} />
        <YAxis
          domain={[1, yAxis.max]}
          allowDataOverflow={true}
          tick={{ fontSize: 12 }}
          ticks={yAxis.ticks}
          reversed={true}
        />
      </LineChart>
    </div>
  )
}

export default Chart
