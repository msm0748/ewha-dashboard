import { useEffect, useState } from 'react';
import Plot, { PlotParams } from 'react-plotly.js';
import * as d3 from 'd3';
import { PLOTLY_CONFIG } from '../../constants/PlotlyConfig';

export default function LineChart() {
  const [data, setData] = useState<PlotParams['data']>([]);

  useEffect(() => {
    // d3를 사용해 CSV 파일 로드
    d3.csv(
      'https://raw.githubusercontent.com/plotly/datasets/master/finance-charts-apple.csv'
    )
      .then((rows) => {
        function unpack(rows: d3.DSVRowArray<string>, key: string) {
          return rows.map((row) => row[key]);
        }

        // Plotly.js의 데이터 객체
        const trace1: PlotParams['data'] = [
          {
            type: 'scatter',
            mode: 'lines',
            name: 'AAPL High',
            x: unpack(rows, 'Date'),
            y: unpack(rows, 'AAPL.High'),
            line: { color: '#17BECF' },
          },
        ];

        setData(trace1);
      })
      .catch((error) => {
        console.error('Error loading or parsing data:', error);
      });
  }, []);

  const layout = {
    title: '활력 징후',
  };

  return (
    <div>
      <Plot data={data} layout={layout} config={PLOTLY_CONFIG} />
    </div>
  );
}
