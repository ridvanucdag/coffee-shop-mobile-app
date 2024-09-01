declare module "react-native-vector-icons/Ionicons" {
  import { FunctionComponent } from "react";
  import { TextStyle, ViewStyle } from "react-native";

  interface IconProps {
    name: string;
    size?: number;
    color?: string;
    style?: TextStyle | ViewStyle;
    onPress?: () => void;
    borderStyle?: ViewStyle;
  }

  const Icon: FunctionComponent<IconProps>;
  export default Icon;
}
