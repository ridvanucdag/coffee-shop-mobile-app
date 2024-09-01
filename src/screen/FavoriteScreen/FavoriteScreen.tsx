import { RootState } from "@/src/redux/store";
import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Platform,
} from "react-native";
import { useSelector } from "react-redux";
import { Coffee } from "@/src/type/coffee"; 
import CustomHeader from "@/src/components/CustomHeader";
import { StackNavigationProp } from "@react-navigation/stack";
import { useTranslation } from "react-i18next";
import ProductListVertical from "@/src/components/ProductList/ProductListVertical";

interface FavoriteScreenProps {
  navigation: StackNavigationProp<any, any>;
}

const FavoriteScreen: React.FC<FavoriteScreenProps> = () => {
  const { t } = useTranslation();
  const coffees = useSelector((state: RootState) =>
    state?.coffee?.coffees
    ?.filter((c) => c?.favourite)
    ?.sort((a, b) => a?.name?.localeCompare(b?.name))
  );

  return (
    <View style={{ flex: 1 }}>
      <CustomHeader
        title={t("favorite.favoriteCoffees")}
        onRightIconPress={() => console.log("Right icon pressed!")}
        showBackButton={true}
      />
      {coffees?.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyMessage}>{t("favorite.emptyMessage")}</Text>
        </View>
      ) : (
        <View style={styles.container}>
          <ProductListVertical products={coffees} />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  listContainer: {
    padding: 10,
  },
  container: {
    marginTop: Platform.OS === "ios" ? -15 : -22,
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  image: {
    width: "100%",
    height: 150,
    borderRadius: 10,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 10,
  },
  cardRating: {
    fontSize: 14,
    color: "#666",
    marginTop: 5,
  },
  cardDescription: {
    fontSize: 14,
    color: "#666",
    marginTop: 10,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  emptyMessage: {
    fontSize: 18,
    color: "#666",
  },
});

export default FavoriteScreen;
