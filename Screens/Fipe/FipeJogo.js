import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ImageBackground, Dimensions } from 'react-native';
import { Button, TextInput } from 'react-native-paper';
import apiCarros from '../../services/apiCarros';

const FipeJogo = () => {

  const [modelos, setModelos] = useState([]);
  const [marca, setMarca] = useState('');
  const [inputValue, setInputValue] = useState('');
  const [feedback, setFeedback] = useState('');

  const random = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

  const fetchData = async () => {
    try {
      const responseMarcas = await apiCarros.get('/marcas');
      const marca = responseMarcas.data[random(0, responseMarcas.data.length - 1)];
      setMarca(marca);

      const responseModelos = await apiCarros.get(`/marcas/${marca.codigo}/modelos`);
      const modelo = responseModelos.data.modelos[random(0, responseModelos.data.modelos.length - 1)];
      setModelos(modelo);

      setInputValue('');
      setFeedback('');
    } catch (error) {
      alert('Ocorreu um erro ao buscar os dados da API');
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const checkAnswer = () => {
    const inputWords = inputValue.toLowerCase().split(' ');
    const marcaWords = marca.nome.toLowerCase().split(' ');

    let correctWords = 0;
    for (let i = 0; i < inputWords.length; i++) {
      if (marcaWords.includes(inputWords[i])) {
        correctWords++;
      }
    }

    const correctPercentage = (correctWords / marcaWords.length) * 100;

    if (correctPercentage >= 80) {
      setFeedback('Parabéns! Você acertou a marca do carro.');
    } else {
      setFeedback(`Que pena! Você errou a marca do carro. A resposta certa é ${marca.nome}.`);
    }
  };

  return (
    <ImageBackground source={require("../../imagens/sem-logo.jpg")} style={styles.background}>
      <View style={styles.container}>
        <Text style={styles.title}>Jogo Do Acerto!</Text>
        <Text style={styles.text}>Modelo: {modelos.nome}</Text>
        <TextInput
          label="Digite a marca do carro"
          value={inputValue}
          onChangeText={text => setInputValue(text)}
          style={styles.input}
        />
        <Button mode="contained" onPress={checkAnswer} style={styles.button}>
          Verificar resposta
        </Button>
        <Text style={styles.feedback}>{feedback}</Text>
        <Button mode="contained" onPress={fetchData} style={styles.button}>
          Gerar outro modelo
        </Button>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 20,
    color: '#ffffff', 
  },
  text: {
    fontSize: 18,
    marginVertical: 5,
    color: '#ffffff', 
  },
  input: {
    width: '80%',
    marginBottom: 10,
  },
  button: {
    width: '60%',
    marginTop: 10,
  },
  feedback: {
    fontSize: 16,
    color: 'red',
    marginVertical: 5,
  },
});

export default FipeJogo;
