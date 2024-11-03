import { useEffect, useState } from 'react';
import Plot, { PlotParams } from 'react-plotly.js';
import {
  PLOTLY_CONFIG,
  PLOTLY_DEFAULT_LAYOUT,
} from '../../constants/PlotlyConfig';

export default function LineChart() {
  const [data, setData] = useState<PlotParams['data']>([]);

  useEffect(() => {
    // 10분 단위로 24시간 동안의 맥박 데이터 생성
    const generatePulseData = () => {
      const pulseData = [];
      const currentTime = new Date();
      const startTime = new Date(currentTime.getTime() - 60 * 60 * 1000); // 1시간 전

      for (let i = 0; i < 144; i++) {
        const time = new Date(startTime.getTime() + i * 10 * 60 * 1000); // 10분 단위
        const pulse = Math.floor(Math.random() * (120 - 60 + 1)) + 60; // 60 ~ 100 사이의 랜덤 맥박 데이터
        pulseData.push({ time: time.toISOString(), pulse });
      }

      return pulseData;
    };

    const generate1 = generatePulseData(); // 수연

    const trace1: PlotParams['data'] = [
      {
        type: 'scatter',
        mode: 'lines',
        x: generate1.map((dataPoint) => dataPoint.time),
        y: generate1.map((dataPoint) => dataPoint.pulse),
        line: { color: '#7edd85' },
      },
    ];

    setData([...trace1]);
  }, []);

  const layout = {
    title: '맥박',
    ...PLOTLY_DEFAULT_LAYOUT,
    xaxis: {
      tickformat: '%H:%M<br>%Y-%m-%d', // 날짜만 표시되도록 설정
    },
  };

  return (
    <div>
      <Plot
        className="w-full"
        data={data}
        layout={layout}
        config={PLOTLY_CONFIG}
      />
    </div>
  );
}
