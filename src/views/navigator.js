import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import PlacesScreen from "../components/places";
import CityDetail from "./CityDetail";
import SearchScreen from "./search";

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

function PlacesStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="PlacesList"
        component={PlacesScreen}
        options={{ title: "Lugares" }}
      />
      <Stack.Screen
        name="CityDetail"
        component={CityDetail}
        options={{ title: "Detalle" }}
      />
    </Stack.Navigator>
  );
}

export default function Navigator() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: "#007AFF",
        tabBarInactiveTintColor: "#888",
      }}
    >
      <Tab.Screen
        name="Places"
        component={PlacesStack}
        options={{ tabBarLabel: "Lugares" }}
      />
      <Tab.Screen
        name="Search"
        component={SearchScreen}
        options={{ tabBarLabel: "Buscar" }}
      />
    </Tab.Navigator>
  );
}
