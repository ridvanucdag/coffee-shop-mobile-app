import { NativeModulesProxy, EventEmitter, Subscription } from 'expo-modules-core';

// Import the native module. On web, it will be resolved to ExpoRadikalChart.web.ts
// and on native platforms to ExpoRadikalChart.ts
import ExpoRadikalChartModule from './src/ExpoRadikalChartModule';
import ExpoRadikalChartView from './src/ExpoRadikalChartView';
import { ChangeEventPayload, ExpoRadikalChartViewProps } from './src/ExpoRadikalChart.types';

// Get the native constant value.
export const PI = ExpoRadikalChartModule.PI;

export function hello(): string {
  return ExpoRadikalChartModule.hello();
}

export async function setValueAsync(value: string) {
  return await ExpoRadikalChartModule.setValueAsync(value);
}

const emitter = new EventEmitter(ExpoRadikalChartModule ?? NativeModulesProxy.ExpoRadikalChart);

export function addChangeListener(listener: (event: ChangeEventPayload) => void): Subscription {
  return emitter.addListener<ChangeEventPayload>('onChange', listener);
}

export { ExpoRadikalChartView, ExpoRadikalChartViewProps, ChangeEventPayload };
