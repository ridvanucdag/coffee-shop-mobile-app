import { ImageSourcePropType } from "react-native/types";

export interface Coffee {
  id: string;
  name: string;
  description: string;
  roasted: string;
  imagelink: ImageSourcePropType;
  ingredients: string;
  category: string;
  special_ingredient: string;
  prices: {
    size: string;
    price: number;
    currency: string;
  }[];
  average_rating: number;
  ratings_count: string;
  favourite: boolean;
  type: string;
  index: number;
  quantity: number;
}
