import AsyncStorage from "@react-native-async-storage/async-storage";

export const saveAsyncStorage = async (key: string, data: any) => {
  try {
    const jsonValue = JSON.stringify(data);
    await AsyncStorage.setItem(key, jsonValue);
  } catch (e) {
    console.error("AsyncStorage error: ", e);
  }
};

export const loadFromAsyncStorage = async (key: string) => {
  try {
    const jsonValue = await AsyncStorage.getItem(key);
    return jsonValue != null ? JSON.parse(jsonValue) : [];
  } catch (e) {
    console.error("AsyncStorage error: ", e);
    return [];
  }
};
