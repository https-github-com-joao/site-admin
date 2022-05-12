import axios from "axios";
import ActionsLogin from "./LoginActions";

const config = {
  headers: {
    Authorization: "Bearer " + ActionsLogin.getToken()
  }
};

const cadastrar = (
  descricao,
  duracao
) => {
  return axios.post(
    process.env.URL_API_BASE + "/sala",
    {
      descricao: descricao,
      duracao: duracao
    },
    config
  );
};

const alterar = (
  id,
  descricao,
  duracao
) => {
  return axios.put(
    process.env.URL_API_BASE + "/sala/" + id,
    {
      descricao: descricao,
      duracao: duracao
    },
    config
  );
};

const listar = async status => {
  let response = await axios.get(process.env.URL_API_BASE + "/sala", config);
  return response.data;
};

export const obter = async id => {
  let response = await axios.get(
    process.env.URL_API_BASE + "/sala/" + id,
    config
  );
  return response.data;
};

export const excluir = id => {
  return axios.delete(process.env.URL_API_BASE + "/sala/" + id, config);
};

export default {
  cadastrar,
  alterar,
  listar,
  obter,
  excluir
}
