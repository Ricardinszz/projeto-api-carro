import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
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

      const modelo =
        responseModelos.data.modelos[random(0, responseModelos.data.modelos.length - 1)];

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
    if (inputValue.toLowerCase() === marca.nome.toLowerCase()) {

      setFeedback('Parabéns! Você acertou a marca do carro.');
    } else {

      setFeedback(`Que pena! Você errou a marca do carro. A resposta certa é ${marca.nome}.`);
    }
  };

  return (
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
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f0f0f0',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  text: {
    fontSize: 18,
    marginVertical: 5,
  },
  input: {
    width: '80%',
    marginBottom: 10,
  },
  button: {
    width: '60%',
    marginVertical: 10,
  },
  feedback: {
    fontSize: 16,
    color: 'red',
    marginVertical: 5,
  },
});

export default FipeJogo;