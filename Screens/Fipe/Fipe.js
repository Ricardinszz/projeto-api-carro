import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Picker, ScrollView } from 'react-native';
import { Card } from 'react-native-paper';
import apiCarros from '../../services/apiCarros';

const Fipe = () => {

  const [marcas, setMarcas] = useState([]);
  const [modelos, setModelos] = useState([]);
  const [anos, setAnos] = useState([]);
  const [valor, setValor] = useState('');


  const [marcaEscolhida, setMarcaEscolhida] = useState('');
  const [modeloEscolhido, setModeloEscolhido] = useState('');
  const [anoEscolhido, setAnoEscolhido] = useState('');


  const buscarMarcas = async () => {
    try {

      const response = await apiCarros.get('/marcas');

      const data = response.data;

      setMarcas(data);
    } catch (error) {

      alert('erro ao buscar as marcas');
    }
  };

  const buscarModelos = async marca => {
    try {

      const response = await apiCarros.get(`/marcas/${marca}/modelos`);

      const data = response.data.modelos;

      setModelos(data);
    } catch (error) {

      alert('erro ao buscar os modelos');
    }
  };

  const buscarAnos = async (marca, modelo) => {
    try {

      const response = await apiCarros.get(`/marcas/${marca}/modelos/${modelo}/anos`);

      const data = response.data;

      setAnos(data);
    } catch (error) {

      alert('erro ao buscar os anos');
    }
  };

  const buscarValor = async (marca, modelo, ano) => {
    try {

      const response = await apiCarros.get(
        `/marcas/${marca}/modelos/${modelo}/anos/${ano}`
      );

      const data = response.data;

      setValor(data);
    } catch (error) {

      alert('erro ao buscar o valor');
    }
  };

  useEffect(() => {
    buscarMarcas();
  }, []);


  useEffect(() => {
    if (marcaEscolhida) {
      buscarModelos(marcaEscolhida);
    }
  }, [marcaEscolhida]);

  useEffect(() => {
    if (modeloEscolhido) {
      buscarAnos(marcaEscolhida, modeloEscolhido);
    }
  }, [modeloEscolhido]);

  useEffect(() => {
    if (anoEscolhido) {
      buscarValor(marcaEscolhida, modeloEscolhido, anoEscolhido);
    }
  }, [anoEscolhido]);

  return (

    <ScrollView>
      <View style={styles.container}>
        <Text style={styles.title}>Tabela Fipe</Text>
        <Card style={styles.card}>
          
          <Card.Content>
            <View style={styles.pickerContainer}>
              <Text style={styles.label}>Marca:</Text>
              <Picker
                style={styles.picker}
                selectedValue={marcaEscolhida}
                onValueChange={itemValue => setMarcaEscolhida(itemValue)}
              >
                <Picker.Item label="Selecione a marca" value="" />
                {marcas.map(marca => (
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
                selectedValue={modeloEscolhido}
                onValueChange={itemValue => setModeloEscolhido(itemValue)}
              >
                <Picker.Item label="Selecione o modelo" value="" />
                {modelos.map(modelo => (
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
                selectedValue={anoEscolhido}
                onValueChange={itemValue => setAnoEscolhido(itemValue)}
              >
                <Picker.Item label="Selecione o ano" value="" />
                {anos.map(ano => (
                  <Picker.Item key={ano.codigo} label={ano.nome} value={ano.codigo} />
                ))}
              </Picker>
            </View>
          </Card.Content>
        </Card>
        {valor && (
          <Card style={{ backgroundColor: '#e3e3e3', alignSelf: 'center' }}>
            <Card.Content>
              <Text style={styles.resultLabel}>Valor:</Text>
              <Text style={styles.resultValue}>{valor.Valor}</Text>
              <Text style={styles.resultLabel}>Marca:</Text>
              <Text style={styles.resultValue}>{valor.Marca}</Text>
              <Text style={styles.resultLabel}>Modelo:</Text>
              <Text style={styles.resultValue}>{valor.Modelo}</Text>
              <Text style={styles.resultLabel}>Ano:</Text>
              <Text style={styles.resultValue}>{valor.AnoModelo}</Text>
              <Text style={styles.resultLabel}>Combustível:</Text>
              <Text style={styles.resultValue}>{valor.Combustivel}</Text>
            </Card.Content>
          </Card>
        )}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#eee',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 20,
  },
  card: {
    marginVertical: 10,
    backgroundColor: '#eee',
    borderRadius: 10,
  },
  pickerContainer: {
    width: 300,
    marginTop: 15,
    marginLeft: 20,
    marginRight: 20,
    borderColor: 'black',
    borderBottomWidth: 1,
    borderRadius: 10,
    alignSelf: 'center'
  },
  label: {
    fontSize: 18,
    fontWeight: 'bold',
    marginRight: 10,
  },
  picker: {
    flex: 1,
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
  },
});

export default Fipe;
