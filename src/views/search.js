import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  SafeAreaView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import axios from "axios";
import { Picker } from "@react-native-picker/picker";
import { PATHCiudades, PATHPlaces } from "../components/config/config";
import { style_02 } from "../styles/style_02";

const CATEGORIES = [
  { label: "Accommodation", value: "accommodation" },
  { label: "Attraction", value: "attraction" },
  { label: "POI", value: "poi" },
  { label: "Restaurant", value: "restaurant" },
];

export default function SearchScreen({ navigation }) {
  const [cities, setCities] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(CATEGORIES[0].value);
  const [selectedCity, setSelectedCity] = useState("");
  const [keyword, setKeyword] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadingCities, setLoadingCities] = useState(true);
  const [message, setMessage] = useState(
    "Selecciona filtros y presiona Buscar",
  );

  const ObtenerCiudades = async () => {
    try {
      setLoadingCities(true);
      const response = await axios.get(PATHCiudades);
      const json = response.data;
      const arr = Object.entries(json)
        .map(([name, stats]) => ({ name, ...stats }))
        .sort((a, b) => a.name.localeCompare(b.name));

      setCities(arr);
      if (arr.length > 0) {
        setSelectedCity(arr[0].name);
      }
    } catch (error) {
      console.error(error);
      setMessage("No se pudieron cargar las ciudades");
    } finally {
      setLoadingCities(false);
    }
  };

  useEffect(() => {
    ObtenerCiudades();
  }, []);

  const onPressSearch = async () => {
    if (!selectedCity) {
      setMessage("Selecciona una ciudad");
      return;
    }

    try {
      setLoading(true);
      setResults([]);

      const params = {
        category: selectedCategory,
        location: selectedCity,
      };

      if (keyword.trim()) {
        params.keyword = keyword.trim();
      }

      const response = await axios.get(PATHPlaces, { params });
      const data = Array.isArray(response.data) ? response.data : [];
      setResults(data);

      if (data.length === 0) {
        setMessage("No se encontraron resultados con esos filtros");
      }
    } catch (error) {
      console.error(error);
      setMessage("Hubo un error al buscar");
    } finally {
      setLoading(false);
    }
  };

  const onPressPlace = (place) => {
    const categoryLabel =
      CATEGORIES.find((item) => item.value === selectedCategory)?.label ||
      selectedCategory;

    navigation.navigate("Places", {
      screen: "PlaceInfo",
      params: {
        placeId: place.id,
        cityName: selectedCity,
        categoryLabel,
      },
    });
  };

  return (
    <SafeAreaView style={style_02.fullContainer}>
      <View style={style_02.searchContainer}>
        <Text style={style_02.searchLabel}>Categoría</Text>
        <View style={style_02.pickerWrapper}>
          <Picker
            selectedValue={selectedCategory}
            onValueChange={(value) => setSelectedCategory(value)}
          >
            {CATEGORIES.map((item) => (
              <Picker.Item
                key={item.value}
                label={item.label}
                value={item.value}
              />
            ))}
          </Picker>
        </View>

        <Text style={style_02.searchLabel}>Ciudad</Text>
        <View style={style_02.pickerWrapper}>
          <Picker
            enabled={!loadingCities && cities.length > 0}
            selectedValue={selectedCity}
            onValueChange={(value) => setSelectedCity(value)}
          >
            {cities.map((city) => (
              <Picker.Item
                key={city.name}
                label={city.name}
                value={city.name}
              />
            ))}
          </Picker>
        </View>

        <Text style={style_02.searchLabel}>Palabra clave</Text>
        <TextInput
          style={style_02.searchInput}
          placeholder="Ej: La Dolce Vita"
          value={keyword}
          onChangeText={setKeyword}
        />

        <TouchableOpacity style={style_02.searchButton} onPress={onPressSearch}>
          <Text style={style_02.searchButtonText}>Buscar</Text>
        </TouchableOpacity>
      </View>

      {loading || loadingCities ? (
        <View style={style_02.centeredContainerWithPadding}>
          <ActivityIndicator size="large" />
        </View>
      ) : results.length > 0 ? (
        <FlatList
          data={results}
          keyExtractor={(item, index) => String(item.id || index)}
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
      ) : (
        <View style={style_02.centeredContainerWithPadding}>
          <Text style={style_02.listHeaderSubtitle}>{message}</Text>
        </View>
      )}
    </SafeAreaView>
  );
}
