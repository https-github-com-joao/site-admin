/* eslint-disable */
import axios from "axios";
import ActionsLogin from "./LoginActions";

const config = {
  headers: {
    Authorization: "Bearer " + ActionsLogin.getToken()
  }
};

const cadastrarEquipamento = ({ cd_player, numero_serial, mac_address }) => {
  return axios.post(
    process.env.URL_API_BASE + "/equipamento",
    {
      cd_player: cd_player,
      numero_serial: numero_serial,
      mac_address: mac_address,
      idc_status: 1,
      idc_local_atual: 1,
      created_by: ActionsLogin.getUsuario().cd_usuario
    },
    config
  );
};

const alterarEquipamento = ({
  id,
  cd_player,
  descricao,
  numero_serial,
  mac_address,
  idc_status,
  cd_ponto_apoio,
  cd_motorista
}) => {
  return axios.patch(
    process.env.URL_API_BASE + "/equipamento/" + id,
    {
      cd_player: cd_player,
      descricao: descricao,
      numero_serial: numero_serial,
      mac_address: mac_address,
      idc_status: idc_status,
      cd_ponto_apoio: cd_ponto_apoio,
      cd_motorista: cd_motorista,
      updated_by: ActionsLogin.getUsuario().cd_usuario
    },
    config
  );
};

const listarEquipamento = async status => {
  let response = await axios.get(
    process.env.URL_API_BASE +
      "/equipamento" +
      (status !== null && status !== undefined
        ? "/listar-por-status/" + status
        : ""),
    config
  );
  return response.data;
};

const listarEquipamentosDisponiveis = async () => {
  let response = await axios.get(
    process.env.URL_API_BASE + "/equipamento/listar-para-envio?local_atual=1",
    config
  );
  return response.data;
};

const listarPorPontoApoio = async ponto => {
  let response = await axios.get(
    process.env.URL_API_BASE + "/equipamento/listar-estoque/" + ponto,
    config
  );
  return response.data;
};

export const obterEquipamento = async id => {
  let response = await axios.get(
    process.env.URL_API_BASE + "/equipamento/" + id,
    config
  );
  return response.data;
};

export const obterEquipamentoComHistorico = async id => {
  let response = await axios.get(
    process.env.URL_API_BASE + "/equipamento/obter-com-historico/" + id,
    config
  );
  return response.data;
};

export default {
  cadastrarEquipamento,
  alterarEquipamento,
  listarEquipamento,
  listarEquipamentosDisponiveis,
  listarPorPontoApoio,
  obterEquipamento,
  obterEquipamentoComHistorico
};
