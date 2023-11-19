import { Picker } from '@react-native-picker/picker';
import React, { useState } from 'react';
import { View, Text, TextInput, ScrollView, StyleSheet, ImageBackground, Dimensions } from 'react-native';
import { Button, Card } from 'react-native-paper';
import { TextInputMask } from 'react-native-masked-text';

const { width, height } = Dimensions.get('window');

const Ipva = () => {
  const [valorFipe, setValorFipe] = useState('');
  const [tipoVeiculo, setTipoVeiculo] = useState('');
  const [resultadoIPVA, setResultadoIPVA] = useState('');
  const [erro, setErro] = useState('');

  const calcularIPVA = () => {
    if (!tipoVeiculo) {
      setErro('Por favor, selecione o tipo de veículo.');
      return;
    }

    let aliquota = 0;
    switch (tipoVeiculo) {
      case 'carro':
        aliquota = 3;
        break;
      case 'moto':
        aliquota = 2;
        break;
      case 'caminhao':
        aliquota = 1.5;
        break;
      default:
        break;
    }

    const valorNumerico = parseFloat(valorFipe.replace(/\$|,|\./g, '')) / 100;

    const valorIPVA = (valorNumerico * aliquota) / 100;
    setResultadoIPVA(`Valor do IPVA: R$ ${valorIPVA.toFixed(2)}`);
    setErro(''); // Limpa a mensagem de erro
  };

  return (
    <View style={styles.container}>
      <ImageBackground source={require("../../imagens/sem-logo.jpg")} style={styles.imageBackground}>
        <ScrollView contentContainerStyle={styles.scrollViewContent}>
          <Text style={styles.title}>IPVA</Text>
          <View style={styles.cardContainer}>
            <Card style={styles.card}>
              <Card.Content>
                <Text style={styles.label}>Informe o valor da FIPE:</Text>
                <TextInputMask
                  type={'money'}
                  options={{
                    precision: 2,
                    separator: ',',
                    delimiter: '.',
                    unit: '$',
                    suffixUnit: ''
                  }}
                  value={valorFipe}
                  onChangeText={text => {
                    setValorFipe(text);
                  }}
                  style={styles.input}
                  mode='outlined'
                  placeholder="Valor"
                />

                <Text style={styles.label}>Selecione o tipo de veículo:</Text>
                <Picker
                  selectedValue={tipoVeiculo}
                  onValueChange={(itemValue) => setTipoVeiculo(itemValue)}
                >
                  <Picker.Item label="Selecione o tipo de veículo" value="" />
                  <Picker.Item label="Carro" value="carro" />
                  <Picker.Item label="Moto" value="moto" />
                  <Picker.Item label="Caminhão" value="caminhao" />
                </Picker>

                <Button mode="contained" style={styles.button} onPress={calcularIPVA}>
                  Calcular IPVA
                </Button>
                {erro ? <Text style={{color: 'red'}}>{erro}</Text> : null}
                <Text>{resultadoIPVA}</Text>

              </Card.Content>
            </Card>
          </View>
        </ScrollView>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  imageBackground: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  scrollViewContent: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 20,
    color: 'white',
  },
  cardContainer: {
    width: '80%', 
  },
  card: {
    backgroundColor: '#eee',
    margin: 20, 
  },
  label: {
    fontSize: 18,
    fontWeight: 'bold',
    marginVertical: 5,
  },
  input: {
    marginVertical: 5,
  },
  button: {
    marginVertical: 10,
  },
});

export default Ipva;
