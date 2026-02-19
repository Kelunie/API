import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { MaterialIcons } from "@expo/vector-icons";

import PlacesScreen from "../components/places";
import CityDetail from "./CityDetail";
import CategoryPlaces from "./CategoryPlaces";
import PlaceInfo from "./PlaceInfo";
import SearchScreen from "./search";
import FavoritesScreen from "./FavoritesScreen";

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
      <Stack.Screen
        name="CategoryPlaces"
        component={CategoryPlaces}
        options={{ title: "Lugares" }}
      />
      <Stack.Screen
        name="PlaceInfo"
        component={PlaceInfo}
        options={{ title: "Detalle del lugar" }}
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
        options={{
          tabBarLabel: "Lugares",
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="place" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Search"
        component={SearchScreen}
        options={{
          tabBarLabel: "Buscar",
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="search" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Favorites"
        component={FavoritesScreen}
        options={{
          tabBarLabel: "Favorites Places",
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="favorite" color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}
