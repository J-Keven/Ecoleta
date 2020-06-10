import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import MapView from "react-native-maps";

import { useNavigation } from "@react-navigation/native";
import styles from "./styles";

const Points = () => {
  const navigation = useNavigation();
  return (
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
        <MapView style={styles.map} />
      </View>

      <View style={styles.itemsContainer}></View>
    </View>
  );
};

export default Points;
