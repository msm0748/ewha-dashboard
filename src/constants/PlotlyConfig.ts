import { Config } from 'plotly.js';

export const PLOTLY_CONFIG: Partial<Config> = {
  displayModeBar: true,
  modeBarButtonsToRemove: ['zoom2d', 'select2d', 'lasso2d', 'resetScale2d'], // 제거할 버튼 목록
  displaylogo: false,
};
