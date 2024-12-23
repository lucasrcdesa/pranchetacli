import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Image,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {Container, HeaderContainer, Logo} from './style';
import {CaretLeft, Plus} from 'phosphor-react-native';
import {useNavigation} from '@react-navigation/native';
import firestore from '@react-native-firebase/firestore';
import {Peladas} from '../../../@types/peladas';

type Props = {};

const ListaEstatistica = (props: Props) => {
  const [peladasList, setPeladasList] = useState<Peladas[]>([]);

  const renderLista = ({item}: {item: Peladas}) => {
    return (
      <TouchableOpacity
        style={styles.touchable}
        onPress={() => handleNavigationLista(item)}>
        <Text style={styles.textList}>{item.name}</Text>
      </TouchableOpacity>
    );
  };

  const navigation = useNavigation();
  const handleNavigation = () => navigation.goBack;
  // const handleNavigationLista = () => navigation.navigate('TabelaEstatistica':);
  const handleNavigationLista = (item: Peladas) =>
    navigation.navigate('TabelaEstatistica', {
      name: item.name,
      contra: item.contra,
      quantos: item.quantos,
      regra: item.regra,
      id: item.id,
    });

  useEffect(() => {
    const fetchPeladas = async () => {
      try {
        const peladas = await firestore().collection('Peladas').get();
        const peladasArray: Peladas[] = peladas.docs.map(doc => {
          return {id: doc.id, ...doc.data()} as Peladas;
        });

        if (peladas) {
          setPeladasList(peladasArray);
          console.log(peladasArray);
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchPeladas();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <View style={styles.backContainer}>
          <TouchableOpacity onPress={handleNavigation()}>
            <CaretLeft color="white" />
          </TouchableOpacity>
        </View>

        <Image
          style={styles.logo}
          tintColor={'white'}
          source={require('../../../assets/soccer.png')}
        />
        <View style={styles.addContainer}></View>
      </View>
      <View style={styles.Content}>
        <View style={styles.textContainer}>
          <Text style={styles.text}>Escolha a pelada</Text>
        </View>
        <View style={styles.listContainer}>
          {peladasList.length === 0 ? (
            <Text style={styles.emptyMessage}>
              Não há peladas adicionadas ainda
            </Text>
          ) : (
            <FlatList
              style={styles.list}
              data={peladasList}
              renderItem={renderLista}
              keyExtractor={(_, index) => index.toString()}
              ItemSeparatorComponent={() => <View style={{height: 15}} />}
            />
          )}
        </View>
      </View>
    </View>
  );
};

export default ListaEstatistica;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#23300b',
  },
  logo: {
    width: 70,
    height: 70,
  },
  headerContainer: {
    width: '100%',
    height: 200,
    justifyContent: 'space-around',
    alignItems: 'center',
    flexDirection: 'row',
    backgroundColor: '#23300b',
  },
  backContainer: {
    backgroundColor: '#344d0e',
    height: 35,
    width: 35,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
  },
  addContainer: {
    height: 35,
    width: 35,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
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
  listContainer: {
    backgroundColor: '#344d0e',
    width: '88%',
    height: '65%',
    borderRadius: 8,
    padding: 15,
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
});
