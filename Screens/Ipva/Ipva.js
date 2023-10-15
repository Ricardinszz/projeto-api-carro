import { Picker } from '@react-native-picker/picker';
import React, { useState } from 'react';
import { View, Text, TextInput, ScrollView, StyleSheet } from 'react-native';
import { Button, Card } from 'react-native-paper';


const Ipva = () => {
  const [valorFipe, setValorFipe] = useState('');
  const [tipoVeiculo, setTipoVeiculo] = useState('');
  const [resultadoIPVA, setResultadoIPVA] = useState('');

  const calcularIPVA = () => {
    let aliquota = 0;
    switch (tipoVeiculo) {
      case 'carro':
        aliquota = 3;
        break;
      case 'moto':
        aliquota = 2;
        break;
      case 'caminhao':
        aliquota = 1;
        break;
      default:
        break;
    }

    const valorIPVA = (parseFloat(valorFipe) * aliquota) / 100;
    setResultadoIPVA(`Valor do IPVA: R$ ${valorIPVA.toFixed(2)}`);
  };

  return (
    <ScrollView>
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text style={styles.title}>IPVA</Text>
        <Card style={{ backgroundColor: '#eee' }}>
          <Card.Content>
            <Text style={styles.label}>Informe o valor da FIPE:</Text>
            <TextInput
              style={{ margin: 5 }}
              mode='outlined'
              placeholder="Valor"
              keyboardType="decimal-pad"
              onChangeText={(text) => setValorFipe(text)}
            />

            <Text style={styles.label}>Selecione o tipo de veículo:</Text>
            <Picker
              selectedValue={tipoVeiculo}
              onValueChange={(itemValue) => setTipoVeiculo(itemValue)}
            >
              <Picker.Item label="Carro" value="carro" />
              <Picker.Item label="Moto" value="moto" />
              <Picker.Item label="Caminhão" value="caminhao" />
            </Picker>

            <Button mode="contained" style={{ marginVertical: 10 }} onPress={calcularIPVA}>
              Calcular IPVA
            </Button>
            <Text>{resultadoIPVA}</Text>

          </Card.Content>

        </Card>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 20,
  },
  label: {
    fontSize: 18,
    fontWeight: 'bold',
    marginRight: 10,
  }
});
export default Ipva;

