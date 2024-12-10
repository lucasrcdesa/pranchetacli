import {
  View,
  Text,
  StyleSheet,
  Image,
  FlatList,
  TouchableOpacity,
} from "react-native";
import React from "react";
import { CaretLeft } from "phosphor-react-native";
import { useNavigation } from "@react-navigation/native";
import { Jogadores } from "../ListaEstatistica";

type Props = {};

const TabelaEstatistica = (props: Props) => {
  const navigation = useNavigation();
  const arrayJogadores: Jogadores[] = [
    { name: "Lucas", gols: 2, assists: 3, cadastrado: true, vitorias: 8 },
  ];

  const handleBack = () => {
    navigation.goBack();
  };

  const renderList = ({ item }: { item: Jogadores }) => {
    return (
      <View style={styles.text}>
        <Text>{item.name} </Text>
        <Text>{item.gols}</Text>
        <Text>{item.assists}</Text>
        <Text>{item.vitorias}</Text>
      </View>
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
        <View style={styles.addContainer}></View>
      </View>
      <View style={styles.content}>
        <View style={styles.listContainer}>
          <View style={styles.tituloContainer}>
            <Text style={styles.textion}>Nome </Text>
            <Text style={styles.textion}>Gols</Text>
            <Text style={styles.textion}>Assists</Text>
            <Text style={styles.textion}>Vitorias</Text>
          </View>

          <FlatList
            data={arrayJogadores}
            renderItem={renderList}
            keyExtractor={(_, index) => index.toString()}
            ItemSeparatorComponent={() => <View style={{ height: 5 }} />}
          />
        </View>
      </View>
    </View>
  );
};

export default TabelaEstatistica;

const styles = StyleSheet.create({
  tela: {
    flex: 1,
    backgroundColor: "#22300b",
  },
  headerContainer: {
    width: "100%",
    height: 200,
    justifyContent: "space-around",
    alignItems: "center",
    flexDirection: "row",
  },
  addContainer: {
    height: 35,
    width: 35,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 8,
  },
  //   width: 100%;
  // height:200px;
  // justify-content: space-around;
  // align-items: center;
  // flex-direction: row;
  backContainer: {
    backgroundColor: "#344d0e",
    height: 35,
    width: 35,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 8,
  },
  img: {
    width: 70,
    height: 70,
  },
  content: {
    flex: 1,
    alignItems: "center",
  },
  listContainer: {
    backgroundColor: "#344d0e",
    width: "88%",
    height: "80%",
    borderRadius: 8,
    padding: 15,
  },
  tituloContainer: {
    flexDirection: "row",
    alignContent: "center",
    justifyContent: "space-around",
    height: 25,
    width: "98%",
    backgroundColor: "#aa2834",
  },
  text: {
    backgroundColor: "white",
    height: 25,
    justifyContent: "space-around",
    alignItems: "center",
    flexDirection: "row",
    width: "98%",
    borderWidth: 1,
  },
  textion: {
    fontWeight: "bold",
    color: "#E1E1E6",
  },
});
