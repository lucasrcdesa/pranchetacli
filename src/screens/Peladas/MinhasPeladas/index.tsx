import {
  View,
  Text,
  StyleSheet,
  Image,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {CaretLeft, Plus} from 'phosphor-react-native';
import {useNavigation} from '@react-navigation/native';
import {Peladas} from '../../../@types/peladas';
import styles from './style';

import firestore from '@react-native-firebase/firestore';

type Props = {};

const MinhasPeladas = (props: Props) => {
  const navigation = useNavigation();
  const [peladasList, setPeladasList] = useState<Peladas[]>([]);

  const handleBack = () => {
    navigation.goBack();
  };
  const handleNavigationAdd = () => navigation.navigate('AddPeladas');
  const handleNavigationStart = (
    name: string,
    contra: boolean,
    quantos: number,
    regra: string,
    id: string,
  ) => navigation.navigate('CriarPelada', {name, contra, quantos, regra, id});

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

  const renderLista = ({item}: {item: Peladas}) => {
    return (
      <TouchableOpacity
        style={styles.touchable}
        onPress={() =>
          handleNavigationStart(
            item.name,
            item.contra,
            item.quantos,
            item.regra,
            item.id,
          )
        }>
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
          {peladasList.length === 0 ? (
            <Text style={styles.emptyMessage}>
              Não há peladas adicionadas ainda
            </Text>
          ) : (
            <FlatList
              style={styles.list}
              data={peladasList}
              renderItem={renderLista}
              keyExtractor={item => item.id}
              ItemSeparatorComponent={() => <View style={{height: 15}} />}
            />
          )}
        </View>
      </View>
    </View>
  );
};

export default MinhasPeladas;
