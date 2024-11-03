import Plot, { PlotParams } from 'react-plotly.js';
import {
  PLOTLY_CONFIG,
  PLOTLY_DEFAULT_LAYOUT,
} from '../../constants/PlotlyConfig';

export default function BarChart() {
  const data: PlotParams['data'] = [
    {
      x: ['2024-10-01', '2024-10-02', '2024-10-03', '2024-10-04', '2024-10-05'],
      y: [231, 149, 211, 187, 189],
      name: '밤 중 수면 시간',
      type: 'bar',
      marker: { color: '#7cda38' },
    },
  ];

  const layout: PlotParams['layout'] = {
    title: '데이터 생성 건수',
    ...PLOTLY_DEFAULT_LAYOUT,
    xaxis: {
      tickformat: '%Y-%m-%d', // 날짜만 표시되도록 설정
      dtick: 'D1', // 하루 단위로 간격 고정
    },
    // width: 800,
    // height: 400,
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
