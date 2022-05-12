import axios from "axios";

const login = async (
  email,
  password,
  page
) => {
  localStorage.setItem("user", JSON.stringify({ nome: email }));
  localStorage.setItem("jwt", JSON.stringify({ nome: email }));
  page.onLoaded();
  window.location = "/";
  return true;
};

const logout = () => {
  localStorage.removeItem("user");
  localStorage.removeItem("jwt");
  localStorage.removeItem("AUTH_CLIENT_ID");
  localStorage.removeItem("AUTH_DOMAIN");
  localStorage.removeItem("AUTH_CONNECTION_DB_BACKOFFICE");
  window.location = "/login";
};

const isAuthenticated = () => {
  return getToken() != null;
};

const getToken = () => {
  return localStorage.getItem("jwt");
};

const recuperarSenha = async (email, currentUrl, page) => {
  axios
    .post(process.env.URL_API_BASE + "/sistema-usuario/recuperar-senha", {
      email: email,
      url: currentUrl,
      sistema: 1
    })
    .then(response => {
      if (response.data.isOk) {
        page.success = true;
        page.messages =
          "Você receberá um email com as informações para recuperar sua senha!";
        page.email = "";
      } else {
        page.success = false;
        page.messages = "Email não identificado";
      }
      page.onLoaded();
    });
};

const atualizarSenha = async (email, senha, token, page) => {
  let AUTH_CONNECTION_DB_BACKOFFICE = localStorage.getItem(
    "AUTH_CONNECTION_DB_BACKOFFICE"
  );
  axios
    .post(process.env.URL_API_BASE + "/sistema-usuario/atualizar-senha", {
      email: email,
      senha: senha,
      token: token,
      connection: AUTH_CONNECTION_DB_BACKOFFICE
    })
    .then(response => {
      if (response.data.isOk) {
        page.success = true;
        page.messages =
          "Senha atualizada com sucesso! Você será redirecionado automaticamente para a tela de login.";
      } else {
        page.success = false;
        page.messages = "Email não identificado";
      }
      page.onLoaded();
    });
};

const getUsuario = () => {
  return JSON.parse(localStorage.getItem("user"));
};

export default {
  login,
  logout,
  isAuthenticated,
  getToken,
  recuperarSenha,
  atualizarSenha,
  getUsuario
}
