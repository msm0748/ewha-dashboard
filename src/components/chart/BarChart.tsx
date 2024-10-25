import Plot, { PlotParams } from 'react-plotly.js';
import { PLOTLY_CONFIG } from '../../constants/PlotlyConfig';

export default function BarChart() {
  const data: PlotParams['data'] = [
    {
      x: ['수연', '우연', '가연', '나연', '다연'],
      y: [1, 1, 2, 1, 1],
      name: '밤 중 수면 시간',
      type: 'bar',
      marker: { color: '#45B7D1' },
    },
    {
      x: ['수연', '우연', '가연', '나연', '다연'],
      y: [6, 4, 5, 4, 8],
      name: '낮 중 수면 시간',
      type: 'bar',
      marker: { color: '#F9D56E' },
    },
    {
      x: ['수연', '우연', '가연', '나연', '다연'],
      y: [2, 1, 2, 3, 1],
      name: '수면 대기 시간',
      type: 'bar',
      marker: { color: '#FF6B6B' },
    },
  ];

  const layout: PlotParams['layout'] = {
    barmode: 'stack',
    title: '수면',
    xaxis: { title: '인물' },
    // width: 800,
    // height: 400,
    dragmode: false, // 드래그 모드 비활성화
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
