import axios from 'axios';

const apiCarros = axios.create({
  baseURL: 'https://parallelum.com.br/fipe/api/v1/carros',
});

export default apiCarros;

