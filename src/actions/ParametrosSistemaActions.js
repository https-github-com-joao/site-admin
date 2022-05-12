/* eslint-disable */
import axios from "axios";
import ActionsLogin from "./LoginActions";

const cadastrarParametro = ({ cd_parametro, valor, descricao, idc_status }) => {
  return axios.post(
    process.env.URL_API_BASE + "/sistema-parametro",
    {
      cd_parametro: cd_parametro,
      valor: valor,
      descricao: descricao,
      idc_status: idc_status,
      created_by: ActionsLogin.getUsuario().cd_usuario
    },
    {
      headers: { Authorization: "Bearer " + ActionsLogin.getToken() }
    }
  );
};

const alterarParametro = ({ id, valor, descricao, idc_status }) => {
  return axios.patch(
    process.env.URL_API_BASE + "/sistema-parametro/" + id,
    {
      valor: valor,
      descricao: descricao,
      idc_status: idc_status,
      updated_by: ActionsLogin.getUsuario().cd_usuario
    },
    {
      headers: { Authorization: "Bearer " + ActionsLogin.getToken() }
    }
  );
};

const listar = async () => {
  let response = await axios.get(
    process.env.URL_API_BASE + "/sistema-parametro",
    {
      headers: { Authorization: "Bearer " + ActionsLogin.getToken() }
    }
  );
  return response.data;
};

export const obter = async id => {
  let response = await axios.get(
    process.env.URL_API_BASE + "/sistema-parametro/" + id,
    {
      headers: { Authorization: "Bearer " + ActionsLogin.getToken() }
    }
  );
  return response.data;
};

export const getParametro = id => {
  return axios.get(
    process.env.URL_API_BASE + "/sistema-parametro/obter-por-id/" + id
  );
};

export const getParametroByLista = params => {
  return axios.get(
    process.env.URL_API_BASE +
      "/sistema-parametro/obter-por-ids/" +
      params.join()
  );
};

const listarAtivos = async () => {
  let response = await axios.get(
    process.env.URL_API_BASE + "/sistema-parametro/listar-ativos/1",
    {
      headers: { Authorization: "Bearer " + ActionsLogin.getToken() }
    }
  );
  return response.data;
};

export default {
  cadastrarParametro,
  alterarParametro,
  listar,
  obter,
  listarAtivos,
  getParametro,
  getParametroByLista
};
