import React from "react";
import {
  Image,
  View,
  Text,
  Touchable,
  TouchableOpacity,
  ImageBackground,
} from "react-native";
// import database from "@react-native-firebase/database";
import styles from "./styles";
import { useNavigation } from "@react-navigation/native";
import { useEffect, useState } from "react";
import backGround from "../../../assets/campo.jpg";
type Props = {};

const Home = (props: Props) => {
  const navigation = useNavigation();
  const handleNavigateEstatistica = () => {
    navigation.navigate("ListaEstatistica");
  };
  const handleNavigatePeladas = () => {
    navigation.navigate("MinhasPeladas");
  };

  return (
    <ImageBackground source={backGround} style={styles.container}>
      <View style={styles.logoContainer}>
        <Image
          style={styles.logo}
          tintColor={"white"}
          source={require("../../../assets/soccer.png")}
        />
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.text}>Bem vindo!</Text>
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={handleNavigatePeladas}>
          <Text>Minhas Peladas</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={handleNavigateEstatistica}
        >
          <Text>Estatíticas</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
};

export default Home;
