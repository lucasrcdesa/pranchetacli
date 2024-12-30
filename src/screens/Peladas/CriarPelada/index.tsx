import {
  View,
  Text,
  Image,
  FlatList,
  TouchableOpacity,
  TextInput,
  Alert,
} from 'react-native';
import React, {useState, useRef, useEffect} from 'react';
import {CaretLeft, DotsThree, Plus, Trash} from 'phosphor-react-native';
import {useNavigation, useRoute} from '@react-navigation/native';
import styles from './style';
import {Jogadores} from '../../../@types/jogadores';
import {Peladas} from '../../../@types/peladas';
import firestore from '@react-native-firebase/firestore';

type Props = {};

const CriarPelada = (props: Props) => {
  const navigation = useNavigation();
  const route = useRoute();
  const textInputRef = useRef<TextInput>(null);
  const {name, contra, quantos, regra, id} = route.params as Peladas;
  const peladaSelecionada: Peladas = {
    name: name,
    contra: contra,
    quantos: quantos,
    regra: regra,
    id: id,
  };
  console.log(peladaSelecionada);
  const [arrayJogadores, setArrayJogadores] = useState<Jogadores[]>([]);
  const [jogadoresName, setJogadoresName] = useState('');

  const handleBack = () => {
    navigation.goBack();
  };

  useEffect(() => {
    const fetchPelada = async () => {
      try {
        const peladas = await firestore()
          .collection('JogadoresLocal')
          .doc(`JogadoresLocal${peladaSelecionada.id}`)
          .get();
        if (peladas.exists) {
          const peladasData = peladas.data().jogadores as Jogadores[];

          setArrayJogadores(peladasData);
          firestore()
            .collection('JogadoresLocal')
            .doc(`JogadoresLocal${peladaSelecionada.id}`)
            .set({jogadores: peladasData});
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchPelada();
  }, [peladaSelecionada.id]);
  const sendJogadoresLocal = async (jogadores: Jogadores[]) => {
    try {
      await firestore()
        .collection('JogadoresLocal')
        .doc(`JogadoresLocal${id}`)
        .set({
          jogadores: arrayJogadores,
        });
      console.log('Jogadores adicionados com sucesso');
    } catch (error) {
      console.error('Erro ao adicionar jogadores:', error);
    }
  };

  const handleAddJogador = () => {
    if (jogadoresName.trim() === '') {
      Alert.alert('Oops...', 'O campo não pode estar vazio', [
        {text: 'ok', style: 'cancel'},
      ]);
      return;
    }
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
    setJogadoresName('');
    textInputRef.current?.focus();
  };

  const handleNavigationAdd = () => {
    if (arrayJogadores.length === 0) {
      alert('Adicione um jogador antes de começar');
      return;
    }
    if (peladaSelecionada.quantos * 2 > arrayJogadores.length) {
      alert(
        `O número de jogadores dessa pelada deve ser no mínimo ${
          peladaSelecionada.quantos * 2
        }`,
      );
      return;
    }
    if (peladaSelecionada.contra) {
      navigation.navigate('BolaRolandoContra', {
        jogadores: arrayJogadores,
        pelada: peladaSelecionada,
      });
    } else {
      navigation.navigate('BolaRolando', {
        jogadores: arrayJogadores,
        pelada: peladaSelecionada,
      });
    }
    sendJogadoresLocal(arrayJogadores);
  };

  const handleDeletePlayer = (index: number) => {
    setArrayJogadores(arrayJogadores.filter((_, i) => i !== index));
  };

  const renderLista = ({item, index}: {item: Jogadores; index: number}) => {
    return (
      <View style={styles.touchable}>
        <View>
          <Text style={styles.textList}>{item.name}</Text>
        </View>
        <View style={styles.divDot}>
          <TouchableOpacity>
            <DotsThree />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => handleDeletePlayer(index)}>
            <Trash />
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.tela}>
      <View style={styles.headerContainer}>
        <View style={styles.backContainer}>
          <TouchableOpacity onPress={handleBack}>
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
        <View style={styles.textContainer}>
          <Text style={styles.text}>Adicione os Jogadores</Text>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder="Adicione aqui"
              placeholderTextColor={'white'}
              onChangeText={setJogadoresName}
              value={jogadoresName}
              maxLength={20}
              onSubmitEditing={handleAddJogador}
              ref={textInputRef}
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
              ItemSeparatorComponent={() => <View style={{height: 5}} />}
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
