import * as Yup from 'yup';

const carteiraValidator = Yup.object().shape({
    nome: Yup.string()
      .min(2, 'valor muito curto')
      .max(50, 'valor muito grande')
      .required('campo obrigatorio'),

      cnh: Yup.string(),
      rg: Yup.string(),
      cpf: Yup.string()
    .matches(/^\d{3}.\d{3}.\d{3}-\d{2}$/, 'formato inválido')
    .required('campo obrigatorio'),
      nascimento: Yup.string(),
      emissao: Yup.string(),
      validade: Yup.string(),
      categoria: Yup.string().strict(),
  })

  export default carteiraValidator