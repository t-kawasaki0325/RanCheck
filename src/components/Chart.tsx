import React, { useContext } from 'react';
import { recharts } from '../localModules'
import { store } from '../store/store'

const { LineChart, Line, CartesianGrid, XAxis, YAxis } = recharts

const Chart: React.FC = () => {
  const { rancheck: { selectedSetting } } = useContext(store)
  const data = selectedSetting.gRank

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