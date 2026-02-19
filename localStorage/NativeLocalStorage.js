import AsyncStorage from "@react-native-async-storage/async-storage";

const NativeLocalStorage = {
  async getItem(key) {
    return AsyncStorage.getItem(key);
  },

  async setItem(value, key) {
    await AsyncStorage.setItem(key, value);
  },

  async removeItem(key) {
    await AsyncStorage.removeItem(key);
  },

  async clear() {
    await AsyncStorage.clear();
  },
};

export default NativeLocalStorage;
