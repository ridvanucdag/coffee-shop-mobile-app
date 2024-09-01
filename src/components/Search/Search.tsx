import React, { useState } from 'react';
import { View, TextInput, StyleSheet } from 'react-native';
import Icon from "react-native-vector-icons/Ionicons";


type SearchProps = {
  onSearch: (term: string) => void;
};

const Search: React.FC<SearchProps> = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState<string>('');

  const handleSearch = (text: string) => {
    setSearchTerm(text);
    onSearch(text);
  };

  return (
    <View style={styles.container}>
      <Icon name="search" size={20} color="black" style={styles.icon} />
      <TextInput
        style={styles.input}
        placeholder="Sevdiğin Kahveyi Ara.."
        placeholderTextColor="#888"
        value={searchTerm}
        onChangeText={handleSearch}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
    borderRadius: 50,
    marginRight: 20,
    marginLeft:10,
    marginTop: 15,
    borderColor: '#C2C2C2',
    borderWidth: 1,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
  },
  icon: {
    marginRight: 10,
    marginLeft: 10,
    color: '#80A896',
  },
  input: {
    flex: 1,
    height: 35,
    fontSize: 14,
    color: '#03532B',
  },
});

export default Search;
