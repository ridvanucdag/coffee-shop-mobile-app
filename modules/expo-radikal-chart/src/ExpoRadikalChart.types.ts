import { ViewStyle } from "react-native/types";

export type ChangeEventPayload = {
  value: string;
};

export type ExpoRadikalChartViewProps = {
  name: string;
};

type Series = {
  color: string;
  percentage: number;
};

export type ExpoRadialChartViewProps = {
  style?: ViewStyle;
  data: Series[];
};
