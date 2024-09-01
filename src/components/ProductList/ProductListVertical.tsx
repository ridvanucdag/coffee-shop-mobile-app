import React, { useState } from "react";
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
import { addToCart } from "@/src/redux/slices/basketSlice";
import { toggleFavourite } from "@/src/redux/slices/coffeeSlice";
import { useDispatch } from "react-redux";
import { useNavigation } from "expo-router";
import { StackNavigationProp } from "@react-navigation/stack";
import { StackNavigatorParamList } from "@/src/navigators/navigator.types";

interface ProductListVerticalProps {
  products: Coffee[];
  showFavoriButton?: boolean;
  title?:string
}

const ProductListVertical: React.FC<ProductListVerticalProps> = ({
  products,
  showFavoriButton,
  title,
}) => {
  const dispatch = useDispatch();
  const navigation = useNavigation<StackNavigationProp<StackNavigatorParamList>>();
  const [favoriteIds, setFavoriteIds] = useState<string[]>([]);

  const handleProductPress = (item: Coffee) => {
    console.log("Navigating to detail for:", item.name);
    navigation.navigate("Detail", { coffee: item });
  };

  const handleToggleFavourite = (id: string) => {
    dispatch(toggleFavourite(id));
    setFavoriteIds((prev: string[]) => 
    prev?.includes(id) ? prev?.filter(favId => favId !== id) : [...prev, id]
  );
  };

  const handleAddToCart = (item: Coffee) => {
    dispatch(
      addToCart({
        id: item?.id,
        quantity: 1,
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
    alert(`1 ${item.name} added to cart!`);
  };

  const getRandomPrice = (prices: Coffee["prices"])  => {
    const randomIndex = Math.floor(Math?.random() * prices?.length);
    return prices[randomIndex];
  };

  const renderItem = ({ item }: { item: Coffee }) => {
    const randomPrice = getRandomPrice(item?.prices);

    return (
      <TouchableOpacity onPress={() => handleProductPress(item)}>
        <View style={styles.itemContainer}>
          <Image
            source={item?.imagelink }
            style={styles.image}
            resizeMode="cover"
          />
          {showFavoriButton && (
            <TouchableOpacity
              style={styles.favouriteIcon}
              onPress={() => handleToggleFavourite(item?.id)}
            >
              <Icon
                name={favoriteIds?.includes(item?.id) ? "heart" : "heart-outline"}
                size={24}
                style={styles.iconHeart}
                color={favoriteIds?.includes(item?.id) ? "red" : "black"}
              />
            </TouchableOpacity>
          )}

          <View style={styles.detailsContainer}>
            <View style={styles.nameRatingContainer}>
              <Text style={styles.name}>{item.name}</Text>
              <View style={styles.ratingContainer}>
                <Text style={styles.rating}>
                  <Icon name="star" size={16} color="gold" />{" "}
                  <Text>{item?.average_rating}</Text>
                </Text>
              </View>
            </View>

            <View style={styles.sizePriceContainer}>
              <View style={styles.sizeContainer}>
                <Text style={styles.size}>{randomPrice?.size}</Text>
                <Text style={styles.price}>
                  {randomPrice?.currency}
                  {randomPrice?.price?.toFixed(2)}
                </Text>
              </View>
              <TouchableOpacity
                style={styles.addToCartButton}
                onPress={() => handleAddToCart(item)}
              >
                <Icon name="add" size={20} color="black" />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View>
    <Text style={styles.title}>{title}</Text>
    <FlatList
      data={products}
      renderItem={renderItem}
      keyExtractor={(item) => item.id.toString()}
      contentContainerStyle={styles.listContainer}
    />
        </View>
  );
};

const styles = StyleSheet.create({
  listContainer: {
    padding: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginLeft: 20,
  },
  itemContainer: {
    marginBottom: 15,
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
    position: "relative",
  },
  image: {
    width: '100%', // Responsive image width
    height: 120,
    borderRadius: 10,
  },
  detailsContainer: {
    marginTop: 10,
  },
  addToCartButton: {
    padding: 5,
    backgroundColor: "#f0f0f0",
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center",
  },
  nameRatingContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  name: {
    fontSize: 18,
    fontWeight: "bold",
  },
  sizePriceContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 5,
  },
  sizeContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  size: {
    fontSize: 14,
    marginLeft: 5,
    marginRight: 5,
    fontWeight: "bold",
  },
  price: {
    fontSize: 14,
    fontWeight: "bold",
  },
  ratingContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  rating: {
    fontSize: 14,
    color: "#666",
    marginLeft: 5,
  },
  favouriteIcon: {
    position: "absolute",
    top: 10,
    right: 10,
    backgroundColor: '#fff',
    borderRadius: 50,
  },
  iconHeart: {
    marginTop: 1,
  },
});

export default ProductListVertical;
