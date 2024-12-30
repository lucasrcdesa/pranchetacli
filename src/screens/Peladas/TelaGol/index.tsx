import {
  View,
  Text,
  StyleSheet,
  Image,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import React, {useState} from 'react';
import {
  Boot,
  CaretLeft,
  CloudLightning,
  SoccerBall,
} from 'phosphor-react-native';
import {useNavigation, useRoute} from '@react-navigation/native';
import {Jogadores} from '../../../@types/jogadores';
import firestore from '@react-native-firebase/firestore';
import {Peladas} from '../../../@types/peladas';
type Props = {};
const array: string[] = [
  'Lucas',
  'Matheus',
  'Dente',
  'Rominho',
  'Hudson',
  'Madeira',
  'Palito',
  'Rubeça',
  'Tavinho',
  'Homo',
  'Coto',
  'Catra',
];

const TelaGol = (props: Props) => {
  const route = useRoute();
  const {time, fez, id, pelada}: {time: Jogadores[]; fez: number; id: string} =
    route.params;
  const timeFez = {fez};
  // console.log(time);
  const navigation = useNavigation();

  const [golselecionado, setGolSelecionado] = useState<number | null>(null);
  const [assistSelecionada, setAssistSelect] = useState<number | null>(null);

  const handleBack = () => {
    navigation.goBack();
  };
  const handleNavigationAdd = () => navigation.navigate('AddPeladas');
  const handleNavigationStart = async () => {
    const docRef = firestore()
      .collection('JogadoresLocal')
      .doc(`JogadoresLocal${id}`);
    const doc = await docRef.get();
    const docData = doc.data().jogadores as Jogadores[];

    const docRef2 = firestore().collection('Placar').doc(`time${fez}`);
    const doc2 = await docRef2.get();
    const docData2 = doc2.data().gols as number;

    if (doc.exists) {
      if (fez === 1) {
        const golsJog = docData[golselecionado].gols;
        const assistJog = docData[assistSelecionada].assists;
        docData[golselecionado] = {
          ...docData[golselecionado],
          gols: golsJog + 1,
        };
        if (assistSelecionada !== null) {
          docData[assistSelecionada] = {
            ...docData[assistSelecionada],
            assists: assistJog + 1,
          };
        }
      } else if (fez === 2) {
        const assistJog = docData[assistSelecionada + 5].assists;
        const golsJog = docData[golselecionado + 5].gols;
        docData[golselecionado + 5] = {
          ...docData[golselecionado + 5],
          gols: golsJog + 1,
        };
        if (assistSelecionada !== null) {
          docData[assistSelecionada + 5] = {
            ...docData[assistSelecionada + 5],
            assists: assistJog + 1,
          };
        }
      }

      docRef.set({
        jogadores: docData,
      });
      docRef2.set({
        gols: docData2 + 1,
      });
      console.log(docData);
    }
    navigation.navigate('BolaRolando', {pelada: pelada});
  };

  const handleGol = async (index: number) => {
    if (golselecionado === index) {
      setGolSelecionado(null);
      return;
    }
    setGolSelecionado(index);
  };

  const handleAssist = (index: number) => {
    if (assistSelecionada === index) {
      setAssistSelect(null);
      return;
    }
    setAssistSelect(index);
  };

  const renderLista = ({item, index}: {item: Jogadores; index: number}) => {
    return (
      <View style={styles.listaContainer}>
        <View style={styles.listaItens}>
          <Text style={styles.textbotinho}>{item.name}</Text>
          <View style={styles.botinho}>
            <TouchableOpacity
              onPress={() => {
                handleGol(index);
              }}>
              <SoccerBall
                weight="fill"
                color={
                  golselecionado != null && golselecionado == index
                    ? 'green'
                    : 'black'
                }
              />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                handleAssist(index);
              }}>
              <Boot
                weight="fill"
                color={
                  assistSelecionada != null && assistSelecionada == index
                    ? 'green'
                    : 'black'
                }
              />
            </TouchableOpacity>
          </View>
        </View>
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
          <TouchableOpacity onPress={handleNavigationAdd}></TouchableOpacity>
        </View>
      </View>
      <View style={styles.content}>
        <View style={styles.textContainer}>
          <Text style={styles.text}>Quem brocou</Text>
        </View>
        <View style={styles.listContainer}>
          {time.length === 0 ? (
            <Text style={styles.emptyMessage}>
              Não há peladas adicionadas ainda
            </Text>
          ) : (
            <FlatList
              style={styles.list}
              data={time}
              renderItem={renderLista}
              keyExtractor={(_, index) => index.toString()}
              ItemSeparatorComponent={() => <View style={{height: 10}} />}
            />
          )}
        </View>
      </View>
      <View style={styles.botaoContainer}>
        <TouchableOpacity style={styles.botao} onPress={handleNavigationStart}>
          <Text style={styles.textBotao}>Lançar gol</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default TelaGol;

const styles = StyleSheet.create({
  botinho: {
    flexDirection: 'row',
    gap: 2,
    justifyContent: 'flex-end',
    padding: 3,
  },
  textbotinho: {padding: 3, fontWeight: 'bold', color: '#22300b'},
  listaContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 5,
  },
  listaItens: {
    flexDirection: 'column',
    width: '100%',
    height: 50,
    backgroundColor: '#E1E1E6',
    justifyContent: 'space-between',
    borderRadius: 4,
  },
  tela: {
    flex: 1,
    backgroundColor: '#22300b',
  },
  headerContainer: {
    width: '100%',
    height: 170,
    justifyContent: 'space-around',
    alignItems: 'center',
    flexDirection: 'row',
  },
  addContainer: {
    height: 35,
    width: 35,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
  },
  //   width: 100%;
  // height:200px;
  // justify-content: space-around;
  // align-items: center;
  // flex-direction: row;
  backContainer: {
    backgroundColor: '#344d0e',
    height: 35,
    width: 35,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
  },
  img: {
    width: 70,
    height: 70,
  },
  content: {
    flex: 1,
    alignItems: 'center',
  },
  listContainer: {
    backgroundColor: '#344d0e',
    width: '88%',
    height: '80%',
    borderRadius: 8,
    padding: 10,
  },
  tituloContainer: {
    flexDirection: 'row',
    alignContent: 'center',
    justifyContent: 'space-around',
    height: 25,
    width: '98%',
    backgroundColor: '#aa2834',
  },

  textContainer: {
    width: '88%',
    height: 100,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#E1E1E6',
    marginHorizontal: '6%',
    borderRadius: 8,
  },
  text: {
    color: '#22300b',
    fontSize: 20,
    fontWeight: 'bold',
  },
  Content: {
    flex: 1,
    alignItems: 'center',
    gap: 20,
  },

  list: {
    gap: 20,
  },
  touchable: {
    backgroundColor: '#E1E1E6',
    height: 60,
    padding: 10,
  },
  textList: {
    fontWeight: 'bold',
    color: '#22300b',
  },
  emptyMessage: {
    color: 'white',
    textAlign: 'center',
    fontSize: 16,
  },
  botaoContainer: {
    height: '20%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  botao: {
    height: '50%',
    width: 200,
    backgroundColor: '#aa2834',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textBotao: {
    color: 'white',
    fontWeight: 'bold',
  },
});
