import {
  View,
  Text,
  StyleSheet,
  Image,
  FlatList,
  TouchableOpacity,
  TextInput,
  TouchableWithoutFeedback,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import React, { useState } from "react";
import { CaretLeft, Plus, Trash } from "phosphor-react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import styles from "./style";
import { Jogadores } from "../../../@types/jogadores";
import { Peladas } from "../../../@types/peladas";

type Props = {};

const CriarPelada = (props: Props) => {
  const navigation = useNavigation();
  const route = useRoute();
  const { name, contra, quantos, regra } = route.params;
  const peladaSelecionada: Peladas = {
    name: name,
    contra: contra,
    quantos: quantos,
    regra: regra,
  };

  const [arrayJogadores, setArrayJogadores] = useState<Jogadores[]>([]);
  const [jogadoresName, setJogadoresName] = useState("");

  const handleBack = () => {
    navigation.goBack();
  };

  const handleAddJogador = () => {
    setArrayJogadores([
      ...arrayJogadores,
      {
        name: jogadoresName.trim(),
        gols: 0,
        assists: 0,
        vitorias: 0,
        cadastrado: false,
      },
    ]);
    setJogadoresName("");
  };

  const handleNavigationAdd = () => {
    if (arrayJogadores.length === 0) {
      alert("Adicione um jogador antes de começar");
      return;
    }
    if (peladaSelecionada.quantos * 2 > arrayJogadores.length) {
      alert(
        ` O numero de jogadores dessa pelada deve ser no mínimo ${
          peladaSelecionada.quantos * 2
        }`
      );
      return;
    }
    peladaSelecionada.contra
      ? navigation.navigate("BolaRolandoContra", {
          jogadores: arrayJogadores,
          pelada: peladaSelecionada,
        })
      : navigation.navigate("BolaRolando", {
          jogadores: arrayJogadores,
          pelada: peladaSelecionada,
        });
  };
  const handleDeletePlayer = (index: number) => {
    setArrayJogadores(arrayJogadores.filter((_, i) => i !== index));
  };
  const renderLista = ({ item, index }: { item: Jogadores; index: number }) => {
    return (
      <View style={styles.touchable}>
        <Text style={styles.textList}>{item.name}</Text>
        <TouchableOpacity onPress={() => handleDeletePlayer(index)}>
          <Trash />
        </TouchableOpacity>
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
        <View style={styles.textContainer}>
          <Text style={styles.text}>Adicione os Jogadores</Text>

          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder="Adicione aqui"
              placeholderTextColor={"white"}
              onChangeText={setJogadoresName}
              value={jogadoresName}
            />
            <TouchableOpacity onPress={handleAddJogador}>
              <Plus color="#22300b" />
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.listContainer}>
          {arrayJogadores.length === 0 ? (
            <Text style={styles.emptyMessage}>
              Não há peladas adicionadas ainda
            </Text>
          ) : (
            <FlatList
              style={styles.list}
              data={arrayJogadores}
              renderItem={renderLista}
              keyExtractor={(_, index) => index.toString()}
              ItemSeparatorComponent={() => <View style={{ height: 5 }} />}
            />
          )}
        </View>
      </View>
      <View style={styles.botaoContainer}>
        <TouchableOpacity style={styles.botao} onPress={handleNavigationAdd}>
          <Text style={styles.textBotao}>Para Partida</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default CriarPelada;
