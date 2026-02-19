import React, { useEffect, useState } from "react";
import {
  Alert,
  Linking,
  ScrollView,
  Text,
  TouchableOpacity,
} from "react-native";
import axios from "axios";
import NativeLocalStorage from "../../localStorage/NativeLocalStorage";
import { PATHPlaceDetails } from "../components/config/config";
import { style_02 } from "../styles/style_02";

const FAVORITES_STORAGE_KEY = "@favorites_places";

export default function PlaceInfo({ route }) {
  const { placeId, cityName, categoryLabel } = route.params;
  const [detail, setDetail] = useState({});
  const [isSaved, setIsSaved] = useState(false);

  const Obtener = async () => {
    try {
      axios
        .get(PATHPlaceDetails, {
          params: { id: placeId },
        })
        .then((response) => {
          const json = response.data;
          setDetail(json);
        });
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    Obtener();
  }, []);

  const loadSavedState = async () => {
    try {
      const stored = await NativeLocalStorage.getItem(FAVORITES_STORAGE_KEY);
      const favorites = stored ? JSON.parse(stored) : [];
      const exists = favorites.some(
        (item) => String(item.placeId) === String(placeId),
      );
      setIsSaved(exists);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    loadSavedState();
  }, [placeId]);

  const getDescription = () => {
    if (!detail.description) return "No disponible";
    return (
      detail.description.es ||
      detail.description.en ||
      detail.description.unidentified ||
      Object.values(detail.description).find(
        (value) => value && String(value).trim(),
      ) ||
      "No disponible"
    );
  };

  const openingHours =
    detail.opening_hours || detail.openingHours || "No disponible";
  const phone =
    detail.international_phone_number || detail.phone_number || "No disponible";
  const email = detail.email || detail.mail || detail.contact_email || "";

  const website = detail?.website || "";
  const mapUrl =
    detail?.lat && detail?.lng
      ? `https://www.google.com/maps/search/?api=1&query=${detail.lat},${detail.lng}`
      : "";

  const openUrl = async (url) => {
    if (!url) return;
    const canOpen = await Linking.canOpenURL(url);
    if (canOpen) {
      await Linking.openURL(url);
    }
  };

  const onPressSaveFavorite = async () => {
    try {
      const stored = await NativeLocalStorage.getItem(FAVORITES_STORAGE_KEY);
      const favorites = stored ? JSON.parse(stored) : [];

      const favoriteItem = {
        placeId,
        name: detail.name || "Sin nombre",
        cityName,
        categoryLabel,
        address: detail.address || "Dirección no disponible",
        openingHours,
        phone,
        email: email || "No disponible",
        website: website || "No disponible",
        savedAt: new Date().toISOString(),
      };

      const updatedFavorites = [
        favoriteItem,
        ...favorites.filter((item) => String(item.placeId) !== String(placeId)),
      ];

      await NativeLocalStorage.setItem(
        JSON.stringify(updatedFavorites),
        FAVORITES_STORAGE_KEY,
      );

      setIsSaved(true);
      Alert.alert("Favoritos", "Lugar guardado correctamente");
    } catch (error) {
      console.error(error);
      Alert.alert("Favoritos", "No se pudo guardar el lugar");
    }
  };

  return (
    <ScrollView style={style_02.detailContainer}>
      <Text style={style_02.detailTitle}>{detail.name}</Text>
      <Text style={style_02.detailSubtitle}>
        {cityName} · {categoryLabel}
      </Text>

      <Text style={style_02.sectionTitle}>Descripción</Text>
      <Text style={style_02.sectionText}>{getDescription()}</Text>

      <Text style={style_02.sectionTitle}>Horario de apertura</Text>
      <Text style={style_02.sectionText}>{openingHours}</Text>

      <Text style={style_02.sectionTitle}>Dirección</Text>
      <Text style={style_02.sectionText}>
        {detail.address || "No disponible"}
      </Text>

      <Text style={style_02.sectionTitle}>Contacto</Text>
      <Text style={style_02.sectionText}>Teléfono: {phone}</Text>
      <Text style={style_02.sectionTextCompact}>
        Correo: {email || "No disponible"}
      </Text>

      <Text style={style_02.sectionTitle}>Enlaces</Text>

      {website ? (
        <TouchableOpacity
          style={style_02.linkButton}
          onPress={() => openUrl(website)}
        >
          <Text style={style_02.linkText}>Abrir sitio web</Text>
        </TouchableOpacity>
      ) : (
        <Text style={style_02.linkButton}>Sitio web: No disponible</Text>
      )}

      {phone !== "No disponible" && (
        <TouchableOpacity
          style={style_02.linkButton}
          onPress={() => openUrl(`tel:${phone}`)}
        >
          <Text style={style_02.linkText}>Llamar</Text>
        </TouchableOpacity>
      )}

      {email ? (
        <TouchableOpacity
          style={style_02.linkButton}
          onPress={() => openUrl(`mailto:${email}`)}
        >
          <Text style={style_02.linkText}>Enviar correo</Text>
        </TouchableOpacity>
      ) : (
        <Text style={style_02.linkButton}>Correo: No disponible</Text>
      )}

      {mapUrl ? (
        <TouchableOpacity
          style={style_02.linkButtonBottom}
          onPress={() => openUrl(mapUrl)}
        >
          <Text style={style_02.linkText}>Ver en mapa</Text>
        </TouchableOpacity>
      ) : (
        <Text style={style_02.bottomText}>Mapa: No disponible</Text>
      )}

      <TouchableOpacity
        style={style_02.saveFavoriteButton}
        onPress={onPressSaveFavorite}
      >
        <Text style={style_02.saveFavoriteButtonText}>
          {isSaved ? "Actualizado en favoritos" : "Agregar a favoritos"}
        </Text>
      </TouchableOpacity>
    </ScrollView>
  );
}
