import { Config } from 'plotly.js';
import { PlotParams } from 'react-plotly.js';

export const PLOTLY_CONFIG: Partial<Config> = {
  displayModeBar: true,
  modeBarButtonsToRemove: ['zoom2d', 'select2d', 'lasso2d', 'resetScale2d'], // 제거할 버튼 목록
  displaylogo: false,
};

export const PLOTLY_DEFAULT_LAYOUT: PlotParams['layout'] = {
  dragmode: 'pan',
};
