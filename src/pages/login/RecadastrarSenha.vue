<template>
  <div class="login-box" style="border: 1px solid #c9c9c9">
    <div class="login-logo">
      <span class="logo-lg">
        CATALOGO ADMIN
      </span>
    </div>
    <div class="login-box-body">
      <form v-on:submit.prevent="login()">
        <div v-if="!success && messages != ''">
          <div class="alert alert-danger">
            <a href="#" class="close" data-dismiss="alert">&times;</a>
            {{ messages }}
          </div>
        </div>
        <div v-if="success && messages != ''">
          <div class="alert alert-success">
            <a href="#" class="close" data-dismiss="alert">&times;</a>
            {{ messages }}
          </div>
        </div>
        <div class="form-group has-feedback">
          <input
            type="email"
            class="form-control"
            placeholder="Email"
            readonly
            v-model="email"
          />
          <span
            class="glyphicon glyphicon-envelope form-control-feedback"
          ></span>
        </div>
        <div class="form-group has-feedback">
          <input
            type="password"
            class="form-control"
            placeholder="Password"
            v-model="password"
          />
          <span class="glyphicon glyphicon-lock form-control-feedback"></span>
        </div>
        <div class="form-group has-feedback">
          <input
            type="password"
            class="form-control"
            placeholder="Repetir Password"
            v-model="repeatPassword"
          />
          <span class="glyphicon glyphicon-lock form-control-feedback"></span>
        </div>
        <div class="row">
          <div class="col-xs-12">
            <button type="submit" class="btn btn-primary btn-block btn-flat">
              Cadastrar Senha
            </button>
          </div>
        </div>
      </form>
    </div>
    <div
      :class="{ showloader: showModalLoader }"
      id="modelLoader"
      class="modal fade"
      tabindex="-4"
      role="dialog"
      aria-hidden="true"
      data-backdrop="static"
    >
      <div class="modal-dialog">
        <div class="modal-content modal-content-progress">
          <div class="loadersmall"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
/* eslint-disable */
import Actions from "../../actions/LoginActions";
import { getTokenData, isTokenExpired } from "./../../helpers/JwtHelper";

export default {
  name: "RecadastrarSenha",
  data() {
    return {
      showModalLoader: false,
      messages: "",
      success: false,
      email: "",
      password: "",
      repeatPassword: "",
      token: ""
    };
  },
  mounted() {
    this.token = this.$route.query.token;
    if (!isTokenExpired(this.token)) {
      let data = getTokenData(this.token);
      this.email = data.email;
    } else {
      this.messages =
        "Sua solicitação expirou, por favor solicite uma nova senha novamente.";
    }
  },
  methods: {
    login() {
      this.messages = "";
      if (this.password.trim() !== "" && this.repeatPassword.trim() !== "") {
        if (this.password.trim() === this.repeatPassword.trim()) {
          this.onLoading();
          Actions.atualizarSenha(this.email, this.password, this.token, this);
          setTimeout(() => this.$router.push({ path: "/login" }), 10000);
        } else {
          this.messages = "As senhas deve ser iguais";
        }
      } else {
        this.messages = "Preencha os campos";
      }
    },
    onLoading() {
      this.showModalLoader = true;
    },
    onLoaded() {
      this.showModalLoader = false;
    }
  }
};
</script>
