import React from "react";
import { View, Text } from "react-native";

export default function CityDetail({ route }) {
  const { ciudad } = route.params;

  return (
    <View style={{ padding: 20 }}>
      <Text style={{ fontSize: 26, fontWeight: "bold" }}>
        {ciudad.name}
      </Text>

      <Text>Accommodation: {ciudad.accommodation}</Text>
      <Text>Attraction: {ciudad.attraction}</Text>
      <Text>POI: {ciudad.poi}</Text>
      <Text>Restaurant: {ciudad.restaurant}</Text>
    </View>
  );
}
