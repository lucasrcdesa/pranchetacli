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
import { useNavigation, useRoute } from "@react-navigation/native";
import { Jogadores } from "../../../@types/jogadores";

type Props = {};

const TabelaRolando = (props: Props) => {
  const navigation = useNavigation();
  const arrayJogadores = ["Lucas", "Pedro"];
  const route = useRoute();
  const { jogadores }: { jogadores: Jogadores[] } = route.params;
  const handleBack = () => {
    navigation.goBack();
  };

  const handleNavigationRolando = () => {
    navigation.pop(3);
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
            data={jogadores}
            renderItem={renderList}
            keyExtractor={(_, index) => index.toString()}
            ItemSeparatorComponent={() => <View style={{ height: 5 }} />}
          />
        </View>
        <View style={styles.botaoContainer}>
          <TouchableOpacity
            style={styles.botao}
            onPress={handleNavigationRolando}
          >
            <Text style={styles.textBotao}>Encerrar Pelada</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default TabelaRolando;

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
    width: "85%",
    height: 450,
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
  botaoContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  botao: {
    height: "70%",
    width: 200,
    backgroundColor: "#aa2834",
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  textBotao: {
    color: "white",
    fontWeight: "bold",
  },
});
