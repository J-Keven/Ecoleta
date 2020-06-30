import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, ScrollView, Image } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import MapView, { Marker } from "react-native-maps";
import { SvgUri } from "react-native-svg";
import { useNavigation, useRoute } from "@react-navigation/native";
import * as Location from "expo-location";

import api from "../../services/api";
import styles from "./styles";

interface ItemsProps {
  id: number;
  title: string;
  image: string;
  url: string;
}

interface PointsProps {
  id: number;
  name: string;
  whatsApp: string;
  email: string;
  image: string;
  latitude: number;
  longitude: number;
  uf: string;
  city: string;
  items: ItemsProps;
}
interface Params {
  uf: string;
  city: string;
}
const Points = () => {
  const navigation = useNavigation();
  const route = useRoute();

  const routeParams = route.params as Params;

  console.log();
  const [items, setItems] = useState<ItemsProps[]>([]);
  const [points, setPoints] = useState<PointsProps[]>([]);
  const [selectedItems, setSelectedItems] = useState<number[]>([]);

  const [initialPosition, setInitialPosition] = useState<[number, number]>([
    -23.6880534,
    -46.6555003,
  ]);

  const handleLoadItems = async () => {
    const { data } = await api.get<ItemsProps[]>("/items");
    setItems(data);
  };

  const handleInitialPosition = async () => {
    const { status } = await Location.requestPermissionsAsync();
    if (status !== "granted") {
      alert("Permission to access location was denied");
    } else {
      const { coords } = await Location.getCurrentPositionAsync();
      setInitialPosition([coords.latitude, coords.longitude]);
    }
  };

  const handleSelectdedItems = (id: number) => {
    const isExistId = selectedItems.findIndex((item) => item === id);
    if (isExistId < 0) {
      setSelectedItems([...selectedItems, id]);
    } else {
      const filteredItems = selectedItems.filter((item) => item !== id);

      setSelectedItems(filteredItems);
    }
  };

  useEffect(() => {
    if (items.length === 0) {
      handleLoadItems();
    }
  });

  useEffect(() => {
    api
      .get<PointsProps[]>("/point", {
        params: {
          uf: routeParams.uf,
          city: routeParams.city,
          items: selectedItems,
        },
      })
      .then(({ data }) => {
        setPoints(data);
      });
  }, [selectedItems]);

  useEffect(() => {
    handleInitialPosition();
  }, []);

  return (
    <>
      <View style={styles.container}>
        <View>
          <TouchableOpacity onPress={navigation.goBack}>
            <Feather name="arrow-left" size={24} color="#34CB79" />
          </TouchableOpacity>
          <Text style={styles.title}>
            <Ionicons name="ios-happy" size={24} color="#FFCC4D" /> Bem Vindo.
          </Text>
          <Text style={styles.description}>
            Encontre no mapa um ponto de coleta.
          </Text>
        </View>

        <View style={styles.mapContainer}>
          <MapView
            style={styles.map}
            initialRegion={{
              latitude: initialPosition[0],
              longitude: initialPosition[1],
              latitudeDelta: 0.015,
              longitudeDelta: 0.015,
            }}
          >
            {points.map((items) => {
              return (
                <Marker
                  key={items.id}
                  onPress={() => {
                    navigation.navigate("Detail", items);
                  }}
                  coordinate={{
                    latitude: items.latitude,
                    longitude: items.longitude,
                  }}
                >
                  <View style={styles.mapMarkerContainer}>
                    <Image
                      source={{
                        uri:
                          "https://images.unsplash.com/photo-1517243985121-d6ae97460078?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1500&q=80",
                      }}
                      style={styles.mapMarkerImage}
                    />

                    <Text style={styles.mapMarkerTitle}>{items.name}</Text>
                  </View>
                </Marker>
              );
            })}
          </MapView>
        </View>
      </View>
      <View style={styles.itemsContainer}>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ paddingHorizontal: 20 }}
        >
          {items.map((item) => {
            return (
              <TouchableOpacity
                style={[
                  styles.item,
                  selectedItems.includes(item.id) ? styles.selectedItem : {},
                ]}
                onPress={() => {
                  handleSelectdedItems(item.id);
                }}
                key={item.id}
              >
                <SvgUri width={42} height={42} uri={item.url} />
                <Text style={styles.itemTitle}>{item.title}</Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView>
      </View>
    </>
  );
};

export default Points;
