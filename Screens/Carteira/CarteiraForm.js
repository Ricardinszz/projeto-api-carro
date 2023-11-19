import AsyncStorage from '@react-native-async-storage/async-storage'
import axios from 'axios'
import { Formik } from 'formik'
import React, { useState } from 'react'
import { ScrollView, View, Dimensions, ImageBackground, StyleSheet } from 'react-native'
import { Button, Text, TextInput } from 'react-native-paper'
import { mask } from 'remask'
import { Picker } from '@react-native-picker/picker'

const CarteiraForm = ({ navigation, route }) => {

  let cadastro = {
    cnh: '',
    nome: '',
    rg: '',
    cpf: '',
    nascimento: '',
    emissao: '',
    validade: '',
    assinatura: ''
  }

  const [selectedLanguage, setSelectedLanguage] = useState();
  const id = route.params?.id

  if (id >= 0) {
    cadastro = route.params?.cadastro
  }

  function salvar(dados) {

    AsyncStorage.getItem('cadastros').then(resultado => {

      const cadastros = JSON.parse(resultado) || []

      if (id >= 0) {
        cadastros.splice(id, 1, dados)
      } else {
        cadastros.push(dados)
      }

      AsyncStorage.setItem('cadastros', JSON.stringify(cadastros))

      navigation.goBack()
    })
  }

  return (
    <ImageBackground source={require("../../imagens/sem-logo.jpg")} style={styles.background}>
      <ScrollView contentContainerStyle={styles.container}>

            <Text style={{ color: 'white' }}>Formulário de Cadastros</Text>

            <Formik
              initialValues={cadastro}
            
              onSubmit={values => salvar(values)}
            >
              {({ values, handleChange, handleSubmit, errors, touched, setFieldValue }) => (
                <View>
                  <TextInput
                    style={{ margin: 5, height: 50, fontSize: 20 }}
                    mode='outlined'
                    label='Registro'
                    value={values.cnh}
                    onChangeText={handleChange('cnh')}
                  />

                  {(errors.cnh && touched.cnh) &&
                    <Text style={{ color: 'red', marginTop: 5 }}>
                      {errors.cnh}
                    </Text>
                  }

                  <TextInput
                    style={{ margin: 5, height: 50, fontSize: 20 }}
                    mode='outlined'
                    label='Nome completo do titular'
                    value={values.nome}
                    onChangeText={handleChange('nome')}
                  />

                  {(errors.nome && touched.nome) &&
                    <Text style={{ color: 'red', marginTop: 5 }}>
                      {errors.nome}
                    </Text>
                  }

                  <TextInput
                    style={{ margin: 5, height: 50, fontSize: 20 }}
                    mode='outlined'
                    label='Número do RG'
                    value={values.rg}
                    onChangeText={handleChange('rg')}
                  />

                  {(errors.rg && touched.rg) &&
                    <Text style={{ color: 'red', marginTop: 5 }}>
                      {errors.rg}
                    </Text>
                  }

                  <TextInput
                    style={{ margin: 5, height: 50, fontSize: 20 }}
                    mode='outlined'
                    label='Número do CPF'
                    value={values.cpf}
                    onChangeText={handleChange('cpf')}
                  />

                  {(errors.cpf && touched.cpf) &&
                    <Text style={{ color: 'red', marginTop: 5 }}>
                      {errors.cpf}
                    </Text>
                  }

                  <TextInput
                    style={{ margin: 5, height: 50, fontSize: 20 }}
                    mode='outlined'
                    label='Data de nascimento'
                    value={values.nascimento}
                    onChangeText={handleChange('nascimento')}
                  />

                  {(errors.nascimento && touched.nascimento) &&
                    <Text style={{ color: 'red', marginTop: 5 }}>
                      {errors.nascimento}
                    </Text>
                  }

                  <TextInput
                    style={{ margin: 5, height: 50, fontSize: 20 }}
                    mode='outlined'
                    label='Data de emissão'
                    value={values.emissao}
                    onChangeText={handleChange('emissao')}
                  />

                  {(errors.emissao && touched.emissao) &&
                    <Text style={{ color: 'red', marginTop: 5 }}>
                      {errors.emissao}
                    </Text>
                  }

                  <TextInput
                   style={{ margin: 5, height: 50, fontSize: 20 }}
                    mode='outlined'
                    label='Data de validade'
                    value={values.validade}
                    onChangeText={handleChange('validade')}
                  />

                  {(errors.validade && touched.validade) &&
                    <Text style={{ color: 'red', marginTop: 5 }}>
                      {errors.validade}
                    </Text>
                  }

                  <TextInput
                    style={{ margin: 5, height: 50, fontSize: 20 }}
                    mode='outlined'
                    label='Assinatura do titular'
                    value={values.assinatura}
                    onChangeText={handleChange('assinatura')}
                  />

                  {(errors.assinatura && touched.assinatura) &&
                    <Text style={{ color: 'red', marginTop: 5 }}>
                      {errors.assinatura}
                    </Text>
                  }

                  <Button onPress={handleSubmit} mode="contained">Salvar</Button>
                </View>
              )}
            </Formik>

          
        </ScrollView>
        </ImageBackground>
       
  )
}
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
  input: {
    width: '80%',
    marginBottom: 10,
  },
  button: {
    width: '60%',
    marginTop: 10,
  },
  error: {
    fontSize: 16,
    color: 'red',
    marginVertical: 5,
  },
});


export default CarteiraForm
