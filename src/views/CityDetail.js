import React from "react";
import { View, Text, Image, ScrollView, TouchableOpacity } from "react-native";
import { style_01 } from "../styles/style_01";

export default function CityDetail({ route, navigation }) {
  const { ciudad } = route.params;

  const items = [
    {
      icon: require("../img/iconos/hotel.png"),
      label: "Accommodation",
      value: ciudad.accommodation,
      apiCategory: "accommodation",
    },
    {
      icon: require("../img/iconos/attraction.png"),
      label: "Attraction",
      value: ciudad.attraction,
      apiCategory: "attraction",
    },
    {
      icon: require("../img/iconos/POI.png"),
      label: "POI",
      value: ciudad.poi,
      apiCategory: "poi",
    },
    {
      icon: require("../img/iconos/food-tray_3073820.png"),
      label: "Restaurant",
      value: ciudad.restaurant,
      apiCategory: "restaurant",
    },
  ];

  const onPressCategory = (item) => {
    navigation.navigate("CategoryPlaces", {
      cityName: ciudad.name,
      categoryLabel: item.label,
      category: item.apiCategory,
    });
  };

  const CardItem = ({ icon, label, value, onPress }) => (
    <TouchableOpacity style={style_01.cardItem} onPress={onPress}>
      <Image source={icon} style={style_01.cardIcon} />
      <Text style={style_01.cardLabel}>{label}</Text>
      <Text style={style_01.cardValue}>{value}</Text>
    </TouchableOpacity>
  );

  return (
    <ScrollView style={{ padding: 20 }}>
      {/* Título centrado */}
      <Text style={style_01.cityTitle}>{ciudad.name}</Text>

      <View style={style_01.listContainer}>
        {items.map((item) => (
          <CardItem
            key={item.label}
            icon={item.icon}
            label={item.label}
            value={item.value}
            onPress={() => onPressCategory(item)}
          />
        ))}
      </View>
    </ScrollView>
  );
}
