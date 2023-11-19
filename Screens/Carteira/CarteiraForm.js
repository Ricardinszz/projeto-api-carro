import AsyncStorage from '@react-native-async-storage/async-storage'
import axios from 'axios'
import { Formik } from 'formik'
import React, { useState } from 'react'
import { ScrollView, View, Dimensions, ImageBackground, StyleSheet } from 'react-native'
import { Button, Text, TextInput } from 'react-native-paper'
import { mask } from 'remask'
import { Picker } from '@react-native-picker/picker'
import carteiraValidator from '../../Validators/carteiraValidator'

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
              validationSchema={carteiraValidator}
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
                    onChangeText={(value) => { setFieldValue('rg', mask(value, '99.999.999-9')) }}
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
                    onChangeText={(value) => { setFieldValue('cpf', mask(value, '999.999.999-99')) }}
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
                    onChangeText={(value) => { setFieldValue('nascimento', mask(value, '99/99/9999')) }}
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
                    onChangeText={(value) => { setFieldValue('emissao', mask(value, '99/99/9999')) }}
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
                    onChangeText={(value) => { setFieldValue('validade', mask(value, '99/99/9999')) }}
                  />

                  {(errors.validade && touched.validade) &&
                    <Text style={{ color: 'red', marginTop: 5 }}>
                      {errors.validade}
                    </Text>
                  }

                  <TextInput
                    style={{ margin: 5, height: 50, fontSize: 20 }}
                    mode='outlined'
                    label='Categoria'
                    value={values.categoria}
                    onChangeText={(value) => {
                      if (value.length <= 3) {
                        setFieldValue('categoria', value)
                      }
                    }}                    
                  />

                  {(errors.categoria && touched.categoria) &&
                    <Text style={{ color: 'red', marginTop: 5 }}>
                      {errors.categoria}
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
