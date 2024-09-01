import { Coffee } from "../type/coffee";

export type TabNavigatorParamList = {
  AnaSayfa: undefined;
  Favoriler: undefined;
  Sepet: undefined;
  Profil: undefined;
};

export type StackNavigatorParamList = {
  Main: undefined;
  Detail: { coffee: Coffee };
  Tab: { screen: keyof TabNavigatorParamList } | undefined;
};
