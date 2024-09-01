import { addToCart } from "@/src/redux/slices/basketSlice";
import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Button,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { RouteProp } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import CustomHeader from "@/src/components/CustomHeader";
import { toggleFavourite } from "@/src/redux/slices/coffeeSlice";
import { useTranslation } from "react-i18next";
import { StackNavigatorParamList } from "@/src/navigators/navigator.types";
import Icon from "react-native-vector-icons/Ionicons";
import { Coffee } from "@/src/type/coffee";

type ProductDetailScreenProps = {
  route: RouteProp<StackNavigatorParamList, "Detail">;
  navigation: StackNavigationProp<StackNavigatorParamList, "Detail">;
};

const ProductDetailScreen: React.FC<ProductDetailScreenProps> = ({ route }) => {
  const { coffee } = route?.params as { coffee: Coffee };
  const { t } = useTranslation();
  const [quantity, setQuantity] = useState<number>(1);
  const [showFullDescription, setShowFullDescription] =
    useState<boolean>(false);
  const [selectedSize, setSelectedSize] = useState<string>("S");
  const [selectedSugar, setSelectedSugar] = useState<string>("Şeker Olmasın");
  const [price, setPrice] = useState<number>(
    coffee?.prices?.find((p) => p?.size === "S")?.price || 0
  );
  const dispatch = useDispatch();

  const favorites = useSelector(
    (state: { favorite: { favoriteIds: string[] } }) =>
      state?.favorite?.favoriteIds
  );
  const [isFavorite, setIsFavorite] = useState<boolean>(
    favorites?.includes(coffee?.id)
  );

  useEffect(() => {
    setIsFavorite(favorites?.includes(coffee?.id));
  }, [favorites]);

  useEffect(() => {
    const selectedPrice =
      coffee?.prices?.find((p) => p?.size === selectedSize)?.price || 0;
    setPrice(selectedPrice);
  }, [selectedSize, coffee?.prices]);

  const handleAddToCart = () => {
    dispatch(
      addToCart({
        id: coffee?.id,
        quantity,
        name: coffee?.name,
        description: coffee?.description,
        imagelink: coffee?.imagelink,
        category: coffee?.category,
        prices: coffee?.prices?.map((p) => ({
          ...p,
          price: p?.price,
        })),
        roasted: coffee?.roasted,
        ingredients: coffee?.ingredients,
        special_ingredient: coffee?.special_ingredient,
        average_rating: coffee?.average_rating,
        ratings_count: coffee?.ratings_count,
        favourite: isFavorite,
        type: coffee?.type,
        index: coffee?.index,
      })
    );
    alert(`${quantity} ${coffee.name} sepete eklendi!`);
  };

  const changeQuantity = (change: number) => {
    setQuantity((prevQuantity) => Math.max(prevQuantity + change, 1));
  };

  const handleToggleFavorite = () => {
    dispatch(toggleFavourite(coffee.id));
    setIsFavorite((prev) => !prev);
  };

  return (
    <View style={styles.container}>
      <CustomHeader
        title={t("productDetails.title")}
        onRightIconPress={handleToggleFavorite}
        showBackButton={true}
        renderRightIcon={() => (
          <Icon name={isFavorite ? "heart" : "heart-outline"} size={24} color={isFavorite ? "red" : "black"} />
        )}
      />
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Image source={coffee?.imagelink} style={styles.image} />

        <View style={styles.titleContainer}>
          <Text style={styles.title}>{coffee?.name}</Text>
          <View style={styles.ratingContainer}>
            <Icon name="star" size={20} color="gold" />
            <Text style={styles.rating}>
              {coffee?.average_rating?.toFixed(1)}
            </Text>
            <Text style={styles.point}>(230)</Text>
          </View>
        </View>

        <View style={styles.underline} />
        <Text style={styles.titleDescription}>{t("productDetails.description")}</Text>
        <Text
          style={styles.description}
          numberOfLines={showFullDescription ? undefined : 3}
        >
          {coffee.description}
        </Text>

        <TouchableOpacity
          onPress={() => setShowFullDescription(!showFullDescription)}
        >
          <Text style={styles.showMore}>
            {showFullDescription ? t("productDetails.hide") : t("productDetails.showAll")}
          </Text>
        </TouchableOpacity>

        <View style={styles.sizeContainer}>
          {["S", "M", "L"]?.map((size) => (
            <TouchableOpacity
              key={size}
              style={[
                styles.sizeButton,
                selectedSize === size && styles.selectedSize,
              ]}
              onPress={() => setSelectedSize(size)}
            >
              <Text style={styles.sizeText}>{size}</Text>
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.sizeSugarContainer}>
          {["Şeker Olmasın", "Az olsun", "Normal Olsun"]?.map((sugar) => (
            <TouchableOpacity
              key={sugar}
              style={[
                styles.sizeSugarButton,
                selectedSugar === sugar && styles.selectedSugarSize,
              ]}
              onPress={() => setSelectedSugar(sugar)}
            >
              <Text style={styles.sizeSugarText}>{sugar}</Text>
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.underline} />

        <View style={styles.quantityContainer}>
          <View style={styles.leftSide}>
            <View style={styles.priceContainer}>
              <Text style={styles.price}>{price?.toFixed(2)}₺</Text>
              <View style={styles.quantityControls}>
                <TouchableOpacity
                  style={styles.quantityButton}
                  onPress={() => changeQuantity(-1)}
                >
                  <Text style={styles.buttonText}>-</Text>
                </TouchableOpacity>
                <Text style={styles.quantity}>{quantity}</Text>
                <TouchableOpacity
                  style={styles.quantityButton}
                  onPress={() => changeQuantity(1)}
                >
                  <Text style={styles.buttonText}>+</Text>
                </TouchableOpacity>
              </View>
            </View>
            <View style={styles.totalPriceContainer}>
              <Text>
              {t("productDetails.total")} {(price * quantity)?.toFixed(2)}₺
              </Text>
            </View>
          </View>

          <TouchableOpacity
            style={styles.addToCartButton}
            onPress={handleAddToCart}
          >
            <Text style={styles.addToCartText}>{t("productDetails.addtoCart")}</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  scrollContainer: {
    padding: 20,
  },
  image: {
    width: "100%",
    height: 250,
    borderRadius: 10,
    marginBottom: 20,
  },
  underline: {
    height: 1,
    backgroundColor: "#EAEAEA",
    marginTop: 6,
    marginBottom: 16,
  },
  titleContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "left",
  },
  ratingContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  rating: {
    fontSize: 16,
    marginRight: 5,
  },
  point: {
    fontSize: 12,
    marginRight: 5,
  },
  titleDescription:{
    fontSize:18,
    fontWeight:'bold',
    marginTop:-10,
    marginBottom:5,
  },
  description: {
    fontSize: 16,
    color: "#666",
    marginBottom: 10,
    textAlign: "left",
  },
  showMore: {
    color: "black",
    fontWeight: "bold",
    marginBottom: 20,
  },
  sizeContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  sizeButton: {
    paddingHorizontal: 40,
    paddingVertical: 10,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#ddd",
  },
  selectedSize: {
    backgroundColor: "#D7D9D9",
    borderColor: "red",
  },
  sizeText: {
    fontSize: 18,
  },

  sizeSugarContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  sizeSugarButton: {
    paddingHorizontal: 10,
    paddingVertical: 10,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#ddd",
  },
  selectedSugarSize: {
    backgroundColor: "#D7D9D9",
    borderColor: "red",
  },
  sizeSugarText: {
    fontSize: 14,
  },
  quantityContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 20,
  },
  leftSide: {
    flexDirection: "column",
    flex: 1,
  },
  priceContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  totalPriceContainer: {
    marginLeft:20,
  },
  price: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
    marginRight:15,
  },
  quantityControls: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
  },
  quantity: {
    marginHorizontal: 6,
    fontSize: 16,
    marginTop:-10,
  },
  quantityButton: {
    backgroundColor: "#fff",
    width: 18,
    height: 18,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
    marginTop:-10,
    borderWidth: 1,
    borderColor: "#2F2D2C",
  },
  buttonText: {
    color: "#2F2D2C",
    fontSize: 12,
  },
  addToCartButton: {
    backgroundColor: "tomato",
    padding: 15,
    paddingHorizontal: 30,
    alignItems: "center",
    borderRadius: 10,

    justifyContent: "center",
  },
  addToCartText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default ProductDetailScreen;
