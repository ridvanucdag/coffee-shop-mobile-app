import * as React from 'react';

import { ExpoRadikalChartViewProps } from './ExpoRadikalChart.types';

export default function ExpoRadikalChartView(props: ExpoRadikalChartViewProps) {
  return (
    <div>
      <span>{props.name}</span>
    </div>
  );
}
