import React, { useState } from 'react';
import Icon from "react-native-vector-icons/Ionicons";
import { View, FlatList, Text, StyleSheet, TouchableOpacity } from 'react-native';

export interface MenuListType {
  id: number;
  name: string;
  leftIconName: string;
}

interface MenuListProps {
  categories: MenuListType[];
}

const MenuList: React.FC<MenuListProps> = ({ categories }) => {
  const [selectedCategoryId, setSelectedCategoryId] = useState<number | null>(null);

  const renderItem = ({ item }: { item: MenuListType }) => {
    const isSelected = item?.id === selectedCategoryId;

    return (
      <TouchableOpacity
        style={[styles.categoryContainer, isSelected && styles.selectedCategory]}
        onPress={() => setSelectedCategoryId(item?.id)}
      >
        <View style={styles.itemContent}>
          {item?.leftIconName && (
            <Icon name={item?.leftIconName} size={18} color={isSelected ? "white" : "#303336"} />
          )}
          <Text
            style={[styles.categoryText, isSelected && styles.selectedText]}
            numberOfLines={1}
            ellipsizeMode="clip"
          >
            {item.name}
          </Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={categories}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        showsHorizontalScrollIndicator={false}
        horizontal
        contentContainerStyle={styles.listContainer}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: 20,
    paddingBottom: 10,
  },
  listContainer: {
    paddingHorizontal: 10,
  },
  categoryContainer: {
    flexDirection: 'row',
    marginRight: 10,
    borderRadius: 20,
    width: 130,
    alignItems: 'center',
    padding: 6,
    paddingLeft: 8,
    borderWidth: 1,
  },
  itemContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  categoryText: {
    fontSize: 12,
    fontWeight: 'bold',
    textAlign: 'center',
    marginLeft: 2,
    color: '#303336',
  },
  selectedCategory: {
    backgroundColor: '#00582F',
    borderRadius: 30,
    borderWidth: 1,
    borderColor: 'white',
  },
  selectedText: {
    color: '#fff',
  },
});

export default MenuList;
