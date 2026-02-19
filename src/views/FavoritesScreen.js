import React, { useCallback, useState } from "react";
import { Alert, FlatList, Text, TouchableOpacity, View } from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import NativeLocalStorage from "../../localStorage/NativeLocalStorage";
import { style_02 } from "../styles/style_02";

const FAVORITES_STORAGE_KEY = "@favorites_places";

export default function FavoritesScreen({ navigation }) {
  const [favorites, setFavorites] = useState([]);

  const onPressFavorite = (item) => {
    navigation.navigate("Places", {
      screen: "PlaceInfo",
      params: {
        placeId: item.placeId,
        cityName: item.cityName,
        categoryLabel: item.categoryLabel,
      },
    });
  };

  const loadFavorites = async () => {
    try {
      const stored = await NativeLocalStorage.getItem(FAVORITES_STORAGE_KEY);
      const data = stored ? JSON.parse(stored) : [];
      setFavorites(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error(error);
      setFavorites([]);
    }
  };

  const onPressRemoveFavorite = async (item) => {
    try {
      const updatedFavorites = favorites.filter(
        (favorite) => String(favorite.placeId) !== String(item.placeId),
      );

      await NativeLocalStorage.setItem(
        JSON.stringify(updatedFavorites),
        FAVORITES_STORAGE_KEY,
      );

      setFavorites(updatedFavorites);
      Alert.alert("Favoritos", "Se eliminó de favoritos");
    } catch (error) {
      console.error(error);
    }
  };

  useFocusEffect(
    useCallback(() => {
      loadFavorites();
    }, []),
  );

  return (
    <SafeAreaView style={style_02.fullContainer}>
      <View style={style_02.listHeaderContainer}>
        <Text style={style_02.listHeaderTitle}>Favoritos</Text>
        <Text style={style_02.listHeaderSubtitle}>
          {favorites.length} lugar(es) guardado(s)
        </Text>
      </View>

      {favorites.length === 0 ? (
        <View style={style_02.centeredContainerWithPadding}>
          <Text style={style_02.listHeaderSubtitle}>
            Aún no tienes lugares guardados
          </Text>
        </View>
      ) : (
        <FlatList
          data={favorites}
          keyExtractor={(item, index) => String(item.placeId || index)}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={style_02.listItemContainer}
              activeOpacity={0.8}
              onPress={() => onPressFavorite(item)}
            >
              <Text style={style_02.listItemTitle}>{item.name}</Text>
              <Text style={style_02.listItemSubtitle}>
                {item.cityName} · {item.categoryLabel}
              </Text>
              <Text style={style_02.listItemSubtitle}>{item.address}</Text>
              <Text style={style_02.listItemSubtitle}>
                Horario: {item.openingHours}
              </Text>
              <Text style={style_02.listItemSubtitle}>Tel: {item.phone}</Text>

              <TouchableOpacity
                style={style_02.removeFavoriteButton}
                onPress={() => onPressRemoveFavorite(item)}
              >
                <Text style={style_02.removeFavoriteButtonText}>
                  Quitar de favoritos
                </Text>
              </TouchableOpacity>
            </TouchableOpacity>
          )}
        />
      )}
    </SafeAreaView>
  );
}
