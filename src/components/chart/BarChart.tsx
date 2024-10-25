import Plot, { PlotParams } from 'react-plotly.js';
import {
  PLOTLY_CONFIG,
  PLOTLY_DEFAULT_LAYOUT,
} from '../../constants/PlotlyConfig';

export default function BarChart() {
  const data: PlotParams['data'] = [
    {
      x: ['수연', '우연', '가연', '나연', '다연'],
      y: [100, 112, 225, 126, 175],
      name: '밤 중 수면 시간',
      type: 'bar',
      marker: { color: '#7cda38' },
    },
  ];

  const layout: PlotParams['layout'] = {
    title: '데이터 생성 건수',
    ...PLOTLY_DEFAULT_LAYOUT,
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
