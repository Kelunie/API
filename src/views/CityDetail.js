import React from "react";
import { View, Text, Image, ScrollView } from "react-native";
import { style_01 } from "../styles/style_01";

export default function CityDetail({ route }) {
  const { ciudad } = route.params;

  const items = [
    {
      icon: require("../img/iconos/hotel.png"),
      label: "Accommodation",
      value: ciudad.accommodation,
    },
    {
      icon: require("../img/iconos/attraction.png"),
      label: "Attraction",
      value: ciudad.attraction,
    },
    {
      icon: require("../img/iconos/POI.png"),
      label: "POI",
      value: ciudad.poi,
    },
    {
      icon: require("../img/iconos/food-tray_3073820.png"),
      label: "Restaurant",
      value: ciudad.restaurant,
    },
  ];

  const CardItem = ({ icon, label, value }) => (
    <View style={style_01.cardItem}>
      <Image source={icon} style={style_01.cardIcon} />
      <Text style={style_01.cardLabel}>{label}</Text>
      <Text style={style_01.cardValue}>{value}</Text>
    </View>
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
          />
        ))}
      </View>
    </ScrollView>
  );
}
