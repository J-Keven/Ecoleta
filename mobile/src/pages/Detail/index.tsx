import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { Feather } from "@expo/vector-icons";
import styles from "./styles";
import { MaterialCommunityIcons } from "@expo/vector-icons";

interface ItemsProps {
  id: number;
  title: string;
  image: string;
  url: string;
}

interface DetailsProps {
  id: number;
  name: string;
  whatsApp: string;
  email: string;
  image: string;
  latitude: number;
  longitude: number;
  uf: string;
  city: string;
  // items: ItemsProps;
}

const Detail = () => {
  const navigation = useNavigation();
  const route = useRoute();

  const [params, setParams] = useState<DetailsProps>(
    route.params as DetailsProps
  );

  return (
    <View style={styles.container}>
      <View>
        <TouchableOpacity onPress={navigation.goBack}>
          <Feather name="arrow-left" size={24} color="#34CB79" />
        </TouchableOpacity>

        <Image
          style={styles.pointImage}
          source={{
            uri:
              "https://images.unsplash.com/photo-1517243985121-d6ae97460078?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1500&q=80",
          }}
        />
      </View>

      <View>
        <Text style={styles.pointName}>{params.name}</Text>
        <Text style={styles.pointItems}>
          Resíduos Eletrônicos, Lâmpadas, Pilhas e Baterias
        </Text>
      </View>

      <View style={styles.address}>
        <Text style={styles.addressTitle}>Endereço</Text>
        <Text style={styles.addressContent}>
          {params.city + ", " + params.uf}
        </Text>
      </View>

      <View style={styles.footer}>
        <TouchableOpacity style={styles.button}>
          <MaterialCommunityIcons name="whatsapp" size={24} color="#FFF" />

          <Text style={styles.buttonText}>WhatsApp</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button}>
          <MaterialCommunityIcons name="email-outline" size={24} color="#FFF" />

          <Text style={styles.buttonText}>E-Mail</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Detail;
