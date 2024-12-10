import {
  View,
  Text,
  StyleSheet,
  Image,
  FlatList,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useState } from "react";
import { CaretLeft, Plus } from "phosphor-react-native";
import { useNavigation } from "@react-navigation/native";
import { Peladas } from "../../../@types/peladas";
import styles from "./style";

// import firestore from "@react-native-firebase/firestore";

type Props = {};

const MinhasPeladas = (props: Props) => {
  const navigation = useNavigation();
  //   const [peladasList, setPeladasList] = useState<Peladas[]>([]);
  const array: Peladas[] = [
    { name: "pelada CONTRA", contra: true, quantos: 5, regra: "1" },
    { name: "pelada PROX", contra: false, quantos: 5, regra: "1" },
  ];

  //   useEffect(() => {
  //     const fetchPeladas = async () => {
  //       try {
  //         const peladasSnapshot = await firestore().collection("Peladas").get();
  //         const peladasArray = peladasSnapshot.docs.map((doc) => ({
  //           id: doc.id,
  //           ...doc.data(),
  //         }));
  //         setPeladasList(peladasArray);
  //         console.log("Peladas List:", peladasArray); // Adicionando console.log
  //       } catch (error) {
  //         console.error("Erro ao buscar dados: ", error);
  //       }
  //     };
  //     fetchPeladas();
  //   }, []);

  const handleBack = () => {
    navigation.goBack();
  };
  const handleNavigationAdd = () => navigation.navigate("AddPeladas");
  const handleNavigationStart = (
    name: string,
    contra: boolean,
    quantos: number,
    regra: string
  ) => navigation.navigate("CriarPelada", { name, contra, quantos, regra });
  const renderLista = ({ item, index }: { item: Peladas; index: number }) => {
    return (
      <TouchableOpacity
        style={styles.touchable}
        onPress={() =>
          handleNavigationStart(
            item.name,
            item.contra,
            item.quantos,
            item.regra
          )
        }
      >
        <Text style={styles.textList}>{item.name}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.tela}>
      <View style={styles.headerContainer}>
        <View style={styles.backContainer}>
          <TouchableOpacity
            onPress={() => {
              handleBack();
            }}
          >
            <CaretLeft color="white" />
          </TouchableOpacity>
        </View>
        <Image
          style={styles.img}
          tintColor={"white"}
          source={require("../../../assets/soccer.png")}
        />
        <View style={styles.addContainer}>
          <TouchableOpacity onPress={handleNavigationAdd}>
            <Plus color="white" />
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.content}>
        <View style={styles.textContainer}>
          <Text style={styles.text}>Escolha a pelada</Text>
        </View>
        <View style={styles.listContainer}>
          {array.length === 0 ? (
            <Text style={styles.emptyMessage}>
              Não há peladas adicionadas ainda
            </Text>
          ) : (
            <FlatList
              style={styles.list}
              data={array}
              renderItem={renderLista}
              keyExtractor={(item) => item.name}
              ItemSeparatorComponent={() => <View style={{ height: 15 }} />}
            />
          )}
        </View>
      </View>
    </View>
  );
};

export default MinhasPeladas;
