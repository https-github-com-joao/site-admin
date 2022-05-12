import axios from "axios";
import ActionsLogin from "./LoginActions";

const config = {
  headers: {
    Authorization: "Bearer " + ActionsLogin.getToken()
  }
};

const cadastrar = (
  nome,
  sinopse,
  classificacao,
  dt_estreia
) => {
  return axios.post(
    process.env.URL_API_BASE + "/filme",
    {
      nome: nome,
      sinopse: sinopse,
      classificacao: classificacao,
      dt_estreia: dt_estreia
    },
    config
  );
};

const alterar = (
  id,
  nome,
  sinopse,
  classificacao,
  dt_estreia
) => {
  return axios.put(
    process.env.URL_API_BASE + "/filme/" + id,
    {
      nome: nome,
      sinopse: sinopse,
      classificacao: classificacao,
      dt_estreia: dt_estreia
    },
    config
  );
};

const listar = async status => {
  let response = await axios.get(process.env.URL_API_BASE + "/filme", config);
  return response.data;
};

export const obter = async id => {
  let response = await axios.get(
    process.env.URL_API_BASE + "/filme/" + id,
    config
  );
  return response.data;
};

export const excluir = id => {
  return axios.delete(process.env.URL_API_BASE + "/filme/" + id, config);
};

export default {
  cadastrar,
  alterar,
  listar,
  obter,
  excluir
}
