import React, { useEffect, useState } from "react";
import {
  View,
  ScrollView,
  Text,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import axios from "axios";
import { PATHURL } from "./config/config";

export default function PlacesScreen({ navigation }) {
  const [lugares, setLugares] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPlaces = async () => {
      try {
        const response = await axios.get(`${PATHURL}getPlacesStatistics`);
        const data = response.data;

        const arr = Object.entries(data).map(([name, stats]) => ({
          name,
          ...stats,
        }));

        setLugares(arr);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchPlaces();
  }, []);

  if (loading) {
    return (
      <View style={{ flex:1, justifyContent:"center", alignItems:"center" }}>
        <ActivityIndicator size="large" />
        <Text>Cargando...</Text>
      </View>
    );
  }

  return (
    <ScrollView>
      {lugares.map((lugar, idx) => (
        <TouchableOpacity
          key={idx}
          style={{ padding: 20, borderBottomWidth: 1 }}
          onPress={() =>
            navigation.navigate("CityDetail", { ciudad: lugar })
          }
        >
          <Text style={{ fontSize: 18 }}>{lugar.name}</Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
}
