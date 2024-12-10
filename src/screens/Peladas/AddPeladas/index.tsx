import {
  View,
  Text,
  StyleSheet,
  Image,
  FlatList,
  TouchableOpacity,
  TextInput,
} from "react-native";
import React from "react";
import { CaretLeft, Plus } from "phosphor-react-native";
import { useNavigation } from "@react-navigation/native";

type Props = {};
const array: string[] = ["Pelada ", "Pelada Quadrinha", "Fut dos Coroas"];
const AddPeladas = (props: Props) => {
  const navigation = useNavigation();
  const arrayJogadores = ["Lucas", "Pedro"];
  const handleBack = () => {
    navigation.goBack();
  };
  const handleNavigationAdd = () => navigation.navigate("AddPeladas");
  const handleNavigationStart = () => navigation.navigate("CriarPelada");
  const renderLista = ({ item }: { item: string }) => {
    return (
      <TouchableOpacity
        style={styles.touchable}
        onPress={() => handleNavigationStart()}
      >
        <Text style={styles.textList}>{item}</Text>
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
        <View style={styles.addContainer}></View>
      </View>
      <View style={styles.content}>
        <View style={styles.textContainer}>
          <Text style={styles.text}>Crie sua Pelada</Text>
        </View>
        <View style={styles.listContainer}>
          <View style={styles.campo}>
            <Text style={styles.textos}>Nome da pelada: </Text>
            <TextInput style={styles.input} />
          </View>
          <View style={styles.campo}>
            <Text style={styles.textos}>Quantos na linha: </Text>
            <TextInput style={styles.input} />
          </View>
          <View></View>
          <View style={styles.botaoEnviar}>
            <TouchableOpacity style={styles.botaoEnviar}>
              <Text style={styles.botaoText}>Criar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
};

export default AddPeladas;

const styles = StyleSheet.create({
  input: {
    backgroundColor: "#aa2834",
    width: "96%",
    borderRadius: 8,
    padding: 10,
    color: "white",
  },
  campo: {
    height: 70,
    backgroundColor: "#E1E1E6",
    borderRadius: 8,
    padding: 7,
    width: "98%",
  },
  textos: {
    fontWeight: "bold",
  },
  botaoEnviar: {
    backgroundColor: "#aa2834",
    height: 70,
    width: "70%",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 8,
  },
  botaoText: {
    color: "#E1E1E6",
    justifyContent: "center",
    alignItems: "center",
    fontWeight: "bold",
  },
  tela: {
    flex: 1,
    backgroundColor: "#22300b",
  },
  headerContainer: {
    width: "100%",
    height: 170,
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
    height: "75%",
    borderRadius: 8,
    padding: 15,
    gap: 15,
    alignItems: "center",
  },
  tituloContainer: {
    flexDirection: "row",
    alignContent: "center",
    justifyContent: "space-around",
    height: 25,
    width: "98%",
    backgroundColor: "#aa2834",
  },

  textContainer: {
    width: "88%",
    height: 100,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#E1E1E6",
    marginHorizontal: "6%",
    borderRadius: 8,
  },
  text: {
    color: "#22300b",
    fontSize: 20,
    fontWeight: "bold",
  },
  Content: {
    flex: 1,
    alignItems: "center",
    gap: 20,
  },

  list: {
    gap: 20,
  },
  touchable: {
    backgroundColor: "#E1E1E6",
    height: 60,
    padding: 10,
  },
  textList: {
    fontWeight: "bold",
    color: "#22300b",
  },
  emptyMessage: {
    color: "white",
    textAlign: "center",
    fontSize: 16,
  },
});
