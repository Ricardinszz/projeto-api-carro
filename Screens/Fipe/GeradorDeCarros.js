import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ImageBackground, Dimensions, ScrollView } from 'react-native';
import { Button, Card } from 'react-native-paper';
import apiCarros from '../../services/apiCarros';

const GeradorDeCarros = () => {

  const [marcas, setMarcas] = useState([]);
  const [modelos, setModelos] = useState([]);
  const [anos, setAnos] = useState([]);
  const [preco, setPreco] = useState('');

  const random = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

  const fetchData = async () => {
    try {
      const responseMarcas = await apiCarros.get('/marcas');
      const marca = responseMarcas.data[random(0, responseMarcas.data.length - 1)];
      setMarcas(marca);

      const responseModelos = await apiCarros.get(`/marcas/${marca.codigo}/modelos`);
      const modelo = responseModelos.data.modelos[random(0, responseModelos.data.modelos.length - 1)];
      setModelos(modelo);

      const responseAnos = await apiCarros.get(`/marcas/${marca.codigo}/modelos/${modelo.codigo}/anos`);
      const ano = responseAnos.data[random(0, responseAnos.data.length - 1)];
      setAnos(ano);

      const responsePreco = await apiCarros.get(`/marcas/${marca.codigo}/modelos/${modelo.codigo}/anos/${ano.codigo}`);
      setPreco(responsePreco.data.Valor);
    } catch (error) {
      alert('Ocorreu um erro ao buscar os dados da API');
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <ImageBackground source={require("../../imagens/sem-logo.jpg")} style={styles.background}>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>Gerador de Carros Aleatórios</Text>
        <Card style={styles.card}>
          <Card.Content>
            <Text style={styles.text}>Marca: {marcas.nome}</Text>
            <Text style={styles.text}>Modelo: {modelos.nome}</Text>
            <Text style={styles.text}>Ano: {anos.nome}</Text>
            <Text style={styles.text}>Preço: {preco}</Text>
          </Card.Content>
        </Card>
        <Button mode="contained" onPress={fetchData} style={styles.button}>
          Gerar outro carro
        </Button>
      </ScrollView>
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
    flexGrow: 1,
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
  card: {
    width: '80%',
    marginBottom: 20,
  },
  text: {
    fontSize: 18,
    marginVertical: 5,
  },
  button: {
    width: '60%',
    marginTop: 10,
  },
});

export default GeradorDeCarros;
