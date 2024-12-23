import {
  View,
  Text,
  StyleSheet,
  Image,
  FlatList,
  TouchableOpacity,
  TextInput,
  Switch,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {CaretLeft, ChartBar, Plus, Trash, X} from 'phosphor-react-native';
import {
  useFocusEffect,
  useNavigation,
  useRoute,
} from '@react-navigation/native';
import styles from './style';
import firestore from '@react-native-firebase/firestore';
import {Jogadores} from '../../../@types/jogadores';
import {Peladas} from '../../../@types/peladas';

type Props = {};

const BolaRolando = (props: Props) => {
  const navigation = useNavigation();

  const route = useRoute();

  const [placar1, setPlacar1] = useState(0);
  const [placar2, setPlacar2] = useState(0);

  const {pelada}: {pelada: Peladas} = route.params;
  const [arrayFirebase, setArrayFirebase] = useState([]);
  const [time1, setTime1] = useState<Jogadores[]>([]);
  const [time2, setTime2] = useState<Jogadores[]>([]);
  const [time3, setTime3] = useState([]);
  const [time4, setTime4] = useState([]);
  const [sobra, setSobra] = useState([]);
  const [jogadoresS, setJogadores] = useState([
    ...time1,
    ...time2,
    ...time3,
    ...time4,
    ...sobra,
  ]);
  useFocusEffect(
    React.useCallback(() => {
      const fetchPlacar = async () => {
        try {
          const time1Doc = await firestore()
            .collection('Placar')
            .doc('time1')
            .get();
          const time2Doc = await firestore()
            .collection('Placar')
            .doc('time2')
            .get();

          const updatedPlacar1 = (time1Doc.data()?.gols || 0) as number;
          const updatedPlacar2 = (time2Doc.data()?.gols || 0) as number;

          setPlacar1(updatedPlacar1);
          setPlacar2(updatedPlacar2);
        } catch (error) {
          console.error('Erro ao buscar placares:', error);
        }
      };

      fetchPlacar();
    }, []),
  );

  useEffect(() => {
    const fetchPelada = async () => {
      try {
        const peladas = await firestore()
          .collection('JogadoresLocal')
          .doc(`JogadoresLocal${pelada.id}`)
          .get();

        if (peladas.exists) {
          const peladasData = peladas.data().jogadores as Jogadores[];
          const newTime1 = [
            peladasData[0],
            peladasData[2],
            peladasData[4],
            peladasData[6],
            peladasData[8],
          ];
          const newTime2 = [
            peladasData[1],
            peladasData[3],
            peladasData[5],
            peladasData[7],
            peladasData[9],
          ];
          const newTime3 = peladasData.slice(10, 15);
          const newTime4 = peladasData.slice(15, 20);
          const newSobra = peladasData.slice(20);
          setTime1(newTime1);
          setTime2(newTime2);
          setTime3(newTime3);
          setTime4(newTime4);
          setSobra(newSobra);
          const arrayUpdated = [
            ...newTime1,
            ...newTime2,
            ...newTime3,
            ...newTime4,
            ...newSobra,
          ];
          setArrayFirebase(arrayUpdated);
          firestore()
            .collection('JogadoresLocal')
            .doc(`JogadoresLocal${pelada.id}`)
            .set({jogadores: arrayUpdated});
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchPelada();
  }, [pelada.id]);

  const [saiOsDois, setSaiOsDois] = useState(true);
  const [regra, setRegra] = useState<null | string>('2');

  const updateArrayFirebase = async (updatedArray: Jogadores[]) => {
    try {
      await firestore()
        .collection('JogadoresLocal')
        .doc(`JogadoresLocal${pelada.id}`)
        .set({jogadores: updatedArray});
      setArrayFirebase(updatedArray);
      setJogadores(updatedArray);
    } catch (error) {
      console.error('Erro ao atualizar arrayFirebase:', error);
    }
  };
  const ganhouTime1 = async () => {
    const perdeu = arrayFirebase.slice(5, 10);
    const newArray = arrayFirebase.filter(
      (_, index) => index < 5 || index >= 10,
    );
    const updatedArray = [...newArray, ...perdeu];
    updateArrayFirebase(updatedArray);
  };
  const ganhouTime2 = async () => {
    const perdeu = arrayFirebase.slice(0, 5);
    const newArray = arrayFirebase.slice(5);
    const updatedArray = [...newArray, ...perdeu];
    updateArrayFirebase(updatedArray);
    console.log(updatedArray);
  };
  const empatou = async () => {
    let updatedJogadores;

    if (saiOsDois) {
      if (regra === '1') {
        updatedJogadores = ganhouTime1();
      } else if (regra === '2') {
        updatedJogadores = ganhouTime2();
      }
    } else {
      const perdeu = arrayFirebase.slice(0, 10);
      updatedJogadores = [...arrayFirebase.slice(10), ...perdeu];
      updateArrayFirebase(updatedJogadores);
    }
  };

  const handleNavigationRolando = async () => {
    let updatedArray = [...arrayFirebase];

    if (placar1 > placar2) {
      await ganhouTime1();
    } else if (placar1 < placar2) {
      await ganhouTime2();
    } else if (placar1 === placar2) {
      await empatou();
    }

    // Reconstrói os times com base no novo array
    const newTime1 = updatedArray.slice(0, 5);
    const newTime2 = updatedArray.slice(5, 10);
    const newTime3 = updatedArray.slice(10, 15);
    const newTime4 = updatedArray.slice(15, 20);

    // Atualiza os estados para refletir as mudanças
    setTime1(newTime1);
    setTime2(newTime2);
    setTime3(newTime3);
    setTime4(newTime4);
  };

  const handleClickDescansar = (index: number) => {
    const updatedJogadores = [...jogadoresS];

    const descansou = updatedJogadores.splice(index, 1)[0];
    updatedJogadores.push(descansou);
  };
  // setJogadores(updatedJogadores);

  const handleNavigationStart = () =>
    navigation.navigate('TabelaRolando', {pelada: pelada});
  const handleNavigationGol1 = () =>
    navigation.navigate('TelaGol', {
      time: time1,
      fez: 1,
      id: pelada.id,
      pelada: pelada,
    });
  // console.log(arrayFirebase);
  const handleNavigationGol2 = () =>
    navigation.navigate('TelaGol', {
      time: time2,
      fez: 2,
      id: pelada.id,
      pelada: pelada,
    });
  const handleBack = () => {
    // navigation.goBack();
    console.log(time1);
  };
  const renderLista = ({item, index}: {item: Jogadores; index: number}) => {
    if (!item || !item.name) {
      return;
    }
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
            }}>
            <CaretLeft color="white" />
          </TouchableOpacity>
        </View>
        <Image
          style={styles.img}
          tintColor={'white'}
          source={require('../../../assets/soccer.png')}
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
            {arrayFirebase.length === 0 ? (
              <Text style={styles.emptyMessage}>
                Não há peladas adicionadas ainda
              </Text>
            ) : (
              <FlatList
                style={styles.list}
                data={time1 || []}
                renderItem={renderLista}
                keyExtractor={(_, index) => index.toString()}
                ItemSeparatorComponent={() => <View style={{height: 5}} />}
              />
            )}
          </View>
        </View>
        <View style={styles.xContainer}>
          <X size={15} />
        </View>
        <View style={styles.times}>
          <View style={styles.listContainer}>
            {arrayFirebase.length === 0 ? (
              <Text style={styles.emptyMessage}>
                Não há peladas adicionadas ainda
              </Text>
            ) : (
              <FlatList
                style={styles.list}
                data={time2 || []}
                renderItem={renderLista}
                keyExtractor={(_, index) => index.toString()}
                ItemSeparatorComponent={() => <View style={{height: 5}} />}
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
              {arrayFirebase.length === 0 ? (
                <Text style={styles.emptyMessage}>
                  Não há peladas adicionadas ainda
                </Text>
              ) : (
                <FlatList
                  style={styles.list}
                  data={time3 || []}
                  renderItem={renderLista}
                  keyExtractor={(_, index) => index.toString()}
                  ItemSeparatorComponent={() => <View style={{height: 5}} />}
                />
              )}
            </View>
          </View>
          <View style={styles.prox}>
            <View style={styles.listContainer}>
              {arrayFirebase.length === 0 ? (
                <Text style={styles.emptyMessage}>
                  Não há peladas adicionadas ainda
                </Text>
              ) : (
                <FlatList
                  style={styles.list}
                  data={time4 || []}
                  renderItem={renderLista}
                  keyExtractor={(_, index) => index.toString()}
                  ItemSeparatorComponent={() => <View style={{height: 5}} />}
                />
              )}
            </View>
          </View>
        </View>
      </View>

      <View style={styles.botaoContainer}>
        <TouchableOpacity
          style={styles.botao}
          onPress={handleNavigationRolando}>
          <Text style={styles.textBotao}>Encerrar partida</Text>
        </TouchableOpacity>
        <View style={styles.swit}>
          <Switch
            trackColor={{false: '#aa2834', true: 'black'}}
            onValueChange={value => {
              console.log(`Switch value changed:', ${value}`);
              setSaiOsDois(value);
            }}
            value={saiOsDois}
          />
          <Text style={styles.switText}> Empate sai os dois</Text>
        </View>
      </View>
    </View>
  );
};
export default BolaRolando;
