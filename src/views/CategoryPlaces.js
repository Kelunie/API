import React, { useEffect, useState } from "react";
import {
  FlatList,
  SafeAreaView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import axios from "axios";
import { PATHPlaces } from "../components/config/config";
import { style_02 } from "../styles/style_02";

export default function CategoryPlaces({ route, navigation }) {
  const { cityName, categoryLabel, category } = route.params;
  const [places, setPlaces] = useState([]);

  const Obtener = async () => {
    try {
      axios
        .get(PATHPlaces, {
          params: {
            location: cityName,
            category,
          },
        })
        .then((response) => {
          const json = response.data;
          const data = Array.isArray(json) ? json : [];
          setPlaces(data.slice(0, 5));
        });
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    Obtener();
  }, []);

  const onPressPlace = (place) => {
    navigation.navigate("PlaceInfo", {
      placeId: place.id,
      cityName,
      categoryLabel,
    });
  };

  return (
    <SafeAreaView style={style_02.fullContainer}>
      <View style={style_02.listHeaderContainer}>
        <Text style={style_02.listHeaderTitle}>{categoryLabel}</Text>
        <Text style={style_02.listHeaderSubtitle}>
          {cityName} · Mostrando 5 lugares
        </Text>
      </View>

      <FlatList
        data={places}
        keyExtractor={(item) => String(item.id)}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => onPressPlace(item)}
            style={style_02.listItemContainer}
          >
            <Text style={style_02.listItemTitle}>{item.name}</Text>
            <Text style={style_02.listItemSubtitle}>
              {item.address || "Dirección no disponible"}
            </Text>
          </TouchableOpacity>
        )}
      />
    </SafeAreaView>
  );
}
