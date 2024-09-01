import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import CoffeeData from "../../data/data";
import { setCoffees } from "@/src/redux/slices/coffeeSlice";
import { RootState } from "@/src/redux/store";
import { useTranslation } from "react-i18next";
import CustomHeader from "./../../components/CustomHeader";
import ProductListVertical from "@/src/components/ProductList/ProductListVertical";
import ProductListHorizontal from "@/src/components/ProductList/ProductListHorizontal";
import CategoryList from "@/src/components/Category/CategoryList";
import Search from "@/src/components/Search/Search";

const HomeScreen: React.FC = () => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const coffees = useSelector((state: RootState) => state?.coffee?.coffees);
  const [filteredCoffees, setFilteredCoffees] = useState(coffees);

  useEffect(() => {
    dispatch(setCoffees(CoffeeData));
    setFilteredCoffees(CoffeeData);
  }, [dispatch]);

  const handleSearch = (term: string) => {
    if (term) {
      const filtered = coffees.filter(coffee =>
        coffee?.name?.toLowerCase()?.includes(term?.toLowerCase()) ||
        coffee?.category?.toLowerCase()?.includes(term?.toLowerCase())
      );
      setFilteredCoffees(filtered);
    } else {
      setFilteredCoffees(coffees);
    }
  };

  // Ensure unique categories with id
  const categories = Array.from(new Set(filteredCoffees?.map(coffee => coffee?.category)))
  ?.map((name, index) => ({ id: index, name }));

  const firstList = [...filteredCoffees]?.sort(() => 0.5 - Math.random());
  const secondList = [...filteredCoffees]?.sort(() => 0.5 - Math.random());
  const thirdList = [...filteredCoffees]?.sort(() => 0.5 - Math.random());

  return (
    <View style={styles.listContainer}>
      <CustomHeader
        title="İstanbul, Türkiye"
        rightIconName="filter"
        onRightIconPress={() => console.log("Cart pressed")}
        showBackButton={false}
      />
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Search onSearch={handleSearch} />
        {categories?.length > 0 && (
          <CategoryList categories={categories} />
        )}
        {filteredCoffees?.length > 0 ? (
          <>
            <ProductListHorizontal
              title={t("home.popularPromotionalProducts")}
              products={firstList}
            />
            <ProductListHorizontal
              title={t("home.topRatedProducts")}
              products={secondList}
            />
            <ProductListHorizontal
              title={t("home.todaysDeals")}
              products={thirdList}
            />
            <ProductListVertical
              products={thirdList}
              title={t("home.allProducts")}
              showFavoriButton
            />
          </>
        ) : (
          <View style={styles.noResultsContainer}>
            <Text>{t("home.emptyMessage")}</Text>
          </View>
        )}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  listContainer: {
    flex: 1,
    backgroundColor: 'white',
    paddingLeft:11,
  },
  scrollContainer: {
    flexGrow: 1,
    paddingBottom: 20,
  },
  noResultsContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 20,
  },
});

export default HomeScreen;
