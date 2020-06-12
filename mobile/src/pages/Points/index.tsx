import React from "react";
import { View, Text, TouchableOpacity, ScrollView, Image } from "react-native";
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
              onPress={() => {
                navigation.navigate("Detail");
              }}
              coordinate={{ latitude: -23.6880534, longitude: -46.6555003 }}
            >
              <View style={styles.mapMarkerContainer}>
                <Image
                  source={{
                    uri:
                      "https://images.unsplash.com/photo-1517243985121-d6ae97460078?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1500&q=80",
                  }}
                  style={styles.mapMarkerImage}
                />

                <Text style={styles.mapMarkerTitle}>Mercado</Text>
              </View>
            </Marker>
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
