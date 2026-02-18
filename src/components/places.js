import React, { useEffect, useState } from "react";
import {
  FlatList,
  SafeAreaView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import axios from "axios";
import { PATHCiudades } from "./config/config";

const PlacesScreen = (props) => {
  const nav = props.navigation;
  const [data, setData] = useState([]);

  const Obtener = () => {
    try {
      axios.get(PATHCiudades).then((response) => {
        const json = response.data;
        const arr = Object.entries(json).map(([name, stats]) => ({
          name,
          ...stats,
        }));
        setData(arr);
      });
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    Obtener();
  }, []);

  const onPressViewPlace = (lugar) => {
    nav.navigate("CityDetail", { ciudad: lugar });
  };

  return (
    <SafeAreaView>
      <FlatList
        data={data}
        keyExtractor={({ name }, index) => name}
        renderItem={({ item }) => (
          <TouchableOpacity
            key={item.name}
            style={{ padding: 20, borderBottomWidth: 1 }}
            onPress={() => onPressViewPlace(item)}
          >
            <View>
              <Text style={{ fontSize: 18 }}>{item.name}</Text>
            </View>
          </TouchableOpacity>
        )}
      />
    </SafeAreaView>
  );
};

export default PlacesScreen;
