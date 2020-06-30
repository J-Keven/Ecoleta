import React, { useState, useEffect } from "react";
import { View, Text, ImageBackground, Image, TextInput } from "react-native";
import { Feather } from "@expo/vector-icons";
import { RectButton } from "react-native-gesture-handler";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import styles from "./styles";

// interface ResponseIBGEUf {
//   id: number;
//   sigla: string;
//   nome: string;
// }

// interface UfsProps {
//   id: number;
//   initials: string;
//   name: string;
// }

const Home = () => {
  const navigation = useNavigation();

  // const [ibgeUfs, setIbgeUfs] = useState<UfsProps[]>([]);

  // const handleLoadUfs = async () => {
  //   const { data } = await axios.get<ResponseIBGEUf[]>(
  //     "https://servicodados.ibge.gov.br/api/v1/localidades/estados"
  //   );

  //   const responseUfs = data.map((item) => {
  //     return {
  //       id: item.id,
  //       name: item.nome,
  //       initials: item.sigla,
  //     };
  //   });

  //   setIbgeUfs(responseUfs);
  // };
  const [uf, setUf] = useState("");
  const [city, setCity] = useState("");

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

      <TextInput
        style={styles.input}
        placeholder="selecione a cidade"
        value={city}
        onChangeText={setCity}
        autoCorrect={false}
      />
      <TextInput
        style={styles.input}
        placeholder="selecione o estado"
        value={uf}
        onChangeText={setUf}
        maxLength={2}
        autoCorrect={false}
      />

      <RectButton
        style={styles.button}
        onPress={() => {
          navigation.navigate("Points", {
            city: city.toLowerCase(),
            uf: uf.toUpperCase(),
          });
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
