import React from "react";
import {
  View,
  FlatList,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import {
  clearCart,
  updateQuantity,
} from "@/src/redux/slices/basketSlice";
import { useTranslation } from "react-i18next";
import { RootState } from "@/src/redux/store";
import CustomHeader from "@/src/components/CustomHeader";
import ToggleSwitch from "@/src/components/ToggleSwitch/ToggleSwitch";
import MenuList, { MenuListType } from "./MenuList";
import { Coffee } from "@/src/type/coffee";

const BasketScreen = () => {
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const handleIncrease = (id: string) => {
    dispatch(updateQuantity({ id, quantity: 1 }));
  };

  const handleDecrease = (id: string) => {
    dispatch(updateQuantity({ id, quantity: -1 }));
  };


  const handleClearCart = () => {
    dispatch(clearCart());
  };
  const handleCompleteOrder = () => {
    console.log("Sipariş Tamamlandı!");
  };

  const addressOptions: MenuListType[] = [
    { id: 1, leftIconName: "create-outline", name: "Adresi düzenle" },
    { id: 2, leftIconName: "add-circle-outline", name: "Not ekle" },
];

  // Calculate total price and quantity
  const totalPrice = cartItems?.reduce((total, item) => {
    const itemTotal = item?.quantity * item?.prices?.[0]?.price || 0;
    return total + itemTotal;
  }, 0);

  const courierFee = 25.0;
  const discount = 20.0;

  const finalTotal = totalPrice + courierFee - discount;

  const renderItem = ({ item }: { item: Coffee }) => (
    <View style={styles.card}>
      <View style={styles.imageContainer}>
        {item?.imagelink && (
          <Image
            source={item?.imagelink}
            style={styles.image}
            resizeMode="cover"
          />
        )}
      </View>
      <View style={styles.infoContainer}>
        <Text style={styles.itemName}>{item?.name}</Text>
        <View style={styles.sizePriceContainer}>
          <Text style={styles.sizeText}>{item?.prices?.[0]?.size}</Text>
          <Text style={styles.priceText}>{item?.prices?.[0]?.price} TL</Text>
        </View>
        <View style={styles.quantityContainer}>
          <TouchableOpacity
            style={styles.quantityButton}
            onPress={() => handleDecrease(item?.id)}
          >
            <Text style={styles.buttonText}>-</Text>
          </TouchableOpacity>
          <Text style={styles.quantity}>{item?.quantity}</Text>
          <TouchableOpacity
            style={styles.quantityButton}
            onPress={() => handleIncrease(item?.id)}
          >
            <Text style={styles.buttonText}>+</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );

  return (
    <View style={{ flex: 1, backgroundColor: "#fff" }}>
      <CustomHeader
        title={t("basket.title")}
        rightIconName={cartItems?.length ? "trash" : ""}
        onRightIconPress={handleClearCart}
        showBackButton={true}
      />
      {cartItems.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyMessage}>{t("basket.emptyMessage")}</Text>
        </View>
      ) : (
        <>
          <View style={styles.toggleContainer}>
            <ToggleSwitch />
          </View>
          <View style={styles.addressContainer}>
            <Text style={styles.addressTitle}>{t("basket.delivery")}</Text>
            <Text style={styles.addressText}>
              Dnm. Deneme No. 1620, Maltepe, İstanbul, Türkiye.
            </Text>
          </View>
          <MenuList categories={addressOptions} />
          <View style={styles.underline} />

          <FlatList
            data={cartItems}
            renderItem={renderItem}
            keyExtractor={(item) => item?.id?.toString()}
            ListFooterComponent={
              <>
                <View style={styles.summaryContainer}>
                  <Text style={styles.summaryTitle}>{t("basket.cartSummary")}</Text>
                  <View style={styles.summaryRow}>
                    <Text style={styles.summaryText}>{t("basket.cartFee")}</Text>
                    <Text style={styles.summaryAmount}>
                      {totalPrice.toFixed(2)} TL
                    </Text>
                  </View>
                  <View style={styles.summaryRow}>
                    <Text style={styles.summaryText}>{t("basket.courierFee")}</Text>
                    <Text style={styles.summaryAmount}>
                      {courierFee.toFixed(2)} TL
                    </Text>
                  </View>
                  <View style={styles.summaryRow}>
                    <Text style={[styles.summaryText, styles.discountText]}>
                    {t("basket.discount")}
                    </Text>
                    <Text style={[styles.summaryAmount, styles.discountAmount]}>
                      {discount.toFixed(2)} TL
                    </Text>
                  </View>
                  <View style={styles.underline} />
                  <View style={styles.summaryRowTotal}>
                    <Text style={styles.summaryTotal}>{t("basket.totalFee")}</Text>
                    <Text style={styles.summaryTotalAmount}>
                      {finalTotal?.toFixed(2)} TL
                    </Text>
                  </View>
                </View>
                <View style={styles.underline} />
                <TouchableOpacity
                  style={styles.completeOrderButton}
                  onPress={handleCompleteOrder}
                >
                  <Text style={styles.completeOrderButtonText}>
                  {t("basket.completeOrder")}
                  </Text>
                </TouchableOpacity>
              </>
            }
            contentContainerStyle={
              cartItems?.length === 0 ? styles.emptyContent : undefined
            }
          />
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  toggleContainer: {
    alignItems: "center",
    padding: 10,
    backgroundColor: "#fff",
  },
  addressContainer: {
    paddingLeft: 20,
    paddingTop: 10,
  },
  addressText: {
    fontSize: 13,
    color: "#808080",
  },
  addressTitle: {
    fontSize: 14,
    color: "#808080",
    fontWeight:'bold',
    marginBottom:3,
  },
  card: {
    flexDirection: "row",
    alignItems: "center",
    padding: 15,
    borderRadius: 8,
    marginBottom: 6,
    marginHorizontal: 16,
    height: 55,
  },
  imageContainer: {
    flex: 0,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 10,
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 5,
  },
  infoContainer: {
    flex: 1,
  },
  itemName: {
    fontSize: 14,
    fontWeight: "bold",
    marginTop: -10,
  },
  sizePriceContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 4,
  },
  sizeText: {
    fontSize: 14,
    color: "#808080",
    marginRight: 4,
  },
  priceText: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#2F2D2C",
  },
  quantityContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
  },
  quantity: {
    marginHorizontal: 10,
    fontSize: 18,
    marginTop: -40,
  },
  quantityButton: {
    backgroundColor: "#fff",
    width: 20,
    height: 20,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
    marginTop: -40,
    borderWidth: 1,
    borderColor: "#2F2D2C",
  },
  buttonText: {
    color: "#2F2D2C",
    fontSize: 14,
  },
  underline: {
    height: 1,
    backgroundColor: "#EAEAEA",
    marginTop: 6,
    marginBottom: 16,
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
  empty: {
    fontSize: 18,
    color: "#666",
  },
  emptyContent: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  summaryContainer: {
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: "#e7e7e7",
    backgroundColor: "#fff",
  },
  summaryTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  summaryRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 4,
  },
  summaryText: {
    fontSize: 16,
    color: "#2F2D2C",
  },
  summaryAmount: {
    fontSize: 16,
    color: "#2F2D2C",
  },
  summaryTotalAmount: {
    fontSize: 16,
    color: "#2F2D2C",
    fontWeight: "bold",
  },
  discountText: {
    textDecorationLine: "line-through",
    color: "green",
  },
  summaryRowTotal: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 4,
  },
  discountAmount: {
    textDecorationLine: "line-through",
    color: "green",
  },
  summaryTotal: {
    fontSize: 16,
    fontWeight: "bold",
  },
  completeOrderButton: {
    backgroundColor: "#E15A06",
    paddingVertical: 15,
    borderRadius: 25,
    marginHorizontal: 16,
    marginBottom: 20,
    alignItems: "center",
  },
  completeOrderButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default BasketScreen;
