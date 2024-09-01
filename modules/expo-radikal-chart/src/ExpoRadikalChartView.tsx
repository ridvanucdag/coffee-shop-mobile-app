import { requireNativeViewManager } from 'expo-modules-core';
import * as React from 'react';

import { ExpoRadikalChartViewProps } from './ExpoRadikalChart.types';

const NativeView: React.ComponentType<ExpoRadikalChartViewProps> =
  requireNativeViewManager('ExpoRadikalChart');

export default function ExpoRadikalChartView(props: ExpoRadikalChartViewProps) {
  return <NativeView {...props} />;
}
