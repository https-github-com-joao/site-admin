/* eslint-disable */
import axios from "axios";
import ActionsLogin from "./LoginActions";

const config = {
  headers: {
    Authorization: "Bearer " + ActionsLogin.getToken()
  }
};

const cadastrarPontoApoio = ({
  cd_ponto_apoio,
  descricao,
  cnpj,
  telefone,
  end_cep,
  end_logradouro,
  end_numero,
  end_complemento,
  end_bairro,
  end_cidade,
  end_uf,
  end_pais,
  end_latitude,
  end_longitude,
  horario_atend_ini,
  horario_atend_fim,
  capacidade_atend_dia,
  raio_atuacao,
  idc_status
}) => {
  return axios.post(
    process.env.URL_API_BASE + "/ponto-apoio",
    {
      cd_ponto_apoio: cd_ponto_apoio,
      descricao: descricao,
      cnpj: cnpj,
      telefone: telefone,
      end_cep: end_cep,
      end_logradouro: end_logradouro,
      end_numero: end_numero,
      end_complemento: end_complemento,
      end_bairro: end_bairro,
      end_cidade: end_cidade,
      end_uf: end_uf,
      end_pais: end_pais,
      end_latitude: end_latitude,
      end_longitude: end_longitude,
      horario_atend_ini: horario_atend_ini,
      horario_atend_fim: horario_atend_fim,
      capacidade_atend_dia: capacidade_atend_dia,
      raio_atuacao: raio_atuacao,
      idc_status: idc_status
    },
    config
  );
};

const alterarPontoApoio = ({
  id,
  descricao,
  cnpj,
  telefone,
  end_cep,
  end_logradouro,
  end_numero,
  end_complemento,
  end_bairro,
  end_cidade,
  end_uf,
  end_pais,
  end_latitude,
  end_longitude,
  horario_atend_ini,
  horario_atend_fim,
  capacidade_atend_dia,
  raio_atuacao,
  idc_status
}) => {
  return axios.patch(
    process.env.URL_API_BASE + "/ponto-apoio/" + id,
    {
      descricao: descricao,
      cnpj: cnpj,
      telefone: telefone,
      end_cep: end_cep,
      end_logradouro: end_logradouro,
      end_numero: end_numero,
      end_complemento: end_complemento,
      end_bairro: end_bairro,
      end_cidade: end_cidade,
      end_uf: end_uf,
      end_pais: end_pais,
      end_latitude: end_latitude,
      end_longitude: end_longitude,
      horario_atend_ini: horario_atend_ini,
      horario_atend_fim: horario_atend_fim,
      capacidade_atend_dia: capacidade_atend_dia,
      raio_atuacao: raio_atuacao,
      idc_status: idc_status
    },
    config
  );
};

const listarPontoApoio = async () => {
  let response = await axios.get(
    process.env.URL_API_BASE + "/ponto-apoio",
    config
  );
  return response.data;
};

const listarPontoApoioAtivos = async () => {
  let response = await axios.get(
    process.env.URL_API_BASE + "/ponto-apoio/listar-ativos/1",
    config
  );
  return response.data;
};

const obterPontoApoio = async id => {
  let response = await axios.get(
    process.env.URL_API_BASE + "/ponto-apoio/" + id,
    config
  );
  return response.data;
};

export default {
  cadastrarPontoApoio,
  alterarPontoApoio,
  listarPontoApoio,
  listarPontoApoioAtivos,
  obterPontoApoio
};
