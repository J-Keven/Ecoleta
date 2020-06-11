import React from "react";
import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import MapView, { Marker } from "react-native-maps";
import { SvgUri } from "react-native-svg";
import { useNavigation } from "@react-navigation/native";
import styles from "./styles";

const Points = () => {
  const navigation = useNavigation();
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
              latitude: -23.6880534,
              longitude: -46.6555003,
              latitudeDelta: 0.015,
              longitudeDelta: 0.015,
            }}
          >
            <Marker
              coordinate={{ latitude: -23.6880534, longitude: -46.6555003 }}
            />
          </MapView>
        </View>
      </View>
      <View style={styles.itemsContainer}>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ paddingHorizontal: 20 }}
        >
          <TouchableOpacity style={styles.item} onPress={() => {}}>
            <SvgUri
              width={42}
              height={42}
              uri="http://192.168.0.34:3333/uploads/lampadas.svg"
            />
            <Text style={styles.itemTitle}>Lampadas</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.item} onPress={() => {}}>
            <SvgUri
              width={42}
              height={42}
              uri="http://192.168.0.34:3333/uploads/lampadas.svg"
            />
            <Text style={styles.itemTitle}>Lampadas</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.item} onPress={() => {}}>
            <SvgUri
              width={42}
              height={42}
              uri="http://192.168.0.34:3333/uploads/lampadas.svg"
            />
            <Text style={styles.itemTitle}>Lampadas</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.item} onPress={() => {}}>
            <SvgUri
              width={42}
              height={42}
              uri="http://192.168.0.34:3333/uploads/lampadas.svg"
            />
            <Text style={styles.itemTitle}>Lampadas</Text>
          </TouchableOpacity>
        </ScrollView>
      </View>
    </>
  );
};

export default Points;
