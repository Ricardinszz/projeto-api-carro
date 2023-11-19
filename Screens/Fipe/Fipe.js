import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Picker, ScrollView, ImageBackground, Dimensions  } from 'react-native';
import { Button, Card } from 'react-native-paper';
import apiCarros from '../../services/apiCarros';

const Fipe = ({ navigation }) => {

  const [marcas, setMarcas] = useState([]);
  const [modelos, setModelos] = useState([]);
  const [anos, setAnos] = useState([]);
  const [dados, setDados] = useState(null);


  const [marcaSelecionada, setMarcaSelecionada] = useState('');
  const [modeloSelecionado, setModeloSelecionado] = useState('');
  const [anoSelecionado, setAnoSelecionado] = useState('');


  const buscarMarcas = async () => {
    try {

      const response = await apiCarros.get('/marcas');

      const data = response.data;

      setMarcas(data);
    } catch (error) {

      console.error(error);
    }
  };


  const buscarModelos = async (marca) => {
    try {

      const response = await apiCarros.get(`/marcas/${marca}/modelos`);

      const data = response.data.modelos;

      setModelos(data);
    } catch (error) {

      console.error(error);
    }
  };


  const buscarAnos = async (marca, modelo) => {
    try {

      const response = await apiCarros.get(
        `/marcas/${marca}/modelos/${modelo}/anos`
      );

      const data = response.data;

      setAnos(data);
    } catch (error) {

      console.error(error);
    }
  };


  const buscarDados = async (marca, modelo, ano) => {
    try {

      const response = await apiCarros.get(
        `/marcas/${marca}/modelos/${modelo}/anos/${ano}`
      );

      const data = response.data;

      setDados(data);
    } catch (error) {

      console.error(error);
    }
  };


  useEffect(() => {
    buscarMarcas();
  }, []);


  useEffect(() => {
    if (marcaSelecionada) {
      buscarModelos(marcaSelecionada);
    }
  }, [marcaSelecionada]);


  useEffect(() => {
    if (modeloSelecionado) {
      buscarAnos(marcaSelecionada, modeloSelecionado);
    }
  }, [modeloSelecionado]);


  useEffect(() => {
    if (anoSelecionado) {
      buscarDados(marcaSelecionada, modeloSelecionado, anoSelecionado);
    }
  }, [anoSelecionado]);

  return (
    <View style={styles.seila}>
      <ImageBackground source={require("../../imagens/sem-logo.jpg")} style={styles.seila}>
        <ScrollView style={{ margin: 5, padding: 5}}>

      <Text style={styles.title}>Consulta Tabela Fipe</Text>
        <View style={styles.container}>
          <Card style={styles.card}>
            <Card.Content>
              <View style={styles.pickerContainer}>
                <Text style={styles.label}>Marca:</Text>
                <Picker
                  style={styles.picker}
                  selectedValue={marcaSelecionada}
                  onValueChange={(itemValue) => setMarcaSelecionada(itemValue)}
                >
                  <Picker.Item label="Selecione uma marca" value="" />
                  {marcas.map((marca) => (
                    <Picker.Item
                      key={marca.codigo}
                      label={marca.nome}
                      value={marca.codigo}
                    />
                  ))}
                </Picker>
              </View>
              <View style={styles.pickerContainer}>
                <Text style={styles.label}>Modelo:</Text>
                <Picker
                  style={styles.picker}
                  selectedValue={modeloSelecionado}
                  onValueChange={(itemValue) => setModeloSelecionado(itemValue)}
                >
                  <Picker.Item label="Selecione um modelo" value="" />
                  {modelos.map((modelo) => (
                    <Picker.Item
                      key={modelo.codigo}
                      label={modelo.nome}
                      value={modelo.codigo}
                    />
                  ))}
                </Picker>
              </View>
              <View style={styles.pickerContainer}>
                <Text style={styles.label}>Ano:</Text>
                <Picker
                  style={styles.picker}
                  selectedValue={anoSelecionado}
                  onValueChange={(itemValue) => setAnoSelecionado(itemValue)}
                >
                  <Picker.Item label="Selecione um ano" value="" />
                  {anos.map((ano) => (
                    <Picker.Item
                      key={ano.codigo}
                      label={`${ano.nome} (${ano.combustivel})`}
                      value={ano.codigo}
                    />
                  ))}
                </Picker>
              </View>
            </Card.Content>
          </Card>
          {dados && (
            <Card style={{ backgroundColor: '#e3e3e3', alignSelf: 'center' }}>
              <Card.Content>
                <Text style={styles.resultLabel}>ID Fipe:</Text>
                <Text style={styles.resultValue}>{dados.CodigoFipe}</Text>
                <Text style={styles.resultLabel}>Valor:</Text>
                <Text style={styles.resultValue}>{dados.Valor}</Text>
                <Text style={styles.resultLabel}>Marca:</Text>
                <Text style={styles.resultValue}>{dados.Marca}</Text>
                <Text style={styles.resultLabel}>Ano:</Text>
                <Text style={styles.resultValue}>{dados.AnoModelo}</Text>
                <Text style={styles.resultLabel}>Combustível:</Text>
                <Text style={styles.resultValue}>{dados.Combustivel}</Text>
              </Card.Content>
            </Card>
          )}
        </View>
        <View style={{alignItems: 'center'}}>
          <Button
            style={{margin: 10, width: 500, height: 40}} 
            mode="contained"
            onPress={() => navigation.navigate('Fipe-Gerador')}
          >
            Gerador de Carros
          </Button>
  
          <Button
            style={{margin: 10, width: 500, height: 40}} 
            mode="contained"
            onPress={() => navigation.navigate('Fipe-Jogo')}
          >
            Jogo
          </Button>
        </View>
      </ScrollView>
    </ImageBackground>
    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    marginHorizontal: 50, 
    backgroundColor: '#030f40',
    borderRadius: 10,
  },
  seila: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 20,
    color: '#ffffff', 
  },
  card: {
    marginVertical: 10,
    backgroundColor: '#eee',
    borderRadius: 10,
  },
  pickerContainer: {
    width: '100%', 
    marginTop: 15,
    marginLeft: 50, 
    marginRight: 50, 
    borderColor: 'black',
    borderBottomWidth: 1,
    borderRadius: 10,
    alignSelf: 'center',
  },
  label: {
    fontSize: 18,
    fontWeight: 'bold',
    marginRight: 10,
  },
  picker: {
    flex: 1,
    backgroundColor: '#eee',
    flexWrap: 'wrap', 
  },
  resultLabel: {
    fontSize: 18,
    fontWeight: 'bold',
    marginRight: 10,
    color: '#000000',
  },
  resultValue: {
    fontSize: 18,
    color: '#333333',
    flexWrap: 'wrap', 
    flex: 1, 
  },
});

export default Fipe;
