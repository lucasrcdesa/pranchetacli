import {
  View,
  Text,
  StyleSheet,
  Image,
  FlatList,
  TouchableOpacity,
  Alert,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {CaretLeft} from 'phosphor-react-native';
import {useNavigation, useRoute} from '@react-navigation/native';
import {Jogadores} from '../../../@types/jogadores';
import firestore, {orderBy} from '@react-native-firebase/firestore';
import {Peladas} from '../../../@types/peladas';

type Props = {};

const TabelaRolando = (props: Props) => {
  const navigation = useNavigation();
  const [arrayFirebase, setArrayFirebase] = useState<Jogadores[]>();
  const [arrayInicial, setArrayInicial] = useState<Jogadores[]>([]);
  const route = useRoute();
  const {jogadores, pelada}: {jogadores: Jogadores[]; pelada: Peladas} =
    route.params;
  const handleBack = () => {
    navigation.goBack();
  };

  const handleNavigationRolando = () => {
    const fetchPelada = async () => {
      try {
        firestore()
          .collection('JogadoresLocal')
          .doc(`JogadoresLocal${pelada.id}`)
          .set({jogadores: []});
      } catch (error) {
        console.log(error);
      }
    };
    Alert.alert(
      'Encerrar Pelada',
      'Você tem certeza que deseja encerrar a pelada?',
      [
        {text: 'Cancelar', style: 'cancel'},
        {
          text: 'Confirmar',
          onPress: () => {
            fetchPelada();
            navigation.pop(3);
          },
          style: 'destructive',
        },
      ],
    );
  };

  useEffect(() => {
    const fetchPelada = async () => {
      try {
        const peladas = await firestore()
          .collection('JogadoresLocal')
          .doc(`JogadoresLocal${pelada.id}`)
          .get();

        const peladasData = peladas.data().jogadores as Jogadores[];

        if (peladas.exists) {
          const sortedData = peladasData.sort((a, b) => {
            if (b.gols === a.gols) {
              return b.assists - a.assists;
            }
            return b.gols - a.gols;
          });

          setArrayFirebase(sortedData);
          console.log(sortedData);
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchPelada();
  }, []);
  const renderList = ({item}: {item: Jogadores}) => {
    return (
      <View style={styles.text}>
        <View style={styles.textBox}>
          <Text>{item.name} </Text>
        </View>
        <View style={styles.textBox}>
          <Text>{item.gols}</Text>
        </View>
        <View style={styles.textBox}>
          <Text>{item.assists}</Text>
        </View>
        <View style={styles.textBox}>
          <Text>{item.vitorias}</Text>
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
            data={arrayFirebase}
            renderItem={renderList}
            keyExtractor={(_, index) => index.toString()}
            ItemSeparatorComponent={() => <View style={{height: 5}} />}
          />
        </View>
        <View style={styles.botaoContainer}>
          <TouchableOpacity
            style={styles.botao}
            onPress={handleNavigationRolando}>
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
    backgroundColor: '#22300b',
  },
  headerContainer: {
    width: '100%',
    height: 200,
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
    width: '85%',
    height: 450,
    borderRadius: 8,
    padding: 15,
  },
  tituloContainer: {
    flexDirection: 'row',
    alignContent: 'center',
    justifyContent: 'space-around',
    height: 25,
    width: '98%',
    backgroundColor: '#aa2834',
  },
  text: {
    backgroundColor: 'white',
    height: 25,
    justifyContent: 'space-around',
    alignItems: 'center',
    flexDirection: 'row',
    width: '98%',
    borderWidth: 1,
  },
  textion: {
    fontWeight: 'bold',
    color: '#E1E1E6',
  },
  botaoContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  botao: {
    height: '70%',
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
  textBox: {
    width: '25%',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
