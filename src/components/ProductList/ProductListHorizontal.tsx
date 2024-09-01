import React, {  useState } from "react";
import {
  View,
  FlatList,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { Coffee } from "@/src/type/coffee";
import { useDispatch } from "react-redux";
import { useNavigation } from "expo-router";
import { toggleFavourite } from "@/src/redux/slices/coffeeSlice";
import { addToCart } from "@/src/redux/slices/basketSlice";
import { StackNavigationProp } from "@react-navigation/stack";
import { StackNavigatorParamList } from "@/src/navigators/navigator.types";

interface ProductListHorizontalProps {
  title: string;
  products: Coffee[];
}

const ProductListHorizontal: React.FC<ProductListHorizontalProps> = ({
  title,
  products,
}) => {
  const dispatch = useDispatch();
  const navigation = useNavigation<StackNavigationProp<StackNavigatorParamList>>();
  const [favoriteIds, setFavoriteIds] = useState<string[]>([]);
  const handleProductPress = (item: Coffee) => {
    navigation.navigate("Detail", { coffee: item });
  };

  const handleToggleFavourite = (id: string) => {
    dispatch(toggleFavourite(id));
    setFavoriteIds((prev) =>
      prev?.includes(id) ? prev?.filter((favId) => favId !== id) : [...prev, id]
    );
  };

  const handleAddToCart = (item: Coffee, quantity: number) => {
    dispatch(
      addToCart({
        id: item?.id,
        quantity,
        name: item?.name,
        description: item?.description,
        imagelink: item?.imagelink,
        category: item?.category,
        prices: item?.prices,
        roasted: item?.roasted,
        ingredients: item?.ingredients,
        special_ingredient: item?.special_ingredient,
        average_rating: item?.average_rating,
        ratings_count: item?.ratings_count,
        favourite: item?.favourite,
        type: item?.type,
        index: item?.index,
      })
    );
    alert(`1 ${item.name} sepete eklendi!`);
  };

  const getRandomPrice = (prices: Coffee["prices"]) => {
    const randomIndex = Math.floor(Math?.random() * prices?.length);
    return prices[randomIndex];
  };

  const renderItem = ({ item }: { item: Coffee }) => {
    const randomPrice = getRandomPrice(item?.prices);

    return (
      <TouchableOpacity onPress={() => handleProductPress(item)}>
        <View style={styles.itemContainer}>
          <Image source={item?.imagelink} style={styles.image} />
          <Text style={styles.name}>{item?.name}</Text>
          <View style={styles.ratingContainer}>
            <Icon name="star" size={16} color="gold" />
            <Text style={styles.rating}> {item?.average_rating}</Text>
          </View>

          <View style={styles.priceContainer}>
            <Text style={styles.size}>{randomPrice?.size}</Text>
            <Text style={styles.price}>
              {randomPrice?.price?.toFixed(2)}
              {randomPrice?.currency}
            </Text>
            <TouchableOpacity
              style={styles.addToCartButton}
              onPress={() => handleAddToCart(item, 1)}
            >
              <Icon name="add" size={20} color="black" />
            </TouchableOpacity>
          </View>

          <TouchableOpacity
            style={styles.favouriteIcon}
            onPress={() => handleToggleFavourite(item?.id)}
          >
            <Icon
              name={favoriteIds?.includes(item?.id) ? "heart" : "heart-outline"}
              style={styles.iconHeart}
              size={20}
              color={favoriteIds?.includes(item?.id) ? "red" : "black"}
            />
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      <FlatList
        data={products}
        renderItem={renderItem}
        keyExtractor={(item) => item?.id?.toString()}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.listContainer}
        style={{ paddingLeft: 4 }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5,
    marginLeft: 5,
  },
  listContainer: {
    paddingVertical: 10,
    paddingRight: 15,
  },
  itemContainer: {
    width: 130,
    marginRight: 15,
    backgroundColor: "#fff",
    borderRadius: 10,
    paddingBottom: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
    position: "relative",
  },
  image: {
    width: "100%",
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    height: 100,
  },
  name: {
    marginTop: 5,
    fontSize: 13,
    fontWeight: "bold",
    marginLeft: 5,
  },
  ratingContainer: {
    flexDirection: "row",
    alignItems: "center",
    position: "absolute",
    top: 2,
    left: 5,
  },
  rating: {
    fontSize: 12,
    color: "white",
    fontWeight: "bold",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.9,
    shadowRadius: 6,
    elevation: 6,
  },
  priceContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 5,
  },
  size: {
    fontSize: 14,
    marginLeft: 5,
    fontWeight: "bold",
  },
  price: {
    fontSize: 14,
    fontWeight: "bold",
    marginRight: 30,
  },
  addToCartButton: {
    padding: 5,
    backgroundColor: "#f0f0f0",
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center",
    marginLeft: -15,
    marginRight: 5,
  },
  favouriteIcon: {
    position: "absolute",
    right: 5,
    top: 1,
    backgroundColor: "#fff",
    borderRadius: 50,
  },
  iconHeart: {
    marginTop: 1,
  },
});

export default ProductListHorizontal;
