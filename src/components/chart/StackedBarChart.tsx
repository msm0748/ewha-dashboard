import Plot, { PlotParams } from 'react-plotly.js';
import {
  PLOTLY_CONFIG,
  PLOTLY_DEFAULT_LAYOUT,
} from '../../constants/PlotlyConfig';

export default function StackedBarChart() {
  const data: PlotParams['data'] = [
    {
      x: ['2024-10-01', '2024-10-02', '2024-10-03', '2024-10-04', '2024-10-05'],
      y: [1, 1, 2, 1, 1],
      name: '밤 중 수면 시간',
      type: 'bar',
      marker: { color: '#45B7D1' },
    },
    {
      x: ['2024-10-01', '2024-10-02', '2024-10-03', '2024-10-04', '2024-10-05'],
      y: [6, 4, 5, 4, 8],
      name: '낮 중 수면 시간',
      type: 'bar',
      marker: { color: '#F9D56E' },
    },
    {
      x: ['2024-10-01', '2024-10-02', '2024-10-03', '2024-10-04', '2024-10-05'],
      y: [2, 1, 2, 3, 1],
      name: '수면 대기 시간',
      type: 'bar',
      marker: { color: '#FF6B6B' },
    },
  ];

  const layout: PlotParams['layout'] = {
    barmode: 'stack',
    title: '수면',
    ...PLOTLY_DEFAULT_LAYOUT,
    xaxis: {
      tickformat: '%Y-%m-%d', // 날짜만 표시되도록 설정
      dtick: 'D1', // 하루 단위로 간격 고정
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
