import React from 'react'
import { recharts } from '../localModules'

const { LineChart, Line, CartesianGrid, XAxis, YAxis } = recharts

const Chart: React.FC = () => {
  const data = [
    { date: '2020/08/01', rank: 53 },
    { date: '2020/08/02', rank: 41 },
    { date: '2020/08/03', rank: 35 },
    { date: '2020/08/04', rank: 38 },
    { date: '2020/08/05', rank: 24 },
    { date: '2020/08/06', rank: 21 },
    { date: '2020/08/07', rank: 20 },
    { date: '2020/08/08', rank: 17 },
    { date: '2020/08/09', rank: 10 },
    { date: '2020/08/10', rank: 17 },
    { date: '2020/08/11', rank: 5 },
    { date: '2020/08/12', rank: 5 },
    { date: '2020/08/13', rank: 5 },
    { date: '2020/08/14', rank: 2 },
    { date: '2020/08/15', rank: 2 },
    { date: '2020/08/16', rank: 1 }
  ]

  return (
    // FIXME: rechartsはy軸を逆転すると最小値が消えるため対応
    // https://github.com/recharts/recharts/issues/2175
    <div style={{ position: 'relative' }}>
      <div style={{ position: 'absolute', left: '40px', top: '-3px' }}>1</div>
      <LineChart width={800} height={200} data={data}>
        <Line type="monotone" dataKey="rank" stroke="#8884d8" />
        <CartesianGrid stroke="#ccc" />
        <XAxis dataKey="date" />
        <YAxis
          domain={[1, (dataMax: number) => Math.round(dataMax * 1.2)]}
          reversed={true}
        />
      </LineChart>
    </div>
  )
}

export default Chart