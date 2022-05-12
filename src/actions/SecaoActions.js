import axios from "axios";
import ActionsLogin from "./LoginActions";

const config = {
  headers: {
    Authorization: "Bearer " + ActionsLogin.getToken()
  }
};

const cadastrar = (
  id_sala,
  id_filme,
  enabled
) => {
  return axios.post(
    process.env.URL_API_BASE + "/secao",
    {
      id_sala: id_sala,
      id_filme: id_filme,
      enabled: enabled
    },
    config
  );
};

const alterar = (
  id_sala,
  id_filme,
  enabled
) => {
  return axios.put(
    process.env.URL_API_BASE + "/secao/" + id_filme + "/" + id_sala,
    {
      id_sala: id_sala,
      id_filme: id_filme,
      enabled: enabled
    },
    config
  );
};

const listar = async status => {
  let response = await axios.get(process.env.URL_API_BASE + "/secao", config);
  return response.data;
};

export const obter = async (id_sala, id_filme) => {
  let response = await axios.get(
    process.env.URL_API_BASE + "/secao/" + id_filme + "/" + id_sala
  );
  return response.data;
};

export const excluir = (id_sala, id_filme) => {
  return axios.delete(process.env.URL_API_BASE + "/secao/" + id_filme + "/" + id_sala, config);
};

export default {
  cadastrar,
  alterar,
  listar,
  obter,
  excluir
}
