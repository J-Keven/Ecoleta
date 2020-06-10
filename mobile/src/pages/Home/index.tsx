import React from "react";
import { View, Text, ImageBackground, Image, TextInput } from "react-native";
import { Feather } from "@expo/vector-icons";
import { RectButton } from "react-native-gesture-handler";
import { useNavigation } from "@react-navigation/native";

import styles from "./styles";

const Home = () => {
  const navigation = useNavigation();

  return (
    <ImageBackground
      source={require("../../assets/home-background.png")}
      style={styles.container}
      imageStyle={{ width: 274, height: 368 }}
    >
      <View style={styles.main}>
        <Image source={require("../../assets/logo.png")} />
        <Text style={styles.title}>Seu marketplace de coleta de resíduos.</Text>
        <Text style={styles.description}>
          Ajudamos pessoas a encontrarem pontos de coleta de forma eficiente.
        </Text>
      </View>

      <TextInput style={styles.input} placeholder="selecione a cidade" />
      <TextInput style={styles.input} placeholder="selecione o estado" />

      <RectButton
        style={styles.button}
        onPress={() => {
          navigation.navigate("Points");
        }}
      >
        <View style={styles.buttonIcon}>
          <Feather name="arrow-right" size={24} color="#FFF" />
        </View>
        <Text style={styles.buttonText}>Entrar</Text>
      </RectButton>
    </ImageBackground>
  );
};

export default Home;
