import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { ScrollView, View, ImageBackground, StyleSheet, Dimensions } from 'react-native';
import { Avatar, Button, Card, Dialog, FAB, IconButton, Portal, Text } from 'react-native-paper';

const Carteira = ({ navigation, route }) => {
  const [cadastros, setCadastros] = useState([]);
  const [idExcluir, setIdExcluir] = useState(0);

  const [visible, setVisible] = React.useState(false);
  const showDialog = () => setVisible(true);
  const hideDialog = () => setVisible(false);

  useFocusEffect(
    React.useCallback(() => {
      carregarDados();
    }, [])
  );

  function carregarDados() {
    AsyncStorage.getItem('cadastros').then(resultado => {
      resultado = JSON.parse(resultado) || [];
      setCadastros(resultado);
    });
  }

  function confirmarExclusao(id) {
    setIdExcluir(id);
    setVisible(true);
  }

  function excluir() {
    cadastros.splice(idExcluir, 1);
    AsyncStorage.setItem('cadastros', JSON.stringify(cadastros));
    carregarDados();
    setVisible(false);
  }

  return (
    <View style={styles.container}>
      <ImageBackground source={require("../../imagens/sem-logo.jpg")} style={styles.container}>
        <ScrollView style={{ margin: 15, padding: 15 }}>

        {cadastros.map((item, i) => (
  <Card key={i} mode='outlined' style={{ marginBottom: 10, backgroundColor: '#f0f0f0' }}>
    <Card.Content>
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <Avatar.Icon size={45} icon="account" />
        <View style={{ marginLeft: 10 }}>
          <Text style={{ fontWeight: 'bold', fontSize: 18 }}>{item.nome}</Text>
          <Text>CPF: {item.cpf}</Text>
          <Text>Categoria: {item.categoria}</Text> 
        </View>
      </View>
      <View style={{ marginTop: 40 }}>
        <Text>Data de Emissão: {item.emissao}</Text>
        <Text>Data de Validade: {item.validade}</Text>
      </View>
    </Card.Content>
    <Card.Actions>
      <IconButton icon='pencil-outline' 
      onPress={() => navigation.push('Carteira-Form', {id: i, cadastro: item})}
      />
      <IconButton icon='trash-can-outline'
        onPress={() => confirmarExclusao(i)}
      />
    </Card.Actions>
  </Card>
))}
          <Portal>
            <Dialog visible={visible} onDismiss={hideDialog}>
              <Dialog.Title>Atenção</Dialog.Title>
              <Dialog.Content>
                <Text>Deseja realmente excluir o registro?</Text>
              </Dialog.Content>
              <Dialog.Actions>
                <Button onPress={excluir}>Sim</Button>
                <Button onPress={hideDialog}>Não</Button>
              </Dialog.Actions>
            </Dialog>
          </Portal>

        </ScrollView>
        {cadastros.length < 2 && (
          <FAB
            icon="plus"
            size='small'
            style={{ position: 'absolute', margin: 16, right: 0, bottom: 0 }}
            onPress={() => navigation.push('Carteira-Form')}
          />
        )}
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
});

export default Carteira;
