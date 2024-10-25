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
    const generate2 = generatePulseData(); // 나연
    const generate3 = generatePulseData(); // 가연
    const generate4 = generatePulseData(); // 우연
    const generate5 = generatePulseData(); // 다연

    // 평균 맥박 데이터를 계산하는 함수
    const calculateAverage = (dataSets: any[]) => {
      const averages: { time: string; pulse: number }[] = [];
      const length = dataSets[0].length;

      for (let i = 0; i < length; i++) {
        const time = dataSets[0][i].time; // 모든 데이터셋의 시간은 동일
        const totalPulse = dataSets.reduce(
          (sum, dataset) => sum + dataset[i].pulse,
          0
        );
        const averagePulse = totalPulse / dataSets.length;
        averages.push({ time, pulse: averagePulse });
      }

      return averages;
    };

    const averageData = calculateAverage([
      generate1,
      generate2,
      generate3,
      generate4,
      generate5,
    ]);

    const trace1: PlotParams['data'] = [
      {
        type: 'scatter',
        mode: 'lines',
        name: '수연',
        x: generate1.map((dataPoint) => dataPoint.time),
        y: generate1.map((dataPoint) => dataPoint.pulse),
        line: { color: '#7edd85' },
      },
    ];

    const trace2: PlotParams['data'] = [
      {
        type: 'scatter',
        mode: 'lines',
        name: '나연',
        x: generate2.map((dataPoint) => dataPoint.time),
        y: generate2.map((dataPoint) => dataPoint.pulse),
        line: { color: '#5c47f9' },
      },
    ];

    const trace3: PlotParams['data'] = [
      {
        type: 'scatter',
        mode: 'lines',
        name: '가연',
        x: generate3.map((dataPoint) => dataPoint.time),
        y: generate3.map((dataPoint) => dataPoint.pulse),
        line: { color: '#30c1dd' },
      },
    ];

    const trace4: PlotParams['data'] = [
      {
        type: 'scatter',
        mode: 'lines',
        name: '우연',
        x: generate4.map((dataPoint) => dataPoint.time),
        y: generate4.map((dataPoint) => dataPoint.pulse),
        line: { color: '#4c7392' },
      },
    ];

    const trace5: PlotParams['data'] = [
      {
        type: 'scatter',
        mode: 'lines',
        name: '다연',
        x: generate5.map((dataPoint) => dataPoint.time),
        y: generate5.map((dataPoint) => dataPoint.pulse),
        line: { color: '#2efff6' },
      },
    ];

    const average: PlotParams['data'] = [
      {
        type: 'scatter',
        mode: 'lines+markers',
        name: '평균',
        x: averageData.map((dataPoint) => dataPoint.time),
        y: averageData.map((dataPoint) => dataPoint.pulse),
        // line: { color: '#000000' },
        line: { color: '#FF5733', width: 2 }, // 평균 선의 색상 및 두께
        marker: {
          color: '#FF5733', // 평균 맥박 점의 색상
          size: 6,
          symbol: 'circle', // 점의 모양
        },
      },
    ];

    setData([
      ...trace1,
      ...trace2,
      ...trace3,
      ...trace4,
      ...trace5,
      ...average,
    ]);
  }, []);

  const layout = {
    title: '맥박',
    ...PLOTLY_DEFAULT_LAYOUT,
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
