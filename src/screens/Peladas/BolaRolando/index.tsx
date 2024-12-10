import {
  View,
  Text,
  StyleSheet,
  Image,
  FlatList,
  TouchableOpacity,
  TextInput,
  Switch,
} from "react-native";
import React, { useEffect, useState } from "react";
import { CaretLeft, ChartBar, Plus, Trash, X } from "phosphor-react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { Jogadores } from "../CriarPelada";
import styles from "./style";

type Props = {};
const array: string[] = [
  "Lucas",
  "Matheus",
  "Dente",
  "Rominho",
  "Hudson",
  "Madeira",
  "Palito",
  "Rubeça",
  "Tavinho",
  "Homo",
  "Coto",
  "Catra",
];

const BolaRolando = (props: Props) => {
  const navigation = useNavigation();

  const route = useRoute();

  const [placar1, setPlacar1] = useState(0);
  const [placar2, setPlacar2] = useState(0);

  const { jogadores }: { jogadores: Jogadores[] } = route.params;

  const [time1, setTime1] = useState<Jogadores[]>([
    jogadores[0],
    jogadores[2],
    jogadores[4],
    jogadores[6],
    jogadores[8],
  ]);
  const [time2, setTime2] = useState<Jogadores[]>([
    jogadores[1],
    jogadores[3],
    jogadores[5],
    jogadores[7],
    jogadores[9],
  ]);
  const [time3, setTime3] = useState(jogadores.slice(10, 15));
  const [time4, setTime4] = useState(jogadores.slice(15, 20));
  const [sobra, setSobra] = useState(jogadores.slice(20));
  const [jogadoresS, setJogadores] = useState([
    ...time1,
    ...time2,
    ...time3,
    ...time4,
    ...sobra,
  ]);
  useEffect(() => {
    setTime1(jogadoresS.slice(0, 5));
    setTime2(jogadoresS.slice(5, 10));
    setTime3(jogadoresS.slice(10, 15));
    setTime4(jogadoresS.slice(15, 20));
    setSobra(jogadores.slice(20));
  }, [jogadoresS]);

  const [saiOsDois, setSaiOsDois] = useState(false);
  const [regra, setRegra] = useState<null | string>("2");
  const ganhouTime1 = () => {
    const perdeu = jogadoresS.slice(5, 10);
    jogadoresS.splice(5, 5);
    return jogadoresS.concat(perdeu);
  };
  const ganhouTime2 = () => {
    const perdeu = jogadoresS.slice(0, 5);
    jogadoresS.splice(0, 5);
    return jogadoresS.concat(perdeu);
  };
  const empatou = () => {
    let updatedJogadores;

    if (!saiOsDois) {
      if (regra === "1") {
        updatedJogadores = ganhouTime1();
      } else if (regra === "2") {
        updatedJogadores = ganhouTime2();
      }
    } else {
      const perdeu = jogadoresS.slice(0, 10);
      updatedJogadores = [...jogadoresS.slice(10), ...perdeu];
    }

    if (updatedJogadores) {
      setJogadores(updatedJogadores);
    }
  };

  const handleNavigationRolando = () => {
    if (placar1 > placar2) {
      setJogadores(ganhouTime1());
      console.log(jogadoresS);
    }
    if (placar1 < placar2) {
      setJogadores(ganhouTime2());
    }
    if (placar1 == placar2) {
      empatou();
    }
  };
  const handleClickDescansar = (index: number) => {
    const updatedJogadores = [...jogadoresS];

    const descansou = updatedJogadores.splice(index, 1)[0];
    updatedJogadores.push(descansou);

    setJogadores(updatedJogadores);
  };

  const handleNavigationStart = () =>
    navigation.navigate("TabelaRolando", { jogadores: jogadores });
  const handleNavigationGol1 = () =>
    navigation.navigate("TelaGol", { time: time1, fez: 1 });
  const handleNavigationGol2 = () =>
    navigation.navigate("TelaGol", { time: time2, fez: 2 });
  const handleBack = () => {
    navigation.goBack();
  };
  const renderLista = ({ item, index }: { item: Jogadores; index: number }) => {
    return (
      <View style={styles.touchable}>
        <Text style={styles.textList}>{item.name}</Text>
        <TouchableOpacity onPress={() => handleClickDescansar(index)}>
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
        <View style={styles.addContainer}>
          <TouchableOpacity onPress={handleNavigationStart}>
            <ChartBar color="#aa2834" />
          </TouchableOpacity>
        </View>
      </View>
      <View>
        <View style={styles.placarContainer}>
          <View style={styles.placarback}>
            <Text style={styles.textPlacar}>{placar1}</Text>

            <View>
              <Text style={styles.xPlacar}>x</Text>
            </View>
            <View>
              <Text style={styles.textPlacar}>{placar2}</Text>
            </View>
          </View>
        </View>
      </View>
      <View style={styles.jogoContainer}>
        <View style={styles.times}>
          <View style={styles.listContainer}>
            {array.length === 0 ? (
              <Text style={styles.emptyMessage}>
                Não há peladas adicionadas ainda
              </Text>
            ) : (
              <FlatList
                style={styles.list}
                data={time1}
                renderItem={renderLista}
                keyExtractor={(_, index) => index.toString()}
                ItemSeparatorComponent={() => <View style={{ height: 5 }} />}
              />
            )}
          </View>
        </View>
        <View style={styles.xContainer}>
          <X size={15} />
        </View>
        <View style={styles.times}>
          <View style={styles.listContainer}>
            {array.length === 0 ? (
              <Text style={styles.emptyMessage}>
                Não há peladas adicionadas ainda
              </Text>
            ) : (
              <FlatList
                style={styles.list}
                data={time2}
                renderItem={renderLista}
                keyExtractor={(_, index) => index.toString()}
                ItemSeparatorComponent={() => <View style={{ height: 5 }} />}
              />
            )}
          </View>
        </View>
      </View>
      <View>
        <View style={styles.textProx}>
          <View style={styles.gol}>
            <TouchableOpacity style={styles.but} onPress={handleNavigationGol1}>
              <Text style={styles.textProxBla}>GOOOL!</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.but} onPress={handleNavigationGol2}>
              <Text style={styles.textProxBla}>GOOOL!</Text>
            </TouchableOpacity>
          </View>
          <Text style={styles.textProxBla}>Próximos times</Text>
        </View>
        <View style={styles.proxContainer}>
          <View style={styles.prox}>
            <View style={styles.listContainer}>
              {array.length === 0 ? (
                <Text style={styles.emptyMessage}>
                  Não há peladas adicionadas ainda
                </Text>
              ) : (
                <FlatList
                  style={styles.list}
                  data={time3}
                  renderItem={renderLista}
                  keyExtractor={(_, index) => index.toString()}
                  ItemSeparatorComponent={() => <View style={{ height: 5 }} />}
                />
              )}
            </View>
          </View>
          <View style={styles.prox}>
            <View style={styles.listContainer}>
              {array.length === 0 ? (
                <Text style={styles.emptyMessage}>
                  Não há peladas adicionadas ainda
                </Text>
              ) : (
                <FlatList
                  style={styles.list}
                  data={time4}
                  renderItem={renderLista}
                  keyExtractor={(_, index) => index.toString()}
                  ItemSeparatorComponent={() => <View style={{ height: 5 }} />}
                />
              )}
            </View>
          </View>
        </View>
      </View>

      <View style={styles.botaoContainer}>
        <TouchableOpacity
          style={styles.botao}
          onPress={handleNavigationRolando}
        >
          <Text style={styles.textBotao}>Encerrar partida</Text>
        </TouchableOpacity>
        <View style={styles.swit}>
          <Switch
            trackColor={{ false: "#aa2834", true: "#344d0e" }}
            onValueChange={(value) => setSaiOsDois(value)}
            value={saiOsDois}
          />
          <Text style={styles.switText}> Empate sai os dois</Text>
        </View>
      </View>
    </View>
  );
};
export default BolaRolando;
