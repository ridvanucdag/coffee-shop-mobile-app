import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, Platform } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { useNavigation } from "@react-navigation/native";

interface CustomHeaderProps {
  title?: string;
  rightIconName?: string;
  onRightIconPress: () => void;
  showBackButton?: boolean;
  renderRightIcon?: () => React.ReactNode;
}

const CustomHeader: React.FC<CustomHeaderProps> = ({
  title,
  rightIconName,
  onRightIconPress,
  showBackButton,
  renderRightIcon,
}) => {
  const navigation = useNavigation();
  
  return (
    <View style={styles.headerContainer}>
      {showBackButton && (
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon
            style={styles.backIcon}
            name="arrow-back"
            size={21}
            color="black"
          />
        </TouchableOpacity>
      )}
      <Text
        style={[
          styles.headerTitle,
          showBackButton ? styles.titleWithBack : styles.titleWithoutBack,
        ]}
      >
        {title}
      </Text>
      <TouchableOpacity onPress={onRightIconPress}>
        {renderRightIcon ? (
          renderRightIcon()
        ) : (
          rightIconName && (
            <Icon name={rightIconName} size={25} color="black" />
          )
        )}
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    height: Platform.OS ==='ios' ? 25: 35,
    paddingHorizontal: 15,
    backgroundColor: "white",
    elevation: 2,
    shadowColor: "black",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 2,
  },
  backIcon: {
    marginLeft: 10,
  },
  headerTitle: {
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
    flex: 1,
    color: "#2F2D2C",
  },
  titleWithBack: {
    marginLeft: -10,
  },
  titleWithoutBack: {
    marginLeft: 35,
  },
});

export default CustomHeader;
